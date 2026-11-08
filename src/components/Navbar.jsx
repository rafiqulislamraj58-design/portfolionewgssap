import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "HOME", path: "/" },
  { label: "ABOUT", path: "/about" },
  { label: "SKILLS", path: "/skill" },
  { label: "PROJECTS", path: "/project" },
  { label: "CONTACT", path: "/contact" },
];

// Glow animations (kept inside the component file so no config changes are needed)
const GLOW_STYLES = `
  @keyframes navGlowPulse {
    0%, 100% { box-shadow: 0 0 10px rgba(16,185,129,0.35), 0 0 22px rgba(16,185,129,0.18); }
    50%      { box-shadow: 0 0 18px rgba(52,211,153,0.6),  0 0 40px rgba(16,185,129,0.35); }
  }

  @keyframes navLineShimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @keyframes navTextGlow {
    0%, 100% { text-shadow: 0 0 6px rgba(52,211,153,0.5); }
    50%      { text-shadow: 0 0 14px rgba(52,211,153,0.95), 0 0 26px rgba(16,185,129,0.6); }
  }

  .nav-glow-pulse { animation: navGlowPulse 2.8s ease-in-out infinite; }
  .nav-text-glow  { animation: navTextGlow 2.8s ease-in-out infinite; }

  .nav-line-shimmer {
    background-image: linear-gradient(90deg, transparent, rgba(110,231,183,0.9), transparent);
    background-size: 50% 100%;
    background-repeat: no-repeat;
    animation: navLineShimmer 4s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-glow-pulse, .nav-text-glow, .nav-line-shimmer { animation: none; }
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.fromTo(
      navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
      .fromTo(
        logoRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        "-=0.4"
      )
      .fromTo(
        menuRef.current.children,
        { y: -15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
        },
        "-=0.3"
      )
      .fromTo(
        btnRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        "-=0.3"
      );
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Slightly stronger background once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Responsive safety: close the mobile menu when the screen grows to desktop
  // size, or when the Escape key is pressed
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{GLOW_STYLES}</style>

      <header
        ref={navRef}
        className={`sticky top-0 z-50 flex h-[57px] w-full items-center justify-between gap-3 px-4 font-mono backdrop-blur-xl transition-all duration-300 sm:px-6 md:px-10 xl:px-12 ${
          scrolled
            ? "bg-black/95 shadow-[0_8px_30px_rgba(0,0,0,0.7),0_2px_30px_rgba(16,185,129,0.18)]"
            : "bg-black/80 shadow-[0_2px_24px_rgba(16,185,129,0.10)]"
        }`}
      >
        {/* Glowing bottom border */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
        <div className="nav-line-shimmer pointer-events-none absolute inset-x-0 bottom-0 h-px" />
        <div className="pointer-events-none absolute inset-x-0 -bottom-3 h-3 bg-gradient-to-b from-emerald-500/15 to-transparent blur-sm" />

        {/* Logo */}
        <div ref={logoRef} className="flex shrink-0 items-center">
          <button
            onClick={() => handleNavigate("/")}
            className="group flex cursor-pointer items-center gap-2 border-none bg-transparent text-base font-extrabold uppercase tracking-widest text-white sm:text-lg xl:text-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.95)]" />
            </span>

            <span className="flex items-center gap-1">
              <span className="transition-all duration-300 group-hover:text-emerald-300 group-hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]">
                RAJ
              </span>

              <span className="nav-text-glow font-bold text-emerald-400">
                .DEV
              </span>
            </span>
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden min-w-0 items-center rounded-full border border-emerald-500/20 bg-black/40 px-2 py-1.5 shadow-[inset_0_1px_4px_rgba(110,231,183,0.08),0_0_24px_rgba(16,185,129,0.10)] backdrop-blur-md lg:flex xl:px-3">
          <ul
            ref={menuRef}
            className="flex items-center gap-0.5 text-[11px] font-medium tracking-wider text-emerald-100/60 xl:gap-1 xl:text-xs xl:tracking-widest"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <button
                  onClick={() => handleNavigate(link.path)}
                  className={`relative cursor-pointer rounded-full px-3 py-2 transition-all duration-300 xl:px-5 ${
                    isActive(link.path)
                      ? "bg-emerald-500/15 font-semibold text-emerald-300 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.35),0_0_18px_rgba(16,185,129,0.35)] drop-shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                      : "hover:bg-emerald-500/10 hover:text-emerald-300 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                  }`}
                >
                  {link.label}

                  {isActive(link.path) && (
                    <span className="absolute -bottom-0.5 left-1/2 h-[3px] w-[14px] -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,1),0_0_20px_rgba(16,185,129,0.8)]" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Resume Button */}
        <div ref={btnRef} className="hidden shrink-0 items-center lg:flex">
          <button
            onClick={() => handleNavigate("/resume")}
            className="nav-glow-pulse group flex cursor-pointer items-center gap-2 rounded-full border border-emerald-300/40 bg-gradient-to-r from-emerald-500 to-green-400 px-4 py-2 text-xs font-bold tracking-wider text-emerald-950 transition-transform duration-300 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-lime-300 xl:px-6"
          >
            RESUME
            <span className="text-sm leading-none transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </button>
        </div>

        {/* Mobile / Tablet: Resume shortcut + Menu Button */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <button
            onClick={() => handleNavigate("/resume")}
            className="hidden items-center gap-1.5 rounded-full border border-emerald-300/40 bg-gradient-to-r from-emerald-500 to-green-400 px-4 py-1.5 text-[11px] font-bold tracking-wider text-emerald-950 sm:flex"
          >
            RESUME
            <span className="text-sm leading-none">↗</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`rounded-lg border p-2 transition-all focus:outline-none ${
              isOpen
                ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.45)]"
                : "border-emerald-500/20 bg-black/40 text-emerald-100/80 hover:border-emerald-400/50 hover:text-emerald-300 hover:shadow-[0_0_14px_rgba(16,185,129,0.35)]"
            }`}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-x-0 bottom-0 top-[57px] z-40 flex flex-col overflow-y-auto bg-black/95 px-5 py-8 backdrop-blur-2xl sm:px-8 sm:py-10 lg:hidden"
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/15 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-green-500/10 blur-[100px]" />

          <ul className="relative mx-auto flex w-full max-w-md flex-col text-base font-bold tracking-widest text-emerald-100/70 sm:text-lg">
            {NAV_LINKS.map((link, i) => (
              <li key={link.path} className="border-b border-emerald-900/50">
                <button
                  onClick={() => handleNavigate(link.path)}
                  className={`group flex w-full items-center justify-between py-4 text-left transition-all sm:py-5 ${
                    isActive(link.path)
                      ? "text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.7)]"
                      : "hover:pl-2 hover:text-emerald-200"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span className="text-xs font-medium text-emerald-400/70">
                      0{i + 1}
                    </span>
                    {link.label}
                  </span>

                  {isActive(link.path) ? (
                    <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,1),0_0_22px_rgba(16,185,129,0.8)]" />
                  ) : (
                    <span className="text-sm text-emerald-900 transition-colors group-hover:text-emerald-400">
                      →
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Resume */}
          <div className="relative mx-auto mt-8 w-full max-w-md sm:mt-10">
            <button
              onClick={() => handleNavigate("/resume")}
              className="nav-glow-pulse flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-400 py-3.5 font-mono text-xs font-bold tracking-wider text-emerald-950 transition-all"
            >
              VIEW RESUME ↗
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;