import React from 'react';
import { ArrowRight, Heart, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="bg-[var(--v-terracotta)] py-24 md:py-32 overflow-hidden">
      <div className="v-container">

        <div className="relative rounded-[36px] bg-[var(--v-forest)] px-7 py-14 md:px-14 md:py-20 overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-40 -left-24 w-96 h-96 rounded-full border border-white/10" />

          <div className="relative z-10 max-w-4xl">

            <div className="flex items-center gap-2 text-[var(--v-gold)] text-xs uppercase tracking-[0.18em] font-semibold">
              <Heart size={14} />
              The next second chance starts here
            </div>

            <h2 className="v-heading !text-white mt-6">
              One report can
              <br />
              <span className="!text-[var(--v-gold)]">
                change a life.
              </span>
            </h2>

            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mt-6">
              Whether you are reporting an animal in need, volunteering,
              providing medical care, fostering or adopting — Vatsalya
              gives your action a place in the larger journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-9">

              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[var(--v-forest)] px-6 py-4 font-semibold text-sm hover:bg-[var(--v-ivory)] transition"
              >
                Start with Vatsalya
                <ArrowRight size={17} />
              </Link>

              <a
                href="#adoption"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 text-white px-6 py-4 font-semibold text-sm hover:bg-white/10 transition"
              >
                See how you can help
              </a>

            </div>

          </div>

          {/* Bottom trust */}
          <div className="relative z-10 mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex items-center gap-2 text-sm text-white/50">
              <ShieldCheck size={16} />
              Built around responsible animal welfare
            </div>

            <p className="text-xs text-white/30">
              Every life deserves a second chance.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
