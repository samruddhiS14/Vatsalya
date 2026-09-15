import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { registerUser } from "../services/auth";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "CITIZEN"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.password) {
      setError("Please complete all required fields.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
        role: form.role
      });

      setSuccess("Account created successfully. Redirecting to sign in...");

      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            email: form.email.trim()
          }
        });
      }, 900);
    } catch (err) {
      setError(err?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--v-ivory)] flex items-center justify-center px-5 py-10">

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl"
      >

        <div className="bg-white rounded-[28px] shadow-[0_25px_80px_rgba(70,56,79,0.12)] border border-black/5 p-7 md:p-10">

          <Link
            to="/"
            className="flex items-center gap-3 mb-8"
          >
<img src="/vatsalya-logo.svg" alt="Vatsalya" className="h-11 w-auto" />
          </Link>

          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[var(--v-terracotta)]">
              Join Vatsalya
            </p>

            <h1 className="v-heading text-4xl md:text-5xl mt-2">
              Create your account.
            </h1>

            <p className="v-body mt-3">
              Join the network helping animals move from report to recovery
              and into responsible homes.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--v-plum)] mb-2">
                Full name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="Your full name"
                required
                className="w-full h-13 rounded-xl border border-black/10 bg-[var(--v-ivory)] px-4 text-sm outline-none focus:border-[var(--v-terracotta)] focus:ring-4 focus:ring-[var(--v-terracotta)]/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--v-plum)] mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
                required
                className="w-full h-13 rounded-xl border border-black/10 bg-[var(--v-ivory)] px-4 text-sm outline-none focus:border-[var(--v-terracotta)] focus:ring-4 focus:ring-[var(--v-terracotta)]/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--v-plum)] mb-2">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={updateField}
                placeholder="10-digit phone number"
                required
                className="w-full h-13 rounded-xl border border-black/10 bg-[var(--v-ivory)] px-4 text-sm outline-none focus:border-[var(--v-terracotta)] focus:ring-4 focus:ring-[var(--v-terracotta)]/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--v-plum)] mb-2">
                I am joining as
              </label>

              <select
                name="role"
                value={form.role}
                onChange={updateField}
                className="w-full h-13 rounded-xl border border-black/10 bg-[var(--v-ivory)] px-4 text-sm outline-none focus:border-[var(--v-terracotta)] focus:ring-4 focus:ring-[var(--v-terracotta)]/10"
              >
                <option value="CITIZEN">Community Member</option>
                <option value="ADOPTER">Adopter</option>
                <option value="RESCUER">Rescue Coordinator</option>
                <option value="VETERINARIAN">Veterinarian</option>
                <option value="SHELTER">Shelter Manager</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[var(--v-plum)] mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={updateField}
                placeholder="Create a secure password"
                required
                minLength={6}
                className="w-full h-13 rounded-xl border border-black/10 bg-[var(--v-ivory)] px-4 text-sm outline-none focus:border-[var(--v-terracotta)] focus:ring-4 focus:ring-[var(--v-terracotta)]/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-13 rounded-xl bg-[var(--v-forest)] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[var(--v-forest-light)] transition disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight size={17} />
                </>
              )}
            </button>

          </form>

          <div className="mt-7 pt-6 border-t border-black/8 text-center text-sm text-[var(--v-muted)]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[var(--v-terracotta)] hover:underline"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-6 flex gap-3 p-4 rounded-xl bg-[var(--v-forest)]/[0.04]">
            <ShieldCheck
              className="text-[var(--v-success)] shrink-0"
              size={17}
            />

            <p className="text-xs text-[var(--v-muted)] leading-relaxed">
              Your information is used to provide the right welfare
              experience and support responsible operations.
            </p>
          </div>

        </div>

      </motion.div>

    </div>
  );
}
