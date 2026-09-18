import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowUpRight, Activity } from "lucide-react";
import VatsalyaBrand from "./brand/VatsalyaBrand";

const links = [
  { label: "Animals", href: "#adoption" },
  { label: "Shelters", href: "#shelters" },
  { label: "Lifecycle", href: "#lifecycle" },
  { label: "Stories", href: "#stories" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("adoption");

  useEffect(() => {
    const sections = links
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.08, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const goTo = (href) => {
    setOpen(false);
    const target = document.getElementById(href.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <nav className="mx-auto max-w-7xl rounded-[22px] border border-white/60 bg-white/90 px-3 py-2.5 shadow-[0_18px_55px_rgba(16,20,18,0.14)] backdrop-blur-2xl sm:px-4 md:px-5">
        <div className="flex min-h-[54px] items-center justify-between gap-3">
          <VatsalyaBrand compact onClick={() => setOpen(false)} />

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => goTo(link.href)}
                  className={`relative rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#17352D]/6 text-[#17352D]"
                      : "text-[#46384F] hover:bg-black/[0.03] hover:text-[#C96F4A]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-[#C96F4A]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <span className="mr-1 inline-flex items-center gap-1.5 rounded-full bg-[#4E8061]/9 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#4E8061]">
              <Activity size={12} className="animate-pulse" />
              Network live
            </span>
            <Link
              to="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#46384F] transition hover:bg-black/[0.03]"
            >
              Login
            </Link>
            <Link
              to="/report"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#C96F4A] px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#A95538] hover:shadow-[0_12px_28px_rgba(201,111,74,0.28)]"
            >
              Report an Animal
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-xl p-2 text-[#46384F] transition hover:bg-black/[0.04] lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-[#46384F]/10 pb-2 pt-3 lg:hidden">
            <div className="grid gap-1">
              {links.map((link) => {
                const id = link.href.slice(1);
                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => goTo(link.href)}
                    className={`rounded-xl px-4 py-3 text-left text-sm font-semibold ${
                      active === id
                        ? "bg-[#17352D]/6 text-[#17352D]"
                        : "text-[#46384F] hover:bg-black/[0.03]"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex gap-2 border-t border-[#46384F]/10 pt-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl border border-[#46384F]/10 px-4 py-3 text-center text-sm font-bold text-[#46384F]"
              >
                Login
              </Link>
              <Link
                to="/report"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl bg-[#C96F4A] px-4 py-3 text-center text-sm font-bold text-white"
              >
                Report Animal
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
