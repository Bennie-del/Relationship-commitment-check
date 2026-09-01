"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// YOUR GOOGLE DRIVE LINKS
const pdfLinks: Record<string, string> = {
  "Avoidant Runner": "https://drive.google.com/file/d/1ckl1QdhOLxY0kvC4UTMm67wSkq1EFO8E/view?usp=sharing",
  "Anxious Over-Analyzer": "https://drive.google.com/file/d/1QkFNkMg-WOFLF37sgCJTd99KszmEkvKS/view?usp=sharing",
  "Fantasy Addict": "https://drive.google.com/file/d/1mQKLDPtcLAeb5PYyKqpWnYo0LhooFGpE/view?usp=sharing",
  "The Project Manager": "https://drive.google.com/file/d/1fUFhuHvmmmlJeSY2uF7L8j8KrZr9tr6u/view?usp=sharing"
};

export default function DownloadPage() {
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    // Get the result from browser memory
    const savedResult = localStorage.getItem('userQuizResult');
    console.log('Found result:', savedResult);
    setResult(savedResult);
  }, []);

  // If no result found, show this
  if (!result) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-950 text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">No Report Found</h1>
        <p className="text-zinc-400 mb-8 text-center max-w-md">
          It looks like you haven't taken the quiz yet, or your browser memory was cleared.
        </p>
        <Link 
          href="/" 
          className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-full font-bold transition"
        >
          Take the Quiz First
        </Link>
      </main>
    );
  }

  // Result found - show download button
  const downloadLink = pdfLinks[result] || "#";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-950 text-white">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-zinc-400">
            Your personalized report for <span className="text-purple-400 font-bold">{result}</span> is ready.
          </p>
        </div>
        
        <a 
          href={downloadLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-full transition"
        >
          Download My PDF Report →
        </a>
        
        <p className="text-xs text-zinc-500">
          If the download doesn't start, check your pop-up blocker.
        </p>
      </div>
    </main>
  );
}