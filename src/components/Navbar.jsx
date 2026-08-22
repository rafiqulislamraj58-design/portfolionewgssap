import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import gsap from "gsap";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

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

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        ref={navRef}
        className="w-full bg-[#030712]/85 backdrop-blur-xl py-3.5 px-6 md:px-12 sticky top-0 z-50 flex items-center justify-between border-b border-zinc-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] font-mono"
      >
        {/* Logo */}
        <div ref={logoRef} className="flex items-center shrink-0">
          <button
            onClick={() => handleNavigate("/")}
            className="text-lg sm:text-xl font-extrabold tracking-widest text-white bg-transparent border-none cursor-pointer uppercase flex items-center gap-1 group"
          >
            <span className="group-hover:text-emerald-400 transition-colors duration-300">
              RAJ
            </span>

            <span className="text-emerald-500 font-bold">
              .DEV
            </span>
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex bg-zinc-900/60 border border-zinc-800/80 px-6 xl:px-8 py-2 rounded-full shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)] items-center gap-6 xl:gap-8 backdrop-blur-md">
          <ul
            ref={menuRef}
            className="flex items-center gap-6 xl:gap-8 font-mono text-xs font-medium tracking-widest text-zinc-400"
          >
            {/* Home */}
            <li>
              <button
                onClick={() => handleNavigate("/")}
                className={`transition-all duration-300 cursor-pointer ${
                  isActive("/")
                    ? "text-emerald-400 font-semibold drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    : "hover:text-zinc-100"
                }`}
              >
                HOME
              </button>
            </li>

            {/* About */}
            <li>
              <button
                onClick={() => handleNavigate("/about")}
                className={`transition-all duration-300 cursor-pointer ${
                  isActive("/about")
                    ? "text-emerald-400 font-semibold drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    : "hover:text-zinc-100"
                }`}
              >
                ABOUT
              </button>
            </li>

            {/* Skills */}
            <li>
              <button
                onClick={() => handleNavigate("/skill")}
                className={`transition-all duration-300 cursor-pointer ${
                  isActive("/skill")
                    ? "text-emerald-400 font-semibold drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    : "hover:text-zinc-100"
                }`}
              >
                SKILLS
              </button>
            </li>

            {/* Projects */}
            <li>
              <button
                onClick={() => handleNavigate("/project")}
                className={`transition-all duration-300 cursor-pointer ${
                  isActive("/project")
                    ? "text-emerald-400 font-semibold drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    : "hover:text-zinc-100"
                }`}
              >
                PROJECTS
              </button>
            </li>

            {/* Contact */}
            <li>
              <button
                onClick={() => handleNavigate("/contact")}
                className={`transition-all duration-300 cursor-pointer ${
                  isActive("/contact")
                    ? "text-emerald-400 font-semibold drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    : "hover:text-zinc-100"
                }`}
              >
                CONTACT
              </button>
            </li>
          </ul>
        </nav>

        {/* Resume Button */}
        <div
          ref={btnRef}
          className="hidden lg:flex items-center shrink-0"
        >
          <button
            onClick={() => handleNavigate("/resume")}
            className="bg-emerald-500 text-zinc-950 px-5 xl:px-6 py-2 rounded-full font-mono font-bold text-xs tracking-wider flex items-center gap-2 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 cursor-pointer border border-emerald-400/30"
          >
            RESUME
            <span className="text-sm leading-none">↗</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-300 hover:text-emerald-400 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
                className="h-6 w-6"
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
          className="fixed inset-0 top-[57px] bg-[#030712]/95 backdrop-blur-2xl z-40 lg:hidden flex flex-col px-8 py-10 border-b border-zinc-800"
        >
          <ul className="flex flex-col gap-6 text-lg font-bold tracking-widest text-zinc-300">
            <li>
              <button
                onClick={() => handleNavigate("/")}
                className={`text-left transition-all ${
                  isActive("/")
                    ? "text-emerald-400"
                    : "hover:text-white"
                }`}
              >
                HOME
              </button>
            </li>

            <li>
              <button
                onClick={() => handleNavigate("/about")}
                className={`text-left transition-all ${
                  isActive("/about")
                    ? "text-emerald-400"
                    : "hover:text-white"
                }`}
              >
                ABOUT
              </button>
            </li>

            <li>
              <button
                onClick={() => handleNavigate("/skill")}
                className={`text-left transition-all ${
                  isActive("/skill")
                    ? "text-emerald-400"
                    : "hover:text-white"
                }`}
              >
                SKILLS
              </button>
            </li>

            <li>
              <button
                onClick={() => handleNavigate("/project")}
                className={`text-left transition-all ${
                  isActive("/project")
                    ? "text-emerald-400"
                    : "hover:text-white"
                }`}
              >
                PROJECTS
              </button>
            </li>

            <li>
              <button
                onClick={() => handleNavigate("/contact")}
                className={`text-left transition-all ${
                  isActive("/contact")
                    ? "text-emerald-400"
                    : "hover:text-white"
                }`}
              >
                CONTACT
              </button>
            </li>
          </ul>

          {/* Mobile Resume */}
          <div className="mt-10 pt-6 border-t border-zinc-800">
            <button
              onClick={() => handleNavigate("/resume")}
              className="w-full bg-emerald-500 text-zinc-950 py-3.5 rounded-xl font-bold font-mono tracking-wider text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-emerald-400 transition-all"
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