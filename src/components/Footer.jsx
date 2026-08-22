import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const navigate = useNavigate();
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#111111] text-zinc-400 py-16 px-6 md:px-16 border-t border-emerald-500/30 shadow-[0_-10px_30px_rgba(16,185,129,0.08)] font-mono relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="md:col-span-1 flex flex-col justify-start">
          <span className="text-xs tracking-widest text-emerald-400 mb-3">
            NEWSLETTER
          </span>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="EMAIL"
              className="bg-black/50 border border-zinc-700 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(52,211,153,0.3)] w-full placeholder:text-zinc-600 transition-all"
            />

            <button className="bg-emerald-500 text-black font-bold text-xs px-6 py-3 rounded-full hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.6)] transition-all cursor-pointer w-full sm:w-auto">
              SUBMIT
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-3 text-xs tracking-wider">
          <span className="text-zinc-500 font-bold mb-1">NAVIGATION</span>

          <button
            onClick={() => navigate("/")}
            className="text-left hover:text-emerald-400 transition-all cursor-pointer"
          >
            HOME
          </button>

          <button
            onClick={() => navigate("/about")}
            className="text-left hover:text-emerald-400 transition-all cursor-pointer"
          >
            ABOUT
          </button>

          <button
            onClick={() => navigate("/skill")}
            className="text-left hover:text-emerald-400 transition-all cursor-pointer"
          >
            SKILLS
          </button>

          <button
            onClick={() => navigate("/project")}
            className="text-left hover:text-emerald-400 transition-all cursor-pointer"
          >
            PROJECTS
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="text-left hover:text-emerald-400 transition-all cursor-pointer"
          >
            CONTACT
          </button>
        </div>

        <div className="flex flex-col space-y-3 text-xs tracking-wider">
          <span className="text-zinc-500 font-bold mb-1">PAGES</span>

          <button
            onClick={() => navigate("/")}
            className="text-left hover:text-emerald-400 transition-all cursor-pointer"
          >
            PORTFOLIO
          </button>

          <button
            onClick={() => navigate("/project")}
            className="text-left hover:text-emerald-400 transition-all cursor-pointer"
          >
            PROJECTS
          </button>

          <button
            onClick={() => navigate("/resume")}
            className="text-left hover:text-emerald-400 transition-all cursor-pointer"
          >
            RESUME
          </button>

          <button
            onClick={() => navigate("/about")}
            className="text-left hover:text-emerald-400 transition-all cursor-pointer"
          >
            ABOUT
          </button>
        </div>

        <div className="flex flex-col space-y-3 text-xs tracking-wider">
          <span className="text-zinc-500 font-bold mb-1">SOCIALS</span>

          <a
            href="https://github.com/rafiqulislamraj58-design"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition-all"
          >
            GITHUB
          </a>

          <a
            href="https://www.linkedin.com/in/rafiqul-islam-raj-9212403b0"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition-all"
          >
            LINKEDIN
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition-all"
          >
            X / TWITTER
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition-all"
          >
            INSTAGRAM
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 relative z-10">
        <p>© 2026 Rafiqul Islam Raj. All rights reserved.</p>

        <div className="flex gap-6 mt-4 sm:mt-0">
          <span className="hover:text-emerald-400 transition-colors cursor-pointer">
            PRIVACY POLICY
          </span>

          <span className="hover:text-emerald-400 transition-colors cursor-pointer">
            TERMS OF USE
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
