import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Heart,
  LockKeyhole,
  ShieldCheck,
  ChevronDown,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { loginUser, saveUser } from '../services/auth';

const roles = [
  {
    value: "CITIZEN",
    label: "Community Member",
    description: "Report animals, track rescue cases & explore adoption",
    destination: "/citizen"
  },
  {
    value: "ADOPTER",
    label: "Adopter",
    description: "Browse animals & manage your adoption journey",
    destination: "/adopter"
  },
  {
    value: "RESCUER",
    label: "Rescue Coordinator",
    description: "Manage rescue cases & dispatch field teams",
    destination: "/dashboard"
  },
  {
    value: "VETERINARIAN",
    label: "Medical Team",
    description: "Manage treatment & animal health",
    destination: "/medical"
  },
  {
    value: "SHELTER",
    label: "Shelter Manager",
    description: "Manage animals, capacity & intake",
    destination: "/shelter"
  },
  {
    value: "ADMIN",
    label: "Welfare Admin",
    description: "Monitor the complete welfare network",
    destination: "/admin"
  }
];

export default function LoginPortal() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [roleOpen, setRoleOpen] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const user = await loginUser(
        email.trim(),
        password
      );

      const backendRole = user.role?.toUpperCase();

      if (selectedRole?.value && selectedRole.value !== backendRole) {
        throw new Error(
          `This account is registered as ${backendRole}. Please choose ${roles.find((role) => role.value === backendRole)?.label || backendRole} to continue.`
        );
      }

      saveUser(user);

      const destinations = {
  CITIZEN: "/citizen",
  ADOPTER: "/adopter",
  RESCUER: "/dashboard",
  VETERINARIAN: "/medical",
  SHELTER: "/shelter",
  ADMIN: "/admin"
};

const destination =
  destinations[backendRole];

if (!destination) {
  throw new Error(
    `Unsupported account role: ${backendRole}`
  );
}

const returnPath = location.state?.from;
const allowedReturnPaths = {
  CITIZEN: ["/report", "/citizen"],
  ADOPTER: ["/report", "/adopter"],
  RESCUER: ["/dashboard"],
  VETERINARIAN: ["/medical"],
  SHELTER: ["/shelter", "/shelter/create-animal"],
  ADMIN: ["/admin"]
};

const nextPath =
  returnPath && allowedReturnPaths[backendRole]?.includes(returnPath)
    ? returnPath
    : destination;

navigate(nextPath, {
  replace: true
});
    } catch (err) {
      setError(
        err?.message || "Unable to sign in. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EA] lg:grid lg:grid-cols-[1.05fr_0.95fr]">

      {/* LEFT SIDE */}
      <section className="relative hidden min-h-screen overflow-hidden bg-[#17352D] lg:block">

        <img
          src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1800&q=90"
          alt="Rescued dog"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#101412] via-[#17352D]/55 to-[#17352D]/20" />

        <div className="relative z-10 flex min-h-screen flex-col justify-between p-12 xl:p-16">

          <Link to="/" className="flex items-center gap-3 text-white">
<img src="/vatsalya-logo.svg" alt="Vatsalya" className="h-11 w-auto" />
          </Link>

          <div className="max-w-xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
              <ShieldCheck size={14} />
              One connected welfare journey
            </div>

            <h1 className="v-display text-5xl leading-[0.98] tracking-tight text-white xl:text-7xl">
              Every life
              <br />
              deserves a
              <br />
              <span className="text-[#D7A95B]">second chance.</span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-white/70">
              Vatsalya connects citizens, rescuers, medical teams, shelters
              and adopters around one animal's complete journey.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Report', 'Rescue', 'Heal', 'Shelter', 'Adopt'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-white/60">
            <LockKeyhole size={16} />
            Your welfare workspace is protected.
          </div>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">

        <div className="w-full max-w-[480px]">

          {/* MOBILE BRAND */}
          <Link
            to="/"
            className="mb-10 flex items-center gap-3 lg:hidden"
          >
            <img src="/vatsalya-logo.svg" alt="Vatsalya" className="h-11 w-auto" />
          </Link>

          <div className="mb-9">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#C96F4A]">
              Welcome back
            </p>

            <h2 className="v-display text-4xl font-semibold tracking-tight text-[#17352D] sm:text-5xl">
              Enter your
              <br />
              workspace.
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#66736D]">
              Sign in to continue managing your part of the welfare journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* WORKSPACE */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#66736D]">
                Workspace
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRoleOpen((value) => !value)}
                  className="flex w-full items-center justify-between rounded-2xl border border-[#D9DDD7] bg-white px-4 py-4 text-left transition hover:border-[#A9B9A2]"
                >
                  <div>
                    <div className="text-sm font-semibold text-[#17352D]">
                      {selectedRole.label}
                    </div>
                    <div className="mt-1 text-xs text-[#66736D]">
                      {selectedRole.description}
                    </div>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`text-[#66736D] transition ${
                      roleOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {roleOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-[#D9DDD7] bg-white p-2 shadow-2xl"
                    >
                      {roles.map((role) => (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => {
                            setSelectedRole(role);
                            setRoleOpen(false);
                          }}
                          className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-[#F7F3EA]"
                        >
                          <div className="mt-0.5">
                            {selectedRole.value === role.value ? (
                              <CheckCircle2
                                size={17}
                                className="text-[#C96F4A]"
                              />
                            ) : (
                              <div className="h-[17px] w-[17px] rounded-full border border-[#C9CEC8]" />
                            )}
                          </div>

                          <div>
                            <div className="text-sm font-semibold text-[#17352D]">
                              {role.label}
                            </div>
                            <div className="mt-1 text-xs leading-5 text-[#66736D]">
                              {role.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#66736D]"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-2xl border border-[#D9DDD7] bg-white px-4 py-4 text-sm text-[#17352D] outline-none transition placeholder:text-[#9AA49F] focus:border-[#C96F4A] focus:ring-4 focus:ring-[#C96F4A]/10"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-[0.12em] text-[#66736D]"
                >
                  Password
                </label>

                <a
                href="mailto:hello@vatsalya.org?subject=Vatsalya%20account%20help"
                className="text-xs font-semibold text-[#C96F4A] hover:underline"
              >
                Need sign-in help?
              </a>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-[#D9DDD7] bg-white px-4 py-4 pr-12 text-sm text-[#17352D] outline-none transition placeholder:text-[#9AA49F] focus:border-[#C96F4A] focus:ring-4 focus:ring-[#C96F4A]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#66736D] hover:text-[#17352D]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* ERROR */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-[#B94235]/20 bg-[#B94235]/5 px-4 py-3 text-sm leading-5 text-[#B94235]"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* REMEMBER */}
            <label className="flex cursor-pointer items-center gap-3 text-sm text-[#66736D]">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="h-4 w-4 accent-[#C96F4A]"
              />
              Keep me signed in on this device
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#17352D] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#17352D]/15 transition hover:-translate-y-0.5 hover:bg-[#24483E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing you in...
                </>
              ) : (
                <>
                  Enter Vatsalya
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#D9DDD7]" />
            <span className="text-xs text-[#9AA49F]">OR</span>
            <div className="h-px flex-1 bg-[#D9DDD7]" />
          </div>

          <div className="text-center">
            <p className="text-sm text-[#66736D]">
              New to Vatsalya?
            </p>

            <Link
              to="/register"
              className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#C96F4A] hover:underline"
            >
              Create an account
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-center text-[11px] leading-5 text-[#8A948F]">
            <ShieldCheck size={14} />
            Secure welfare workspace · Responsible data handling
          </div>

        </div>
      </section>
    </div>
  );
}
