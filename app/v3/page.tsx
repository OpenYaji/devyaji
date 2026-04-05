"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function V3Page() {
    const [time, setTime] = useState<string>("");
    const router = useRouter();
    const [targetRoute, setTargetRoute] = useState<string | null>(null);
    const [initWipe, setInitWipe] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const middleRef = useRef<HTMLElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(
                now.toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
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

    // Route wheel/touchpad events to the correct column based on cursor position
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const onWheel = (e: WheelEvent) => {
            const middle = middleRef.current;
            const right = rightRef.current;
            if (middle && middle.contains(e.target as Node)) {
                e.preventDefault();
                middle.scrollBy({ top: e.deltaY, left: 0 });
            } else if (right && right.contains(e.target as Node)) {
                e.preventDefault();
                right.scrollBy({ top: e.deltaY, left: 0 });
            }
        };
        container.addEventListener("wheel", onWheel, { passive: false });
        return () => container.removeEventListener("wheel", onWheel);
    }, []);

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

            <div ref={containerRef} className="min-h-screen bg-[#0E0E10] text-[#E2E2E2] p-2 font-sans selection:bg-blue-600 selection:text-white relative z-10">
                <div className="w-full grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-2 items-start lg:h-screen">

                    {/* ========================================================
            LEFT COLUMN (SIDEBAR)
        ======================================================== */}
                    <aside className="bg-[#18181b] rounded-2xl flex flex-col border border-white/5 lg:sticky lg:top-2 lg:self-start lg:h-[calc(100vh-1rem)] lg:overflow-hidden">

                        {/* Scrollable top section */}
                        <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <div className="flex flex-col items-center mb-3">
                                <div className="w-14 h-14 rounded-full border-2 border-white/10 overflow-hidden mb-3 bg-zinc-800 p-1">
                                    <div className="w-full h-full rounded-full overflow-hidden relative">
                                        <Image
                                            src="/portfolio/dcon.jpg"
                                            alt="John Rey Bisnar Calipes"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <h2 className="text-[13px] font-bold text-white text-center leading-tight">
                                    John Rey<br />Bisnar Calipes
                                </h2>
                                <h1 className="text-xl font-black text-blue-500 tracking-tight mt-1 mb-1">DEVYAJI</h1>
                                <p className="text-[10px] text-zinc-400 font-medium">CTO @ SEEGLA | AI Engineer</p>

                                <button className="w-full mt-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center justify-center gap-2 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                                    <span className="material-symbols-outlined text-[16px]">download</span>
                                    <span className="text-xs">Resume</span>
                                </button>
                            </div>

                            <div className="w-full h-[1px] bg-white/5 mb-3" />

                            <nav className="flex flex-col gap-1">
                                <NavItem icon="home" label="Home" active />
                                <NavItem icon="person" label="About" />
                                <NavItem icon="folder" label="Projects" />
                                <NavItem icon="military_tech" label="Achievements" />
                                <NavItem icon="menu_book" label="Blog" />
                            </nav>
                        </div>

                        {/* Pinned footer — never overlaps */}
                        <div className="flex-shrink-0 px-4 pb-4 pt-3 border-t border-white/5 relative z-50">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-zinc-300">Theme</span>
                                <div
                                    className="relative"
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                >
                                    <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                        <button className="flex items-center justify-between w-[120px] h-8 px-3 rounded-md bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer">
                                            <span className="text-xs font-semibold uppercase tracking-wider">Select</span>
                                            <span className={`material-symbols-outlined text-[16px] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>arrow_drop_down</span>
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 bottom-full mb-2 w-48 bg-[#18181b] border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col"
                                            >
                                                <button
                                                    onClick={() => {
                                                        setIsDropdownOpen(false);
                                                        setTargetRoute("/");
                                                    }}
                                                    className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">dark_mode</span>
                                                    <span className="text-xs font-bold tracking-widest uppercase truncate">Cinematic</span>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setIsDropdownOpen(false);
                                                        setTargetRoute("/v2");
                                                    }}
                                                    className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-white/10 text-zinc-300 hover:text-white transition-colors border-t border-white/5"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">light_mode</span>
                                                    <span className="text-xs font-bold tracking-widest uppercase truncate">Minimalist</span>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setIsDropdownOpen(false);
                                                        setTargetRoute("/v4");
                                                    }}
                                                    className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-white/10 text-zinc-300 hover:text-white transition-colors border-t border-white/5"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">desktop_mac</span>
                                                    <span className="text-xs font-bold tracking-widest uppercase truncate">MacOS Desktop</span>
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                            <p className="text-[10px] text-zinc-500 leading-relaxed">
                                Designed and Built by Lance Kent ©<br />
                                Adapted for DEVYAJI ©2026<br /> All Rights Reserved.
                            </p>
                        </div>
                    </aside>

                    {/* ========================================================
            MIDDLE COLUMN (MAIN CONTENT)
        ======================================================== */}
                    <main ref={middleRef} className="flex flex-col gap-2 lg:h-screen lg:min-h-0 lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2">

                        {/* HERO CARD */}
                        <div className="relative bg-[#18181b] rounded-2xl overflow-hidden border border-white/5 min-h-[300px] flex items-center p-8 lg:p-12">
                            {/* Background Image / Decoration */}
                            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-40 pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#18181b] to-transparent z-10" />
                                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#18181b]/10 to-[#18181b] absolute" />
                            </div>

                            {/* Date Badge */}
                            <div className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-2 bg-zinc-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                <span className="material-symbols-outlined text-[16px] text-zinc-300">calendar_today</span>
                                <span className="text-xs font-semibold text-zinc-200">{time || "Sunday, 2026 April 5, 2:14 PM"}</span>
                            </div>

                            <div className="relative z-20 max-w-xl">
                                <h1 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight mb-4 drop-shadow-xl">
                                    Crafting intelligent<br />digital systems
                                </h1>
                                <p className="text-sm lg:text-base text-zinc-400 font-medium leading-relaxed mb-8 max-w-md">
                                    Bridging the gap between sleek front-end designs and robust back-end architecture. Let's build something impactful.
                                </p>

                                <div className="flex flex-wrap items-center gap-4">
                                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                                        <span className="material-symbols-outlined text-[18px]">send</span>
                                        Message Me
                                    </button>
                                    <button className="bg-zinc-800/50 hover:bg-zinc-800 border border-white/10 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-3 transition-colors">
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                                        Open to Collaborate
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* STATS */}
                        <div className="bg-[#18181b] rounded-2xl p-6 border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-zinc-400">bar_chart</span>
                                Stats
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <StatCard icon="business_center" value="3+" label="Years" label2="Experience" />
                                <StatCard icon="verified" value="5+" label="Certificates" />
                                <StatCard icon="folder_open" value="10+" label="Projects" />
                                <StatCard icon="memory" value="20+" label="Technologies" />
                            </div>
                        </div>

                        {/* HIGHLIGHTS */}
                        <div className="bg-[#18181b] rounded-2xl p-6 border border-white/5 flex-grow">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-zinc-400">push_pin</span>
                                Highlights
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <HighlightCard
                                    title="Developer Camp Manila"
                                    badge="Finalist"
                                    bgFrom="from-blue-900/50"
                                    bgTo="to-black"
                                    logoText="Developer Camp Manila 2026"
                                />
                                <HighlightCard
                                    title="AWS CLOUD CLUB - QCU"
                                    bgFrom="from-orange-900/40"
                                    bgTo="to-black"
                                    logoText="AWS CLOUD CLUB - QCU"
                                />
                                <div className="bg-zinc-900 rounded-xl overflow-hidden border border-white/5 group relative h-40">
                                    <div className="absolute inset-0">
                                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center p-4">
                                            <span className="material-symbols-outlined text-4xl text-zinc-600">apartment</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                        <h4 className="text-white font-bold text-sm">SMART IoT BUILDING</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </main>

                    {/* ========================================================
            RIGHT COLUMN (WIDGETS)
        ======================================================== */}
                    <aside ref={rightRef} className="flex flex-col gap-2 lg:h-screen lg:min-h-0 lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2">

                        {/* TECHNOLOGIES */}
                        <div className="bg-[#18181b] rounded-2xl p-6 border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-zinc-400">cruelty_free</span>
                                Technologies
                            </h3>
                            <div className="grid grid-cols-4 gap-3">
                                <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" />
                                <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Next.js" className="invert" />
                                <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" />
                                <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" />
                                <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node" />
                                <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" alt="Firebase" />
                                <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" alt="AWS" className="invert" />
                                <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="Docker" />
                                <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" />
                                <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" />
                                <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git" />
                                <TechIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" className="invert" />
                            </div>
                        </div>

                        {/* SKILLS ACCORDION */}
                        <div className="bg-[#18181b] rounded-2xl p-6 border border-white/5 flex-grow flex flex-col">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-zinc-400">person_search</span>
                                Skills
                            </h3>
                            <div className="flex flex-col gap-3 flex-grow">

                                <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-500 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[16px]">code</span>
                                            </div>
                                            <span className="font-semibold text-sm text-white">Full-Stack Development</span>
                                        </div>
                                        <span className="material-symbols-outlined text-zinc-500 text-[20px]">keyboard_arrow_up</span>
                                    </div>
                                    <p className="text-[12px] text-zinc-400 leading-relaxed pr-2">
                                        Aspiring full-stack developer with a strong focus on crafting responsive, user-centric front-end interfaces.
                                    </p>
                                </div>

                                <SkillItem closed icon="smart_toy" label="AI Integration" />
                                <SkillItem closed icon="account_tree" label="CTO Strategy" />

                            </div>
                        </div>

                        {/* CONTACT ME */}
                        <div className="bg-[#18181b] rounded-2xl p-6 border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-zinc-400">call</span>
                                Contact Me
                            </h3>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-4">
                                    <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">mail</span>
                                    </a>
                                    <a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center justify-center w-[20px] h-[20px]">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                    </a>
                                    <a href="#" className="text-zinc-400 hover:text-white transition-colors flex items-center justify-center w-[20px] h-[20px]">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    </a>
                                </div>
                                <button className="bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold px-4 py-2 rounded-lg border border-white/10 transition-colors">
                                    Schedule a call
                                </button>
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </>
    );
}

/* ========================================================
   HELPER COMPONENTS
======================================================== */

function NavItem({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) {
    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-zinc-800/80 text-blue-400' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'}`}>
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
            <span className="text-sm font-semibold tracking-wide">{label}</span>
        </div>
    );
}

function StatCard({ icon, value, label, label2 }: { icon: string, value: string, label: string, label2?: string }) {
    return (
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-4 flex flex-col justify-center gap-2 hover:bg-zinc-800 transition-colors cursor-default">
            <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-500 mb-1">
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
            </div>
            <div>
                <div className="text-xl font-bold text-white flex items-center gap-1">
                    {value}
                    <span className="text-[11px] text-zinc-400 font-medium translate-y-0.5">{label2 || label}</span>
                </div>
            </div>
        </div>
    );
}

function HighlightCard({ title, badge, bgFrom, bgTo, logoText }: { title: string, badge?: string, bgFrom: string, bgTo: string, logoText: string }) {
    return (
        <div className="bg-zinc-900 rounded-xl overflow-hidden border border-white/5 group relative h-40">
            <div className={`absolute inset-0 bg-gradient-to-br ${bgFrom} ${bgTo} opacity-60 flex flex-col items-center justify-center p-4 text-center`}>
                <h4 className="text-zinc-300 font-bold tracking-widest text-xs uppercase mb-2">{logoText.split(" ")[0]}</h4>
                <div className="text-white text-lg font-black leading-tight">{logoText.split(" ").slice(1).join(" ")}</div>
                {badge && (
                    <span className="mt-2 text-[10px] font-bold text-blue-400 uppercase tracking-wider">{badge}</span>
                )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <h4 className="text-white font-bold text-sm tracking-wide">{title}</h4>
            </div>
        </div>
    );
}

function TechIcon({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
    return (
        <div className="bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center aspect-square hover:bg-zinc-800 transition-colors hover:scale-105 duration-200 cursor-pointer">
            <div className="relative w-8 h-8">
                <Image src={src} alt={alt} fill className={`object-contain ${className}`} />
            </div>
        </div>
    );
}

function SkillItem({ closed, icon, label }: { closed?: boolean, icon: string, label: string }) {
    return (
        <div className="bg-zinc-900 border border-white/5 rounded-xl p-4 flex justify-between items-center hover:bg-zinc-800 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px]">{icon}</span>
                </div>
                <span className="font-semibold text-sm text-zinc-300">{label}</span>
            </div>
            <span className="material-symbols-outlined text-zinc-500 text-[20px]">
                {closed ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
            </span>
        </div>
    );
}
