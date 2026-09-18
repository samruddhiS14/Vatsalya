import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Ambulance, Stethoscope, Home, HeartHandshake, ClipboardCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const stages = [
  { number: "01", title: "Report", text: "A citizen reports an animal using a photo, description and location.", image: "/images/animals/dogs/dog1.jpg", icon: Camera, action: "Report an animal", target: "/report", details: ["Photo and description captured", "Location attached to the case", "Urgency recorded for triage"] },
  { number: "02", title: "Rescue", text: "Cases are prioritised and connected with the appropriate rescue team.", image: "/images/animals/cattle/cattle1.jpg", icon: Ambulance, action: "Rescue workspace", target: "/dashboard", details: ["Incoming cases in one queue", "Status moves from pending to dispatched", "Rescue outcome stays attached to the case"] },
  { number: "03", title: "Heal", text: "Veterinary teams record diagnosis, treatment, vaccination and recovery.", image: "/images/animals/horses/horse1.jpg", icon: Stethoscope, action: "Medical workspace", target: "/medical", details: ["Medical record linked to animal", "Treatment and vaccination history", "Adoption readiness follows care"] },
  { number: "04", title: "Shelter", text: "Animals are placed into suitable shelters or foster environments.", image: "/images/animals/cats/cat1.jpg", icon: Home, action: "Shelter workspace", target: "/shelter", details: ["Shelter capacity tracked", "Animals assigned to locations", "Adoption applications reviewed"] },
  { number: "05", title: "Adopt", text: "Responsible adopters can apply for animals marked ready for adoption.", image: "/images/animals/rabbits/rabbit1.jpg", icon: HeartHandshake, action: "Adopter workspace", target: "/adopter", details: ["Browse adoption-ready animals", "Submit an application", "Track the application status"] },
  { number: "06", title: "Follow-up", text: "The journey continues through post-adoption welfare monitoring.", image: "/images/animals/birds/bird1.jpg", icon: ClipboardCheck, action: "Continue the journey", target: "/adopter", details: ["A follow-up is created after adoption", "Adopter can provide a welfare update", "Completed care remains part of the record"] },
];

export default function LifecycleSection() {
  const [active, setActive] = useState(0);
  const stage = useMemo(() => stages[active], [active]);
  const Icon = stage.icon;

  return (
    <section id="lifecycle" className="overflow-hidden bg-[#F7F3EA] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#C96F4A]">The Vatsalya lifecycle</p>
          <h2 className="font-['Playfair_Display'] text-5xl font-semibold leading-tight text-[#46384F] md:text-6xl">One connected journey.</h2>
          <p className="mt-5 text-lg leading-8 text-[#6D686D]">Explore each stage and see how the same animal journey moves from one role to the next.</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stages.map((item, index) => {
            const StageIcon = item.icon;
            const selected = index === active;
            return (
              <button key={item.title} type="button" onClick={() => setActive(index)} className="text-left">
                <article className={`group relative min-h-[300px] overflow-hidden rounded-[30px] bg-[#17352D] transition duration-300 ${selected ? "-translate-y-1 shadow-[0_24px_70px_rgba(23,53,45,0.22)] ring-2 ring-[#C96F4A]/70" : "hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(23,53,45,0.18)]"}`}>
                  <img src={item.image} alt="" className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${selected ? "scale-105 opacity-35" : "opacity-25 group-hover:scale-105 group-hover:opacity-35"}`} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(23,53,45,0.96),rgba(23,53,45,0.72),rgba(70,56,79,0.70))]" />
                  <div className="relative flex h-full min-h-[300px] flex-col justify-between p-7 text-white">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-xs font-bold tracking-[0.2em] text-white/45">{item.number}</span>
                      <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition ${selected ? "border-[#E7A07D]/40 bg-[#E7A07D]/15" : "border-white/10 bg-white/5"}`}><StageIcon size={19} className={selected ? "text-[#E7A07D]" : "text-white/80"} /></span>
                    </div>
                    <div>
                      <p className="text-3xl font-serif font-bold">{item.title}</p>
                      <p className="mt-3 max-w-sm text-sm leading-6 text-white/68">{item.text}</p>
                      <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#E7A07D]">Explore stage <ArrowRight size={13} /></div>
                    </div>
                  </div>
                </article>
              </button>
            );
          })}
        </div>

        <motion.div key={stage.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className="mt-7 overflow-hidden rounded-[30px] border border-[#46384F]/10 bg-white shadow-[0_18px_55px_rgba(70,56,79,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[1fr_1.4fr]">
            <div className="relative min-h-[250px] overflow-hidden bg-[#17352D] p-8 text-white">
              <img src={stage.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
              <div className="absolute inset-0 bg-[#17352D]/70" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E7A07D]/15 text-[#E7A07D]"><Icon size={20} /></div><div><p className="text-xs uppercase tracking-[0.16em] text-white/45">Stage {stage.number}</p><p className="text-2xl font-serif font-bold">{stage.title}</p></div></div>
                <div className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70"><CheckCircle2 size={14} /> Part of one connected record</div>
              </div>
            </div>
            <div className="p-8 md:p-10">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#C96F4A]">How it works</p><h3 className="mt-2 font-serif text-3xl font-bold text-[#46384F]">{stage.title} in Vatsalya</h3></div><Link to={stage.target} className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#17352D] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">{stage.action}<ArrowRight size={15} /></Link></div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">{stage.details.map((detail) => <div key={detail} className="rounded-2xl bg-[#F7F3EA] p-4"><CheckCircle2 size={16} className="text-[#4E8061]"/><p className="mt-3 text-sm font-semibold leading-6 text-[#46384F]">{detail}</p></div>)}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
