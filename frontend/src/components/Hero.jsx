import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, MapPin, Heart, ShieldCheck, Activity, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const pulseCases = [
  { area: "Vijay Nagar", type: "Injured street dog", priority: "Critical", eta: "Dispatching now" },
  { area: "Palasia", type: "Abandoned puppy", priority: "High", eta: "Team notified" },
  { area: "Scheme No. 54", type: "Stray cat", priority: "Medium", eta: "Triage queued" },
];

const priorityClass = {
  Critical: "bg-[#B94235]/10 text-[#B94235]",
  High: "bg-[#C58A32]/10 text-[#C58A32]",
  Medium: "bg-[#557B8C]/10 text-[#557B8C]",
};

export default function Hero() {
  const [activeCase, setActiveCase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCase((value) => (value + 1) % pulseCases.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const current = useMemo(() => pulseCases[activeCase], [activeCase]);

  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#101412]">
      <Navbar />

      <div className="pointer-events-none absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=2200&q=90"
          alt="Rescued dog looking toward the camera"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,20,18,0.93)_0%,rgba(16,20,18,0.74)_42%,rgba(16,20,18,0.25)_78%,rgba(16,20,18,0.05)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,20,18,0.72)_0%,transparent_40%)]" />
        <div className="absolute -right-24 top-24 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full border border-white/5" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-5 pb-24 pt-32 sm:px-7 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 backdrop-blur-xl">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#E7A07D]" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
                A smarter future for animal welfare
              </span>
            </div>

            <h1 className="font-semibold tracking-tight text-white" style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(52px, 7vw, 92px)', lineHeight: 0.98, letterSpacing: '-0.045em' }}>
              Every life
              <br />
              deserves a
              <br />
              <span className="text-[#E7A07D]">second chance.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg">
              Vatsalya connects citizens, rescuers, veterinarians, shelters and adopters into one intelligent animal-welfare lifecycle — from the first report to a safe forever home.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/report"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#C96F4A] px-6 py-3.5 font-semibold text-white shadow-[0_12px_32px_rgba(201,111,74,0.28)] transition hover:-translate-y-1 hover:bg-[#A95538]"
              >
                Report an Animal
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
              </Link>

              <button
                type="button"
                onClick={() => jump("adoption")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15"
              >
                <Play size={16} fill="currentColor" />
                Explore animals
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <button type="button" onClick={() => jump("lifecycle")} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/75 transition hover:bg-white/10 hover:text-white">
                See the lifecycle
              </button>
              <button type="button" onClick={() => jump("shelters")} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/75 transition hover:bg-white/10 hover:text-white">
                Explore shelters
              </button>
              <button type="button" onClick={() => jump("stories")} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/75 transition hover:bg-white/10 hover:text-white">
                Watch stories
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.12 }}
            className="hidden lg:block"
          >
            <div className="ml-auto max-w-[440px] rounded-[30px] border border-white/15 bg-[#F7F3EA]/95 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
              <div className="flex items-center justify-between rounded-2xl bg-[#17352D] px-5 py-4 text-white">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/50">Vatsalya command pulse</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#78C58E]" />
                    Network active
                  </p>
                </div>
                <Activity size={18} className="text-[#E7A07D]" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[['24','Active cases'],['4','Critical'],['91%','Routed']].map(([value,label]) => (
                  <div key={label} className="rounded-2xl border border-[#46384F]/8 bg-white p-4">
                    <p className="text-xl font-bold text-[#46384F]">{value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-[#6D686D]">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-[#46384F]/8 bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C96F4A]">Live case</p>
                    <p className="mt-2 text-xl font-bold text-[#46384F]">{current.type}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-[#6D686D]"><MapPin size={14} />{current.area}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${priorityClass[current.priority]}`}>
                    {current.priority}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-[#F7F3EA] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#C96F4A]/10 flex items-center justify-center text-[#C96F4A]">
                      <ShieldCheck size={17} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#46384F]">{current.eta}</p>
                      <p className="text-[10px] text-[#6D686D]">Human-led response</p>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-[#C96F4A]" />
                </div>
              </div>

              <div className="mt-3 flex gap-1.5 px-1">
                {pulseCases.map((item, index) => (
                  <button key={item.type} type="button" onClick={() => setActiveCase(index)} className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#46384F]/10">
                    <span className={`block h-full rounded-full transition-all duration-500 ${index === activeCase ? "w-full bg-[#C96F4A]" : "w-0"}`} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-2">
            {[
              [MapPin, "Geo-tagged", "Rescue reporting"],
              [ShieldCheck, "AI-assisted", "Smarter triage"],
              [Heart, "Full lifecycle", "Rescue to adoption"],
            ].map(([Icon, title, text]) => (
              <div key={title} className="rounded-2xl border border-white/12 bg-black/30 p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-black/40">
                <div className="flex items-center gap-3">
                  <Icon className="text-[#E7A07D]" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="text-xs text-white/50">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 right-8 hidden items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/55 md:flex">
        <span>Scroll to explore</span>
        <div className="h-px w-10 bg-white/30" />
      </div>
    </section>
  );
}
