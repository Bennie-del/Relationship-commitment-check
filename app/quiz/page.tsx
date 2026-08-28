"use client";

import { useState } from 'react';
import Link from 'next/link';

// 8 QUESTIONS: Original 4 + New Commitment & Social Media Dimensions
const questions = [
  {
    question: "When someone gives you 100% consistent, secure attention right away, what is your gut reaction?",
    options: [
      { text: "I feel suspicious or secretly a little bored.", archetype: "Avoidant Runner" },
      { text: "I immediately start planning our future together.", archetype: "Anxious Over-Analyzer" },
      { text: "I wonder what's wrong with them that they're so available.", archetype: "Fantasy Addict" },
      { text: "I appreciate it, but I'm looking for someone I can 'improve'.", archetype: "The Project Manager" }
    ]
  },
  {
    question: "A partner brings up a minor grievance about something you did. Your first instinct is to:",
    options: [
      { text: "Shut down, withdraw, or need space immediately.", archetype: "Avoidant Runner" },
      { text: "Over-apologize and panic that they're going to leave.", archetype: "Anxious Over-Analyzer" },
      { text: "Get defensive because it ruins the 'perfect' vibe.", archetype: "Fantasy Addict" },
      { text: "Analyze why they are being so irrational and explain my logic.", archetype: "The Project Manager" }
    ]
  },
  {
    question: "Be honest: How much time do you spend thinking about an ex or a 'situationship' that never fully committed?",
    options: [
      { text: "Constantly. I replay conversations looking for clues.", archetype: "Anxious Over-Analyzer" },
      { text: "I romanticize how good the 'potential' was, ignoring the reality.", archetype: "Fantasy Addict" },
      { text: "I only think about them when my current options get too boring.", archetype: "Avoidant Runner" },
      { text: "I think about how I could have 'fixed' the dynamic if they just listened.", archetype: "The Project Manager" }
    ]
  },
  {
    question: "What is your biggest, unspoken fear about true, long-term commitment?",
    options: [
      { text: "Losing my independence and feeling trapped.", archetype: "Avoidant Runner" },
      { text: "That I'm fundamentally unlovable and they'll eventually see it.", archetype: "Anxious Over-Analyzer" },
      { text: "That real life will be mundane and disappointing compared to my standards.", archetype: "Fantasy Addict" },
      { text: "Settling for someone who isn't as ambitious or evolved as I am.", archetype: "The Project Manager" }
    ]
  },
  {
    question: "When a relationship starts getting 'serious' (meeting friends, talking about the future, using labels), what do you do?",
    options: [
      { text: "I suddenly feel suffocated and start picking fights to create distance.", archetype: "Avoidant Runner" },
      { text: "I get thrilled and immediately want to move in together or merge our lives.", archetype: "Anxious Over-Analyzer" },
      { text: "I start wondering if there's someone better out there that I'm missing.", archetype: "Fantasy Addict" },
      { text: "I assess if they are truly 'ready' for this level of commitment or if they need more work.", archetype: "The Project Manager" }
    ]
  },
  {
    question: "When the initial 'honeymoon phase' dopamine rush fades and routine sets in, how do you react?",
    options: [
      { text: "I tell myself 'the spark is gone' and emotionally check out.", archetype: "Avoidant Runner" },
      { text: "I panic and think they don't love me anymore because it's not as intense.", archetype: "Anxious Over-Analyzer" },
      { text: "I get bored and start sliding back onto the dating apps.", archetype: "Fantasy Addict" },
      { text: "I try to force fun activities or 'fix' the routine to make it exciting again.", archetype: "The Project Manager" }
    ]
  },
  {
    question: "How does seeing 'perfect, aesthetic couples' on TikTok or Instagram affect your view of your own dating life?",
    options: [
      { text: "I use it to validate staying single. 'See, relationships are just fake drama.'", archetype: "Avoidant Runner" },
      { text: "I compare my partner to them and get upset if they don't do grand, cinematic gestures.", archetype: "Anxious Over-Analyzer" },
      { text: "I curate a highly romanticized version of my dating life online, even if the reality is messy.", archetype: "Fantasy Addict" },
      { text: "I send my partner 'relationship advice' videos and expect them to change based on influencers.", archetype: "The Project Manager" }
    ]
  },
  {
    question: "What is your relationship with an ex's or crush's social media profile?",
    options: [
      { text: "I mute or block them immediately to protect my peace and maintain distance.", archetype: "Avoidant Runner" },
      { text: "I stalk their stories, likes, and followers to check for red flags or new partners.", archetype: "Anxious Over-Analyzer" },
      { text: "I post highly aesthetic, 'unbothered' content specifically hoping they will see it.", archetype: "Fantasy Addict" },
      { text: "I analyze their posts to see if they've 'regressed' or if they'd be better now that I'm gone.", archetype: "The Project Manager" }
    ]
  }
];

const resultsData: Record<string, { title: string; description: string; cta: string }> = {
  "Avoidant Runner": {
    title: "The Avoidant Runner",
    description: "You pull away the second things get real. Intimacy feels like a trap to you, so you subconsciously sabotage connections the moment someone gets too close. You don't hate love; you hate the vulnerability it requires.",
    cta: "Get the 'Deactivating Strategies' Reset Guide"
  },
  "Anxious Over-Analyzer": {
    title: "The Anxious Over-Analyzer",
    description: "You are suffocating the connection by trying to define it on day three. Your fear of abandonment makes you grasp too tightly, which ironically pushes secure people away and attracts avoidant ones.",
    cta: "Get the 'Secure Attachment' Blueprint"
  },
  "Fantasy Addict": {
    title: "The Fantasy Addict",
    description: "You don't want a partner; you want a movie script. You fall in love with potential, ignoring glaring red flags because you're addicted to the 'idea' of the relationship, not the flawed human in front of you.",
    cta: "Get the 'Reality vs. Fantasy' Workbook"
  },
  "The Project Manager": {
    title: "The Project Manager",
    description: "You date renovation projects, not people. You derive your self-worth from 'fixing' broken partners, which guarantees you'll never be with someone who is already whole and can love you back equally.",
    cta: "Get the 'Stop Fixing, Start Connecting' Guide"
  }
};

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    "Avoidant Runner": 0, "Anxious Over-Analyzer": 0, "Fantasy Addict": 0, "The Project Manager": 0
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  const [loadingText, setLoadingText] = useState("Analyzing attachment patterns...");
  const [progress, setProgress] = useState(0);

  const handleAnswer = (archetype: string) => {
    const newScores = { ...scores, [archetype]: scores[archetype] + 1 };
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsAnalyzing(true);
      setProgress(10);
      setLoadingText("Analyzing attachment patterns...");
      setTimeout(() => { setProgress(40); setLoadingText("Identifying subconscious blockers..."); }, 1200);
      setTimeout(() => { setProgress(75); setLoadingText("Calculating relationship blindspots..."); }, 2400);
      setTimeout(() => { setProgress(100); setLoadingText("Generating your psychological profile..."); }, 3200);
      
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowPaywall(true);
      }, 3800);
    }
  };

  const getFinalResult = () => {
    let maxScore = 0;
    let resultArchetype = "Avoidant Runner"; 
    for (const [archetype, score] of Object.entries(scores)) {
      if (score > maxScore) { maxScore = score; resultArchetype = archetype; }
    }
    return resultsData[resultArchetype];
  };

  // --- 1. SUSPENSE LOADING SCREEN ---
  if (isAnalyzing) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-950">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-zinc-800"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-pink-500 border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">Processing Your Data</h2>
            <p className="text-purple-400 font-medium transition-all duration-300">{loadingText}</p>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-xs text-zinc-500 pt-4">This usually takes about 4 seconds. Please do not close this window.</p>
        </div>
      </main>
    );
  }

  // --- 2. THE PAYWALL SCREEN (FIXED & COMPLETE) ---
  if (showPaywall) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-950">
        <div className="max-w-lg w-full text-center space-y-8 bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 md:p-10 backdrop-blur-md shadow-2xl">
          
          {/* Lock Icon */}
          <div className="w-16 h-16 mx-auto bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Your Profile is Ready.</h2>
            <p className="text-zinc-400 text-lg">We've identified your core commitment blocker and generated your personalized psychological report.</p>
          </div>

          <div className="text-left bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6 space-y-3">
            <p className="text-sm font-bold text-zinc-300 uppercase tracking-wider mb-2">What's inside your report:</p>
            <div className="flex items-start space-x-3"><span className="text-green-400 mt-1">✓</span><p className="text-zinc-300 text-sm">Your exact Commitment Archetype & Core Wound</p></div>
            <div className="flex items-start space-x-3"><span className="text-green-400 mt-1">✓</span><p className="text-zinc-300 text-sm">The 30-Day "Rewire" Action Plan to fix it</p></div>
            <div className="flex items-start space-x-3"><span className="text-green-400 mt-1">✓</span><p className="text-zinc-300 text-sm">How to spot and attract secure partners</p></div>
          </div>
          
          {/* Price & REAL PayPal Button */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-zinc-500 line-through text-xl">$4.99</span>
              <span className="text-3xl font-bold text-white">$0.90</span>
              <span className="bg-purple-900/30 text-purple-300 text-xs font-bold px-2 py-1 rounded uppercase">One-time</span>
            </div>
            
            <a 
              href="https://www.paypal.com/ncp/payment/78SAVHWBR3FRG" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg rounded-full shadow-lg shadow-purple-900/30 transition-all duration-300 transform hover:scale-105 text-center cursor-pointer"
            >
              Unlock My Full Report →
            </a>
            <p className="text-[10px] text-zinc-500">Secure checkout via PayPal. Instant digital delivery.</p>
          </div>
        </div>
      </main>
    );
  }

  // --- 3. FINAL RESULT SCREEN ---
  if (showResult) {
    const result = getFinalResult();
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-950">
        <div className="max-w-2xl w-full text-center space-y-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
          <div className="inline-block px-4 py-1.5 bg-purple-900/30 border border-purple-700/50 rounded-full text-xs font-bold text-purple-300 uppercase tracking-wider">
            Premium Report Unlocked
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            You are <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{result.title}</span>
          </h1>
          
          <p className="text-lg text-zinc-300 leading-relaxed">
            {result.description}
          </p>

          <div className="pt-6 space-y-4">
            <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg rounded-full shadow-lg shadow-purple-900/30 transition-all duration-300 transform hover:scale-105 cursor-pointer">
              {result.cta} →
            </button>
            <p className="text-xs text-zinc-500">
              This is a premium digital guide designed to rewire your attachment patterns.
            </p>
          </div>

          <Link href="/" className="block text-sm text-zinc-500 hover:text-zinc-300 transition-colors mt-8">
            ← Take the quiz again
          </Link>
        </div>
      </main>
    );
  }

  // --- 4. QUIZ QUESTIONS SCREEN ---
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-950">
      <div className="max-w-2xl w-full space-y-8">
        <div className="w-full bg-zinc-800 rounded-full h-2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 md:p-10 backdrop-blur-sm space-y-8">
          <div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Question {currentQuestion + 1} of {questions.length}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-3 leading-snug">{questions[currentQuestion].question}</h2>
          </div>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option.archetype)} className="w-full text-left p-4 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 hover:border-purple-500/50 text-zinc-200 transition-all duration-200 group">
                <span className="inline-block w-6 h-6 rounded-full border border-zinc-500 group-hover:border-purple-400 group-hover:bg-purple-400/20 mr-3 text-center text-sm leading-5 transition-colors">{String.fromCharCode(65 + index)}</span>
                {option.text}
              </button>
            ))}
          </div>
        </div>
        <Link href="/" className="block text-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors">← Back to home</Link>
      </div>
    </main>
  );
}