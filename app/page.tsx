export default function Home() {
  return (
    // h-screen and overflow-hidden guarantee NO scrolling
    <main className="relative h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center p-4 text-white">
      
      {/* --- ATTRACTIVE BACKGROUND GLOWS --- */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[128px] pointer-events-none" />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center space-y-6">
        
        {/* Top Badge */}
        <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-purple-300 uppercase tracking-wider backdrop-blur-md">
          The 60-Second Reality Check
        </div>

        {/* Headline */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-center">
          There’s a Hidden Reason You Aren’t in a Committed Relationship.
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mt-2 text-xl md:text-2xl font-semibold">
            (And It’s Not What You Think.)
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto text-center">
          You’ve tried the apps. You’ve done the work. But what if your own subconscious is quietly sabotaging every connection before it gets real?
        </p>

        {/* Archetypes (Horizontal Grid to save vertical space & look premium) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          
          {/* Archetype 1 */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm text-center hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold mb-2">1</div>
            <p className="text-xs md:text-sm text-slate-300">Are you an <span className="font-bold text-white">Avoidant Runner</span>?</p>
          </div>
          
          {/* Archetype 2 */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm text-center hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 mx-auto rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold mb-2">2</div>
            <p className="text-xs md:text-sm text-slate-300">Or a <span className="font-bold text-white">Fantasy Addict</span>?</p>
          </div>
          
          {/* Archetype 3 (Blurred & Locked) */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm text-center relative overflow-hidden">
            {/* Lock Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="w-8 h-8 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold mb-2">3</div>
            <p className="text-xs md:text-sm text-slate-300 blur-[2px] select-none">The Hidden Archetype...</p>
          </div>

        </div>

        {/* CTA Button */}
        <div className="space-y-3 pt-2">
          <a
            href="/quiz"
            className="inline-block px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base rounded-full shadow-lg shadow-purple-900/40 transition-all duration-300 transform hover:scale-105 cursor-pointer pointer-events-auto relative z-20"
          >
            Reveal My Commitment Blocker →
          </a>
          <p className="text-[10px] text-slate-500">Takes 60 seconds. 100% Anonymous. Brutally Honest.</p>
        </div>

      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-[10px] text-slate-600">
        &copy; 2026 The Commitment Reality Check.
      </footer>
    </main>
  );
}