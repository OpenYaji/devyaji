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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" }}>

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
              className={`absolute flex flex-col bg-zinc-900/80 backdrop-blur-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 ${
                isFullscreen ? "rounded-none" : "min-w-[320px] min-h-[300px] w-[90vw] max-w-4xl h-[80vh] max-h-[600px] rounded-2xl resize"
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
