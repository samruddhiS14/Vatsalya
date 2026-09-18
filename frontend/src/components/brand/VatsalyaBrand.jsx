import React from "react";
import { Link } from "react-router-dom";

export default function VatsalyaBrand({ dark = false, compact = false, onClick }) {
  const textClass = dark ? "text-white" : "text-[#46384F]";
  const subClass = dark ? "text-white/45" : "text-[#6D686D]";

  return (
    <Link
      to="/"
      onClick={onClick}
      className={`group inline-flex items-center ${compact ? "gap-2.5" : "gap-3"}`}
      aria-label="Vatsalya home"
    >
      <img
        src="/vatsalya-mark.svg"
        alt="Vatsalya logo"
        className={`${compact ? "h-9 w-9" : "h-10 w-10 md:h-11 md:w-11"} shrink-0 rounded-[14px] shadow-sm transition duration-300 group-hover:-rotate-2 group-hover:scale-105`}
      />
      <span className="min-w-0 leading-none">
        <span className={`block font-serif text-[20px] font-bold tracking-[-0.02em] ${textClass}`}>
          Vatsalya
        </span>
        <span className={`mt-1 hidden text-[9px] font-bold uppercase tracking-[0.18em] sm:block ${subClass}`}>
          Animal Welfare Network
        </span>
      </span>
    </Link>
  );
}
