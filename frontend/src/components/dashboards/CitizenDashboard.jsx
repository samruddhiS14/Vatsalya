import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  PawPrint,
  RefreshCw
} from "lucide-react";

import { api } from "../../services/apiClient";
import {
  getCurrentUser,
  clearSession
} from "../../services/session";

const statusInfo = {
  PENDING_TRIAGE: {
    label: "Awaiting triage",
    text: "Your report is waiting for rescue coordination."
  },
  DISPATCHED: {
    label: "Rescue dispatched",
    text: "A rescue team has been assigned."
  },
  RESCUED: {
    label: "Animal rescued",
    text: "The animal has been safely rescued."
  },
  CLOSED: {
    label: "Case closed",
    text: "This rescue case has been completed."
  }
};

export default function CitizenDashboard() {

  const user = getCurrentUser();

  const [cases, setCases] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {

    if (!user?.email) return;

    setLoading(true);
    setError("");

    try {

      const [caseData, animalData] =
        await Promise.all([
          api.get(
            `/rescues/reporter?email=${encodeURIComponent(
              user.email
            )}`
          ),
          api.get("/animals")
        ]);

      setCases(caseData || []);
      setAnimals(
        (animalData || []).filter(
          animal =>
            animal.status === "ADOPTION_READY"
        )
      );

    } catch (err) {

      setError(
        err.message ||
        "Unable to load your portal."
      );

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function logout() {
    clearSession();
    window.location.href = "/login";
  }

  const activeCases =
    cases.filter(
      item =>
        item.status !== "CLOSED"
    ).length;

  const rescuedCases =
    cases.filter(
      item =>
        item.status === "RESCUED" ||
        item.status === "CLOSED"
    ).length;

  return (
    <div className="min-h-screen bg-[var(--v-ivory)]">

      <header className="bg-[var(--v-forest)] text-white">

        <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between gap-5">

          <div>

            <p className="text-white/60 text-xs uppercase tracking-[0.16em]">
              Community portal
            </p>

            <h1 className="font-serif text-2xl">
              Vatsalya
            </h1>

          </div>

          <div className="flex items-center gap-3">

            <span className="hidden sm:block text-sm text-white/70">
              {user?.name || user?.email}
            </span>

            <button
              onClick={logout}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20"
              title="Logout"
            >
              <LogOut size={18} />
            </button>

          </div>

        </div>

      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--v-terracotta)]">
              Welcome back
            </p>

            <h2 className="v-heading text-4xl md:text-5xl mt-2">
              Your welfare dashboard
            </h2>

          </div>

          <Link
            to="/report"
            className="inline-flex items-center justify-center gap-2 bg-[var(--v-terracotta)] text-white px-6 py-3 rounded-full font-bold"
          >
            <Plus size={19} />
            Report an Animal
          </Link>

        </div>

        {error && (

          <div className="mb-7 bg-[#FCE9E6] rounded-2xl p-4 text-sm text-[#7C2F27]">
            {error}
          </div>

        )}

        <div className="grid sm:grid-cols-3 gap-4 mb-10">

          <Stat
            label="My reports"
            value={cases.length}
          />

          <Stat
            label="Active cases"
            value={activeCases}
          />

          <Stat
            label="Animals helped"
            value={rescuedCases}
          />

        </div>

        <section className="bg-white rounded-[28px] shadow-[var(--shadow-soft)] overflow-hidden">

          <div className="p-6 md:p-8 border-b border-black/5 flex items-center justify-between">

            <div>

              <p className="text-xs uppercase tracking-[0.15em] text-[var(--v-muted)]">
                Live data
              </p>

              <h3 className="v-heading text-2xl mt-1">
                My reports
              </h3>

            </div>

            <button
              onClick={loadData}
              className="p-3 rounded-full bg-[var(--v-ivory)]"
            >
              <RefreshCw size={18} />
            </button>

          </div>

          {loading ? (

            <div className="p-12 text-center text-[var(--v-muted)]">
              Loading your reports...
            </div>

          ) : cases.length === 0 ? (

            <div className="p-12 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--v-ivory)] flex items-center justify-center mb-4">
                <PawPrint
                  className="text-[var(--v-plum)]"
                />
              </div>

              <h4 className="font-bold text-lg">
                No reports yet
              </h4>

              <p className="text-sm text-[var(--v-muted)] mt-2 mb-5">
                If you see an animal that needs help, your report can start the rescue journey.
              </p>

              <Link
                to="/report"
                className="inline-flex px-5 py-3 rounded-full bg-[var(--v-forest)] text-white font-bold"
              >
                Make a report
              </Link>

            </div>

          ) : (

            <div className="divide-y divide-black/5">

              {cases.map(item => (

                <CaseRow
                  key={item.id}
                  item={item}
                />

              ))}

            </div>

          )}

        </section>

        <section className="mt-10">

          <div className="flex justify-between items-end mb-5">

            <div>

              <p className="text-xs uppercase tracking-[0.15em] text-[var(--v-muted)]">
                Adoption
              </p>

              <h3 className="v-heading text-2xl">
                Animals looking for homes
              </h3>

            </div>

            <Link
              to="/"
              className="text-sm font-bold text-[var(--v-terracotta)]"
            >
              Explore →
            </Link>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            {animals.slice(0, 3).map(animal => (

              <div
                key={animal.id}
                className="bg-white rounded-3xl overflow-hidden shadow-[var(--shadow-soft)]"
              >

                {animal.imageUrl ? (
                  <img
                    src={animal.imageUrl}
                    className="w-full h-52 object-cover"
                    alt={animal.name || animal.species}
                  />
                ) : (
                  <div className="h-52 bg-[var(--v-forest)] flex items-center justify-center">
                    <PawPrint
                      size={45}
                      className="text-white/70"
                    />
                  </div>
                )}

                <div className="p-5">

                  <p className="font-bold text-lg">
                    {animal.name ||
                      animal.breed ||
                      animal.species}
                  </p>

                  <p className="text-sm text-[var(--v-muted)] mt-1">
                    {animal.species} · {animal.breed}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

function Stat({ label, value }) {

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[var(--shadow-soft)]">

      <p className="text-sm text-[var(--v-muted)]">
        {label}
      </p>

      <p className="text-4xl font-bold text-[var(--v-plum)] mt-2">
        {value}
      </p>

    </div>
  );
}

function CaseRow({ item }) {

  const info =
    statusInfo[item.status] ||
    statusInfo.PENDING_TRIAGE;

  return (
    <div className="p-6 md:p-8">

      <div className="flex flex-col lg:flex-row gap-6">

        {item.photoData && (

          <img
            src={item.photoData}
            alt="Reported animal"
            className="w-full lg:w-40 h-32 object-cover rounded-2xl"
          />

        )}

        <div className="flex-1">

          <div className="flex flex-wrap gap-2 mb-3">

            <span className="px-3 py-1 rounded-full bg-[var(--v-ivory)] text-xs font-bold">
              VP-{new Date(
                item.reportedAt
              ).getFullYear()}-
              {String(item.id).padStart(4, "0")}
            </span>

            <span className="px-3 py-1 rounded-full bg-[#FFF2E8] text-xs font-bold text-[var(--v-terracotta)]">
              {item.urgency}
            </span>

          </div>

          <h4 className="font-bold text-lg">
            {item.description}
          </h4>

          <div className="flex flex-wrap gap-4 mt-3 text-sm text-[var(--v-muted)]">

            <span className="flex items-center gap-1.5">
              <MapPin size={15} />
              {item.locationLabel || "Location recorded"}
            </span>

            <span className="flex items-center gap-1.5">
              <Clock size={15} />
              {item.reportedAt
                ? new Date(
                    item.reportedAt
                  ).toLocaleString()
                : "Recently"}
            </span>

          </div>

          <div className="mt-5 flex items-center gap-3">

            <StatusBadge
              status={item.status}
            />

            <span className="text-sm text-[var(--v-muted)]">
              {info.text}
            </span>

          </div>

          <div className="flex gap-1 mt-6">

            {[
              "PENDING_TRIAGE",
              "DISPATCHED",
              "RESCUED",
              "CLOSED"
            ].map((status, index) => {

              const statuses = [
                "PENDING_TRIAGE",
                "DISPATCHED",
                "RESCUED",
                "CLOSED"
              ];

              const current =
                statuses.indexOf(item.status);

              return (
                <React.Fragment key={status}>

                  <div
                    className={`w-3 h-3 rounded-full ${
                      index <= current
                        ? "bg-[var(--v-terracotta)]"
                        : "bg-black/10"
                    }`}
                  />

                  {index < 3 && (
                    <div
                      className={`flex-1 max-w-20 h-0.5 mt-1.5 ${
                        index < current
                          ? "bg-[var(--v-terracotta)]"
                          : "bg-black/10"
                      }`}
                    />
                  )}

                </React.Fragment>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
}

function StatusBadge({ status }) {

  const config = {
    PENDING_TRIAGE: [
      "Awaiting triage",
      "bg-[#FFF4DA] text-[#8A651F]"
    ],
    DISPATCHED: [
      "Rescue dispatched",
      "bg-[#E8EFF4] text-[#456778]"
    ],
    RESCUED: [
      "Rescued",
      "bg-[#E8F1E9] text-[#3E6A4D]"
    ],
    CLOSED: [
      "Completed",
      "bg-[#E8F1E9] text-[#3E6A4D]"
    ]
  };

  const [label, classes] =
    config[status] || config.PENDING_TRIAGE;

  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${classes}`}>
      {label}
    </span>
  );
}
