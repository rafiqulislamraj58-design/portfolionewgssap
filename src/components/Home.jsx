import React, { Suspense, useMemo, useRef } from "react";
import { useNavigate } from "react-router";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Text, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import SocialStatsSection from "./SocialStatsSection";

const SKIN = "#c58b6b";
const SKIN_DARK = "#b27a5c";
const HAIR = "#14101a";
const BEARD = "#1b1419";
const HOODIE = "#06140d";
const HOODIE_LIGHT = "#0f2a1c";
const ACCENT = "#22c55e";
const CYAN = "#34d399";

// ================= HERO CONTENT =================

function HeroContent() {
  const navigate = useNavigate();

  const technologies = [
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "TypeScript",
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="pointer-events-auto max-w-[520px]">

          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-2.5 shadow-lg shadow-emerald-500/10 backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-300 sm:text-xs">
              Available for Opportunities
            </span>
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-green-400 sm:text-sm">
            Hello, I'm
          </p>

          <h1 className="text-4xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[66px]">
            Rafiqul

            <span className="mt-1 block bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300 bg-clip-text text-transparent">
              Islam Raj.
            </span>
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <span className="h-[2px] w-10 rounded-full bg-green-400 shadow-lg shadow-green-400/50" />

            <h2 className="text-base font-bold tracking-wide text-white sm:text-xl">
              Full-Stack Developer
            </h2>
          </div>

          <p className="mt-6 max-w-[460px] text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            I build modern, responsive and scalable web applications with a
            passion for clean code, powerful backend systems and exceptional
            user experiences. I enjoy transforming ideas into meaningful digital
            products using modern web technologies and AI-powered solutions.
          </p>

          <div className="mt-7">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
              Technologies I Work With
            </p>

            <div className="flex max-w-[450px] flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-emerald-400/10 bg-emerald-500/[0.06] px-3 py-2 text-xs font-medium text-slate-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-green-400/50 hover:bg-green-400/10 hover:text-green-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">

            <button
              onClick={() => navigate("/project")}
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-green-500/40"
            >
              Explore Projects

              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.05] px-6 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-green-400/50 hover:bg-emerald-500/10"
            >
              Let's Talk

              <span className="text-lg text-green-400">↗</span>
            </button>

          </div>

          <div className="mt-10 flex flex-wrap gap-x-9 gap-y-5 border-t border-emerald-400/10 pt-7">

            <div>
              <h3 className="text-2xl font-black text-white">MERN</h3>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Core Stack
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">Full-Stack</h3>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Development
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">AI</h3>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Exploration
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ================= HAIR =================

function Hair() {
  const spikes = useMemo(() => {
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
        height: h,
      });
    }

    return list;
  }, []);

  const quiff = [-0.28, -0.14, 0, 0.14, 0.28];

  return (
    <group position={[0, 0.02, -0.02]} rotation={[-0.45, 0, 0]}>
      <mesh scale={[0.95, 1.07, 0.98]} castShadow>
        <sphereGeometry
          args={[0.53, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.43]}
        />
        <meshStandardMaterial color={HAIR} roughness={0.9} />
      </mesh>

      {spikes.map((s, i) => (
        <mesh key={i} position={s.position} rotation={s.rotation} castShadow>
          <coneGeometry args={[0.075, s.height, 8]} />
          <meshStandardMaterial color={HAIR} roughness={0.9} />
        </mesh>
      ))}

      {quiff.map((x, i) => (
        <mesh
          key={`q${i}`}
          position={[x, 0.31, 0.43]}
          rotation={[0.85, 0, -x * 1.5]}
          castShadow
        >
          <coneGeometry args={[0.07, 0.24, 8]} />
          <meshStandardMaterial color={HAIR} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// ================= HEADPHONES =================

function Headphones() {
  return (
    <group>
      <group rotation={[-0.35, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.65, 0.035, 12, 64, Math.PI]} />
          <meshStandardMaterial
            color="#121a15"
            roughness={0.4}
            metalness={0.5}
          />
        </mesh>

        <mesh position={[0, 0.65, 0]}>
          <boxGeometry args={[0.28, 0.045, 0.06]} />
          <meshStandardMaterial
            color="#1f3a2c"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      </group>

      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.6, -0.04, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.21, 0.21, 0.16, 32]} />
            <meshStandardMaterial color="#0f1a14" roughness={0.55} />
          </mesh>

          <mesh position={[side * 0.085, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.15, 0.014, 12, 40]} />
            <meshStandardMaterial
              color={CYAN}
              emissive={CYAN}
              emissiveIntensity={1.8}
            />
          </mesh>

          <mesh position={[side * 0.083, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.11, 0.11, 0.012, 24]} />
            <meshStandardMaterial
              color="#7ca68e"
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ================= HEAD =================

function Head({ headRef, eyeLeftRef, eyeRightRef }) {
  return (
    <group ref={headRef} position={[0, 0.88, 0.02]}>
      <mesh scale={[0.92, 1.05, 0.95]} castShadow>
        <sphereGeometry args={[0.5, 48, 48]} />
        <meshStandardMaterial color={SKIN} roughness={0.7} />
      </mesh>

      <Hair />
      <Headphones />

      {[-1, 1].map((side) => (
        <mesh
          key={`brow${side}`}
          position={[side * 0.17, 0.17, 0.415]}
          rotation={[0, side * 0.35, side * 0.12]}
        >
          <boxGeometry args={[0.21, 0.045, 0.04]} />
          <meshStandardMaterial color={HAIR} roughness={0.9} />
        </mesh>
      ))}

      {[
        { side: -1, ref: eyeLeftRef },
        { side: 1, ref: eyeRightRef },
      ].map(({ side, ref }) => (
        <group
          key={`eye${side}`}
          ref={ref}
          position={[side * 0.17, 0.05, 0.425]}
          rotation={[0, side * 0.3, 0]}
        >
          <mesh scale={[1, 0.62, 0.5]}>
            <sphereGeometry args={[0.055, 20, 20]} />
            <meshStandardMaterial color="#f1ece6" roughness={0.4} />
          </mesh>

          <mesh position={[0, 0, 0.022]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color="#2a1c17" roughness={0.3} />
          </mesh>

          <mesh position={[0.01, 0.01, 0.045]}>
            <sphereGeometry args={[0.008, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      <mesh position={[0, -0.05, 0.47]} scale={[1, 1.25, 1]}>
        <sphereGeometry args={[0.058, 20, 20]} />
        <meshStandardMaterial color={SKIN} roughness={0.7} />
      </mesh>

      <mesh position={[0, -0.095, 0.5]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={SKIN} roughness={0.7} />
      </mesh>

      <mesh scale={[0.95, 1.08, 0.98]}>
        <sphereGeometry
          args={[0.5, 40, 40, 0, Math.PI, Math.PI * 0.55, Math.PI * 0.38]}
        />
        <meshStandardMaterial
          color={BEARD}
          roughness={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {[-1, 1].map((side) => (
        <mesh
          key={`burn${side}`}
          position={[side * 0.4, -0.05, 0.14]}
          scale={[0.45, 1.5, 0.9]}
        >
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color={BEARD} roughness={1} />
        </mesh>
      ))}

      <mesh position={[0, -0.42, 0.36]} scale={[1, 1.5, 0.8]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={BEARD} roughness={1} />
      </mesh>

      {[-1, 1].map((side) => (
        <mesh
          key={`stache${side}`}
          position={[side * 0.065, -0.14, 0.475]}
          rotation={[0, side * 0.3, (side * Math.PI) / 2 - side * 0.15]}
        >
          <capsuleGeometry args={[0.026, 0.1, 6, 10]} />
          <meshStandardMaterial color={BEARD} roughness={1} />
        </mesh>
      ))}

      <mesh position={[0, -0.2, 0.465]} scale={[1.5, 0.55, 0.5]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color="#b46b66" roughness={0.5} />
      </mesh>

      <mesh position={[0, -0.185, 0.49]} rotation={[0, 0, Math.PI + 0.06]}>
        <torusGeometry args={[0.07, 0.01, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#7a403c" roughness={0.6} />
      </mesh>
    </group>
  );
}

// ================= ARM =================

function Arm({ side, elbowRef }) {
  return (
    <group position={[side * 0.66, -0.12, 0]} rotation={[-0.1, 0, side * 0.12]}>
      <mesh position={[0, -0.3, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.45, 8, 16]} />
        <meshStandardMaterial color={HOODIE} roughness={0.9} />
      </mesh>

      <group ref={elbowRef} position={[0, -0.6, 0]} rotation={[-0.9, 0, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <capsuleGeometry args={[0.125, 0.42, 8, 16]} />
          <meshStandardMaterial color={HOODIE} roughness={0.9} />
        </mesh>

        <mesh position={[0, -0.58, 0]} castShadow>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color={SKIN} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// ================= GAMING CHAIR =================

function GamingChair() {
  return (
    <group position={[0, -0.1, -0.55]}>
      <RoundedBox args={[2, 2.7, 0.28]} radius={0.14} smoothness={4}>
        <meshStandardMaterial color="#07130d" roughness={0.6} />
      </RoundedBox>

      {[-1, 1].map((side) => (
        <group
          key={side}
          position={[side * 0.98, -0.1, 0.2]}
          rotation={[0, side * -0.35, 0]}
        >
          <RoundedBox args={[0.24, 2.1, 0.45]} radius={0.1} smoothness={4}>
            <meshStandardMaterial color="#0a1d13" roughness={0.6} />
          </RoundedBox>

          <mesh position={[side * -0.05, 0, 0.23]}>
            <boxGeometry args={[0.025, 1.9, 0.01]} />
            <meshStandardMaterial
              color={ACCENT}
              emissive={ACCENT}
              emissiveIntensity={1.7}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ================= DESK =================

function Desk() {
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
        />
      </mesh>
    </group>
  );
}

// ================= LAPTOP =================

function Laptop() {
  return (
    <group position={[0, -1.14, 0.45]}>
      <RoundedBox args={[1.1, 0.04, 0.75]} radius={0.015} smoothness={3}>
        <meshStandardMaterial
          color="#143225"
          metalness={0.7}
          roughness={0.35}
        />
      </RoundedBox>

      <group position={[0, 0.02, 0.37]} rotation={[-0.3, 0, 0]}>
        <RoundedBox
          args={[1.1, 0.6, 0.03]}
          radius={0.015}
          position={[0, 0.3, 0]}
          smoothness={3}
        >
          <meshStandardMaterial
            color="#143225"
            metalness={0.7}
            roughness={0.35}
          />
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
}

// ================= CODE PANEL =================

const CODE_LINES = [
  { t: "const developer = {", c: "#4ade80" },
  { t: "  name: 'Rafiqul Islam Raj',", c: "#6ee7b7" },
  { t: "  role: 'Full-Stack Dev',", c: "#86efac" },
  { t: "  stack: ['MERN', 'Next.js'],", c: "#6ee7b7" },
  { t: "  passion: 'AI & Backend',", c: "#34d399" },
  { t: "};", c: "#4ade80" },
  { t: "developer.build();", c: "#bef264" },
];

function CodePanel() {
  const cursor = useRef();

  useFrame((state) => {
    if (cursor.current) {
      cursor.current.visible =
        Math.floor(state.clock.elapsedTime * 2) % 2 === 0;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.5}>
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
            <circleGeometry args={[0.028, 16]} />
            <meshBasicMaterial color={c} />
          </mesh>
        ))}

        {CODE_LINES.map((line, i) => (
          <Text
            key={i}
            position={[-0.98, 0.31 - i * 0.145, 0.03]}
            fontSize={0.085}
            color={line.c}
            anchorX="left"
            anchorY="middle"
          >
            {line.t}
          </Text>
        ))}

        <mesh ref={cursor} position={[-0.2, 0.31 - 6 * 0.145, 0.03]}>
          <boxGeometry args={[0.04, 0.09, 0.005]} />
          <meshBasicMaterial color="#e2e8f0" />
        </mesh>
      </group>
    </Float>
  );
}

// ================= FLOATING ELEMENTS =================

const SYMBOLS = [
  { t: "</>", p: [-1.75, 1.65, -0.4], c: "#4ade80", s: 0.34 },
  { t: "{ }", p: [-2.0, 0.2, 0.1], c: "#34d399", s: 0.36 },
  { t: "=>", p: [-1.55, -0.75, 0.5], c: "#86efac", s: 0.3 },
  { t: "( )", p: [2.65, -0.35, 0.3], c: "#6ee7b7", s: 0.3 },
  { t: "git", p: [1.3, 1.95, -0.4], c: "#a3e635", s: 0.2 },
  { t: "npm", p: [-0.9, 2.1, -0.6], c: "#86efac", s: 0.2 },
  { t: "[ ]", p: [2.5, -1.25, 0], c: "#4ade80", s: 0.28 },
];

function FloatingElements() {
  return (
    <>
      {SYMBOLS.map((s, i) => (
        <Float
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
        </Float>
      ))}

      <Float speed={1.8} rotationIntensity={1.8} floatIntensity={1.1}>
        <mesh position={[0.2, 1.25, -1.2]}>
          <icosahedronGeometry args={[0.28, 1]} />
          <meshStandardMaterial
            color="#22c55e"
            wireframe
            emissive="#15803d"
            emissiveIntensity={0.85}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1.4} floatIntensity={0.9}>
        <mesh position={[2.7, 1.9, -1.2]}>
          <octahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial
            color="#34d399"
            wireframe
            emissive="#059669"
            emissiveIntensity={0.85}
          />
        </mesh>
      </Float>
    </>
  );
}

// ================= CHARACTER =================

function Character() {
  const headRef = useRef();
  const torsoRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();
  const elbowLeftRef = useRef();
  const elbowRightRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;

    if (headRef.current) {
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

    if (torsoRef.current) {
      torsoRef.current.scale.y = 1 + Math.sin(t * 1.6) * 0.012;
    }

    const blink = t % 4 > 3.88 ? 0.1 : 1;

    if (eyeLeftRef.current) eyeLeftRef.current.scale.y = blink;
    if (eyeRightRef.current) eyeRightRef.current.scale.y = blink;

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
        <mesh scale={[1.3, 1, 0.8]} castShadow>
          <capsuleGeometry args={[0.45, 0.8, 12, 24]} />
          <meshStandardMaterial color={HOODIE} roughness={0.95} />
        </mesh>
      </group>

      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.62, -0.1, 0]} castShadow>
          <sphereGeometry args={[0.2, 24, 24]} />
          <meshStandardMaterial color={HOODIE} roughness={0.95} />
        </mesh>
      ))}

      <mesh
        position={[0, 0.3, -0.03]}
        rotation={[Math.PI / 2 - 0.3, 0, 0]}
        scale={[1.15, 1, 1]}
      >
        <torusGeometry args={[0.3, 0.13, 16, 40]} />
        <meshStandardMaterial color={HOODIE_LIGHT} roughness={0.95} />
      </mesh>

      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.17, 0.19, 0.3, 20]} />
        <meshStandardMaterial color={SKIN_DARK} roughness={0.7} />
      </mesh>

      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * 0.12, -0.15, 0.36]}>
            <cylinderGeometry args={[0.012, 0.012, 0.55, 8]} />
            <meshStandardMaterial color="#9ac0a8" roughness={0.6} />
          </mesh>

          <mesh position={[side * 0.12, -0.44, 0.36]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshStandardMaterial
              color="#c4e0d0"
              metalness={0.8}
              roughness={0.3}
            />
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
        <circleGeometry args={[0.022, 16]} />
        <meshBasicMaterial color="#34d399" />
      </mesh>

      <Head
        headRef={headRef}
        eyeLeftRef={eyeLeftRef}
        eyeRightRef={eyeRightRef}
      />

      <Arm side={-1} elbowRef={elbowLeftRef} />
      <Arm side={1} elbowRef={elbowRightRef} />

      <Desk />
      <Laptop />
    </group>
  );
}

// ================= SCENE =================

function Scene() {
  return (
    <>
      <ambientLight intensity={1.1} />

      <directionalLight position={[4, 5, 5]} intensity={2.4} castShadow />

      <pointLight position={[-4, 2, 3]} intensity={2} color={ACCENT} />
      <pointLight position={[3, -2, -2]} intensity={2} color={CYAN} />
      <pointLight position={[0, -0.4, 1.8]} intensity={1.2} color={ACCENT} />

      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.3}>
          <Character />
        </Float>

        <CodePanel />
        <FloatingElements />
      </Suspense>

      <ContactShadows
        position={[1, -2.5, 0]}
        opacity={0.42}
        scale={6}
        blur={2.6}
        far={4}
      />
    </>
  );
}

// ================= MAIN EXPORT =================

export default function DeveloperScene() {
  return (
    <>
      <section className="relative isolate min-h-[950px] w-full overflow-hidden bg-[#040d09] sm:min-h-[850px] lg:h-[850px] lg:min-h-0">

        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 42 }}
            shadows
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
          >
            <color attach="background" args={["#040d09"]} />
            <Scene />
          </Canvas>
        </div>

        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#040d09] via-[#040d09]/90 to-transparent lg:w-[75%]" />

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_80%_45%,rgba(16,185,129,0.22),transparent_45%)]" />

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_85%_80%,rgba(34,197,94,0.12),transparent_40%)]" />

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,transparent_75%,#040d09_100%)]" />

        <HeroContent />

        <div className="absolute bottom-7 right-8 z-20 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500 lg:flex">
          <span className="h-px w-8 bg-green-400/60" />
          Creative Developer Portfolio
        </div>

        <div className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 lg:flex">
          <span className="text-[9px] uppercase tracking-[0.3em]">
            Scroll to explore
          </span>

          <span className="h-8 w-px animate-pulse bg-gradient-to-b from-green-400 to-transparent" />
        </div>

        <div className="pointer-events-none absolute left-8 top-8 z-20 hidden items-center gap-2 lg:flex">
          <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_#34d399]" />

          <span className="text-[10px] font-bold tracking-[0.25em] text-slate-400">
            RAJ.DEV
          </span>
        </div>

      </section>

      <SocialStatsSection />
    </>
  );
}