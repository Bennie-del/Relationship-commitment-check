"use client";

import { useState } from 'react';
import Link from 'next/link';

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
    "Avoidant Runner": 0, 
    "Anxious Over-Analyzer": 0, 
    "Fantasy Addict": 0, 
    "The Project Manager": 0
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loadingText, setLoadingText] = useState("Analyzing attachment patterns...");
  const [progress, setProgress] = useState(0);
  
  // NEW: This holds the actual result so the test button can use it
  const [finalArchetype, setFinalArchetype] = useState("");

  const handleAnswer = (archetype: string) => {
    const newScores = { ...scores, [archetype]: scores[archetype] + 1 };
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate the result
      let maxScore = 0;
      let resultArchetype = "Avoidant Runner";
      for (const [arch, score] of Object.entries(newScores)) {
        if (score > maxScore) { 
          maxScore = score; 
          resultArchetype = arch; 
        }
      }
      
      // Save to browser memory AND save it for the test button
      localStorage.setItem('userQuizResult', resultArchetype);
      setFinalArchetype(resultArchetype);
      
      // Start the analyzing animation
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
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full border-4 border-zinc-800 border-t-purple-500 animate-spin" />
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Processing Your Data</h2>
            <p className="text-purple-400 text-sm">{loadingText}</p>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5">
            <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </main>
    );
  }

  // --- 2. PAYWALL SCREEN ---
  if (showPaywall) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-950">
        <div className="max-w-md w-full text-center space-y-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-zinc-800 flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Your Profile is Ready.</h2>
            <p className="text-zinc-400 text-sm">We've identified your core commitment blocker.</p>
          </div>

          <div className="text-left bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <p className="text-xs font-bold text-zinc-300 uppercase">What's inside:</p>
            <div className="flex items-start space-x-2"><span className="text-green-400">✓</span><p className="text-zinc-300 text-xs">Your exact Commitment Archetype</p></div>
            <div className="flex items-start space-x-2"><span className="text-green-400">✓</span><p className="text-zinc-300 text-xs">30-Day Rewire Action Plan</p></div>
            <div className="flex items-start space-x-2"><span className="text-green-400">✓</span><p className="text-zinc-300 text-xs">How to attract secure partners</p></div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-zinc-500 line-through">$4.99</span>
              <span className="text-2xl font-bold text-white">$0.90</span>
            </div>
            
            {/* MAIN PAYMENT BUTTON */}
            <a 
              href="https://selar.co/71885987x8" 
              className="block w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full text-center hover:opacity-90 transition-opacity"
            >
              Unlock My Full Report →
            </a>
            
            <p className="text-[10px] text-zinc-500">Secure checkout: M-Pesa, Card, or Bank Transfer.</p>

            {/* FIXED TEST BUTTON: Now uses your actual quiz result! */}
            <Link 
              href={`/download?test=${encodeURIComponent(finalArchetype)}`} 
              className="block text-[10px] text-zinc-600 mt-3 underline"
            >
              [Dev Test] Skip payment & test download ({finalArchetype})
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // --- 3. RESULT SCREEN (Fallback) ---
  if (showResult) {
    const result = getFinalResult();
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-950">
        <div className="max-w-md w-full text-center space-y-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="px-3 py-1 bg-purple-900/30 border border-purple-700/50 rounded-full text-xs font-bold text-purple-300 uppercase">
            Report Unlocked
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            You are <span className="text-purple-400">{result.title}</span>
          </h1>
          
          <p className="text-sm text-zinc-300 leading-relaxed">{result.description}</p>

          <div className="space-y-3 pt-4">
            <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full">
              {result.cta} →
            </button>
          </div>

          <Link href="/" className="block text-xs text-zinc-500">← Take the quiz again</Link>
        </div>
      </main>
    );
  }

  // --- 4. QUIZ QUESTIONS ---
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-950">
      <div className="max-w-md w-full space-y-6">
        <div className="w-full bg-zinc-800 rounded-full h-1.5">
          <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-5">
          <div>
            <span className="text-xs text-zinc-500 uppercase">Question {currentQuestion + 1} of {questions.length}</span>
            <h2 className="text-lg font-bold text-white mt-2">{questions[currentQuestion].question}</h2>
          </div>
          
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleAnswer(option.archetype)} 
                className="w-full text-left p-3 rounded-xl border border-zinc-700 bg-zinc-800/50 text-zinc-200 text-sm hover:bg-zinc-700 transition-colors"
              >
                <span className="inline-block w-5 h-5 rounded-full border border-zinc-500 mr-2 text-center text-xs leading-4">{String.fromCharCode(65 + index)}</span>
                {option.text}
              </button>
            ))}
          </div>
        </div>
        
        <Link href="/" className="block text-center text-xs text-zinc-500">← Back to home</Link>
      </div>
    </main>
  );
}