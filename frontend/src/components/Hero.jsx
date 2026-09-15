import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, MapPin, Heart, ShieldCheck } from 'lucide-react';
import Navbar from './Navbar';

export default function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'var(--v-ivory)' }}
    >

      <Navbar />

      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">

        <img
          src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=2200&q=90"
          alt="Rescued dog looking toward the camera"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Image overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(16,20,18,0.88) 0%, rgba(16,20,18,0.68) 38%, rgba(16,20,18,0.18) 75%, rgba(16,20,18,0.05) 100%)',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(0deg, rgba(16,20,18,0.65) 0%, transparent 35%)',
          }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="v-container w-full pt-32 pb-24">

          <div className="max-w-3xl">

            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full mb-7"
              style={{
                background: 'rgba(247,243,234,0.12)',
                border: '1px solid rgba(247,243,234,0.22)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--v-terracotta)' }}
              />

              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
                A smarter future for animal welfare
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-white font-semibold tracking-tight"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(52px, 7vw, 92px)',
                lineHeight: '0.98',
                letterSpacing: '-0.045em',
              }}
            >
              Every life
              <br />
              deserves a
              <br />
              <span style={{ color: '#E7A07D' }}>
                second chance.
              </span>
            </h1>

            {/* Description */}
            <p
              className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.78)' }}
            >
              Vatsalya connects citizens, rescuers, veterinarians,
              shelters and adopters into one intelligent animal-welfare
              lifecycle — from the first report to a safe forever home.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 mt-9">

              <a
                href="/report"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all hover:-translate-y-1"
                style={{
                  background: 'var(--v-terracotta)',
                  boxShadow: '0 12px 30px rgba(201,111,74,0.28)',
                }}
              >
                Report an Animal
                <ArrowRight size={17} />
              </a>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Play size={16} fill="currentColor" />
                Explore Vatsalya
              </Link>

            </div>

          </div>

          {/* Bottom statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mt-20">

            <div
              className="p-4 rounded-2xl"
              style={{
                background: 'rgba(16,20,18,0.42)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-3">
                <MapPin className="text-[#E7A07D]" size={20} />
                <div>
                  <p className="text-white font-semibold text-sm">
                    Geo-tagged
                  </p>
                  <p className="text-white/55 text-xs">
                    Rescue reporting
                  </p>
                </div>
              </div>
            </div>

            <div
              className="p-4 rounded-2xl"
              style={{
                background: 'rgba(16,20,18,0.42)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#E7A07D]" size={20} />
                <div>
                  <p className="text-white font-semibold text-sm">
                    AI-assisted
                  </p>
                  <p className="text-white/55 text-xs">
                    Smarter triage
                  </p>
                </div>
              </div>
            </div>

            <div
              className="p-4 rounded-2xl"
              style={{
                background: 'rgba(16,20,18,0.42)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-3">
                <Heart className="text-[#E7A07D]" size={20} />
                <div>
                  <p className="text-white font-semibold text-sm">
                    Full lifecycle
                  </p>
                  <p className="text-white/55 text-xs">
                    Rescue to adoption
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 right-8 hidden md:flex items-center gap-3 text-white/55 text-xs uppercase tracking-[0.18em]">
        <span>Scroll to explore</span>
        <div className="w-10 h-px bg-white/30" />
      </div>

    </section>
  );
}
