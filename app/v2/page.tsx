"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const fastFade: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: "easeOut" },
  }),
};

/* ─── Data ─── */
const experience = [
  { year: "2026–Present", title: "Chief Technology Officer", role: "SEEGLA" },
  { year: "A.Y 2025–2026", title: "Whole Section Lead Developer", role: "3rd Year School Projects" },
  { year: "A.Y 2024–2025", title: "Group Lead Developer", role: "2nd Year School Projects" },
  { year: "A.Y 2023–2024", title: "Group Lead Developer", role: "1st Year School Projects" },
];

const projects = [
  // SCHOOL PROJECTS
  { title: "PAWS VET CLINIC", category: "AI / HEALTHCARE", tags: ["Python", "Docker", "Next.js"], type: "school", metadata: "3rd Yr / 2nd Sem" },
  { title: "GYMNAZO ACADEMY", category: "EDUCATION", tags: ["React", "Node.js", "Postgres"], type: "school", metadata: "3rd Yr / 1st Sem" },
  { title: "SKYULAR PORTAL", category: "EDUCATION", tags: ["Vue", "Tailwind", "Firebase"], type: "school", metadata: "2nd Yr / 2nd Sem" },
  { title: "PAWSITIVITY", category: "COMMUNITY", tags: ["HTML/CSS", "JavaScript", "PHP"], type: "school", metadata: "2nd Yr / 1st Sem" },
  { title: "SMART BUILDING", category: "IOT / HARDWARE", tags: ["Arduino", "C++", "IoT"], type: "school", metadata: "1st Yr / 2nd Sem" },
  { title: "KYUSIFIT", category: "HEALTH", tags: ["Java", "Android", "SQL"], type: "school", metadata: "1st Yr / 1st Sem" },

  // PASSION PROJECTS
  { title: "THRIFTUP", category: "E-COMMERCE", tags: ["React Native", "Node.js", "AWS"], type: "passion", metadata: "Passion Project" },
  { title: "AI ANALYZER", category: "ARTIFICIAL INTELLIGENCE", tags: ["Python", "TensorFlow", "FastAPI"], type: "passion", metadata: "Passion Project" },
  { title: "AMBAGAN", category: "FINANCE / COMMUNITY", tags: ["Next.js", "Tailwind", "Supabase"], type: "passion", metadata: "Passion Project" },

  // COMMISSION PROJECTS
  { title: "HOTEL SUPER SYSTEM", category: "ENTERPRISE", tags: ["React", "Express", "MongoDB"], type: "commission", metadata: "Commissioned Project" },
  { title: "BOARDING HOUSE SYS", category: "MANAGEMENT", tags: ["Vue", "Firebase"], type: "commission", metadata: "Tenant Management" }
];

const certs = [
  "GitHub Actions",
  "CyberSafety Seminar",
];

const gallery = [
  { img: "/portfolio/BWAI.jpg", alt: "Build With Ai Manila 2026 - Break The Pattern Day 1" },
  { img: "/portfolio/microsoft.jpg", alt: "Global AI Manila AgentCamp 2026" },
  { img: "/portfolio/devcamp2.jpg", alt: "Day 1 Developer Camp Manila 2026" },
  { img: "/portfolio/wordpress2.jpg", alt: "WordPress FOSS" },
  { img: "/portfolio/devcamp.jpg", alt: "Day 2 Developer Camp Manila 2026 - Build Day" },
  { img: "/portfolio/wordpress4.jpg", alt: "WordPress FOSS Camanava" },
];

export default function V2Page() {
  const router = useRouter();
  const [isWipingOut, setIsWipingOut] = useState(false);
  const [initWipe, setInitWipe] = useState(true);

  return (
    <div className="bg-white min-h-screen text-zinc-900 selection:bg-zinc-900 selection:text-white font-sans relative z-10 w-full overflow-x-hidden pb-12">

      {/* ── Slash Morph Entrance/Exit Engine ── */}
      <AnimatePresence>
        {initWipe && (
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none bg-[#0e0e0e]"
            initial={{ clipPath: "polygon(0 0, 150% 0, 100% 100%, -50% 100%)" }}
            animate={{ clipPath: "polygon(150% 0, 150% 0, 100% 100%, 100% 100%)" }}
            transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.5 }}
            onAnimationComplete={() => setInitWipe(false)}
          />
        )}
        {isWipingOut && (
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none bg-[#0e0e0e]"
            initial={{ clipPath: "polygon(0 0, 0 0, -50% 100%, -50% 100%)" }}
            animate={{ clipPath: "polygon(0 0, 150% 0, 100% 100%, -50% 100%)" }}
            transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.5 }}
            onAnimationComplete={() => router.push("/")}
          />
        )}
      </AnimatePresence>

      {/* Main minimal container */}
      <main className="max-w-4xl mx-auto px-6 pt-16 pb-12 flex flex-col gap-16">

        {/* Profile Header */}
        <motion.header initial="hidden" animate="visible" variants={fastFade} className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-24 h-24 lg:w-32 lg:h-32 shrink-0 rounded-full overflow-hidden border border-zinc-200">
            <Image
              src="/portfolio/dcon.jpg"
              alt="John Rey Bisnar Calipes"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center py-2 w-full">
            <div className="flex items-start md:items-center justify-between w-full mb-1 flex-col md:flex-row gap-2 md:gap-0">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-zinc-900">John Rey Bisnar Calipes</h1>
                <span className="material-symbols-outlined text-blue-500 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <button
                onClick={() => setIsWipingOut(true)}
                className="w-10 h-10 rounded-full border border-zinc-200 text-zinc-500 hover:bg-zinc-900 hover:border-zinc-900 hover:text-white transition-all transform active:scale-95 flex items-center justify-center shrink-0"
                aria-label="Toggle Theme"
              >
                <span className="material-symbols-outlined text-[18px]">contrast</span>
              </button>
            </div>
            <div className="flex items-center gap-1 text-zinc-600 text-sm mb-1">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              <span>Metro Manila, Philippines</span>
            </div>
            <p className="text-zinc-900 font-medium text-sm mb-4">AI | Full-Stack Software Engineer | CTO</p>

            <div className="flex flex-wrap gap-3">
              <button className="bg-zinc-900 text-white hover:bg-zinc-800 transition-colors py-2 px-4 rounded-md flex items-center gap-2 text-xs font-semibold">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span> Schedule a call
              </button>
              <button className="bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200 transition-colors py-2 px-4 rounded-md flex items-center gap-2 text-xs font-medium">
                <span className="material-symbols-outlined text-[14px]">mail</span> Send Email
              </button>
              <button className="bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200 transition-colors py-2 px-4 rounded-md flex items-center gap-2 text-xs font-medium">
                <span className="material-symbols-outlined text-[14px]">article</span> Read my blog
              </button>
            </div>
          </div>
        </motion.header>

        {/* About */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fastFade}>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 mb-4">About</h2>
          <div className="text-zinc-700 text-[15px] leading-relaxed flex flex-col gap-4">
            <p>
              I'm a <span className="font-semibold text-zinc-900">full-stack software engineer</span> specializing in JavaScript, Python, and AI Integration. As the CTO of <span className="text-blue-600">SEEGLA</span>, I focus on building intelligent systems that bridge the gap between complex backend systems and intuitive user experiences.
            </p>
            <p>
              From leading vet clinic system developments to competing in Manila's top developer camps to scaling technology that matters. Every line of code is a brushstroke in the digital gallery.
            </p>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fastFade}>
          <div className="flex justify-between items-baseline mb-4 border-b border-zinc-100 pb-2">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900">Tech Stack</h2>
            <span className="text-xs font-medium text-zinc-500 cursor-pointer hover:text-zinc-900 hidden sm:block">View All &rsaquo;</span>
          </div>
          <div className="flex flex-col gap-6">
            {/* Frontend Section */}
            <div>
              <h3 className="text-sm font-bold text-zinc-900 mb-3">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "TypeScript", "Next.js", "Tailwind", "React"].map(t => (
                  <span key={t} className="px-3 py-1.5 bg-zinc-100 text-xs font-medium text-zinc-800 rounded-md">{t}</span>
                ))}
              </div>
            </div>

            {/* Backend Section */}
            <div>
              <h3 className="text-sm font-bold text-zinc-900 mb-3">Backend & BaaS</h3>
              <div className="flex flex-wrap gap-2">
                {["Express", "Node.js", "Python", "Supabase", "Firebase", "MongoDB", "PostgreSQL"].map(t => (
                  <span key={t} className="px-3 py-1.5 bg-zinc-100 text-xs font-medium text-zinc-800 rounded-md">{t}</span>
                ))}
              </div>
            </div>

            {/* DevOps / Infrastructure Section */}
            <div>
              <h3 className="text-sm font-bold text-zinc-900 mb-3">DevOps / Infrastructure</h3>
              <div className="flex flex-wrap gap-2">
                {["AWS", "Docker", "Vercel", "Kubernetes"].map(t => (
                  <span key={t} className="px-3 py-1.5 bg-zinc-100 text-xs font-medium text-zinc-800 rounded-md">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fastFade}>
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900">Experience</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12">
            {/* Left Column: Simple List */}
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <span className="text-[13px] text-zinc-500 w-24 shrink-0 mt-0.5">2026–Present</span>
                <div>
                  <h3 className="font-bold text-zinc-900 text-[14px]">CTO – SEEGLA</h3>
                  <p className="text-xs text-zinc-600">Core Architecture & Strategy</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-[13px] text-zinc-500 w-24 shrink-0 mt-0.5">2026–Present</span>
                <div>
                  <h3 className="font-bold text-zinc-900 text-[14px]">AI Ops Engineer</h3>
                  <p className="text-xs text-zinc-600">AI Operations & Systems</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-[13px] text-zinc-500 w-24 shrink-0 mt-0.5">2025</span>
                <div>
                  <h3 className="font-bold text-zinc-900 text-[14px]">Full Stack Software Engineer / DevOps</h3>
                  <p className="text-xs text-zinc-600">3rd Year – 1st Sem</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-[13px] text-zinc-500 w-24 shrink-0 mt-0.5">2025</span>
                <div>
                  <h3 className="font-bold text-zinc-900 text-[14px]">Full Stack Web Dev / Software Engineer</h3>
                  <p className="text-xs text-zinc-600">2nd Year – 2nd Sem</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-[13px] text-zinc-500 w-24 shrink-0 mt-0.5">2024</span>
                <div>
                  <h3 className="font-bold text-zinc-900 text-[14px]">Full Stack Web Developer</h3>
                  <p className="text-xs text-zinc-600">2nd Year – 1st Sem</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-[13px] text-zinc-500 w-24 shrink-0 mt-0.5">2024</span>
                <div>
                  <h3 className="font-bold text-zinc-900 text-[14px]">Arduino Engineer</h3>
                  <p className="text-xs text-zinc-600">1st Year – 2nd Sem</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-[13px] text-zinc-500 w-24 shrink-0 mt-0.5">2023</span>
                <div>
                  <h3 className="font-bold text-zinc-900 text-[14px]">Full Stack Web Developer</h3>
                  <p className="text-xs text-zinc-600">1st Year – 1st Sem</p>
                </div>
              </div>
            </div>

            {/* Right Column: Timeline */}
            <div className="flex flex-col relative before:absolute before:left-[4px] before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-200">
              {/* Item 1 */}
              <div className="relative pl-6 pb-6 w-full flex justify-between items-start group">
                <div className="absolute left-0 top-1 w-[9px] h-[9px] bg-zinc-900 border-2 border-white" />
                <div>
                  <h3 className="font-bold text-zinc-900 text-[14px]">Chief Technology Officer</h3>
                  <p className="text-[13px] text-zinc-600 mt-0.5">SEEGLA</p>
                </div>
                <span className="text-[13px] text-zinc-500 shrink-0">2026–Present</span>
              </div>
              {/* Item 2 */}
              <div className="relative pl-6 pb-6 w-full flex justify-between items-start group">
                <div className="absolute left-0 top-1.5 w-[9px] h-[9px] border-2 border-zinc-300 bg-white rounded-full" />
                <div>
                  <h3 className="font-bold text-zinc-900 text-[14px]">Whole Section Lead Developer</h3>
                  <p className="text-[13px] text-zinc-600 mt-0.5">3rd Year School Projects</p>
                </div>
                <span className="text-[13px] text-zinc-500 shrink-0">A.Y 2025–2026</span>
              </div>
              {/* Item 3 */}
              <div className="relative pl-6 pb-6 w-full flex justify-between items-start group">
                <div className="absolute left-0 top-1.5 w-[9px] h-[9px] border-2 border-zinc-300 bg-white rounded-full" />
                <div>
                  <h3 className="font-bold text-zinc-900 text-[14px]">Group Lead Developer</h3>
                  <p className="text-[13px] text-zinc-600 mt-0.5">2nd Year School Projects</p>
                </div>
                <span className="text-[13px] text-zinc-500 shrink-0">A.Y 2024–2025</span>
              </div>
              {/* Item 4 */}
              <div className="relative pl-6 w-full flex justify-between items-start group">
                <div className="absolute left-0 top-1.5 w-[9px] h-[9px] border-2 border-zinc-300 bg-white rounded-full" />
                <div>
                  <h3 className="font-bold text-zinc-900 text-[14px]">Group Lead Developer</h3>
                  <p className="text-[13px] text-zinc-600 mt-0.5">1st Year School Projects</p>
                </div>
                <span className="text-[13px] text-zinc-500 shrink-0">A.Y 2023–2024</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Recent Projects */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fastFade}>
          <div className="flex justify-between items-baseline mb-6 border-b border-zinc-100 pb-2">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900">Recent Projects</h2>
            <span className="text-xs font-medium text-zinc-500 cursor-pointer hover:text-zinc-900 hidden sm:block">View All &rsaquo;</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <div key={i} className="border border-zinc-200 rounded-xl p-5 flex flex-col bg-white hover:border-zinc-300 transition-colors shadow-sm">
                <h3 className="text-[15px] font-bold text-zinc-900 mb-1">{p.title}</h3>
                <span className="text-xs text-zinc-600 mb-4">{p.category}</span>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {p.tags.map(t => (
                    <span key={t} className="px-2 py-1 bg-zinc-100 text-[10px] font-medium text-zinc-700 rounded-md">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Info Grid (Certs, Recs, etc) */}
        <section className="flex flex-col gap-12 pt-4">
          <div className="grid md:grid-cols-[40%_1fr] gap-12">
            {/* Certifications */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fastFade}>
              <div className="flex justify-between items-baseline mb-4">
                <h2 className="text-[16px] font-bold tracking-tight text-zinc-900">Recent Certifications</h2>
                <span className="text-[11px] uppercase tracking-wide font-medium text-zinc-500 cursor-pointer hidden sm:block">View All &rsaquo;</span>
              </div>
              <ul className="flex flex-col border-t border-zinc-100">
                {certs.map((c, i) => (
                  <li key={i} className="text-[13px] text-zinc-700 font-medium py-3 border-b border-zinc-100">{c}</li>
                ))}
              </ul>
            </motion.div>

            {/* Recommendations */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fastFade}>
              <div className="flex justify-between items-baseline mb-4">
                <h2 className="text-[16px] font-bold tracking-tight text-zinc-900">Recommendations</h2>
              </div>
              <p className="text-[14px] text-zinc-800 leading-relaxed font-medium">
                "An advocate at heart who consistently encourages others to pursue this path. He is always helping and teaching us about the new technologies he learns, generously sharing his knowledge with others."
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <div className="w-10 h-[1px] bg-zinc-300"></div>
                <p className="text-[12px] text-zinc-500 font-medium">— Peer / Friend</p>
              </div>
            </motion.div>
          </div>

          {/* Org & Socials (4 Cols) */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fastFade} className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-100 pt-8">
            <div>
              <h2 className="text-[15px] font-bold tracking-tight text-zinc-900 mb-3">A member of</h2>
              <ul className="text-[13px] text-zinc-800 flex flex-col gap-4 font-medium">
                <li>Amazon Web Services Learning Club - Quezon City University</li>
                <li className="pt-4 border-t border-zinc-100">Developer Camp - Quezon City</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[15px] font-bold tracking-tight text-zinc-900 mb-3">Social Links</h2>
              <ul className="text-[13px] font-medium text-zinc-700 flex flex-col gap-3">
                <li className="flex items-center gap-2 text-zinc-900 hover:opacity-70 cursor-pointer transition-opacity">
                  <a href="https://www.linkedin.com/in/john-rey-calipes-059187351/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-zinc-900 rounded-[4px] flex items-center justify-center text-white">
                      <span className="text-[10px] font-bold">in</span>
                    </div>
                    LinkedIn
                  </a>
                </li>

                <li className="flex items-center gap-2 text-zinc-900 hover:opacity-70 cursor-pointer transition-opacity">
                  <a href="https://github.com/OpenYaji" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-zinc-900 rounded-full flex items-center justify-center text-white">
                      <span className="text-[10px] font-bold">gh</span>
                    </div>
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[15px] font-bold tracking-tight text-zinc-900 mb-3">Speaking & Talks</h2>
              <p className="text-[13px] text-zinc-800 font-medium leading-relaxed">
                My goal for 2026 is to share my journey and insights through public speaking, focusing on software development and emerging technologies.
              </p>
            </div>

            <div>
              <h2 className="text-[15px] font-bold tracking-tight text-zinc-900 mb-3">Get in touch</h2>
              <ul className="text-[13px] font-medium text-zinc-900 flex flex-col gap-4">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] mt-0.5 font-light">mail</span>
                  <div className="leading-tight">
                    <span className="block mb-0.5">Email</span>
                    <span className="text-zinc-500 text-xs">johnreybisnarcalipes@gmail.com</span>
                  </div>
                </li>
                <li className="flex items-start justify-between cursor-pointer group">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] mt-0.5 font-light">chat</span>
                    <div className="leading-tight">
                      <span className="block mb-0.5">Let's Talk</span>
                      <span className="text-zinc-500 text-xs">Schedule a Call</span>
                    </div>
                  </div>
                  <span className="text-zinc-400 font-light group-hover:translate-x-1 transition-transform">&rsaquo;</span>
                </li>
                <li className="flex items-start justify-between cursor-pointer group pt-1">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[16px] mt-0.5 font-light">article</span>
                    <div className="leading-tight">
                      <span className="block mb-0.5">Blog</span>
                      <span className="text-zinc-500 text-xs">Read my blog</span>
                    </div>
                  </div>
                  <span className="text-zinc-400 font-light group-hover:translate-x-1 transition-transform">&rsaquo;</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* Gallery */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fastFade} className="pt-8 border-t border-zinc-100">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 mb-6">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {gallery.map((g, i) => (
              <div key={i} className="aspect-square bg-zinc-200 relative overflow-hidden rounded-md">
                <Image
                  src={g.img}
                  alt={g.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 pt-12 pb-8 flex flex-col md:flex-row justify-between items-center text-[13px] font-medium text-zinc-700 border-t border-zinc-100">
        <p>© 2026 John Rey Bisnar Calipes. All rights reserved.</p>
        <div className="flex items-center gap-4 mt-4 md:mt-0 font-bold">
          <div className="flex items-center gap-2 mr-2">
            <span className="material-symbols-outlined text-[18px] cursor-pointer hover:opacity-70">close</span>
            <span className="material-symbols-outlined text-[18px] cursor-pointer hover:opacity-70">play_arrow</span>
            <span className="material-symbols-outlined text-[18px] cursor-pointer hover:opacity-70">link</span>
          </div>
          <button className="flex items-center gap-2 border px-4 py-2 rounded-md bg-[#dd5c35] text-white hover:bg-[#c7502c] transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[16px]">call</span> Schedule a Call
          </button>
        </div>
      </footer>

      {/* Mobile Toggle Button for fast minimal-to-cinematic */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button
          onClick={() => setIsWipingOut(true)}
          className="w-12 h-12 rounded-full border border-zinc-900 bg-white shadow-lg text-zinc-900 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all transform active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">contrast</span>
        </button>
      </div>

    </div>
  );
}
