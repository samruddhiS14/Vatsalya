import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  accent = "plum"
}) {
  const accents = {
    plum: "bg-[#46384F] text-white",
    terracotta: "bg-[#C96F4A] text-white",
    sage: "bg-[#A9B9A2]/30 text-[#46384F]",
    ivory: "bg-white text-[#46384F]"
  };

  return (
    <div className="group rounded-[22px] border border-[#46384F]/10 bg-white p-6 shadow-[0_12px_40px_rgba(70,56,79,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(70,56,79,0.12)]">

      <div className="mb-7 flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accents[accent]}`}>
          {Icon && <Icon size={20} />}
        </div>

        <ArrowUpRight
          size={18}
          className="text-[#A9B9A2] transition group-hover:text-[#C96F4A]"
        />
      </div>

      <p className="text-sm font-medium text-[#6D686D]">
        {label}
      </p>

      <p className="mt-1 text-3xl font-bold tracking-tight text-[#46384F]">
        {value}
      </p>

      {detail && (
        <p className="mt-2 text-xs font-medium text-[#4E8061]">
          {detail}
        </p>
      )}
    </div>
  );
}
