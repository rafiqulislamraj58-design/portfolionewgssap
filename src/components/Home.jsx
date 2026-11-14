import React, {
  createContext,
  memo,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Instance,
  Instances,
  Lightformer,
  PerformanceMonitor,
  Preload,
  RoundedBox,
  Text,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import * as THREE from "three";
import SocialStatsSection from "./SocialStatsSection";

/* =====================================================================
   CONSTANTS  (content ekhane edit korun)
   ===================================================================== */

const SKIN = "#c58b6b";
const SKIN_DARK = "#b27a5c";
const HAIR = "#14101a";
const BEARD = "#1b1419";
const HOODIE = "#06140d";
const HOODIE_LIGHT = "#0f2a1c";
const ACCENT = "#22c55e";
const CYAN = "#34d399";

const SIDES = [-1, 1];

const TECHNOLOGIES = [
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "TypeScript",
];

const ROLES = ["Full-Stack Developer", "MERN Specialist", "AI Enthusiast"];

// TODO: nijer REAL number boshan
const STATS = [
  { value: "15+", label: "Projects Built" },
  { value: "2+", label: "Years Experience" },
  { value: "MERN", label: "Core Stack" },
];

// TODO: nijer link boshan
const LINKS = {
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-username",
  resume: "/resume.pdf", // public/resume.pdf e file rakhun
};

const CODE_LINES = [
  { t: "const developer = {", c: "#4ade80" },
  { t: "  name: 'Rafiqul Islam Raj',", c: "#6ee7b7" },
  { t: "  role: 'Full-Stack Dev',", c: "#86efac" },
  { t: "  stack: ['MERN', 'Next.js'],", c: "#6ee7b7" },
  { t: "  passion: 'AI & Backend',", c: "#34d399" },
  { t: "};", c: "#4ade80" },
  { t: "developer.build();", c: "#bef264" },
];

const SYMBOLS = [
  { t: "</>", p: [-1.75, 1.65, -0.4], c: "#4ade80", s: 0.34 },
  { t: "{ }", p: [-2.0, 0.2, 0.1], c: "#34d399", s: 0.36 },
  { t: "=>", p: [-1.55, -0.75, 0.5], c: "#86efac", s: 0.3 },
  { t: "( )", p: [2.65, -0.35, 0.3], c: "#6ee7b7", s: 0.3 },
  { t: "git", p: [1.3, 1.95, -0.4], c: "#a3e635", s: 0.2 },
  { t: "npm", p: [-0.9, 2.1, -0.6], c: "#86efac", s: 0.2 },
  { t: "[ ]", p: [2.5, -1.25, 0], c: "#4ade80", s: 0.28 },
];

/* =====================================================================
   HOOKS
   ===================================================================== */

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = () => setMatches(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

const useIsMobile = () => useMediaQuery("(max-width: 1023px)");
const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

// Screen er baire gele false hoy -> canvas render pause
function useInView(ref) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: "100px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return inView;
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/* =====================================================================
   SCENE CONTEXT
   (R3F Canvas er bhitore React Router context jay na,
    tai onLaptopClick context diye pass kora hocche)
   ===================================================================== */

const SceneContext = createContext({
  reduced: false,
  interactive: true,
  onLaptopClick: () => {},
});

const useScene = () => useContext(SceneContext);

// Float wrapper: reduced-motion e animation bondho
function SafeFloat({ speed = 1, ...props }) {
  const { reduced } = useScene();
  return <Float speed={reduced ? 0 : speed} {...props} />;
}

/* =====================================================================
   HERO CONTENT (HTML)
   ===================================================================== */

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.59V21h-4V9.75Z" />
    </svg>
  );
}

function RoleRotator() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block h-[1.5em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="block"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const HeroContent = memo(function HeroContent() {
  const navigate = useNavigate();

  return (
    <div className="pointer-events-none relative z-20 order-1 lg:absolute lg:inset-0 lg:flex lg:items-center">
      <div className="w-full px-6 pb-4 pt-24 sm:px-10 lg:px-16 lg:pb-0 lg:pt-0 xl:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="pointer-events-auto max-w-[520px]"
        >
          <motion.div
            variants={itemVariants}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-2.5 shadow-lg shadow-emerald-500/10 backdrop-blur-xl"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-300 sm:text-xs">
              Available for Opportunities
            </span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-green-400 sm:text-sm"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-4xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[66px]"
          >
            Rafiqul
            <span className="mt-1 block bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300 bg-clip-text text-transparent">
              Islam Raj.
            </span>
          </motion.h1>

          <motion.div variants={itemVariants} className="mt-6 flex items-center gap-3">
            <span className="h-[2px] w-10 rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
            <h2 className="text-base font-bold tracking-wide text-white sm:text-xl">
              <RoleRotator />
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-[460px] text-sm leading-7 text-slate-400 sm:text-base sm:leading-8"
          >
            I build fast, scalable web apps and AI-powered products — from the
            Node.js API to the pixel on the screen. Clean code, solid
            architecture, and interfaces people actually enjoy using.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-7">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
              Technologies I Work With
            </p>
            <div className="flex max-w-[450px] flex-wrap gap-2">
              {TECHNOLOGIES.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-emerald-400/10 bg-emerald-500/[0.06] px-3 py-2 text-xs font-medium text-slate-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-green-400/50 hover:bg-green-400/10 hover:text-green-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate("/project")}
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-green-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
            >
              Explore Projects
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.05] px-6 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-green-400/50 hover:bg-emerald-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
            >
              Let's Talk
              <span className="text-lg text-green-400">↗</span>
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-5 flex items-center gap-4 text-slate-400">
            <a
              href={LINKS.resume}
              download
              className="text-xs font-semibold underline decoration-green-400/50 underline-offset-4 transition-colors hover:text-green-300"
            >
              Download Resume
            </a>
            <span className="h-4 w-px bg-slate-700" />
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-green-300"
            >
              <GithubIcon />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-green-300"
            >
              <LinkedinIcon />
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-x-9 gap-y-5 border-t border-emerald-400/10 pt-7"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <h3 className="text-2xl font-black text-white">{s.value}</h3>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

/* =====================================================================
   3D: HAIR  (21 cone = 1 draw call)
   ===================================================================== */

const QUIFF = [-0.28, -0.14, 0, 0.14, 0.28];

const Hair = memo(function Hair() {
  const cones = useMemo(() => {
    const list = [];

    for (let i = 0; i < 16; i++) {
      const phi = i * 2.399;
      const r = 0.06 + (i / 16) * 0.34;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r * 0.9 - 0.08;
      const y = 0.535 * Math.sqrt(Math.max(0.05, 1 - (r / 0.53) ** 2));
      const h = 0.2 + (i % 3) * 0.06;

      list.push({
        position: [x, y + h / 2 - 0.04, z],
        rotation: [z * 1.5, 0, -x * 1.6],
        scale: [1, h, 1],
      });
    }

    QUIFF.forEach((x) => {
      list.push({
        position: [x, 0.31, 0.43],
        rotation: [0.85, 0, -x * 1.5],
        scale: [0.93, 0.24, 0.93],
      });
    });

    return list;
  }, []);

  return (
    <group position={[0, 0.02, -0.02]} rotation={[-0.45, 0, 0]}>
      <mesh scale={[0.95, 1.07, 0.98]}>
        <sphereGeometry args={[0.53, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.43]} />
        <meshStandardMaterial color={HAIR} roughness={0.9} />
      </mesh>

      <Instances limit={cones.length}>
        <coneGeometry args={[0.075, 1, 6]} />
        <meshStandardMaterial color={HAIR} roughness={0.9} />
        {cones.map((c, i) => (
          <Instance key={i} position={c.position} rotation={c.rotation} scale={c.scale} />
        ))}
      </Instances>
    </group>
  );
});

/* =====================================================================
   3D: HEADPHONES
   ===================================================================== */

const Headphones = memo(function Headphones() {
  return (
    <group>
      <group rotation={[-0.35, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.65, 0.035, 10, 48, Math.PI]} />
          <meshStandardMaterial color="#121a15" roughness={0.4} metalness={0.5} />
        </mesh>

        <mesh position={[0, 0.65, 0]}>
          <boxGeometry args={[0.28, 0.045, 0.06]} />
          <meshStandardMaterial color="#1f3a2c" roughness={0.4} metalness={0.6} />
        </mesh>
      </group>

      {SIDES.map((side) => (
        <group key={side} position={[side * 0.6, -0.04, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.21, 0.21, 0.16, 24]} />
            <meshStandardMaterial color="#0f1a14" roughness={0.55} />
          </mesh>

          <mesh position={[side * 0.085, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.15, 0.014, 8, 32]} />
            <meshStandardMaterial
              color={CYAN}
              emissive={CYAN}
              emissiveIntensity={1.8}
              toneMapped={false}
            />
          </mesh>

          <mesh position={[side * 0.083, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.11, 0.11, 0.012, 20]} />
            <meshStandardMaterial color="#7ca68e" metalness={0.9} roughness={0.25} />
          </mesh>
        </group>
      ))}
    </group>
  );
});

/* =====================================================================
   3D: HEAD
   ===================================================================== */

const Head = memo(function Head({ headRef, eyeLeftRef, eyeRightRef }) {
  const eyes = [
    { side: -1, ref: eyeLeftRef },
    { side: 1, ref: eyeRightRef },
  ];

  return (
    <group ref={headRef} position={[0, 0.88, 0.02]}>
      <mesh scale={[0.92, 1.05, 0.95]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={SKIN} roughness={0.7} />
      </mesh>

      <Hair />
      <Headphones />

      {SIDES.map((side) => (
        <mesh
          key={`brow${side}`}
          position={[side * 0.17, 0.17, 0.415]}
          rotation={[0, side * 0.35, side * 0.12]}
        >
          <boxGeometry args={[0.21, 0.045, 0.04]} />
          <meshStandardMaterial color={HAIR} roughness={0.9} />
        </mesh>
      ))}

      {eyes.map(({ side, ref }) => (
        <group
          key={`eye${side}`}
          ref={ref}
          position={[side * 0.17, 0.05, 0.425]}
          rotation={[0, side * 0.3, 0]}
        >
          <mesh scale={[1, 0.62, 0.5]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color="#f1ece6" roughness={0.4} />
          </mesh>

          <mesh position={[0, 0, 0.022]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshStandardMaterial color="#2a1c17" roughness={0.3} />
          </mesh>

          <mesh position={[0.01, 0.01, 0.045]}>
            <sphereGeometry args={[0.008, 6, 6]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      {/* nose */}
      <mesh position={[0, -0.05, 0.47]} scale={[1, 1.25, 1]}>
        <sphereGeometry args={[0.058, 16, 16]} />
        <meshStandardMaterial color={SKIN} roughness={0.7} />
      </mesh>
      <mesh position={[0, -0.095, 0.5]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color={SKIN} roughness={0.7} />
      </mesh>

      {/* beard */}
      <mesh scale={[0.95, 1.08, 0.98]}>
        <sphereGeometry args={[0.5, 32, 32, 0, Math.PI, Math.PI * 0.55, Math.PI * 0.38]} />
        <meshStandardMaterial color={BEARD} roughness={1} side={THREE.DoubleSide} />
      </mesh>

      {SIDES.map((side) => (
        <mesh
          key={`burn${side}`}
          position={[side * 0.4, -0.05, 0.14]}
          scale={[0.45, 1.5, 0.9]}
        >
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshStandardMaterial color={BEARD} roughness={1} />
        </mesh>
      ))}

      <mesh position={[0, -0.42, 0.36]} scale={[1, 1.5, 0.8]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color={BEARD} roughness={1} />
      </mesh>

      {SIDES.map((side) => (
        <mesh
          key={`stache${side}`}
          position={[side * 0.065, -0.14, 0.475]}
          rotation={[0, side * 0.3, (side * Math.PI) / 2 - side * 0.15]}
        >
          <capsuleGeometry args={[0.026, 0.1, 4, 8]} />
          <meshStandardMaterial color={BEARD} roughness={1} />
        </mesh>
      ))}

      {/* mouth */}
      <mesh position={[0, -0.2, 0.465]} scale={[1.5, 0.55, 0.5]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color="#b46b66" roughness={0.5} />
      </mesh>

      <mesh position={[0, -0.185, 0.49]} rotation={[0, 0, Math.PI + 0.06]}>
        <torusGeometry args={[0.07, 0.01, 6, 20, Math.PI]} />
        <meshStandardMaterial color="#7a403c" roughness={0.6} />
      </mesh>
    </group>
  );
});

/* =====================================================================
   3D: ARM
   ===================================================================== */

const Arm = memo(function Arm({ side, elbowRef }) {
  return (
    <group position={[side * 0.66, -0.12, 0]} rotation={[-0.1, 0, side * 0.12]}>
      <mesh position={[0, -0.3, 0]}>
        <capsuleGeometry args={[0.15, 0.45, 6, 12]} />
        <meshStandardMaterial color={HOODIE} roughness={0.9} />
      </mesh>

      <group ref={elbowRef} position={[0, -0.6, 0]} rotation={[-0.9, 0, 0]}>
        <mesh position={[0, -0.28, 0]}>
          <capsuleGeometry args={[0.125, 0.42, 6, 12]} />
          <meshStandardMaterial color={HOODIE} roughness={0.9} />
        </mesh>

        <mesh position={[0, -0.58, 0]}>
          <sphereGeometry args={[0.11, 12, 12]} />
          <meshStandardMaterial color={SKIN} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
});

/* =====================================================================
   3D: CHAIR / DESK / LAPTOP
   ===================================================================== */

const GamingChair = memo(function GamingChair() {
  return (
    <group position={[0, -0.1, -0.55]}>
      <RoundedBox args={[2, 2.7, 0.28]} radius={0.14} smoothness={3}>
        <meshStandardMaterial color="#07130d" roughness={0.6} />
      </RoundedBox>

      {SIDES.map((side) => (
        <group
          key={side}
          position={[side * 0.98, -0.1, 0.2]}
          rotation={[0, side * -0.35, 0]}
        >
          <RoundedBox args={[0.24, 2.1, 0.45]} radius={0.1} smoothness={3}>
            <meshStandardMaterial color="#0a1d13" roughness={0.6} />
          </RoundedBox>

          <mesh position={[side * -0.05, 0, 0.23]}>
            <boxGeometry args={[0.025, 1.9, 0.01]} />
            <meshStandardMaterial
              color={ACCENT}
              emissive={ACCENT}
              emissiveIntensity={1.7}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
});

const Desk = memo(function Desk() {
  return (
    <group position={[0, -1.2, 0.6]}>
      <RoundedBox args={[3.2, 0.1, 1.3]} radius={0.04} smoothness={3}>
        <meshStandardMaterial color="#0a1c13" roughness={0.5} metalness={0.2} />
      </RoundedBox>

      <mesh position={[0, 0, 0.66]}>
        <boxGeometry args={[3.2, 0.02, 0.012]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={1.9}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
});

// Laptop e click korle /project e jabe
const Laptop = memo(function Laptop() {
  const { onLaptopClick } = useScene();

  return (
    <group
      position={[0, -1.14, 0.45]}
      onClick={(e) => {
        e.stopPropagation();
        onLaptopClick();
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      <RoundedBox args={[1.1, 0.04, 0.75]} radius={0.015} smoothness={3}>
        <meshStandardMaterial color="#143225" metalness={0.7} roughness={0.35} />
      </RoundedBox>

      <group position={[0, 0.02, 0.37]} rotation={[-0.3, 0, 0]}>
        <RoundedBox
          args={[1.1, 0.6, 0.03]}
          radius={0.015}
          position={[0, 0.3, 0]}
          smoothness={3}
        >
          <meshStandardMaterial color="#143225" metalness={0.7} roughness={0.35} />
        </RoundedBox>

        <Text
          position={[0, 0.3, 0.02]}
          fontSize={0.2}
          color={CYAN}
          anchorX="center"
          anchorY="middle"
        >
          {"</>"}
        </Text>
      </group>
    </group>
  );
});

/* =====================================================================
   3D: CODE PANEL (typing effect, React state chhara)
   ===================================================================== */

const TOTAL_CHARS = CODE_LINES.reduce((n, l) => n + l.t.length, 0);
const LINE_H = 0.145;
const START_Y = 0.31;
const START_X = -0.98;

const CodePanel = memo(function CodePanel() {
  const { reduced } = useScene();
  const cursor = useRef();
  const lineRefs = useRef([]);
  // negative start = chhoto delay, tarpor typing shuru
  const progress = useRef(reduced ? TOTAL_CHARS : -14);
  const shown = useRef(reduced ? TOTAL_CHARS : -1);

  useFrame((state, delta) => {
    if (cursor.current) {
      cursor.current.visible = Math.floor(state.clock.elapsedTime * 2) % 2 === 0;
    }

    if (shown.current === TOTAL_CHARS) return;

    progress.current = Math.min(TOTAL_CHARS, progress.current + delta * 28);
    const count = Math.floor(Math.max(0, progress.current));
    if (count === shown.current) return;
    shown.current = count;

    let remaining = count;
    let active = 0;

    CODE_LINES.forEach((line, i) => {
      const n = Math.max(0, Math.min(line.t.length, remaining));
      if (n > 0) active = i;
      remaining -= line.t.length;

      const node = lineRefs.current[i];
      const txt = line.t.slice(0, n);
      if (node && node.text !== txt) {
        node.text = txt;
        node.sync();
      }
    });

    // cursor ke last typed character er pashe boshano
    const node = lineRefs.current[active];
    if (node) {
      node.sync(() => {
        const b = node.textRenderInfo?.blockBounds;
        if (b && cursor.current && Number.isFinite(b[2] - b[0])) {
          cursor.current.position.x = START_X + (b[2] - b[0]) + 0.03;
          cursor.current.position.y = START_Y - active * LINE_H;
        }
      });
    }
  });

  const cursorStart = reduced
    ? [-0.2, START_Y - 6 * LINE_H, 0.03]
    : [START_X, START_Y, 0.03];

  return (
    <SafeFloat speed={1.5} rotationIntensity={0.12} floatIntensity={0.5}>
      <group position={[2.5, 1.05, -0.1]} rotation={[0, -0.35, 0]} scale={0.76}>
        <mesh position={[0, 0, -0.03]}>
          <planeGeometry args={[2.35, 1.32]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.28} />
        </mesh>

        <RoundedBox args={[2.25, 1.22, 0.04]} radius={0.05} smoothness={3}>
          <meshStandardMaterial color="#07140d" roughness={0.4} />
        </RoundedBox>

        {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
          <mesh key={c} position={[-0.97 + i * 0.1, 0.51, 0.03]}>
            <circleGeometry args={[0.028, 12]} />
            <meshBasicMaterial color={c} />
          </mesh>
        ))}

        {CODE_LINES.map((line, i) => (
          <Text
            key={i}
            ref={(el) => (lineRefs.current[i] = el)}
            position={[START_X, START_Y - i * LINE_H, 0.03]}
            fontSize={0.085}
            color={line.c}
            anchorX="left"
            anchorY="middle"
          >
            {reduced ? line.t : ""}
          </Text>
        ))}

        <mesh ref={cursor} position={cursorStart}>
          <boxGeometry args={[0.04, 0.09, 0.005]} />
          <meshBasicMaterial color="#e2e8f0" />
        </mesh>
      </group>
    </SafeFloat>
  );
});

/* =====================================================================
   3D: FLOATING ELEMENTS
   ===================================================================== */

const FloatingElements = memo(function FloatingElements() {
  return (
    <>
      {SYMBOLS.map((s, i) => (
        <SafeFloat
          key={s.t}
          speed={1.4 + i * 0.15}
          rotationIntensity={0.5}
          floatIntensity={1.1}
        >
          <Text
            position={s.p}
            fontSize={s.s}
            color={s.c}
            fillOpacity={0.85}
            anchorX="center"
            anchorY="middle"
          >
            {s.t}
          </Text>
        </SafeFloat>
      ))}

      <SafeFloat speed={1.8} rotationIntensity={1.8} floatIntensity={1.1}>
        <mesh position={[0.2, 1.25, -1.2]}>
          <icosahedronGeometry args={[0.28, 1]} />
          <meshStandardMaterial
            color="#22c55e"
            wireframe
            emissive="#15803d"
            emissiveIntensity={0.85}
            toneMapped={false}
          />
        </mesh>
      </SafeFloat>

      <SafeFloat speed={1.5} rotationIntensity={1.4} floatIntensity={0.9}>
        <mesh position={[2.7, 1.9, -1.2]}>
          <octahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial
            color="#34d399"
            wireframe
            emissive="#059669"
            emissiveIntensity={0.85}
            toneMapped={false}
          />
        </mesh>
      </SafeFloat>
    </>
  );
});

/* =====================================================================
   3D: CHARACTER
   ===================================================================== */

function Character() {
  const { interactive, reduced } = useScene();

  const headRef = useRef();
  const torsoRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();
  const elbowLeftRef = useRef();
  const elbowRightRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Mouse follow: shudhu desktop e (touch e pointer meaningless)
    if (headRef.current) {
      const { x, y } = interactive ? state.pointer : { x: 0, y: 0 };
      headRef.current.rotation.y = THREE.MathUtils.damp(
        headRef.current.rotation.y,
        x * 0.4,
        4,
        delta,
      );
      headRef.current.rotation.x = THREE.MathUtils.damp(
        headRef.current.rotation.x,
        -y * 0.2,
        4,
        delta,
      );
    }

    if (reduced) return;

    if (torsoRef.current) {
      torsoRef.current.scale.y = 1 + Math.sin(t * 1.6) * 0.012;
    }

    const blink = t % 4 > 3.88 ? 0.1 : 1;
    if (eyeLeftRef.current) eyeLeftRef.current.scale.y = blink;
    if (eyeRightRef.current) eyeRightRef.current.scale.y = blink;

    // typing motion
    if (elbowLeftRef.current) {
      elbowLeftRef.current.rotation.x = -0.9 + Math.sin(t * 11) * 0.05;
    }
    if (elbowRightRef.current) {
      elbowRightRef.current.rotation.x = -0.9 + Math.sin(t * 13 + 1) * 0.05;
    }
  });

  return (
    <group position={[1.05, -0.35, 0]}>
      <GamingChair />

      <group ref={torsoRef} position={[0, -0.5, 0]}>
        <mesh scale={[1.3, 1, 0.8]}>
          <capsuleGeometry args={[0.45, 0.8, 8, 20]} />
          <meshStandardMaterial color={HOODIE} roughness={0.95} />
        </mesh>
      </group>

      {SIDES.map((side) => (
        <mesh key={side} position={[side * 0.62, -0.1, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color={HOODIE} roughness={0.95} />
        </mesh>
      ))}

      {/* hood */}
      <mesh
        position={[0, 0.3, -0.03]}
        rotation={[Math.PI / 2 - 0.3, 0, 0]}
        scale={[1.15, 1, 1]}
      >
        <torusGeometry args={[0.3, 0.13, 12, 32]} />
        <meshStandardMaterial color={HOODIE_LIGHT} roughness={0.95} />
      </mesh>

      {/* neck */}
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.17, 0.19, 0.3, 16]} />
        <meshStandardMaterial color={SKIN_DARK} roughness={0.7} />
      </mesh>

      {/* hoodie strings */}
      {SIDES.map((side) => (
        <group key={side}>
          <mesh position={[side * 0.12, -0.15, 0.36]}>
            <cylinderGeometry args={[0.012, 0.012, 0.55, 6]} />
            <meshStandardMaterial color="#9ac0a8" roughness={0.6} />
          </mesh>

          <mesh position={[side * 0.12, -0.44, 0.36]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshStandardMaterial color="#c4e0d0" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      ))}

      <Text
        position={[0, -0.28, 0.375]}
        fontSize={0.11}
        color="#bbf7d0"
        anchorX="center"
        anchorY="middle"
      >
        DEV RAJ
      </Text>

      <mesh position={[0.19, -0.19, 0.372]}>
        <circleGeometry args={[0.022, 12]} />
        <meshBasicMaterial color="#34d399" />
      </mesh>

      <Head headRef={headRef} eyeLeftRef={eyeLeftRef} eyeRightRef={eyeRightRef} />

      <Arm side={-1} elbowRef={elbowLeftRef} />
      <Arm side={1} elbowRef={elbowRightRef} />

      <Desk />
      <Laptop />
    </group>
  );
}

/* =====================================================================
   3D: SCENE + RESPONSIVE RIG
   ===================================================================== */

// Mobile e scale + center kore, ar scroll korle halka parallax dey
function ResponsiveRig({ isMobile, reduced, children }) {
  const rig = useRef();
  const { viewport } = useThree();

  useFrame(() => {
    if (!rig.current) return;

    // Scene content ~5.6 unit chora, center x ~0.6
    const scale = isMobile ? Math.min(1, viewport.width / 6.4) : 1;
    rig.current.scale.setScalar(scale);

    const baseX = isMobile ? -0.6 * scale : 0;
    const baseY = isMobile ? -0.1 : 0;

    const scroll = reduced ? 0 : Math.min(window.scrollY, 900);
    rig.current.position.set(baseX, baseY + scroll * 0.0012, 0);
    rig.current.rotation.y = scroll * -0.00018;
  });

  return <group ref={rig}>{children}</group>;
}

function Scene({ isMobile, reduced, lowPerf, onLaptopClick }) {
  const ctx = useMemo(
    () => ({ reduced, interactive: !isMobile && !reduced, onLaptopClick }),
    [reduced, isMobile, onLaptopClick],
  );

  return (
    <SceneContext.Provider value={ctx}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 5]} intensity={2} />
      <pointLight position={[-4, 2, 3]} intensity={2} color={ACCENT} />
      <pointLight position={[3, -2, -2]} intensity={2} color={CYAN} />

      {/* Offline environment (CDN lage na), ekbar render hoy */}
      <Environment resolution={64} frames={1} environmentIntensity={0.5}>
        <Lightformer
          form="rect"
          intensity={2}
          color={ACCENT}
          position={[-4, 2, 3]}
          scale={[6, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.5}
          color={CYAN}
          position={[4, -1, -3]}
          rotation-y={Math.PI}
          scale={[6, 3, 1]}
        />
        <Lightformer
          form="ring"
          intensity={1}
          color="#ffffff"
          position={[0, 5, -5]}
          scale={4}
        />
      </Environment>

      <Suspense fallback={null}>
        <ResponsiveRig isMobile={isMobile} reduced={reduced}>
          <SafeFloat speed={1.4} rotationIntensity={0.12} floatIntensity={0.3}>
            <Character />
          </SafeFloat>

          <CodePanel />
          <FloatingElements />
        </ResponsiveRig>
      </Suspense>

      <ContactShadows
        position={[1, -2.5, 0]}
        opacity={0.42}
        scale={6}
        blur={lowPerf ? 1.5 : 2.6}
        far={4}
        resolution={lowPerf ? 256 : 512}
        frames={1}
      />
    </SceneContext.Provider>
  );
}

/* =====================================================================
   CANVAS WRAPPER
   ===================================================================== */

function HeroCanvas({ inView, isMobile, reduced, onLaptopClick }) {
  const [lowPerf, setLowPerf] = useState(false);

  return (
    <Canvas
      frameloop={inView ? "always" : "never"}
      dpr={lowPerf ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <color attach="background" args={["#040d09"]} />

      {/* FPS kome gele auto quality komay */}
      <PerformanceMonitor onDecline={() => setLowPerf(true)} />

      <Scene
        isMobile={isMobile}
        reduced={reduced}
        lowPerf={lowPerf}
        onLaptopClick={onLaptopClick}
      />

      {!lowPerf && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.9} luminanceThreshold={0.35} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={0.7} />
        </EffectComposer>
      )}

      <Preload all />
    </Canvas>
  );
}

// WebGL na thakle fallback background
function Poster() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(16,185,129,0.25),transparent_55%)]" />
  );
}

/* =====================================================================
   MAIN EXPORT
   ===================================================================== */

export default function DeveloperScene() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [webgl] = useState(() => typeof window !== "undefined" && hasWebGL());

  const goProjects = useCallback(() => navigate("/project"), [navigate]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        className="relative isolate flex w-full flex-col overflow-hidden bg-[#040d09] lg:block lg:h-[850px]"
      >
        {/* 3D canvas: mobile e text er niche, desktop e pichone */}
        <div
          aria-hidden="true"
          className="relative order-2 h-[420px] w-full sm:h-[480px] lg:absolute lg:inset-0 lg:z-0 lg:h-auto"
        >
          {webgl ? (
            <HeroCanvas
              inView={inView}
              isMobile={isMobile}
              reduced={reduced}
              onLaptopClick={goProjects}
            />
          ) : (
            <Poster />
          )}

          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#040d09] to-transparent lg:hidden" />
        </div>

        {/* Overlays (desktop) */}
        <div className="pointer-events-none absolute inset-0 z-[1] hidden bg-gradient-to-r from-[#040d09] via-[#040d09]/90 to-transparent lg:block lg:w-[75%]" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_80%_45%,rgba(16,185,129,0.22),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_85%_80%,rgba(34,197,94,0.12),transparent_40%)]" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,transparent_75%,#040d09_100%)]" />

        <HeroContent />

        <div className="absolute bottom-7 right-8 z-20 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500 lg:flex">
          <span className="h-px w-8 bg-green-400/60" />
          Creative Developer Portfolio
        </div>

        <div className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 lg:flex">
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll to explore</span>
          <span className="h-8 w-px animate-pulse bg-gradient-to-b from-green-400 to-transparent motion-reduce:animate-none" />
        </div>

        <div className="pointer-events-none absolute left-8 top-8 z-20 hidden items-center gap-2 lg:flex">
          <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_#34d399]" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-slate-400">RAJ.DEV</span>
        </div>
      </section>

      <SocialStatsSection />
    </MotionConfig>
  );
}