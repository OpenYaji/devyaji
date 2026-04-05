"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const APPS = [
  { id: "projects", label: "Finder", icon: "folder", iconBg: "bg-gradient-to-b from-blue-300 to-blue-600 border border-blue-400/50", iconColor: "text-white" },
  { id: "browser", label: "Safari", icon: "explore", iconBg: "bg-gradient-to-b from-white to-slate-200 border border-slate-300", iconColor: "text-blue-500" },
  { id: "certificates", label: "Experience", icon: "workspace_premium", iconBg: "bg-gradient-to-b from-yellow-400 to-orange-500 border border-yellow-300/50", iconColor: "text-white" },
  { id: "techstack", label: "Terminal", icon: "terminal", iconBg: "bg-gradient-to-b from-zinc-700 to-zinc-900 border border-zinc-700", iconColor: "text-green-400" },
  { id: "gallery", label: "Photos", icon: "photo_library", iconBg: "bg-gradient-to-tr from-yellow-300 via-pink-500 to-purple-600 border border-pink-400/50", iconColor: "text-white" },
  { id: "about", label: "Contacts", icon: "person", iconBg: "bg-gradient-to-b from-slate-300 to-slate-400 border border-slate-300/50", iconColor: "text-white" },
  { id: "wheel", label: "Spin Wheel", icon: "change_circle", iconBg: "bg-gradient-to-tr from-orange-400 via-red-500 to-pink-500 border border-red-400/50", iconColor: "text-white" },
];

export default function V4Page() {
  const router = useRouter();

  // WIPE TRANSITION STATE
  const [initWipe, setInitWipe] = useState(true);
  const [targetRoute, setTargetRoute] = useState<string | null>(null);

  // CLOCK
  const [time, setTime] = useState<string>("");

  // DESKTOP STATE
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [fullscreenApps, setFullscreenApps] = useState<string[]>([]);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const openApp = (appId: string) => {
    setActiveApp(appId);
    if (!openApps.includes(appId)) {
      setOpenApps([...openApps, appId]);
    }
  };

  const closeApp = (appId: string) => {
    setOpenApps(openApps.filter((id) => id !== appId));
    setFullscreenApps(fullscreenApps.filter((id) => id !== appId)); // Also remove from fullscreen state
    if (activeApp === appId) {
      setActiveApp(openApps.length > 1 ? openApps[openApps.length - 2] : null);
    }
  };

  const toggleFullscreen = (appId: string) => {
    setFullscreenApps(prev => prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]);
    setActiveApp(appId);
  };

  const getAppIndex = (appId: string) => {
    return activeApp === appId ? 50 : 10 + openApps.indexOf(appId);
  };

  return (
    <>
      <AnimatePresence>
        {initWipe && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[#0E0E10] pointer-events-none"
            initial={{ clipPath: "polygon(0 0, 150% 0, 100% 100%, -50% 100%)" }}
            animate={{ clipPath: "polygon(150% 0, 150% 0, 100% 100%, 100% 100%)" }}
            transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.5 }}
            onAnimationComplete={() => setInitWipe(false)}
          />
        )}
        {targetRoute && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[#0E0E10] pointer-events-none"
            initial={{ clipPath: "polygon(0 0, 0 0, -50% 100%, -50% 100%)" }}
            animate={{ clipPath: "polygon(0 0, 150% 0, 100% 100%, -50% 100%)" }}
            transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.5 }}
            onAnimationComplete={() => router.push(targetRoute)}
          />
        )}
      </AnimatePresence>

      <div className="h-screen w-screen overflow-hidden bg-cover bg-center relative text-white font-sans selection:bg-blue-500/30 selection:text-white"
        style={{ backgroundImage: "url('https://i.pinimg.com/originals/fb/8b/e6/fb8be60f4b8c6c3ec6b5024ce9fde65f.jpg')" }}>

        {/* TOP MENU BAR */}
        <div className="absolute top-0 left-0 right-0 h-7 backdrop-blur-md bg-black/40 border-b border-white/10 z-[100] flex items-center justify-between px-4 text-xs font-medium">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 cursor-default">
              <span className="material-symbols-outlined text-[14px]">DEVYAJI</span>
              <span className="font-bold">Portfolio</span>
              <span className="hidden sm:inline hover:bg-white/10 px-1 rounded transition-colors">File</span>
              <span className="hidden sm:inline hover:bg-white/10 px-1 rounded transition-colors">Edit</span>
              <span className="hidden sm:inline hover:bg-white/10 px-1 rounded transition-colors">View</span>
            </div>

            {/* THEME MENU / DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setIsThemeMenuOpen(true)}
              onMouseLeave={() => setIsThemeMenuOpen(false)}
            >
              <div className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1">
                Theme
              </div>
              <AnimatePresence>
                {isThemeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 mt-1 w-48 bg-zinc-900/90 backdrop-blur-3xl border border-white/10 rounded-lg shadow-2xl py-1 overflow-hidden"
                  >
                    <button onClick={() => setTargetRoute("/")} className="w-full px-4 py-1.5 text-left hover:bg-blue-600 text-xs flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">dark_mode</span> Cinematic
                    </button>
                    <button onClick={() => setTargetRoute("/v2")} className="w-full px-4 py-1.5 text-left hover:bg-blue-600 text-xs flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">light_mode</span> Minimalist
                    </button>
                    <button onClick={() => setTargetRoute("/v3")} className="w-full px-4 py-1.5 text-left hover:bg-blue-600 text-xs flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">grid_view</span> Bento
                    </button>
                    <button className="w-full px-4 py-1.5 text-left bg-white/10 text-xs flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">desktop_mac</span> MacOS
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[14px] hidden sm:block">wifi</span>
            <span className="material-symbols-outlined text-[14px] hidden sm:block">battery_full</span>
            <span>{time}</span>
          </div>
        </div>

        {/* DOCK */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[100]">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 p-2 rounded-2xl flex items-end gap-2 shadow-2xl">
            {APPS.map((app) => (
              <div key={app.id} className="relative group cursor-pointer" onClick={() => openApp(app.id)}>
                {/* TOOLTIP */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {app.label}
                </div>

                {/* DOCK ICON */}
                <motion.div
                  className={`w-12 h-12 rounded-[22.5%] flex items-center justify-center shadow-lg ${app.iconBg} ${app.iconColor}`}
                  whileHover={{ scale: 1.25, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="material-symbols-outlined text-[28px] drop-shadow-sm">{app.icon}</span>
                </motion.div>

                {/* ACTIVE DOT */}
                {openApps.includes(app.id) && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* APPLICATION WINDOWS */}
        {APPS.map((app) => {
          if (!openApps.includes(app.id)) return null;

          const isFullscreen = fullscreenApps.includes(app.id);

          return (
            <motion.div
              key={app.id}
              drag={!isFullscreen}
              dragMomentum={false}
              dragElastic={0}
              onMouseDown={() => setActiveApp(app.id)}
              initial={{ scale: 0.9, opacity: 0, x: "-50%", y: "-50%" }}
              animate={{
                scale: 1,
                opacity: 1,
                x: isFullscreen ? "0%" : "-50%",
                y: isFullscreen ? "0%" : "-50%",
                width: isFullscreen ? "100vw" : undefined,
                height: isFullscreen ? "calc(100vh - 28px)" : undefined,
                top: isFullscreen ? "28px" : "50%",
                left: isFullscreen ? "0px" : "50%",
                borderRadius: isFullscreen ? "0px" : "1rem"
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ zIndex: getAppIndex(app.id) }}
              onPointerDownCapture={(e) => {
                if (isFullscreen) return; // Disable resize catching in fullscreen
                const target = e.currentTarget as HTMLElement;
                const rect = target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                if (x > rect.width - 24 && y > rect.height - 24) {
                  e.stopPropagation();
                }
              }}
              className={`absolute flex flex-col bg-zinc-900/80 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 ${isFullscreen ? "rounded-none" : "min-w-[320px] min-h-[300px] w-[90vw] max-w-4xl h-[80vh] max-h-[600px] rounded-2xl resize"
                }`}
            >
              {/* WINDOW HEADER */}
              <div className="h-12 bg-black/20 border-b border-white/5 flex items-center justify-center relative cursor-move">
                <div className="absolute left-4 flex gap-2">
                  <button onClick={() => closeApp(app.id)} className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center group">
                    <span className="material-symbols-outlined text-[10px] text-zinc-900 opacity-0 group-hover:opacity-100">close</span>
                  </button>
                  <button className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center group">
                    <span className="material-symbols-outlined text-[10px] text-zinc-900 opacity-0 group-hover:opacity-100">remove</span>
                  </button>
                  <button onClick={() => toggleFullscreen(app.id)} className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center group flex-shrink-0">
                    <span className="material-symbols-outlined text-[10px] text-zinc-900 opacity-0 group-hover:opacity-100">
                      {isFullscreen ? "fullscreen_exit" : "expand_content"}
                    </span>
                  </button>
                </div>
                <span className="text-sm font-semibold text-zinc-300">{app.label}</span>
              </div>

              {/* WINDOW CONTENT */}
              <div
                className="flex-1 overflow-y-auto p-6 cursor-default relative bg-zinc-900/40"
                onPointerDownCapture={(e) => e.stopPropagation()}
                onWheelCapture={(e) => e.stopPropagation()}
              >
                {app.id === "projects" && <ProjectsArea />}
                {app.id === "browser" && <BrowserArea />}
                {app.id === "certificates" && <CertificatesArea />}
                {app.id === "techstack" && <TechStackArea />}
                {app.id === "gallery" && <GalleryArea />}
                {app.id === "about" && <AboutArea />}
                {app.id === "wheel" && <WheelArea />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

/* =========================================
   APP WINDOW COMPONENTS
========================================= */

function BrowserArea() {
  const [history, setHistory] = useState<string[]>(["https://example.com"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputUrl, setInputUrl] = useState("https://example.com");
  const [reloadKey, setReloadKey] = useState(0);

  const currentUrl = history[currentIndex];

  const navigate = (newUrl: string) => {
    let finalUrl = newUrl.trim();
    if (!finalUrl) return;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(finalUrl);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setInputUrl(finalUrl);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setInputUrl(history[currentIndex - 1]);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setInputUrl(history[currentIndex + 1]);
    }
  };

  const reload = () => setReloadKey(k => k + 1);

  return (
    <div className="absolute inset-0 flex flex-col bg-white text-black overflow-hidden rounded-b-2xl">
      {/* Safari Toolbar */}
      <div className="flex items-center justify-between gap-4 px-4 py-2 bg-slate-100 border-b border-slate-300">
        <div className="flex gap-3 text-slate-400">
          <span
            className={`material-symbols-outlined text-lg transition-colors ${currentIndex > 0 ? "cursor-pointer hover:text-slate-700 text-slate-600" : "opacity-30"}`}
            onClick={goBack}
          >
            arrow_back_ios
          </span>
          <span
            className={`material-symbols-outlined text-lg transition-colors ${currentIndex < history.length - 1 ? "cursor-pointer hover:text-slate-700 text-slate-600" : "opacity-30"}`}
            onClick={goForward}
          >
            arrow_forward_ios
          </span>
        </div>
        <div className="flex-1 max-w-2xl mx-auto flex items-center bg-white border border-slate-300 rounded-md px-3 py-1 shadow-sm">
          <span className="material-symbols-outlined text-slate-400 text-sm mr-2">lock</span>
          <input
            type="text"
            className="w-full outline-none text-sm bg-transparent"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && navigate(inputUrl)}
          />
          <span className="material-symbols-outlined text-slate-400 text-sm ml-2 cursor-pointer hover:rotate-180 transition-transform duration-300" onClick={reload}>refresh</span>
        </div>
        <div className="flex gap-4 text-slate-500">
          <span className="material-symbols-outlined text-lg cursor-pointer hover:text-blue-500 transition-colors">ios_share</span>
          <span className="material-symbols-outlined text-lg cursor-pointer hover:text-blue-500 transition-colors" onClick={() => navigate("https://google.com")}>add</span>
        </div>
      </div>
      {/* Webview Content */}
      <div className="flex-1 relative bg-slate-50">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 pointer-events-none z-0">
          <span className="material-symbols-outlined text-6xl mb-4 text-slate-300">explore</span>
          <p className="text-sm font-medium">Safari Web View Mockup</p>
          <p className="text-xs mt-2">Loading URL: <span className="text-blue-500">{currentUrl}</span></p>
        </div>
        <iframe
          key={currentUrl + reloadKey}
          src={currentUrl}
          className="w-full h-full relative z-10 bg-white"
          sandbox="allow-scripts allow-same-origin"
          onLoad={(e) => { (e.target as HTMLIFrameElement).style.opacity = '1'; }}
          onError={(e) => { (e.target as HTMLIFrameElement).style.opacity = '0'; }}
        />
      </div>
    </div>
  );
}

function ProjectsArea() {
  const projects = [
    { title: "SMART IoT BUILDING", desc: "Arduino Safety System (1st Yr/2nd Sem)", icon: "apartment", color: "bg-orange-500/20 text-orange-500" },
    { title: "PAWS VET CLINIC", desc: "AI Vet Clinic System (3rd Yr/2nd Sem)", icon: "pets", color: "bg-blue-500/20 text-blue-500" },
    { title: "THRIFTUP", desc: "ThriftUp UI / E-Commerce (Passion Project)", icon: "shopping_bag", color: "bg-green-500/20 text-green-500" },
    { title: "GYMNAZO ACADEMY", desc: "School Management System (3rd Yr/1st Sem)", icon: "school", color: "bg-purple-500/20 text-purple-500" },
    { title: "SKYULAR PORTAL", desc: "QCU Student Portal (2nd Yr/2nd Sem)", icon: "public", color: "bg-red-500/20 text-red-500" },
    { title: "PAWSITIVITY", desc: "Pet Adoption System (2nd Yr/1st Sem)", icon: "volunteer_activism", color: "bg-teal-500/20 text-teal-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
      {projects.map((p, i) => (
        <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl flex gap-4 hover:bg-white/10 transition-colors cursor-pointer">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${p.color}`}>
            <span className="material-symbols-outlined">{p.icon}</span>
          </div>
          <div>
            <h3 className="font-bold text-white mb-1">{p.title}</h3>
            <p className="text-sm text-zinc-400">{p.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CertificatesArea() {
  const experiences = [
    { title: "CTO – SEEGLA", date: "2026 / CURRENT", issuer: "CORE ARCHITECTURE & STRATEGY" },
    { title: "AI OPS ENGINEER", date: "2026 / CURRENT", issuer: "AI OPERATIONS & SYSTEMS" },
    { title: "FULL STACK SOFTWARE ENGINEER / DEVOPS", date: "2025", issuer: "3RD YEAR – 1ST SEM" },
    { title: "FULL STACK WEB DEV / SOFTWARE ENGINEER", date: "2025", issuer: "2ND YEAR – 2ND SEM" },
    { title: "FULL STACK WEB DEVELOPER", date: "2024", issuer: "2ND YEAR – 1ST SEM" },
    { title: "ARDUINO ENGINEER", date: "2024", issuer: "1ST YEAR – 2ND SEM" },
    { title: "FULL STACK WEB DEVELOPER", date: "2023", issuer: "1ST YEAR – 1ST SEM" },
  ];

  return (
    <div className="space-y-4 pb-4">
      {experiences.map((c, i) => (
        <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-500/20 text-yellow-500 rounded-lg flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined">workspace_premium</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white leading-tight">{c.title}</h3>
            <span className="text-xs text-zinc-400">{c.issuer}</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-zinc-500">{c.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function TechStackArea() {
  return (
    <div className="font-mono text-sm h-full flex flex-col pb-4">
      <div className="text-zinc-500 mb-4">Last login: Sun Apr  5 14:48:08 on ttys001</div>
      <div className="text-green-400 flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        neofetch --tech
      </div>
      <div className="text-zinc-300 pl-6 leading-relaxed flex flex-wrap lg:flex-nowrap gap-8">
        <div className="text-blue-400 hidden sm:block">
          <pre>{`
   /\\\\\\\\\\\\     
  /\\\\\\\\\\\\\\\\    
 /\\\\\\\\  \\\\\\\\   
 \\\\\\\\   \\\\\\\\  
  \\\\\\\\  \\\\\\\\  
   \\\\\\\\\\\\\\\\   
    \\\\\\\\\\\\    
          `}</pre>
        </div>
        <div>
          <div className="mb-2"><span className="text-blue-400 font-bold">OS:</span> DevYaji OS v4.0</div>
          <div className="mb-2"><span className="text-blue-400 font-bold">Frontend:</span> JAVASCRIPT, TYPESCRIPT, REACT, VUE, TAILWIND, NEXT.JS</div>
          <div className="mb-2"><span className="text-blue-400 font-bold">Backend/BaaS:</span> EXPRESS, NODE.JS, PYTHON, SUPABASE, FIREBASE, MONGODB, POSTGRESQL</div>
          <div className="mb-2"><span className="text-blue-400 font-bold">DevOps:</span> AWS, DOCKER, VERCEL, KUBERNETES</div>
          <div className="mb-2"><span className="text-blue-400 font-bold">Role:</span> Full-stack Software Engineer</div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-sm text-green-400">chevron_right</span>
        <span className="w-2 h-4 bg-zinc-300 animate-pulse"></span>
      </div>
    </div>
  );
}

function AboutArea() {
  return (
    <div className="flex flex-col md:flex-row gap-8 h-full overflow-y-auto pb-8">
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6 bg-white/5 border border-white/5 rounded-xl h-fit">
        <div className="w-32 h-32 rounded-full border-4 border-white/10 overflow-hidden mb-6 bg-zinc-800">
          <Image
            src="/portfolio/dcon.jpg"
            alt="John Rey Bisnar Calipes"
            width={120}
            height={120}
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>
        <h2 className="text-xl font-bold text-white text-center mb-1">John Rey Bisnar Calipes</h2>
        <p className="text-sm text-blue-400 font-medium text-center uppercase tracking-widest text-[10px]">CTO @ SEEGLA</p>
      </div>
      <div className="w-full md:w-2/3 md:pr-6 md:pt-2">
        <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 uppercase tracking-tight">
          The Architect
        </h3>
        <p className="text-zinc-300 text-sm leading-relaxed mb-4">
          I'm a full-stack software engineer specialising in JavaScript, Python, and AI integration.
          As the CTO of SEEGLA, I focus on building intelligent solutions that bridge the gap between
          complex backend systems and intuitive user experiences.
        </p>
        <p className="text-zinc-300 text-sm leading-relaxed mb-6">
          From leading vet clinic system developments to competing in Manila's top developer camps
          (Developer Camp Manila 2026 Finalist), I am dedicated to scaling technology that matters.
          Every line of code is a brushstroke in the digital gallery.
        </p>
        <div className="flex flex-wrap gap-4 border-t border-white/10 pt-6">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors shadow-lg shadow-blue-500/20">
            Download Resume
          </button>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-lg text-xs font-bold transition-colors">
            Schedule a Call
          </button>
        </div>
      </div>
    </div>
  );
}

function GalleryArea() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const images = [
    "/portfolio/dcon.jpg",
    "/portfolio/devcamp.jpg",
    "/portfolio/devcamp2.jpg",
    "/portfolio/microsoft.jpg",
    "/portfolio/wordpress2.jpg",
    "/portfolio/wordpress4.jpg",
    "/portfolio/BWAI.jpg",
    "/portfolio/pawsmaskot.jpg",
    "/portfolio/smart.jpg",
    "/portfolio/ThriUp.png",
    "/portfolio/tup.png"
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-4">
        {images.map((src, i) => (
          <div
            key={i}
            onClick={() => setSelectedImg(src)}
            className="relative group rounded-xl overflow-hidden aspect-video bg-zinc-800 border border-white/10 cursor-pointer"
          >
            <Image
              src={src}
              alt={`Gallery image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-3xl drop-shadow-md">fullscreen</span>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-red-400 transition-colors z-50">
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full h-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImg}
                alt="Fullscreen gallery view"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface WheelOption {
  id: string;
  text: string;
  color: string;
}

function WheelArea() {
  const [options, setOptions] = useState<WheelOption[]>([
    { id: "1", text: "Game 1", color: "#f43f5e" },
    { id: "2", text: "Game 2", color: "#3b82f6" },
    { id: "3", text: "Game 3", color: "#10b981" },
    { id: "4", text: "Study", color: "#f59e0b" },
    { id: "5", text: "Sleep", color: "#8b5cf6" },
    { id: "6", text: "Anime", color: "#ec4899" },
    { id: "7", text: "Code", color: "#06b6d4" }
  ]);
  const [newOption, setNewOption] = useState("");
  const [newColor, setNewColor] = useState("#eab308");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<WheelOption | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [eliminationMode, setEliminationMode] = useState(false);
  const [baseOptions, setBaseOptions] = useState<WheelOption[]>([
    { id: "1", text: "Game 1", color: "#f43f5e" },
    { id: "2", text: "Game 2", color: "#3b82f6" },
    { id: "3", text: "Game 3", color: "#10b981" },
    { id: "4", text: "Study", color: "#f59e0b" },
    { id: "5", text: "Sleep", color: "#8b5cf6" },
    { id: "6", text: "Anime", color: "#ec4899" },
    { id: "7", text: "Code", color: "#06b6d4" }
  ]);
  const [pickedOptions, setPickedOptions] = useState<WheelOption[]>([]);

  useEffect(() => {
    try {
      const savedElim = localStorage.getItem("devyaji_wheel_elimination");
      if (savedElim) setEliminationMode(savedElim === "true");

      const saved = localStorage.getItem("devyaji_wheel_options");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Backward compatibility check for old string-based options
          if (typeof parsed[0] === 'string') {
            const migrated = parsed.map((text, i) => ({
              id: Math.random().toString(36).substring(7),
              text: text as string,
              color: `hsl(${Math.round((i * 360) / Math.max(parsed.length, 1))}, 70%, 60%)`
            }));
            setOptions(migrated);
            setBaseOptions(migrated);
          } else {
            setOptions(parsed);
            setBaseOptions(parsed);
          }
        } else {
          setOptions([]);
          setBaseOptions([]);
        }
      }
    } catch (e) {
      console.error("Could not load wheel options", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleEliminationMode = (val: boolean) => {
    setEliminationMode(val);
    localStorage.setItem("devyaji_wheel_elimination", val.toString());
  };

  const saveOptions = () => {
    localStorage.setItem("devyaji_wheel_options", JSON.stringify(baseOptions));
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  const dismissResult = () => {
    setResult(null);
    if (eliminationMode && options.length <= 1) {
      setOptions(baseOptions);
      setPickedOptions([]);
    }
  };

  const resetGame = () => {
    setOptions(baseOptions);
    setPickedOptions([]);
    setResult(null);
  };

  const addOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOption.trim()) {
      const newOpt = {
        id: Math.random().toString(36).substring(7),
        text: newOption.trim(),
        color: newColor
      };
      setOptions([...options, newOpt]);
      setBaseOptions([...baseOptions, newOpt]);
      setNewOption("");
      const randomColors = ["#f43f5e", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#eab308"];
      setNewColor(randomColors[Math.floor(Math.random() * randomColors.length)]);
    }
  };

  const removeOption = (id: string) => {
    if (isSpinning) return;
    setOptions(options.filter(opt => opt.id !== id));
    setBaseOptions(baseOptions.filter(opt => opt.id !== id));
  };

  const updateOptionColor = (id: string, color: string) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, color } : opt));
    setBaseOptions(baseOptions.map(opt => opt.id === id ? { ...opt, color } : opt));
  };

  const spin = () => {
    if (options.length === 0 || isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    const spinDuration = 4000;
    const extraSpins = Math.floor(5 + Math.random() * 5); // strictly 5 to 9 full spins
    const randomIndex = Math.floor(Math.random() * options.length);
    const sliceAngle = 360 / options.length;
    const wonOption = options[randomIndex];
    
    const extraRotation = extraSpins * 360;
    const targetAngle = 360 - (randomIndex * sliceAngle) - (sliceAngle / 2);
    
    // Calculate final rotation ensuring we land on the correct angle going forward
    const currentAngle = rotation % 360;
    let angleDiff = targetAngle - currentAngle;
    // ensure we always spin forward
    if (angleDiff < 0) {
      angleDiff += 360;
    }

    const finalRotation = rotation + extraRotation + angleDiff;

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(wonOption);
      setPickedOptions(prev => [wonOption, ...prev]);

      if (eliminationMode) {
        setOptions(prev => prev.filter(opt => opt.id !== wonOption.id));
      }
    }, spinDuration);
  };

  const conicGradient = `conic-gradient(${options.map((opt, i) => {
    const start = i * (360 / options.length);
    const end = (i + 1) * (360 / options.length);
    return `${opt.color} ${start}deg ${end}deg`;
  }).join(", ")})`;

  return (
    <div className="flex flex-wrap gap-6 h-full overflow-y-auto overflow-x-hidden pb-8 items-start justify-center p-4">
      {/* Wheel Section */}
      <div className="flex flex-col items-center justify-center relative w-full flex-1 min-w-[260px] max-w-sm">
        {/* Pointer (Top instead of right looks more natural for users, so angle 0 is normally top in CSS, actually in conic-gradient 0 is top). 
            Wait, let's just place the pointer on the right, since 0deg in CSS rotate usually starts from top, but conic gradient starts from top. Let's place it at the top! */}
        <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 z-10 w-8 h-8 pointer-events-none drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]">
          <div className="w-0 h-0 border-x-[16px] border-x-transparent border-t-[28px] border-t-white" />
        </div>
        
        <motion.div 
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-[8px] border-zinc-800 overflow-hidden shadow-2xl flex-shrink-0"
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.15, 0.85, 0.15, 1] }} 
          style={{ background: options.length > 0 ? conicGradient : "#3f3f46" }}
        >
          {options.length > 0 && options.map((opt, i) => {
            const sliceAngle = 360 / options.length;
            const textAngle = (i * sliceAngle) + (sliceAngle / 2);
            return (
              <div 
                key={i} 
                className="absolute top-1/2 left-1/2 origin-left pointer-events-none flex items-center"
                style={{
                  transform: `translateY(-50%) rotate(${textAngle - 90}deg) translateX(40px)`,
                }}
              >
                <span className="text-white font-bold text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] truncate max-w-[80px]">
                  {opt.text}
                </span>
              </div>
            )
          })}
          {options.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-400 font-medium">Add Options</div>
          )}
        </motion.div>

        <button 
          onClick={spin}
          disabled={isSpinning || options.length === 0}
          className="mt-8 w-full max-w-xs px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white font-black uppercase tracking-wider rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
        >
          {isSpinning ? "SPINNING..." : "SPIN THE WHEEL!"}
        </button>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={dismissResult}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-zinc-900/90 backdrop-blur-md px-6 py-4 rounded-2xl border-2 shadow-2xl flex flex-col items-center cursor-pointer transition-transform hover:scale-105 ${
                (result.text.toUpperCase() === "PALDO" || result.text.toUpperCase() === "BWAHAHA") ? "min-w-[320px] max-w-[90vw] p-6" : "whitespace-nowrap"
              }`}
              style={{ borderColor: result.color }}
              title="Click to dismiss"
            >
              <div className="absolute -top-3 -right-3 w-7 h-7 bg-zinc-800 border-2 border-zinc-700 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors shadow-lg z-10">
                <span className="material-symbols-outlined text-[14px]">close</span>
              </div>
              
              {(result.text.toUpperCase() === "PALDO" || result.text.toUpperCase() === "BWAHAHA") ? (
                <div className="flex flex-col items-center w-full">
                  <span className="text-xs text-yellow-400 uppercase tracking-widest mb-3 font-bold animate-pulse">
                    {result.text.toUpperCase() === "BWAHAHA" ? "💀 BAWI NEXT LIFE 💀" : "🎉 Special Jackpot 🎉"}
                  </span>
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)] bg-black mb-3">
                    <video 
                      src={result.text.toUpperCase() === "BWAHAHA" ? "/video/BWAHAHA.mp4" : "/video/paldo.mp4"} 
                      autoPlay 
                      playsInline 
                      className="w-full h-full object-cover"
                      controls={false}
                      loop
                    />
                  </div>
                  <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600 drop-shadow-md">
                    {result.text.toUpperCase()}!
                  </span>
                </div>
              ) : (
                <>
                  <span className="text-xs text-zinc-400 uppercase tracking-widest mb-1">Result</span>
                  <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                    {result.text}
                  </span>
                </>
              )}

              {eliminationMode && options.length <= 1 && (
                <div className="mt-4 text-[10px] font-bold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full animate-pulse border border-pink-500/20 uppercase tracking-wider">
                   Click to Reset & Play Again
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Options Section */}
      <div className="w-full flex-1 min-w-[260px] max-w-sm flex flex-col bg-black/20 p-5 rounded-2xl border border-white/10 h-full max-h-[450px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 shrink-0">
            <span className="material-symbols-outlined text-pink-400 leading-none">tune</span>
            Options
          </h3>
          <button 
            onClick={saveOptions}
            className={`text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors shadow-lg shadow-black/20 shrink-0 ${
              showSaveSuccess 
                ? "bg-green-600/80 text-white" 
                : "bg-blue-600/80 hover:bg-blue-500 text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[14px] leading-none">
              {showSaveSuccess ? "check" : "save"}
            </span>
            {showSaveSuccess ? "Saved!" : "Save"}
          </button>
        </div>
        
        <form onSubmit={addOption} className="flex gap-2 mb-3">
          <div className="relative w-10 h-10 shrink-0 border border-white/10 rounded-lg overflow-hidden cursor-pointer flex items-center justify-center shadow-inner">
            <input 
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="absolute -top-4 -left-4 w-20 h-20 cursor-pointer opacity-0 z-10"
              title="Choose color"
            />
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: newColor }} />
          </div>
          <input 
            type="text" 
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Add new option..."
            className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500 transition-colors placeholder:text-zinc-500"
            maxLength={15}
          />
          <button type="submit" className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </form>

        <div className="flex items-center justify-between px-2 mb-2 pb-3 border-b border-white/5 shrink-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400" title="When enabled, the winning option is removed after the spin">
            Eliminator Mode
          </span>
          <label className="flex items-center cursor-pointer group">
            <div className={`w-8 h-4 rounded-full relative transition-colors border ${eliminationMode ? 'bg-pink-500 border-pink-400' : 'bg-black/50 border-white/20'}`}>
              <div className={`absolute top-[1px] bottom-[1px] w-3 rounded-full bg-white transition-all shadow-sm ${eliminationMode ? 'left-[17px]' : 'left-[1px]'}`} />
            </div>
            <input type="checkbox" checked={eliminationMode} onChange={(e) => toggleEliminationMode(e.target.checked)} className="hidden" />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
          <AnimatePresence>
            {options.map((opt) => (
              <motion.div 
                key={opt.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-between bg-white/5 border border-white/5 px-3 py-2 rounded-lg group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 relative cursor-pointer border border-white/20 shadow-sm transition-transform hover:scale-110">
                    <input 
                        type="color" 
                        value={opt.color} 
                        onChange={(e) => updateOptionColor(opt.id, e.target.value)}
                        className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer opacity-0 z-10"
                        title="Change option color"
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: opt.color }} />
                  </div>
                  <span className="text-sm font-medium text-zinc-200">{opt.text}</span>
                </div>
                <button 
                  onClick={() => removeOption(opt.id)}
                  disabled={isSpinning}
                  className="text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {options.length === 0 && (
            <p className="text-center text-zinc-500 text-sm py-4">No options added yet.</p>
          )}
        </div>
      </div>

      {/* Picked History Section */}
      <div className="w-full flex-1 min-w-[260px] max-w-sm flex flex-col bg-black/20 p-5 rounded-2xl border border-white/10 h-full max-h-[450px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 shrink-0">
            <span className="material-symbols-outlined text-green-400 leading-none">history</span>
            History
          </h3>
          {pickedOptions.length > 0 && (
            <button 
              onClick={resetGame}
              className="text-xs font-bold px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 shadow-lg border border-white/10 shrink-0"
            >
              <span className="material-symbols-outlined text-[14px] leading-none">refresh</span>
              Reset
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
          <AnimatePresence>
            {pickedOptions.map((opt, i) => (
              <motion.div 
                key={opt.id + i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-3 bg-white/5 border border-white/5 px-3 py-2 rounded-lg relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 opacity-50" style={{ backgroundColor: opt.color }} />
                <div className="w-3 h-3 rounded-full shadow-sm ml-1" style={{ backgroundColor: opt.color }} />
                <span className="text-sm font-medium text-zinc-300 line-through opacity-70 decoration-pink-500/50 decoration-2">{opt.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {pickedOptions.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500 opacity-50 space-y-2 pb-8">
               <span className="material-symbols-outlined text-4xl">sweep</span>
               <p className="text-sm font-medium tracking-wide">No picks yet</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
