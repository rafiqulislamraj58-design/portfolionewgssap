import React, { useState } from 'react';

const About = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono py-16 px-6 md:px-16 lg:px-24 select-none overflow-hidden relative">
      
      {/* Background Grid & Ambient Glow Effect (Like the video reference) */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Header */}
        <div className="flex justify-between items-center text-xs tracking-[0.25em] uppercase border-b border-zinc-800 pb-4 mb-16 text-zinc-500">
          <span>BIOGRAPHY — SUBJECT DOSSIER</span>
          <span className="text-emerald-400">STATUS: ACTIVE / GAZIPUR</span>
        </div>

        {/* Main Hero / Interactive Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[60vh]">
          
          {/* Left Info Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <span className="text-xs font-mono tracking-widest text-emerald-500 uppercase">
              // SOFTWARE ENGINEERING & DIGITAL ART
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[1.05]">
              Developer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">
                Raj.
              </span>
            </h1>

            <p className="text-zinc-400 font-sans font-light text-base md:text-lg leading-relaxed max-w-2xl">
              Operating from Gazipur, Bangladesh. I bridge the gap between creative visual arts and high-performance software engineering. Whether it is engineering responsive web architectures using modern JavaScript frameworks or crafting fine digital graphics, every pixel and line of code serves a deliberate purpose.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 text-xs font-mono">
              <div className="border border-zinc-800 bg-zinc-900/60 px-4 py-3 rounded-lg">
                <span className="text-zinc-500 block mb-1">PRIMARY FOCUS</span>
                <span className="text-white font-bold">MERN & Next.js Ecosystem</span>
              </div>
              <div className="border border-zinc-800 bg-zinc-900/60 px-4 py-3 rounded-lg">
                <span className="text-zinc-500 block mb-1">CREATIVE SKILL</span>
                <span className="text-emerald-400 font-bold">Graphic & T-Shirt Design</span>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Wireframe / Holographic Visual Box */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full h-80 sm:h-96 border border-zinc-800 bg-zinc-900/40 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-500 group cursor-pointer shadow-2xl overflow-hidden"
            >
              {/* Abstract Animated Grid Lines / Wireframe effect representation */}
              <div className={`absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-30'}`}></div>
              
              <div className="flex justify-between items-center text-xs text-zinc-500 relative z-10 border-b border-zinc-800 pb-3">
                <span>NODE_ID: #RAJ_23</span>
                <span className="text-emerald-400 animate-pulse">● LIVE STREAM</span>
              </div>

              {/* Center Wireframe Node Graphic / Typography */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
                <div className={`w-20 h-20 rounded-full border border-emerald-500/40 flex items-center justify-center mb-4 transition-transform duration-500 ${isHovered ? 'scale-110 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'scale-100'}`}>
                  <span className="text-emerald-400 text-xl font-bold">RAJ</span>
                </div>
                <h3 className="text-white text-lg font-bold uppercase tracking-wider">
                  {isHovered ? "INTERACTIVE MODE ACTIVE" : "HOVER TO ENGAGE"}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-[240px]">
                  {isHovered ? "Combining software structure with aesthetic design principles." : "A glance into the mind of an abstract thinker and builder."}
                </p>
              </div>

              <div className="relative z-10 pt-3 border-t border-zinc-800 text-[10px] text-zinc-500 flex justify-between uppercase">
                <span>SYS_LOC: BD</span>
                <span>VER: 2.0.26</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Core Principles Grid */}
        <div className="mt-24 pt-12 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-zinc-800/80 bg-zinc-900/30 p-6 rounded-xl">
            <span className="text-emerald-400 text-xs font-mono block mb-2">01 // PHILOSOPHY</span>
            <h4 className="text-white text-base font-bold uppercase mb-2">Conceptual Clarity</h4>
            <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed">
              Prioritizing core principles, scalable architecture, and clean design patterns over temporary trends or rigid boundaries.
            </p>
          </div>

          <div className="border border-zinc-800/80 bg-zinc-900/30 p-6 rounded-xl">
            <span className="text-emerald-400 text-xs font-mono block mb-2">02 // DUAL DISCIPLINE</span>
            <h4 className="text-white text-base font-bold uppercase mb-2">Code Meets Canvas</h4>
            <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed">
              Balancing backend logic and modern web frameworks with advanced digital merchandise layout and artistic illustration workflows.
            </p>
          </div>

          <div className="border border-zinc-800/80 bg-zinc-900/30 p-6 rounded-xl">
            <span className="text-emerald-400 text-xs font-mono block mb-2">03 // MOMENTUM</span>
            <h4 className="text-white text-base font-bold uppercase mb-2">Continuous Shipping</h4>
            <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed">
              Committed to project-based execution, rapid problem solving, and building complete web applications from concept to production.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;