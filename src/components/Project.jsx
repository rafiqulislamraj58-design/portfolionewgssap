import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.fromTo(
        cardsRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 85%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "SkyMart",

      description:
        "An online e-commerce management system built with modern web technologies.",

      type: "Frontend",

      tech: ["React", "Tailwind", "MongoDB"],

      github: "https://github.com/rafiqulislamraj58-design/skymart",

      live: "https://skymart-brown.vercel.app/",
    },

    {
      title: "Pet Adoption",

      description:
        "A modern pet adoption application with browsing, authentication and adoption features.",

      type: "Full-Stack",

      tech: [
        "React",
        "Next.js",
        "Tailwind",
        "React Router",
        "Node.js",
        "MongoDB",
      ],

      github: "https://github.com/rafiqulislamraj58-design/petaddopion",

      live: "https://petaddopion.vercel.app/",
    },

   

    {
      title: "Zen Z Nostalgia",

      description:
        "A premium space to capture, share and relive your core memories, with modern aesthetics and vintage vibes.",

      type: "Full-Stack",

      tech: ["React", "Tailwind", "Node.js", "Express.js", "MongoDB"],

      // Add your repo link here, e.g. "https://github.com/rafiqulislamraj58-design/<repo>"
      github: "",

      live: "https://gen-z-frontend-five.vercel.app/",
    },

    {
      title: "IT Academy",

      description:
        "A learning platform built around the idea of learn, build and grow, with a full frontend and backend.",

      type: "Full-Stack",

      tech: ["React", "Tailwind", "Node.js", "Express.js", "MongoDB"],

      // Add your repo link here, e.g. "https://github.com/rafiqulislamraj58-design/<repo>"
      github: "",

      live: "https://webfrontend-opal.vercel.app/",
    },
  ];

  const fullStackCount = projects.filter((p) => p.type === "Full-Stack").length;

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden bg-[#030712] px-6 py-24 text-white md:px-12 lg:px-20"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-600/[0.10] blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-green-500/[0.06] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />
      </div>

      <div className="project-title mx-auto mb-16 max-w-3xl text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-2 font-mono text-xs tracking-[0.3em] text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          MY WORK
        </p>

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Featured{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300 bg-clip-text text-transparent">
            Projects
          </span>
        </h1>

        <p className="mt-5 text-sm leading-7 text-zinc-400 md:text-base">
          A collection of projects I have built while learning and exploring
          modern web development.
        </p>

        <div className="mt-8 flex items-center justify-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          <div>
            <span className="block text-2xl font-bold tracking-normal text-white">
              {projects.length}
            </span>
            Projects
          </div>

          <span className="h-8 w-px bg-zinc-800" />

          <div>
            <span className="block text-2xl font-bold tracking-normal text-emerald-400">
              {fullStackCount}
            </span>
            Full-Stack
          </div>
        </div>
      </div>

      <div
        className="
          projects-grid
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
          items-stretch
        "
      >
        {projects.map((project, index) => (
          <div
            key={project.title}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="
              group
              relative
              flex
              flex-col
              h-full
              min-h-[430px]
              overflow-hidden
              bg-zinc-900/50
              border
              border-zinc-800
              rounded-2xl
              p-6
              backdrop-blur-sm
              hover:border-emerald-500/50
              hover:shadow-2xl
              hover:shadow-emerald-500/10
              transition-all
              duration-300
              hover:-translate-y-2
            "
          >
            {/* Hover glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/0 blur-3xl transition-all duration-500 group-hover:bg-emerald-500/15" />

            {/* Top accent line */}
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/0 to-transparent transition-all duration-500 group-hover:via-emerald-400/70" />

            <div className="relative mb-8 flex items-center justify-between">
              <span className="font-mono text-sm text-emerald-400">
                0{index + 1}
              </span>

              <span
                className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${
                  project.type === "Full-Stack"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border-zinc-700 bg-zinc-800/50 text-zinc-400"
                }`}
              >
                {project.type}
              </span>
            </div>

            <h2 className="relative mb-4 text-2xl font-bold transition-colors group-hover:text-emerald-400">
              {project.title}
            </h2>

            <p className="relative mb-6 text-sm leading-6 text-zinc-400">
              {project.description}
            </p>

            <div className="relative mb-8 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="
                    px-3
                    py-1
                    text-xs
                    font-mono
                    text-emerald-300
                    bg-emerald-500/10
                    border
                    border-emerald-500/20
                    rounded-full
                  "
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="relative mt-auto flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex-1
                    text-center
                    py-2.5
                    rounded-lg
                    border
                    border-zinc-700
                    text-sm
                    font-medium
                    hover:border-emerald-500
                    hover:text-emerald-400
                    transition-all
                  "
                >
                  GitHub
                </a>
              )}

              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="
                  group/btn
                  flex-1
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  py-2.5
                  rounded-lg
                  bg-emerald-500
                  text-zinc-950
                  text-sm
                  font-bold
                  hover:bg-emerald-400
                  hover:shadow-lg
                  hover:shadow-emerald-500/30
                  transition-all
                "
              >
                Live Demo
                <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;