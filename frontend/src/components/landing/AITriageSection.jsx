import React from 'react';
import {
  BrainCircuit,
  MapPin,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const cases = [
  {
    id: 'V-2048',
    type: 'Injured street dog',
    location: 'Vijay Nagar',
    priority: 'Critical',
    score: '94%',
    time: '8 min ago',
  },
  {
    id: 'V-2047',
    type: 'Abandoned puppy',
    location: 'Palasia',
    priority: 'High',
    score: '87%',
    time: '21 min ago',
  },
  {
    id: 'V-2046',
    type: 'Stray cat',
    location: 'Scheme No. 54',
    priority: 'Medium',
    score: '72%',
    time: '34 min ago',
  },
];

const priorityStyle = {
  Critical: {
    background: 'rgba(185,66,53,0.10)',
    color: 'var(--v-critical)',
  },
  High: {
    background: 'rgba(197,138,50,0.12)',
    color: 'var(--v-warning)',
  },
  Medium: {
    background: 'rgba(85,123,140,0.10)',
    color: 'var(--v-info)',
  },
};

export default function AITriageSection() {
  return (
    <section id="ai-triage"
      id="features"
      className="py-24 md:py-28"
      style={{ background: 'var(--v-ivory)' }}
    >
      <div className="v-container">

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-14 items-center">

          {/* Left */}
          <div>

            <div className="v-eyebrow">
              <BrainCircuit size={14} />
              Intelligent rescue coordination
            </div>

            <h2 className="v-heading">
              Let technology
              <br />
              help people
              <br />
              <span style={{ color: 'var(--v-terracotta)' }}>
                act faster.
              </span>
            </h2>

            <p className="v-body mt-6 max-w-lg">
              Vatsalya analyses incoming reports, identifies the type and
              urgency of an issue, and helps route the right case to the
              right response team.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(201,111,74,0.10)',
                    color: 'var(--v-terracotta)',
                  }}
                >
                  <BrainCircuit size={17} />
                </div>

                <div>
                  <p
                    className="font-semibold"
                    style={{ color: 'var(--v-forest)' }}
                  >
                    Automated triage
                  </p>

                  <p
                    className="text-sm mt-1 leading-relaxed"
                    style={{ color: 'var(--v-muted)' }}
                  >
                    Reports can be analysed using text, images, audio
                    and location context.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(78,128,97,0.10)',
                    color: 'var(--v-success)',
                  }}
                >
                  <CheckCircle2 size={17} />
                </div>

                <div>
                  <p
                    className="font-semibold"
                    style={{ color: 'var(--v-forest)' }}
                  >
                    Priority-based routing
                  </p>

                  <p
                    className="text-sm mt-1 leading-relaxed"
                    style={{ color: 'var(--v-muted)' }}
                  >
                    Critical cases can surface ahead of routine welfare
                    reports.
                  </p>
                </div>
              </div>

            </div>

            <a
              href="/login"
              className="inline-flex items-center gap-2 mt-9 font-semibold text-sm"
              style={{ color: 'var(--v-terracotta)' }}
            >
              Explore the command centre
              <ArrowRight size={16} />
            </a>

          </div>

          {/* Dashboard mockup */}
          <div
            className="rounded-[28px] overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(23,53,45,0.08)',
              boxShadow: 'var(--shadow-card)',
            }}
          >

            {/* Top bar */}
            <div
              className="px-6 py-5 flex items-center justify-between"
              style={{
                borderBottom: '1px solid rgba(23,53,45,0.08)',
              }}
            >

              <div>
                <p
                  className="font-bold"
                  style={{ color: 'var(--v-forest)' }}
                >
                  Rescue Intelligence
                </p>

                <p
                  className="text-xs mt-1"
                  style={{ color: 'var(--v-muted)' }}
                >
                  Live incoming cases
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--v-success)' }}
                />
                <span
                  className="text-xs font-semibold"
                  style={{ color: 'var(--v-success)' }}
                >
                  System active
                </span>
              </div>

            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-3 p-5">

              <div
                className="p-4 rounded-2xl"
                style={{ background: 'var(--v-ivory)' }}
              >
                <p
                  className="text-2xl font-bold"
                  style={{ color: 'var(--v-forest)' }}
                >
                  24
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: 'var(--v-muted)' }}
                >
                  Active cases
                </p>
              </div>

              <div
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(185,66,53,0.07)' }}
              >
                <p
                  className="text-2xl font-bold"
                  style={{ color: 'var(--v-critical)' }}
                >
                  4
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: 'var(--v-muted)' }}
                >
                  Critical
                </p>
              </div>

              <div
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(78,128,97,0.07)' }}
              >
                <p
                  className="text-2xl font-bold"
                  style={{ color: 'var(--v-success)' }}
                >
                  91%
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: 'var(--v-muted)' }}
                >
                  Routed
                </p>
              </div>

            </div>

            {/* Cases */}
            <div className="px-5 pb-5 space-y-3">

              {cases.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl"
                  style={{
                    border: '1px solid rgba(23,53,45,0.07)',
                  }}
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-bold"
                          style={{ color: 'var(--v-muted)' }}
                        >
                          {item.id}
                        </span>

                        <span
                          className="px-2 py-1 rounded-full text-[10px] font-bold"
                          style={priorityStyle[item.priority]}
                        >
                          {item.priority}
                        </span>
                      </div>

                      <p
                        className="font-semibold text-sm mt-2"
                        style={{ color: 'var(--v-forest)' }}
                      >
                        {item.type}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mt-2">

                        <span
                          className="flex items-center gap-1 text-xs"
                          style={{ color: 'var(--v-muted)' }}
                        >
                          <MapPin size={12} />
                          {item.location}
                        </span>

                        <span
                          className="flex items-center gap-1 text-xs"
                          style={{ color: 'var(--v-muted)' }}
                        >
                          <Clock3 size={12} />
                          {item.time}
                        </span>

                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p
                        className="text-lg font-bold"
                        style={{ color: 'var(--v-forest)' }}
                      >
                        {item.score}
                      </p>

                      <p
                        className="text-[10px] uppercase tracking-wider"
                        style={{ color: 'var(--v-muted)' }}
                      >
                        confidence
                      </p>
                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* Footer */}
            <div
              className="px-6 py-4 flex items-center gap-2 text-xs"
              style={{
                background: 'rgba(169,185,162,0.10)',
                color: 'var(--v-muted)',
              }}
            >
              <AlertTriangle size={13} />
              AI recommendations support human decision-making.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
