import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Animals", href: "#adoption" },
    { label: "Shelters", href: "#shelters" },
    { label: "Lifecycle", href: "#lifecycle" },
    { label: "Stories", href: "#stories" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-white/30 bg-[#F7F3EA]/90 px-4 py-3 shadow-[0_12px_40px_rgba(70,56,79,0.12)] backdrop-blur-xl md:px-6">
        <div className="flex items-center justify-between">

          {/* BRAND */}
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
<img src="/vatsalya-logo.svg" alt="Vatsalya" className="h-10 w-auto" />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-[#46384F] transition hover:text-[#C96F4A]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#46384F] transition hover:bg-white"
            >
              Login
            </Link>

            <Link
              to="/report"
              className="group flex items-center gap-2 rounded-xl bg-[#C96F4A] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#A95538]"
            >
              Report an Animal
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-xl p-2 text-[#46384F] lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="mt-4 border-t border-[#46384F]/10 pt-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 font-semibold text-[#46384F] transition hover:bg-white"
                >
                  {link.label}
                </a>
              ))}

              <div className="mt-2 flex gap-2 border-t border-[#46384F]/10 pt-4">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl border border-[#46384F]/15 px-4 py-3 text-center text-sm font-bold text-[#46384F]"
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
          </div>
        )}
      </nav>
    </header>
  );
}
