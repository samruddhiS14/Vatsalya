import React from 'react';
import { Heart, ArrowUpRight, Globe, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Platform',
    links: [
      ['Lifecycle', '#lifecycle'],
      ['Rescue intelligence', '#ai-triage'],
      ['Medical care', '#ai-triage'],
      ['Adoption', '#adoption'],
    ],
  },
  {
    title: 'Get involved',
    links: [
      ['Report an animal', '/login'],
      ['Volunteer', 'mailto:hello@vatsalya.org'],
      ['Foster', 'mailto:hello@vatsalya.org'],
      ['Adopt', '#adoption'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#101412] text-white">

      <div className="v-container py-16 md:py-20">

        <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12">

          {/* Brand */}
          <div className="max-w-sm">

            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/vatsalya-logo.svg" alt="Vatsalya" className="h-10 w-auto" />
            </Link>

            <p className="text-white/45 text-sm leading-relaxed mt-6">
              A connected animal-welfare platform helping communities
              report, rescue, heal, shelter, adopt and follow up — all
              within one continuous lifecycle.
            </p>

            <div className="flex items-center gap-3 mt-7">

              <a
                href="#lifecycle"
                aria-label="Lifecycle"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
              >
                <Globe size={17} />
              </a>

              <a
                href="#stories"
                aria-label="Stories"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
              >
                <MessageCircle size={17} />
              </a>

              <a
                href="mailto:hello@vatsalya.org"
                aria-label="Email"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
              >
                <Mail size={17} />
              </a>

            </div>
          </div>

          {/* Links */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs uppercase tracking-[0.16em] text-white/35 font-semibold">
                {column.title}
              </h3>

              <div className="space-y-4 mt-6">
                {column.links.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="block text-sm text-white/55 hover:text-white transition"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Contact / CTA */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.16em] text-white/35 font-semibold">
              Make a difference
            </h3>

            <p className="text-white/50 text-sm leading-relaxed mt-6">
              See an animal that needs help? Don't wait for someone else
              to report it.
            </p>

            <Link
              to="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white text-[var(--v-forest)] px-5 py-3 text-sm font-semibold hover:bg-[var(--v-ivory)] transition"
            >
              Report an animal
              <ArrowUpRight size={16} />
            </Link>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 pt-7 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <p className="text-xs text-white/30">
            © 2026 Vatsalya. Built for better animal welfare.
          </p>

          <div className="flex items-center gap-6 text-xs text-white/30">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Responsible welfare</span>
          </div>

        </div>

      </div>

    </footer>
  );
}
