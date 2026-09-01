"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// YOUR EXACT GOOGLE DRIVE LINKS
const pdfLinks: Record<string, string> = {
  "Avoidant Runner": "https://drive.google.com/file/d/1ckl1QdhOLxY0kvC4UTMm67wSkq1EFO8E/view?usp=drive_link",
  "Anxious Over-Analyzer": "https://drive.google.com/file/d/1QkFNkMg-WOFLF37sgCJTd99KszmEkvKS/view?usp=drive_link",
  "Fantasy Addict": "https://drive.google.com/file/d/1mQKLDPtcLAeb5PYyKqpWnYo0LhooFGpE/view?usp=drive_link",
  "The Project Manager": "https://drive.google.com/file/d/1fUFhuHvmmmlJeSY2uF7L8j8KrZr9tr6u/view?usp=drive_link"
};

export default function DownloadPage() {
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check URL parameters (This is for your Test Button)
    const params = new URLSearchParams(window.location.search);
    const urlResult = params.get('test');

    // 2. Check browser memory (This is for real customers coming from Selar)
    const localResult = localStorage.getItem('userQuizResult');

    // If the URL has a test result, use it. Otherwise, use the browser memory.
    if (urlResult && pdfLinks[urlResult]) {
      setResult(urlResult);
    } else if (localResult && pdfLinks[localResult]) {
      setResult(localResult);
    } else {
      setResult(null);
    }
  }, []);

  if (!result) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-950 text-white text-center">
        <h1 className="text-2xl font-bold mb-4">No Report Found</h1>
        <p className="text-zinc-400 mb-8">It looks like you haven't taken the quiz yet, or your browser memory was cleared.</p>
        <Link href="/" className="px-6 py-3 bg-purple-600 rounded-full font-bold hover:bg-purple-500 transition">Take the Quiz First</Link>
      </main>
    );
  }

  const downloadLink = pdfLinks[result] || "#";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-950 text-white text-center">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
        <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold">Payment Successful!</h1>
        <p className="text-zinc-400">Thank you for your purchase. Your personalized report for <span className="text-purple-400 font-bold">{result}</span> is ready.</p>
        
        <a 
          href={downloadLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-full shadow-lg transition-all"
        >
          Download My PDF Report →
        </a>
        
        <p className="text-xs text-zinc-500 pt-4">If the download doesn't start, check your pop-up blocker.</p>
      </div>
    </main>
  );
}