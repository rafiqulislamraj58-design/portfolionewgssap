import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(headerRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
      .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .fromTo(formRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .fromTo(infoRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;

    const mailtoLink = `mailto:rafiqulislamraj58@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-zinc-950 text-zinc-100 font-mono py-20 px-6 md:px-16 lg:px-24 select-none relative overflow-hidden">
    
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
      
        <div ref={headerRef} className="flex justify-between items-center text-xs tracking-[0.25em] uppercase border-b border-zinc-800 pb-4 mb-16 text-zinc-500">
          <span>COMMUNICATION CHANNEL — DISPATCH</span>
          <span className="text-emerald-400 animate-pulse">● OPEN FOR FREELANCE & COLLAB</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
  
          <div ref={formRef} className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800/80 p-8 md:p-10 rounded-2xl backdrop-blur-xl shadow-2xl relative group">
            <div className="absolute inset-0 border border-emerald-500/20 rounded-2xl pointer-events-none group-hover:border-emerald-500/40 transition-colors duration-500"></div>

            <div ref={titleRef}>
              <h2 className="text-2xl md:text-4xl font-extrabold uppercase text-white tracking-tight mb-3">
                LET'S BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">TOGETHER.</span>
              </h2>
              <p className="text-zinc-400 font-sans font-light text-sm mb-8">
                Transmit your project specifications or design inquiries directly to Developer Raj's terminal.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-500 uppercase tracking-widest mb-2">YOUR NAME</label>
                  <input 
                    type="text" 
                    name="name"
                    required 
                    placeholder="e.g. Alex Smith" 
                    className="w-full bg-black/60 border border-zinc-800 focus:border-emerald-500 text-zinc-100 p-4 rounded-xl outline-none transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-zinc-500 uppercase tracking-widest mb-2">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    name="email"
                    required 
                    placeholder="e.g. name@domain.com" 
                    className="w-full bg-black/60 border border-zinc-800 focus:border-emerald-500 text-zinc-100 p-4 rounded-xl outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-500 uppercase tracking-widest mb-2">PROJECT SUBJECT</label>
                <input 
                  type="text" 
                  name="subject"
                  required 
                  placeholder="e.g. MERN Stack App / T-Shirt Design System" 
                  className="w-full bg-black/60 border border-zinc-800 focus:border-emerald-500 text-zinc-100 p-4 rounded-xl outline-none transition-all shadow-inner"
                />
              </div>

              <div>
                <label className="block text-zinc-500 uppercase tracking-widest mb-2">MESSAGE DETAILS</label>
                <textarea 
                  rows="4" 
                  name="message"
                  required 
                  placeholder="Describe your vision, core requirements, or scope..." 
                  className="w-full bg-black/60 border border-zinc-800 focus:border-emerald-500 text-zinc-100 p-4 rounded-xl outline-none transition-all resize-none shadow-inner"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-zinc-100 text-black font-extrabold uppercase tracking-widest py-4 rounded-xl hover:bg-emerald-400 hover:text-zinc-950 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
              >
                TRANSMIT TO RAJ'S INBOX →
              </button>
            </form>
          </div>
          <div ref={infoRef} className="lg:col-span-5 space-y-6">
            
            <div className="border border-zinc-800 bg-zinc-900/40 p-8 rounded-2xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

              <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase block mb-2">
                DIRECT COORDINATES
              </span>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-6">
                SECURE CHANNELS
              </h3>

              <div className="space-y-6 font-sans text-sm">
                <div className="border-b border-zinc-800/80 pb-4">
                  <span className="block text-zinc-500 font-mono text-xs uppercase mb-1">OFFICIAL EMAIL</span>
                  <a href="mailto:rafiqulislamraj58@gmail.com" className="text-zinc-200 hover:text-emerald-400 transition-colors font-mono text-xs sm:text-sm break-all">
                    rafiqulislamraj58@gmail.com
                  </a>
                </div>

                <div className="border-b border-zinc-800/80 pb-4">
                  <span className="block text-zinc-500 font-mono text-xs uppercase mb-1">BASE LOCATION</span>
                  <p className="text-zinc-200 font-mono">Gazipur, Bangladesh</p>
                </div>

                <div>
                  <span className="block text-zinc-500 font-mono text-xs uppercase mb-1">SOCIAL NETWORKS</span>
                  <div className="flex flex-wrap gap-3 mt-2 font-mono text-xs">
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="border border-zinc-800 bg-black/60 px-3 py-2 rounded-lg text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all">
                      GitHub
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="border border-zinc-800 bg-black/60 px-3 py-2 rounded-lg text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all">
                      LinkedIn
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="border border-zinc-800 bg-black/60 px-3 py-2 rounded-lg text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all">
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-zinc-800 bg-black/60 p-6 rounded-2xl flex justify-between items-center text-xs backdrop-blur-md">
              <div>
                <span className="text-zinc-500 block">SYSTEM STATUS</span>
                <span className="text-white font-bold">ONLINE & READY FOR CONTRACT</span>
              </div>
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;