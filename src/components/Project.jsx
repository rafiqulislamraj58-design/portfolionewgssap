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

      tech: ["React", "Tailwind", "MongoDB"],

      github: "https://github.com/rafiqulislamraj58-design/skymart",

      live: "https://skymart-brown.vercel.app/",
    },

    {
      title: "Pet Adoption",

      description:
        "A modern pet adoption application with browsing, authentication and adoption features.",

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
      title: "FinTrack Pro",

      description:
        "A clean finance management interface for tracking income and expenses.",

      tech: [
        "React",
        "Next.js",
        "JavaScript",
        "Tailwind",
        "Node.js",
        "MongoDB",
      ],

      github: "https://github.com/rafiqulislamraj58-design/A08",

      live: "https://a08-roan.vercel.app/",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#030712] text-white px-6 md:px-12 lg:px-20 py-24"
    >
      <div className="project-title max-w-3xl mx-auto text-center mb-16">
        <p className="text-emerald-400 font-mono text-sm tracking-[0.3em] mb-4">
          MY WORK
        </p>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Featured <span className="text-emerald-400">Projects</span>
        </h1>

        <p className="text-zinc-400 mt-5 text-sm md:text-base leading-7">
          A collection of projects I have built while learning and exploring
          modern web development.
        </p>
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
              flex
              flex-col
              h-full
              min-h-[430px]
              bg-zinc-900/50
              border
              border-zinc-800
              rounded-2xl
              p-6
              hover:border-emerald-500/50
              transition-all
              duration-300
              hover:-translate-y-2
            "
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-emerald-400 font-mono text-sm">
                0{index + 1}
              </span>

              <span className="text-zinc-600 font-mono text-xs">PROJECT</span>
            </div>

            <h2 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
              {project.title}
            </h2>

            <p className="text-zinc-400 text-sm leading-6 mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
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

            <div className="flex gap-3 mt-auto">
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

              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="
                  flex-1
                  text-center
                  py-2.5
                  rounded-lg
                  bg-emerald-500
                  text-zinc-950
                  text-sm
                  font-bold
                  hover:bg-emerald-400
                  transition-all
                "
              >
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;
