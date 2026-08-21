import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import myIllustration from "../assets/my-photo2.png";

gsap.registerPlugin(ScrollTrigger);

const EditorialSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const topHeaderRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightCardRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      topHeaderRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
    )
      .fromTo(
        leftContentRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.3",
      )
      .fromTo(
        rightCardRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6",
      )
      .fromTo(
        footerRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.4",
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-zinc-950 text-zinc-100 py-12 px-6 md:px-16 lg:px-24 font-serif border-y border-zinc-800 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={topHeaderRef}
          className="flex justify-between items-center text-[10px] md:text-xs tracking-[0.25em] uppercase border-b border-zinc-700 pb-2 mb-8 font-mono text-zinc-500"
        >
          <span>FRONT PAGE — EDITORIAL BIO</span>
          <span>FILED UNDER: SOFTWARE ENGINEERING</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div
            ref={leftContentRef}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <span className="text-xs font-mono tracking-widest text-emerald-500 uppercase block mb-3">
              CASE NO. 23 — FINDINGS PUBLISHED
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight mb-6 text-white">
              A software engineering student who likes building things —{" "}
              <span className="italic font-light text-emerald-400">
                front to back.
              </span>
            </h2>

            <div className="border-l-2 border-emerald-500 pl-4 my-6 text-zinc-300 italic text-base md:text-lg leading-relaxed">
              <p>
                Years in: Developer Raj builds web applications with MERN stack
                and Next.js, focusing on clean architecture, smooth UI
                interactions, and high-performance digital experiences.
              </p>
            </div>

            <div className="text-[11px] md:text-xs font-mono tracking-wider text-zinc-500 uppercase mt-4 mb-8">
              BY{" "}
              <span className="font-bold text-zinc-300">
                KHANDAKAR RAFIQUL RAJ
              </span>{" "}
              — REPORTING FROM GAZIPUR, BANGLADESH
            </div>

            <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs">
              <button
                onClick={() => navigate("/skill")}
                className="bg-zinc-100 text-black px-6 py-3 tracking-widest uppercase hover:bg-emerald-500 transition-all cursor-pointer"
              >
                READ THE SKILLS →
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="border border-zinc-600 text-zinc-300 px-6 py-3 tracking-widest uppercase hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
              >
                GET IN TOUCH
              </button>
            </div>
          </div>
          <div
            ref={rightCardRef}
            className="lg:col-span-5 flex flex-col border border-zinc-800 p-4 bg-zinc-900 shadow-xl"
          >
            <div className="w-full h-64 sm:h-80 overflow-hidden border border-zinc-700 mb-4 bg-black">
              <img
                src={myIllustration}
                alt="Developer Raj Workspace"
                className="w-full h-full object-cover filter grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-3 pb-2 border-b border-zinc-800">
              PICTURED:{" "}
              <span className="text-zinc-300">
                the subject, in his natural habitat.
              </span>
            </div>

            <p className="text-sm md:text-base leading-relaxed text-zinc-400 font-sans font-light">
              <span className="float-left text-4xl font-serif font-bold leading-none pr-2 pt-1 text-emerald-500">
                H
              </span>
              e enjoys the whole process — going from a rough idea to something
              that ships. His main stack is React, Next.js, and Tailwind on the
              front, with modern state management and backend tools underneath.
              When a build calls for it, he handles full-stack integrations to
              deliver complete, polished user solutions.
            </p>
          </div>
        </div>

        <div
          ref={footerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-6 border-t border-zinc-800 font-mono text-xs text-zinc-500"
        >
          <div>
            <h4 className="font-bold text-zinc-300 text-sm">No. 23</h4>
            <p>EDITION • FIRST PRINTING</p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-300 text-sm">28°C</h4>
            <p>GAZIPUR • SUNNY</p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-300 text-sm">Global</h4>
            <p>CIRCULATION • MERN DEV</p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-300 text-sm">Late Final</h4>
            <p>SHIPS WHEN IT'S READY</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
