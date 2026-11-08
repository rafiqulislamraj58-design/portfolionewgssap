
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ArrowUp,
  Mail,
  Code2,
  Terminal,
  Send,
  Heart,
  Sparkles,
} from "lucide-react";

import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-brands";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const navigate = useNavigate();
  const footerRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-top", {
        y: 70,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
        },
      });

      gsap.from(".footer-column", {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-grid",
          start: "top 90%",
          once: true,
        },
      });

      gsap.from(".footer-bottom", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".footer-bottom",
          start: "top 100%",
          once: true,
        },
      });

      gsap.to(".footer-glow", {
        x: 100,
        y: -35,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".footer-orbit", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navigation = [
    { label: "HOME", path: "/" },
    { label: "ABOUT", path: "/about" },
    { label: "SKILLS", path: "/skill" },
    { label: "PROJECTS", path: "/project" },
    { label: "CONTACT", path: "/contact" },
  ];

  const pages = [
    { label: "PORTFOLIO", path: "/" },
    { label: "PROJECTS", path: "/project" },
    { label: "RESUME", path: "/resume" },
    { label: "ABOUT ME", path: "/about" },
  ];

  const socials = [
    {
      label: "GitHub",
      icon: Github,
      url: "https://github.com/rafiqulislamraj58-design",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/rafiqul-islam-raj-9212403b0",
    },
    {
      label: "Twitter",
      icon: Twitter,
      url: "https://twitter.com",
    },
    {
      label: "Instagram",
      icon: Instagram,
      url: "https://instagram.com",
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#080b0b] text-zinc-400 font-mono border-t border-emerald-500/20"
    >
      <div className="footer-glow pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="footer-orbit pointer-events-none absolute top-20 right-[12%] hidden h-52 w-52 rounded-full border border-emerald-500/10 lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 md:px-12 lg:px-16">
        <div className="footer-top relative mb-20 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-[#101c19] via-[#0c1212] to-[#0b1114] p-8 md:p-12">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-[90px]" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-[10px] tracking-[0.25em] text-emerald-400">
                <Sparkles size={13} />
                LET'S CONNECT
              </div>

              <h2 className="max-w-xl text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
                Have a project in mind?
                <span className="mt-2 block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Let's build something great.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-500">
                I'm always interested in building meaningful digital products,
                exploring new technologies and collaborating on exciting ideas.
              </p>

              <button
                onClick={() => navigate("/contact")}
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-emerald-400 px-7 py-4 text-xs font-black tracking-widest text-black transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_10px_35px_rgba(52,211,153,0.25)]"
              >
                START A PROJECT
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:rotate-45"
                />
              </button>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="rounded-2xl border border-zinc-700/70 bg-[#080d0d]/90 p-5 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Terminal size={17} className="text-emerald-400" />
                    <span className="text-[10px] tracking-widest text-zinc-300">
                      DEVELOPER_INFO
                    </span>
                  </div>

                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <p className="text-zinc-600">
                    <span className="text-emerald-400">const</span> developer = {"{"}
                  </p>

                  <div className="space-y-3 pl-5">
                    <p>
                      <span className="text-cyan-400">name:</span>{" "}
                      <span className="text-emerald-300">
                        "Rafiqul Islam Raj"
                      </span>
                    </p>

                    <p>
                      <span className="text-cyan-400">role:</span>{" "}
                      <span className="text-emerald-300">
                        "Full-Stack Developer"
                      </span>
                    </p>

                    <p>
                      <span className="text-cyan-400">stack:</span>{" "}
                      <span className="text-emerald-300">
                        ["React", "Node", "MongoDB"]
                      </span>
                    </p>

                    <p>
                      <span className="text-cyan-400">status:</span>{" "}
                      <span className="text-green-400">
                        "Open to Opportunities"
                      </span>
                    </p>
                  </div>

                  <p className="text-zinc-600">{"};"}</p>
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-zinc-800 pt-5">
                  <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    SYSTEM ONLINE
                  </div>

                  <Code2 size={18} className="text-emerald-400" />
                </div>
              </div>

              <div className="absolute -right-3 -top-3 -z-10 h-full w-full rounded-2xl border border-emerald-400/20" />
            </div>
          </div>
        </div>

        <div className="footer-grid grid grid-cols-1 gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-5">
          <div className="footer-column lg:col-span-2">
            <button
              onClick={() => navigate("/")}
              className="group flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 transition-all duration-300 group-hover:rotate-6 group-hover:bg-emerald-400 group-hover:text-black">
                <Code2 size={25} />
              </div>

              <div className="text-left">
                <h3 className="text-lg font-black tracking-wide text-white">
                  RAFIQUL<span className="text-emerald-400">.</span>
                </h3>
                <p className="text-[9px] tracking-[0.3em] text-zinc-600">
                  FULL-STACK DEVELOPER
                </p>
              </div>
            </button>

            <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-500">
              Turning ideas into modern digital experiences through clean
              code, creative thinking and scalable web technologies.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {["REACT", "NODE.JS", "MONGODB", "EXPRESS"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-[9px] tracking-wider text-zinc-400 transition-all duration-300 hover:border-emerald-400/40 hover:text-emerald-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="footer-column flex flex-col gap-5">
            <h4 className="text-xs font-bold tracking-[0.2em] text-white">
              NAVIGATION
            </h4>

            {navigation.map((item, index) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="group flex w-fit items-center gap-2 text-left text-xs text-zinc-500 transition-all duration-300 hover:translate-x-2 hover:text-emerald-400"
              >
                <span className="text-[9px] text-zinc-700 group-hover:text-emerald-400">
                  0{index + 1}
                </span>
                {item.label}
                <ArrowUpRight
                  size={12}
                  className="opacity-0 transition-all group-hover:opacity-100"
                />
              </button>
            ))}
          </div>

          <div className="footer-column flex flex-col gap-5">
            <h4 className="text-xs font-bold tracking-[0.2em] text-white">
              EXPLORE
            </h4>

            {pages.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="group flex w-fit items-center gap-2 text-xs text-zinc-500 transition-all duration-300 hover:translate-x-2 hover:text-emerald-400"
              >
                {item.label}
                <ArrowUpRight
                  size={12}
                  className="opacity-0 transition-all group-hover:opacity-100"
                />
              </button>
            ))}
          </div>

          <div className="footer-column flex flex-col gap-5">
            <h4 className="text-xs font-bold tracking-[0.2em] text-white">
              FOLLOW ME
            </h4>

            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-3 text-xs text-zinc-500 transition-all duration-300 hover:translate-x-2 hover:text-emerald-400"
                >
                  <Icon
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-125"
                  />
                  {social.label.toUpperCase()}
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 transition-all group-hover:opacity-100"
                  />
                </a>
              );
            })}
          </div>
        </div>

        <div className="footer-bottom flex flex-col items-center justify-between gap-5 border-t border-zinc-800/80 py-7 text-center sm:flex-row sm:text-left">
          <p className="text-[10px] tracking-wide text-zinc-600">
            © 2026 RAFIQUL ISLAM RAJ. ALL RIGHTS RESERVED.
          </p>

          <p className="flex items-center gap-2 text-[10px] text-zinc-600">
            DESIGNED & DEVELOPED WITH
            <Heart size={12} className="fill-emerald-400 text-emerald-400" />
            BY RAFIQUL
          </p>

          <button
            ref={topRef}
            onClick={scrollToTop}
            className="group flex items-center gap-2 rounded-full border border-zinc-800 px-4 py-2.5 text-[10px] tracking-widest text-zinc-400 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-400 hover:text-black"
          >
            BACK TO TOP
            <ArrowUp
              size={14}
              className="transition-transform group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
