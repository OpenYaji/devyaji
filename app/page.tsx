"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import SpringLink from "@/components/SpringLink";
import StaggeredText from "@/components/StaggeredText";

function AntigravityItem({ children, speed, className }: { children: React.ReactNode, speed: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [150 * speed, -150 * speed]);
  // Use position: relative safely within style to resolve FM relative position warning
  return <motion.div ref={ref} style={{ y, position: "relative" }} className={className}>{children}</motion.div>;
}


/* ─── Framer Motion variants ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.25, 0, 0, 1] as const },
  }),
};

/* ─── Data ────────────────────────────────────────────────────────── */
const experience = [
  { year: "2026 / CURRENT", title: "CTO – SEEGLA", role: "CORE ARCHITECTURE & STRATEGY" },
  { year: "2026", title: "PROJECT LEAD – PAWS VET", role: "SYSTEMS DEVELOPMENT" },
  { year: "2024", title: "LEAD DEVELOPER – ACADEMIC", role: "2ND YEAR TERM LEAD" },
  { year: "2023", title: "PROJECT LEAD – FOUNDATION", role: "1ST YEAR TERM LEAD" },
];

const projects = [
  // SCHOOL PROJECTS
  { num: "01", type: "school", category: "AI / HEALTHCARE", title: "PAWS VET CLINIC", metadata: "3rd Yr / 2nd Sem (Current)", img: "/portfolio/ThriUp.png", alt: "AI Vet Clinic System" },
  { num: "02", type: "school", category: "EDUCATION", title: "GYMNAZO ACADEMY", metadata: "3rd Yr / 1st Sem (Implemented)", img: "/portfolio/ThriUp.png", alt: "School Management System" },
  { num: "03", type: "school", category: "EDUCATION", title: "SKYULAR PORTAL", metadata: "2nd Yr / 2nd Sem", img: "/portfolio/ThriUp.png", alt: "QCU Student Portal" },
  { num: "04", type: "school", category: "COMMUNITY", title: "PAWSITIVITY", metadata: "2nd Yr / 1st Sem", img: "/portfolio/pawsmaskot.jpg", alt: "Pet Adoption System" },
  { num: "05", type: "school", category: "IOT / HARDWARE", title: "SMART BUILDING", metadata: "1st Yr / 2nd Sem", img: "/portfolio/ThriUp.png", alt: "Arduino Safety System" },
  { num: "06", type: "school", category: "HEALTH", title: "KYUSIFIT", metadata: "1st Yr / 1st Sem", img: "/portfolio/ThriUp.png", alt: "Fitness Management System" },

  // PASSION PROJECTS
  { num: "07", type: "passion", category: "E-COMMERCE", title: "THRIFTUP", metadata: "Passion Project", img: "/portfolio/ThriUp.png", alt: "ThriftUp UI" },
  { num: "08", type: "passion", category: "ARTIFICIAL INTELLIGENCE", title: "AI ANALYZER", metadata: "Passion Project", img: "/portfolio/ThriUp.png", alt: "AI Analyzer Tool" },
  { num: "09", type: "passion", category: "FINANCE / COMMUNITY", title: "AMBAGAN", metadata: "Passion Project", img: "/portfolio/ThriUp.png", alt: "Ambagan App" },

  // COMMISSION PROJECTS
  { num: "10", type: "commission", category: "ENTERPRISE", title: "HOTEL SUPER SYSTEM", metadata: "Commissioned Project", img: "/portfolio/ThriUp.png", alt: "Hotel Management System" },
  { num: "11", type: "commission", category: "MANAGEMENT", title: "BOARDING HOUSE SYS", metadata: "Tenant Management", img: "/portfolio/ThriUp.png", alt: "Boarding House System" }
];

const groupedProjects = [
  { groupTitle: "School Projects", type: "school" },
  { groupTitle: "Passion Projects", type: "passion" },
  { groupTitle: "Commission Work", type: "commission" },
].map(group => ({
  ...group,
  items: projects.filter(p => p.type === group.type)
}));

const gallery = [
  { img: "/portfolio/BWAI.jpg", alt: "Build With Ai Manila 2026 - Break The Pattern Day 1", label: "GDG BUILD WITH AI MANILA 2026" },
  { img: "/portfolio/microsoft.jpg", alt: "Global AI Manila AgentCamp 2026", label: "GLOBAL AI MANILA AGENTCAMP 2026" },
  { img: "/portfolio/devcamp2.jpg", alt: "Day 1 Developer Camp Manila 2026", label: "DEVELOPER CAMP MANILA 2026" },
  { img: "/portfolio/wordpress2.jpg", alt: "WordPress FOSS", label: "WORDPRESS @ YSPACE" },
  { img: "/portfolio/devcamp.jpg", alt: "Day 2 Developer Camp Manila 2026", label: "DEVELOPER CAMP MANILA 2026 - BUILD DAY" },

  { img: "/portfolio/wordpress4.jpg", alt: "WordPress FOSS", label: "WORDPRESS CAMANAVA" },
];

const certs = [
  "Huawei Developer Expert",
  "Google Gen AI Leader",
  "Oracle Gen AI Professional",
  "AAP / PSIA",
];

/* ─── Page ────────────────────────────────────────────────────────── */
export default function Page() {
  const heroRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const [isWiping, setIsWiping] = useState(false);
  const [initWipe, setInitWipe] = useState(true);

  /* Track hero section leaving the viewport top */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* Multi-layer parallax — each element drifts at a different depth */
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const mascotY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const mascotScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [0.6, 0]);

  return (
    <>
      <AnimatePresence>
        {initWipe && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[#fafafa] pointer-events-none"
            initial={{ clipPath: "polygon(0 0, 150% 0, 100% 100%, -50% 100%)" }}
            animate={{ clipPath: "polygon(150% 0, 150% 0, 100% 100%, 100% 100%)" }}
            transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.5 }}
            onAnimationComplete={() => setInitWipe(false)}
          />
        )}
        {isWiping && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[#fafafa] pointer-events-none"
            initial={{ clipPath: "polygon(0 0, 0 0, -50% 100%, -50% 100%)" }}
            animate={{ clipPath: "polygon(0 0, 150% 0, 100% 100%, -50% 100%)" }}
            transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.5 }}
            onAnimationComplete={() => router.push("/v2")}
          />
        )}
      </AnimatePresence>

      {/* Film grain overlay */}
      <div className="grain-overlay" />

      {/* ── Top Nav ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/80">
        <div className="flex justify-between items-center px-6 md:px-12 py-6 w-full max-w-[1920px] mx-auto">
          <div className="text-xl font-black tracking-tighter text-[#e2e2e2]">DEVYAJI</div>
          <div className="hidden md:flex gap-12">
            {(["EXPERIENCE", "WORK", "CERTIFICATIONS", "GALLERY"] as const).map((item) => (
              <SpringLink
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[#c3c6d5] hover:text-[#e2e2e2] transition-colors font-bold tracking-tighter uppercase text-sm"
              >
                {item}
              </SpringLink>
            ))}
          </div>
          <div className="flex items-center gap-6">
            {/* The glowing, magnetic element Toggle UI */}
            <div onClick={() => setIsWiping(true)}>
              <MagneticButton className="group flex items-center justify-center w-10 h-10 rounded-full border border-inverse-primary/50 text-inverse-primary hover:bg-inverse-primary hover:text-black transition-all shadow-[0_0_15px_rgba(18,74,240,0.4)] hover:shadow-[0_0_25px_rgba(18,74,240,0.8)] cursor-pointer">
                <span className="material-symbols-outlined text-[18px] leading-none">contrast</span>
              </MagneticButton>
            </div>

            <MagneticButton
              href="#"
              className="bg-primary-container text-on-primary-container px-6 py-2 font-bold tracking-tighter uppercase text-sm"
            >
              SCHEDULE A CALL
            </MagneticButton>
          </div>
        </div>
      </nav>

      {/* ── Side Nav ─────────────────────────────────────────────── */}
      <aside className="fixed left-0 top-0 h-full w-20 bg-[#0e0e0e] border-r border-[#434653]/15 hidden lg:flex flex-col items-center py-8 z-40">
        <div className="mb-12">
          <span className="text-lg font-bold text-[#e2e2e2]">DEVYAJi</span>
        </div>
        <div className="flex flex-col gap-12 flex-grow justify-center">
          <div className="group flex flex-col items-center gap-2 cursor-pointer transition-all duration-500 text-[#8d909e] hover:text-[#124af0]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>location_on</span>
            <span className="uppercase tracking-[0.1rem] text-[8px] rotate-180 [writing-mode:vertical-lr]">METRO MANILA</span>
          </div>
          <div className="group flex flex-col items-center gap-2 cursor-pointer transition-all duration-500 text-[#8d909e] hover:text-[#124af0]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>emoji_events</span>
            <span className="uppercase tracking-[0.1rem] text-[8px] rotate-180 [writing-mode:vertical-lr]">DEV CAMP FINALIST</span>
          </div>
          <div className="group flex flex-col items-center gap-2 cursor-pointer transition-all duration-500 text-[#124af0] border-r-2 border-[#124af0]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
            <span className="uppercase tracking-[0.1rem] text-[8px] rotate-180 [writing-mode:vertical-lr]">CTO @ SEEGLA</span>
          </div>
        </div>
        <div className="mt-auto">
          <div className="w-10 h-10 bg-surface-container-high border border-outline-variant/20 flex items-center justify-center overflow-hidden">
            <Image
              src="/portfolio/dcon.jpg"
              alt="John Rey Bisnar Calipes"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────── */}
      <main className="lg:pl-20 relative">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          style={{ position: "relative" }}
          className="relative min-h-[800px] flex items-center pt-32 pb-24 px-6 md:px-12 overflow-hidden"
        >
          {/* Cinematic Depth — Layer 1: ghost typography (recedes deepest on scroll) */}
          <motion.div
            style={{ y: bgTextY }}
            className="absolute inset-0 z-0 flex flex-col justify-center items-center pointer-events-none opacity-40 overflow-hidden"
          >
            <div className="text-[18vw] font-black leading-[0.8] tracking-tighter text-outline select-none whitespace-nowrap -ml-[20%]">JOHN REY</div>
            <div className="text-[18vw] font-black leading-[0.8] tracking-tighter text-outline select-none whitespace-nowrap -mr-[10%]">BISNAR</div>
            <div className="text-[18vw] font-black leading-[0.8] tracking-tighter text-outline select-none whitespace-nowrap -ml-[30%]">CALIPES</div>
          </motion.div>

          <div className="grid md:grid-cols-2 w-full max-w-7xl mx-auto items-center relative">

            {/* Cinematic Depth — Layer 2: content (entrance stagger) */}
            <motion.div
              className="order-2 md:order-1 flex flex-col gap-8 relative z-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.div variants={fadeUp} custom={0} className="flex flex-wrap gap-4">
                {[
                  "Metro Manila, Philippines",
                  "Developer Camp Manila 2026 Finalist",
                  "CO-FOUNDER / CTO @ SEEGLA",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 border border-outline-variant/30 text-[10px] tracking-widest font-bold text-on-surface-variant uppercase bg-surface-container/50 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={0.1}
                className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85] drop-shadow-2xl flex flex-col"
              >
                <StaggeredText text="DEV" className="text-on-surface" delay={0.1} />
                <StaggeredText text="YAJI" className="text-inverse-primary" delay={0.25} />
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="text-xl md:text-2xl font-light text-on-surface-variant max-w-lg leading-relaxed bg-black/40 backdrop-blur-md p-2 -ml-2 inline-block"
              >
                AI \ Full-Stack Software Engineer \ CTO
              </motion.p>

              <motion.div variants={fadeUp} custom={0.3} className="flex items-center gap-12 mt-4">
                <MagneticButton
                  href="#"
                  className="bg-primary-container text-on-primary-container px-10 py-5 font-black text-lg tracking-tighter uppercase"
                >
                  SCHEDULE A CALL
                </MagneticButton>
                <SpringLink href="#" className="flex items-center gap-3 font-bold text-sm tracking-widest uppercase hover:text-inverse-primary transition-colors">
                  Read my blog
                  <span className="material-symbols-outlined transform">arrow_right_alt</span>
                </SpringLink>
              </motion.div>
            </motion.div>

            {/* Cinematic Depth — Layer 3: mascot (floats forward, parallax mid-speed) */}
            <motion.div
              style={{ y: mascotY, scale: mascotScale }}
              className="order-1 md:order-2 flex justify-center md:justify-end mb-12 md:mb-0 relative z-30 pointer-events-none"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1.1 }}
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 1.4, ease: [0.25, 0, 0, 1] }}
            >
              <div className="relative w-3/4 md:w-[80%] lg:w-[85%] aspect-[4/5] mx-auto">

                <Image
                  src="/portfolio/screen-hero.png"
                  alt="JRBC mascot"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain z-10"
                  style={{
                    filter: "drop-shadow(0 0 100px rgba(18,74,240,0.6)) contrast(1.15)",
                  }}
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── About ────────────────────────────────────────────── */}
        <section className="py-32 px-6 md:px-12 bg-black">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 flex items-center justify-center relative order-last md:order-first">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-inverse-primary/10 blur-[100px] rounded-full" />
                <Image
                  src="/portfolio/screen-about.jpg"
                  alt="Mascot working on a laptop"
                  width={500}
                  height={600}
                  className="w-full h-auto relative z-10"
                  style={{
                    mixBlendMode: "lighten",
                    filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.8)) contrast(1.1)",
                  }}
                />
              </div>
            </div>
            <motion.div
              className="md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            >
              <motion.h2 variants={fadeUp} className="text-xs text-outline-variant tracking-[0.4em] uppercase mb-12">// THE ARCHITECT</motion.h2>
              <motion.p variants={fadeUp} className="text-3xl md:text-4xl font-light leading-[1.6] text-on-surface">
                I&apos;m a{" "}
                <span className="text-white font-bold">full-stack software engineer</span>{" "}
                specialising in JavaScript, Python, and AI integration. As the{" "}
                <span className="text-inverse-primary font-black italic">CTO of SEEGLA</span>
                , I focus on building intelligent solutions that bridge the gap between complex
                backend systems and intuitive user experiences.
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg text-on-surface-variant mt-12 leading-relaxed max-w-xl">
                From leading vet clinic system developments to competing in Manila&apos;s top
                developer camps, I am dedicated to scaling technology that matters. Every line
                of code is a brushstroke in the digital gallery.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── Experience ───────────────────────────────────────── */}
        <section className="py-32 px-6 md:px-12 bg-black" id="experience">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xs text-outline-variant tracking-[0.4em] uppercase mb-20">// CHRONOLOGY</h2>
            <div className="flex flex-col">
              {experience.map((item, i) => (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                  variants={fadeUp}
                  custom={i * 0.1}
                  key={i}
                  className={`group border-t ${i === experience.length - 1 ? "border-b" : ""} border-outline-variant/10 py-12 flex flex-col md:flex-row md:items-end justify-between hover:bg-surface-container-low transition-colors px-4`}
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-outline-variant font-bold text-sm tracking-widest uppercase">{item.year}</span>
                    <h3 className="text-5xl md:text-7xl font-black text-on-surface uppercase tracking-tighter group-hover:text-inverse-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-outline-variant text-sm font-light mt-4 md:mt-0">{item.role}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Work / Arsenal ───────────────────────────────────── */}
        <section className="py-32 px-6 md:px-12 bg-black" id="work">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start relative">
            <div className="lg:col-span-4 flex flex-col gap-12 h-fit self-start lg:sticky lg:top-32">
              <h2 className="text-xs text-outline-variant tracking-[0.4em] uppercase">// ARSENAL</h2>
              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-[10px] text-outline-variant tracking-widest block mb-4 uppercase">Frontend / Interface</span>
                  <div className="flex flex-wrap gap-2">
                    {["JS (ES6+)", "REACT", "VUE", "TAILWIND"].map((t) => (
                      <span key={t} className="px-4 py-2 bg-surface-container-high text-xs font-bold border border-outline-variant/10">{t}</span>
                    ))}
                    <span className="px-4 py-2 bg-inverse-primary text-white text-xs font-bold">NEXT.JS</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-outline-variant tracking-widest block mb-4 uppercase">Backend / Intelligent</span>
                  <div className="flex flex-wrap gap-2">
                    {["NODE.JS", "PYTHON", "AI INTEGRATION"].map((t) => (
                      <span key={t} className="px-4 py-2 bg-surface-container-high text-xs font-bold border border-outline-variant/10">{t}</span>
                    ))}
                    <span className="px-4 py-2 bg-inverse-primary text-white text-xs font-bold">FAST API</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-outline-variant tracking-widest block mb-4 uppercase">Infrastructure</span>
                  <div className="flex flex-wrap gap-2">
                    {["AWS", "DOCKER", "K8S"].map((t) => (
                      <span key={t} className="px-4 py-2 bg-surface-container-high text-xs font-bold border border-outline-variant/10">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <h2 className="text-xs text-outline-variant tracking-[0.4em] uppercase mb-12 lg:text-right">// FEATURED CASE STUDIES</h2>

              <div className="flex flex-col gap-[50vh] pb-32">
                {projects
                  .filter((p) => ["HOTEL SUPER SYSTEM", "PAWS VET CLINIC", "THRIFTUP"].includes(p.title))
                  .map((p, i) => (
                    <motion.div
                      key={p.num}
                      className={`group sticky w-full h-[60vh] md:h-[80vh] bg-surface-container-lowest overflow-hidden border-t border-outline-variant/20 shadow-2xl ${i === 0 ? "top-32 z-10" : i === 1 ? "top-40 z-20" : "top-48 z-30"
                        }`}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                    >
                      <Image
                        src={p.img}
                        alt={p.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top opacity-60 group-hover:opacity-100 group-hover:object-bottom transition-all duration-[3000ms] ease-in-out"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 bg-gradient-to-t from-surface via-surface/40 to-transparent pointer-events-none z-10">
                        <div className="flex justify-between items-end w-full">
                          <div>
                            <span className="text-inverse-primary font-black tracking-widest text-xs mb-2 block uppercase">
                              {p.num} / {p.category}
                            </span>
                            <h3 className="text-4xl md:text-5xl font-black text-on-surface uppercase tracking-tighter">{p.title}</h3>
                          </div>
                          <span className="hidden md:block text-[10px] font-mono tracking-wider text-outline-variant uppercase text-right max-w-[150px] leading-tight">
                            {p.metadata}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>

              {/* View All CTA */}
              <div className="mt-12 flex justify-end">
                <Link href="/projects" className="group inline-flex items-center gap-4 text-xl md:text-2xl font-black tracking-widest uppercase text-white hover:text-inverse-primary transition-colors">
                  VIEW ALL PROJECTS
                  <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Certifications marquee ────────────────────────────── */}
        <section className="py-20 border-y border-outline-variant/10 overflow-hidden" id="certifications">
          <div className="flex whitespace-nowrap animate-marquee">
            {[0, 1].map((pass) => (
              <div key={pass} className="flex gap-20 items-center px-10">
                {certs.map((cert) => (
                  <span key={`${pass}-${cert}`} className="contents">
                    <span className="text-4xl md:text-6xl font-black text-outline uppercase">{cert}</span>
                    <span className="material-symbols-outlined text-inverse-primary">verified</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── Gallery ──────────────────────────────────────────── */}
        <section className="py-32 px-6 md:px-12 bg-black" id="gallery">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xs text-outline-variant tracking-[0.4em] uppercase mb-20 text-center">// FIELD NOTES</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {gallery.map((item, index) => (
                <AntigravityItem speed={index % 2 === 0 ? 0.9 : 1.1} key={item.label} className="relative overflow-hidden group break-inside-avoid mb-8 block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                    <Image
                      src={item.img}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="pt-4 border-t border-outline-variant/10 mt-2">
                    <span className="text-[10px] text-outline-variant tracking-widest uppercase font-bold">{item.label}</span>
                  </div>
                </AntigravityItem>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────── */}
        <footer className="bg-[#0e0e0e] border-t border-[#434653]/15">
          <div className="flex flex-col md:flex-row justify-between items-center px-12 py-10 w-full gap-6 max-w-[1920px] mx-auto">
            <div className="text-[#8d909e] uppercase tracking-widest text-[11px] font-medium text-center md:text-left">
              © 2026 JOHN REY BISNAR CALIPES. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-10">
              {["X", "LINKEDIN", "GITHUB", "READ MY BLOG"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[#8d909e] hover:text-[#124af0] transition-colors uppercase tracking-widest text-[11px] font-medium opacity-80 hover:opacity-100 duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="text-[#e2e2e2] text-xl font-black tracking-tighter">DEVYAJI</div>
          </div>
        </footer>
      </main>

      {/* ── Mobile Bottom Nav ──────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#131313]/90 backdrop-blur-xl z-50 border-t border-outline-variant/10">
        <div className="flex justify-around items-center py-4">
          {[
            { href: "#experience", icon: "timeline", label: "Exp", active: false },
            { href: "#work", icon: "terminal", label: "Work", active: false },
            { href: "#gallery", icon: "collections", label: "Life", active: false },
            { href: "#", icon: "calendar_today", label: "Call", active: true },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center ${item.active ? "text-[#124af0]" : "text-[#8d909e] hover:text-[#124af0]"}`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: item.active ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="text-[8px] uppercase tracking-widest font-bold mt-1">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
