import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const columns = [
    {
      title: "Platform",
      links: [
        { label: "Home", href: "/" },
        { label: "Report Case", href: "/report" },
        { label: "Dashboard", href: "/dashboard" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Emergency Help", href: "#emergency" },
        { label: "Contact Us", href: "mailto:support@vatsalya.org" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 text-white/70 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-bold text-white mb-2">Vatsalya</h2>
          <p className="text-sm text-white/50">
            Dedicated to animal rescue, triage, and comprehensive care management.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs uppercase tracking-[0.16em] text-white/35 font-semibold">
                {column.title}
              </h3>

              <div className="space-y-4 mt-6">
                {column.links.map(({ label, href }) => (
                  href?.startsWith('mailto:') || href?.startsWith('#') ? (
                    <a
                      key={label}
                      href={href}
                      className="block text-sm text-white/55 hover:text-white transition"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      key={label}
                      to={href || '#'}
                      className="block text-sm text-white/55 hover:text-white transition"
                    >
                      {label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
