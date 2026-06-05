export function GlobalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[40] overflow-hidden mix-blend-multiply">
      
      {/* 1. Abstract Gradients - extremely subtle */}
      <div className="absolute -left-[10%] -top-[10%] h-[40vw] w-[40vw] rounded-full bg-orange-500/5 blur-[120px] anim-float-1" />
      <div className="absolute right-[5%] top-[40%] h-[30vw] w-[30vw] rounded-full bg-stone-300/10 blur-[100px] anim-float-2" />
      <div className="absolute -bottom-[20%] left-[20%] h-[50vw] w-[50vw] rounded-full bg-zinc-200/20 blur-[150px] anim-float-3" />
      
      {/* Abstract Active Art (Spinning Technical Ring) - extremely subtle */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[75rem] opacity-[0.015] animate-[spin_120s_linear_infinite]"
        viewBox="0 0 1000 1000"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="500" cy="500" r="450" strokeDasharray="4 12" />
        <circle cx="500" cy="500" r="400" strokeDasharray="30 40" strokeWidth="2" />
        <circle cx="500" cy="500" r="380" opacity="0.5" />
        
        {/* Inner geometric nodes */}
        {[...Array(6)].map((_, i) => (
          <g key={i} transform={`rotate(${i * 60} 500 500)`}>
            <line x1="500" y1="50" x2="500" y2="100" strokeWidth="1.5" />
            <circle cx="500" cy="100" r="4" fill="currentColor" />
          </g>
        ))}
      </svg>
      
      {/* 2. Topographic / Lineart Overlay - extremely subtle */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.02]"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M-100,200 Q150,250 300,100 T700,300 T1100,150" />
        <path d="M-100,220 Q150,270 300,120 T700,320 T1100,170" />
        <path d="M-100,240 Q150,290 300,140 T700,340 T1100,190" />
        
        <path d="M400,600 Q600,700 800,550 T1200,650" />
        <path d="M380,620 Q580,720 780,570 T1180,670" />
        <path d="M360,640 Q560,740 760,590 T1160,690" />
        
        {/* Subtle Grid */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.6" />
      </svg>
      
      {/* 3. Regional Details (Hiroshima) - extremely subtle */}
      
      {/* Bottom Right Coordinates */}
      <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1 opacity-[0.05]">
        <span className="font-display text-4xl font-bold tracking-tight text-fg">広島市</span>
        <div className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-fg">
          34° 23' 6" N // 132° 27' 19" E
        </div>
        <div className="mt-2 h-[1px] w-12 bg-fg/70" />
      </div>

      {/* Top Left Vertical Marker */}
      <div className="absolute left-8 top-32 flex flex-col items-center gap-4 opacity-[0.05]">
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent to-fg" />
        <div className="writing-vertical-rl font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-fg">
          Seto Inland Sea
        </div>
      </div>
      
      {/* Right Edge Technical Scale */}
      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2 opacity-[0.03]">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="font-mono text-[8px] font-bold">{String(i * 10).padStart(2, '0')}</span>
            <div className={`h-[1px] ${i % 5 === 0 ? 'w-4' : 'w-2'} bg-fg`} />
          </div>
        ))}
      </div>

    </div>
  );
}
