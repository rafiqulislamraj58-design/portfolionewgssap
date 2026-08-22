import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Resume = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".resume-content", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[70vh] bg-[#030712] text-white px-6 md:px-12 lg:px-20 py-24 flex items-center justify-center"
    >
      <div className="resume-content max-w-3xl w-full text-center">
        <p className="text-emerald-400 font-mono text-sm tracking-[0.3em] mb-4">
          MY RESUME
        </p>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Download My <span className="text-emerald-400">Resume</span>
        </h1>

        <p className="text-zinc-400 mt-6 max-w-2xl mx-auto leading-7 text-sm md:text-base">
          Want to know more about my skills, experience and educational
          background? Check out my resume.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
         

          <a
            href="/protfolio/src/assets/cv_rafiqul_islam_raj.pdf"
            download="Rafiqul_Islam_Raj_Resume.pdf"
            className="
              w-full
              sm:w-auto
              px-7
              py-3
              rounded-full
              bg-emerald-500
              text-zinc-950
              font-mono
              font-bold
              text-sm
              hover:bg-emerald-400
              hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]
              transition-all
              duration-300
            "
          >
            DOWNLOAD RESUME ↓
          </a>
        </div>

        <p className="text-zinc-600 font-mono text-xs mt-8">
          PDF • Updated 2026
        </p>
      </div>
    </section>
  );
};

export default Resume;
