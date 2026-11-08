"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, useReducedMotion } from "framer-motion";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#22c55e";
const CYAN = "#34d399";

const SOCIAL_LINKS = [
  {
    type: "github",
    label: "GitHub",
    username: "@rafiqulislamraj58-design",
    url: "https://github.com/rafiqulislamraj58-design",
    color: "#f0f6fc",
    description: "Explore my code and projects",
  },
  {
    type: "linkedin",
    label: "LinkedIn",
    username: "Rafiqul Islam Raj",
    url: "https://www.linkedin.com/in/rafiqul-islam-raj",
    color: "#10b981",
    description: "Connect with me professionally",
  },
];

const STATS = [
  { value: 2, suffix: "+", label: "Projects Built" },
  { value: 5, suffix: "+", label: "Core Technologies" },
];

const TECH_STACK = [
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "REST APIs",
  "Tailwind CSS",
];

// ===============================
// 3D SOCIAL CARD
// ===============================

function SocialCard3D({ type, reducedMotion }) {
  const meshRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const isGithub = type === "github";

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;

    const targetY = hovered
      ? 0.3
      : Math.sin(state.clock.elapsedTime * 0.6) * 0.12;

    const targetX = hovered
      ? -0.15
      : Math.sin(state.clock.elapsedTime * 0.5) * 0.06;

    meshRef.current.rotation.y = THREE.MathUtils.damp(
      meshRef.current.rotation.y,
      targetY,
      5,
      delta
    );

    meshRef.current.rotation.x = THREE.MathUtils.damp(
      meshRef.current.rotation.x,
      targetX,
      5,
      delta
    );

    const targetScale = hovered ? 1.06 : 1;

    meshRef.current.scale.setScalar(
      THREE.MathUtils.damp(
        meshRef.current.scale.x,
        targetScale,
        5,
        delta
      )
    );
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.3}
      rotationIntensity={reducedMotion ? 0 : 0.2}
      floatIntensity={reducedMotion ? 0 : 0.35}
    >
      <group
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {/* Main Card */}
        <RoundedBox
          args={[2.65, 1.65, 0.16]}
          radius={0.14}
          smoothness={5}
        >
          <meshPhysicalMaterial
            color="#0d1a13"
            roughness={0.3}
            metalness={0.35}
            clearcoat={1}
            clearcoatRoughness={0.2}
            emissive={hovered ? ACCENT : "#0a1a12"}
            emissiveIntensity={hovered ? 0.35 : 0.12}
          />
        </RoundedBox>

        {/* Border Glow */}
        <mesh position={[0, 0, -0.095]}>
          <planeGeometry args={[2.78, 1.78]} />
          <meshBasicMaterial
            color={isGithub ? "#f0f6fc" : CYAN}
            transparent
            opacity={hovered ? 0.35 : 0.12}
          />
        </mesh>

        {/* Top Accent */}
        <mesh position={[0, 0.65, 0.085]}>
          <boxGeometry args={[1.8, 0.012, 0.005]} />
          <meshBasicMaterial
            color={isGithub ? "#f0f6fc" : CYAN}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Social Icon */}
        <Text
          position={[0, 0.23, 0.095]}
          fontSize={isGithub ? 0.36 : 0.48}
          color={isGithub ? "#f0f6fc" : "#4ade80"}
          anchorX="center"
          anchorY="middle"
          fontWeight={700}
        >
          {isGithub ? "</>" : "in"}
        </Text>

        {/* Social Name */}
        <Text
          position={[0, -0.2, 0.095]}
          fontSize={0.25}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fontWeight={600}
        >
          {isGithub ? "GitHub" : "LinkedIn"}
        </Text>

        {/* Hover Indicator */}
        <mesh position={[0, -0.57, 0.095]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial
            color={isGithub ? "#f0f6fc" : CYAN}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ===============================
// SOCIAL CARD WRAPPER
// ===============================

function SocialCard({ social, reducedMotion }) {
  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit my ${social.label} profile`}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reducedMotion ? {} : { y: -6 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative block h-[300px] overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] transition-colors duration-500 hover:border-emerald-400/40"
    >
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.12), transparent 65%)",
        }}
      />

      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
          }}
        >
          <ambientLight intensity={1.5} />

          <pointLight
            position={[3, 3, 4]}
            intensity={2}
            color={CYAN}
          />

          <pointLight
            position={[-3, -2, 3]}
            intensity={1.5}
            color={ACCENT}
          />

          <SocialCard3D
            type={social.type}
            reducedMotion={reducedMotion}
          />
        </Canvas>
      </div>

      {/* Bottom Information */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-6">
        <div>
          <p className="text-lg font-semibold text-white">
            {social.label}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {social.description}
          </p>
        </div>

        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 group-hover:border-green-400/40 group-hover:bg-green-400/10 group-hover:text-green-300">
          ↗
        </span>
      </div>
    </motion.a>
  );
}

// ===============================
// ANIMATED COUNTER
// ===============================

function Counter({ value, suffix, label, delay = 0 }) {
  const ref = useRef(null);
  const numberRef = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || !numberRef.current) return;

    const counter = { value: 0 };

    const tween = gsap.to(counter, {
      value,
      duration: reducedMotion ? 0 : 2,
      delay: reducedMotion ? 0 : delay,
      ease: "power3.out",

      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent =
            Math.floor(counter.value) + suffix;
        }
      },
    });

    return () => tween.kill();
  }, [isInView, value, suffix, delay, reducedMotion]);

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true }}
      className="group relative text-center"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-emerald-500/[0.04] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative text-5xl font-bold tracking-tight text-transparent bg-gradient-to-r from-green-300 via-emerald-300 to-lime-400 bg-clip-text md:text-6xl">
        <span ref={numberRef}>0{suffix}</span>
      </div>

      <p className="relative mt-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-400 md:text-sm">
        {label}
      </p>
    </motion.div>
  );
}

// ===============================
// TECH STACK
// ===============================

function TechStack() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {TECH_STACK.map((tech, index) => (
        <motion.span
          key={tech}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.07 }}
          viewport={{ once: true }}
          className="rounded-xl border border-white/[0.08] bg-white/[0.035] px-5 py-3 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-green-400/40 hover:bg-green-400/[0.06] hover:text-green-300"
        >
          {tech}
        </motion.span>
      ))}
    </div>
  );
}

// ===============================
// MAIN COMPONENT
// ===============================

export default function SocialStatsSection() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".social-title",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".social-title",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="connect"
      className="relative isolate overflow-hidden bg-[#040d09] py-24 md:py-32"
    >
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-600/[0.12] blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-green-500/[0.06] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            Let's Connect
          </motion.span>

          <h2 className="social-title text-4xl font-bold tracking-tight text-white md:text-6xl">
            Connect With{" "}
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
              Me.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 md:text-base">
            I'm always interested in connecting with developers,
            creative minds, and people building something meaningful.
            Let's share ideas and create something awesome.
          </p>
        </div>

        {/* Social Cards */}
        <div className="mb-24 grid grid-cols-1 gap-7 md:grid-cols-2">
          {SOCIAL_LINKS.map((social) => (
            <SocialCard
              key={social.type}
              social={social}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="relative mx-auto mb-28 max-w-3xl">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
              A Little Progress
            </span>

            <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              My Development Journey
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-8 rounded-3xl border border-white/[0.07] bg-white/[0.025] px-5 py-12 backdrop-blur-xl md:gap-16 md:px-12">
            {STATS.map((stat, index) => (
              <Counter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-green-300">
              My Toolbox
            </span>

            <h3 className="mt-4 text-2xl font-bold text-white md:text-3xl">
              Technologies I Work With
            </h3>

            <p className="mx-auto mb-10 mt-4 max-w-lg text-sm leading-7 text-slate-400">
              Tools and technologies I use to build modern,
              scalable web applications and practical digital products.
            </p>
          </motion.div>

          <TechStack />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-28 text-center"
        >
          <div className="mx-auto mb-6 h-px max-w-xs bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

          <h3 className="text-2xl font-bold text-white md:text-3xl">
            Have an interesting idea?
          </h3>

          <p className="mt-3 text-sm text-slate-400">
            Let's connect, collaborate and build something meaningful.
          </p>

          <a
            href="mailto:rafiqulislamraj58@gmail.com"
            className="mt-8 inline-flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-7 py-4 text-sm font-semibold text-emerald-200 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/50 hover:bg-emerald-500/20 hover:text-green-200"
          >
            Get In Touch
            <span aria-hidden="true">↗</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}