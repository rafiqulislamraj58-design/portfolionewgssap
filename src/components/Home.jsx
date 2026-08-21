import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import myImage from '../assets/my-photo.jpg'; 
import EditorialSection from './EditorialSection';

const Home = () => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "rgba(18, 18, 22, 0.70)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    const scratch = (e) => {
      setIsRevealed(true);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(e.clientX, e.clientY, 160, 0, Math.PI * 2); 
      ctx.fill();
    };

    const handleMouseMove = (e) => scratch(e);
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      scratch({ clientX: touch.clientX, clientY: touch.clientY });
    };
    const handleMouseLeave = () => {
      setIsRevealed(false);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = "rgba(18, 18, 22, 0.018)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
    <div className="relative w-full h-[calc(100vh-61px)] overflow-hidden bg-black font-mono">
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={myImage} 
          alt="Developer Raj" 
          className="w-full h-full object-cover filter brightness-90 contrast-110"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/60 via-black/40 to-black/70 text-center px-4">
          
          <div className="mb-4">
            <span className="text-emerald-400 text-xs md:text-sm tracking-[0.3em] uppercase bg-emerald-950/60 border border-emerald-500/30 px-4 py-1.5 rounded-full">
              AVAILABLE FOR FREELANCE & FULL-TIME ROLES
            </span>
          </div>
          <h1 className={`text-4xl md:text-7xl font-extrabold text-white uppercase tracking-wider transition-all duration-500 ${
            isRevealed 
              ? 'drop-shadow-[0_0_35px_rgba(16,185,129,0.8)] scale-[1.02]' 
              : 'drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]'
          }`}>
            KHANDAKAR RAFIQUL <span className="text-emerald-400">RAJ</span>
          </h1>
          <p className="text-zinc-300 mt-4 text-lg md:text-xl tracking-[0.2em] uppercase font-light">
            Software Engineering Student & <span className="text-white font-semibold">MERN Developer</span>
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-xs text-zinc-400">
            <span className="border border-zinc-700 bg-black/40 px-3 py-1 rounded-md">REACT.JS</span>
            <span className="border border-zinc-700 bg-black/40 px-3 py-1 rounded-md">NEXT.JS</span>
            <span className="border border-zinc-700 bg-black/40 px-3 py-1 rounded-md">TAILWIND CSS</span>
            <span className="border border-zinc-700 bg-black/40 px-3 py-1 rounded-md">GSAP</span>
          </div>

        </div>
      </div>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 cursor-crosshair"
      />
    </div>
    <EditorialSection/>
    </>
  );
};

export default Home;