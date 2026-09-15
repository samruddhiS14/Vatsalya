import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  MapPin,
  Upload,
  AlertTriangle,
  Navigation,
  X,
  Loader2
} from "lucide-react";

import { api } from "../services/apiClient";
import { getCurrentUser } from "../services/session";

const urgencyOptions = [
  {
    value: "CRITICAL",
    label: "Critical",
    description: "Life-threatening injury or immediate danger"
  },
  {
    value: "HIGH",
    label: "High",
    description: "Serious injury or urgent intervention needed"
  },
  {
    value: "MEDIUM",
    label: "Medium",
    description: "Animal needs help but is currently stable"
  },
  {
    value: "LOW",
    label: "Low",
    description: "Non-urgent welfare concern"
  }
];

function mapUrgency(value) {
  const mapping = {
    CRITICAL: "CRITICAL",
    HIGH: "URGENT",
    MEDIUM: "MODERATE",
    LOW: "LOW"
  };

  return mapping[value] || "MODERATE";
}

function resizeImage(file) {
  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onload = () => {

      const img = new Image();

      img.onload = () => {

        const maxSize = 1000;

        let width = img.width;
        let height = img.height;

        if (width > maxSize || height > maxSize) {

          if (width > height) {
            height =
              Math.round(
                height * maxSize / width
              );
            width = maxSize;
          } else {
            width =
              Math.round(
                width * maxSize / height
              );
            height = maxSize;
          }
        }

        const canvas =
          document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const ctx =
          canvas.getContext("2d");

        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        resolve(
          canvas.toDataURL(
            "image/jpeg",
            0.72
          )
        );
      };

      img.onerror = reject;

      img.src = reader.result;
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export default function ReportAnimal() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [urgency, setUrgency] =
    useState("MEDIUM");

  const [location, setLocation] =
    useState("");

  const [latitude, setLatitude] =
    useState("");

  const [longitude, setLongitude] =
    useState("");

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [caseId, setCaseId] =
    useState("");

  const user = getCurrentUser();

  useEffect(() => {

    if (!user) {
      navigate("/login", {
        replace: true
      });
    }

  }, []);

  function handlePhoto(event) {

    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    setError("");

    setPhoto(file);

    const preview =
      URL.createObjectURL(file);

    setPhotoPreview(preview);
  }

  function removePhoto() {

    setPhoto(null);
    setPhotoPreview("");
  }

  function getCurrentLocation() {

    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported by this browser."
      );
      return;
    }

    setLocationLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      position => {

        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);

        setLocation(
          `Current location (${lat.toFixed(5)}, ${lng.toFixed(5)})`
        );

        setLocationLoading(false);
      },

      () => {

        setLocationLoading(false);

        setError(
          "Unable to access your location. Please enter it manually."
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 10000
      }
    );
  }

  function parseManualCoordinates() {

    const match =
      location.match(
        /^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/
      );

    if (match) {

      setLatitude(
        Number(match[1])
      );

      setLongitude(
        Number(match[2])
      );

      return true;
    }

    return false;
  }

  function nextStep() {

    setError("");

    if (step === 1 && !photo) {
      setError(
        "Please upload a photo of the animal."
      );
      return;
    }

    if (step === 2 && description.trim().length < 10) {
      setError(
        "Please describe the situation in at least 10 characters."
      );
      return;
    }

    if (step === 3 && !location.trim()) {
      setError(
        "Please provide the animal's location."
      );
      return;
    }

    if (step === 3) {
      parseManualCoordinates();
    }

    setStep(
      current => Math.min(current + 1, 4)
    );
  }

  function previousStep() {

    setError("");

    setStep(
      current => Math.max(current - 1, 1)
    );
  }

  async function submitReport() {

    if (!user?.email) {
      setError(
        "Your session has expired. Please login again."
      );
      return;
    }

    setSubmitting(true);
    setError("");

    try {

      let photoData = "";

      if (photo) {
        photoData =
          await resizeImage(photo);
      }

      let finalLat =
        Number(latitude) || 0;

      let finalLng =
        Number(longitude) || 0;

      if (
        (!finalLat || !finalLng) &&
        location
      ) {
        const parsed =
          location.match(
            /^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/
          );

        if (parsed) {
          finalLat = Number(parsed[1]);
          finalLng = Number(parsed[2]);
        }
      }

      const payload = {
        description: description.trim(),

        imageUrl: "",

        photoData,

        latitude: finalLat,

        longitude: finalLng,

        locationLabel:
          location.trim(),

        reporterEmail:
          user.email,

        urgency:
          mapUrgency(urgency),

        status:
          "PENDING_TRIAGE"
      };

      const savedCase =
        await api.post(
          "/rescues",
          payload
        );

      setCaseId(
        `VP-${new Date().getFullYear()}-${String(
          savedCase.id
        ).padStart(4, "0")}`
      );

      setSubmitted(true);

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Unable to submit your report."
      );

    } finally {

      setSubmitting(false);
    }
  }

  if (submitted) {

    return (
      <div className="min-h-screen bg-[var(--v-ivory)] flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-2xl">

          <div className="bg-white rounded-[32px] p-10 md:p-14 text-center shadow-[var(--shadow-card)]">

            <div className="mx-auto mb-7 w-20 h-20 rounded-full bg-[#E8F1E9] flex items-center justify-center">
              <CheckCircle2
                size={42}
                className="text-[var(--v-success)]"
              />
            </div>

            <p className="text-sm font-bold tracking-[0.18em] uppercase text-[var(--v-terracotta)] mb-3">
              Report received
            </p>

            <h1 className="v-heading text-4xl md:text-5xl mb-5">
              Thank you for speaking up.
            </h1>

            <p className="v-body max-w-xl mx-auto mb-8">
              Your report has been added to the Vatsalya rescue network.
              A rescue coordinator can now review and dispatch the appropriate team.
            </p>

            <div className="bg-[var(--v-ivory)] rounded-2xl p-6 mb-8">

              <p className="text-xs uppercase tracking-[0.16em] text-[var(--v-muted)] mb-2">
                Case ID
              </p>

              <p className="font-bold text-2xl text-[var(--v-plum)]">
                {caseId}
              </p>

            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">

              <Link
                to="/citizen"
                className="px-6 py-3 rounded-full bg-[var(--v-forest)] text-white font-bold"
              >
                Track My Report
              </Link>

              <Link
                to="/"
                className="px-6 py-3 rounded-full border border-black/10 font-bold"
              >
                Return Home
              </Link>

            </div>

          </div>

        </div>

      </div>
    );
  }

  const steps = [
    { number: 1, label: "Photo" },
    { number: 2, label: "Details" },
    { number: 3, label: "Location" },
    { number: 4, label: "Review" }
  ];

  return (
    <div className="min-h-screen bg-[var(--v-ivory)]">

      <header className="border-b border-black/5 bg-white/80 backdrop-blur-xl">

        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">

          <Link
            to="/citizen"
            className="flex items-center gap-2 font-bold text-[var(--v-forest)]"
          >
            <ArrowLeft size={18} />
            Back to portal
          </Link>

          <span className="font-serif text-2xl text-[var(--v-plum)]">
            Vatsalya
          </span>

          <span className="hidden sm:block text-sm text-[var(--v-muted)]">
            Report an animal
          </span>

        </div>

      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 md:py-14">

        <div className="mb-10">

          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--v-terracotta)] mb-3">
            Community rescue
          </p>

          <h1 className="v-heading text-4xl md:text-6xl">
            Tell us what happened.
          </h1>

          <p className="v-body mt-4 max-w-2xl">
            A few details are enough. Vatsalya turns your report into a
            trackable rescue case.
          </p>

        </div>

        <div className="grid grid-cols-4 gap-2 mb-10">

          {steps.map(item => (

            <div key={item.number}>

              <div
                className={`h-1.5 rounded-full ${
                  step >= item.number
                    ? "bg-[var(--v-terracotta)]"
                    : "bg-black/10"
                }`}
              />

              <p
                className={`mt-2 text-xs font-bold ${
                  step >= item.number
                    ? "text-[var(--v-plum)]"
                    : "text-[var(--v-muted)]"
                }`}
              >
                {item.number}. {item.label}
              </p>

            </div>

          ))}

        </div>

        {error && (

          <div className="mb-6 rounded-2xl bg-[#FCE9E6] border border-[#E9B6AE] p-4 flex gap-3">

            <AlertTriangle
              className="text-[var(--v-critical)] shrink-0"
              size={20}
            />

            <p className="text-sm font-medium text-[#7C2F27]">
              {error}
            </p>

          </div>

        )}

        <div className="bg-white rounded-[32px] shadow-[var(--shadow-card)] p-7 md:p-10">

          {step === 1 && (

            <div>

              <div className="mb-7">

                <p className="text-xs uppercase tracking-[0.15em] text-[var(--v-muted)] mb-2">
                  Step 01
                </p>

                <h2 className="v-heading text-3xl">
                  Show us the animal
                </h2>

              </div>

              {!photoPreview ? (

                <label className="border-2 border-dashed border-black/10 rounded-3xl min-h-[330px] flex flex-col items-center justify-center cursor-pointer hover:border-[var(--v-terracotta)] transition">

                  <div className="w-16 h-16 rounded-2xl bg-[var(--v-ivory)] flex items-center justify-center mb-5">
                    <Camera
                      size={30}
                      className="text-[var(--v-plum)]"
                    />
                  </div>

                  <p className="font-bold text-lg">
                    Upload an animal photo
                  </p>

                  <p className="text-sm text-[var(--v-muted)] mt-2">
                    JPG, PNG or WEBP
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhoto}
                  />

                </label>

              ) : (

                <div className="relative rounded-3xl overflow-hidden">

                  <img
                    src={photoPreview}
                    alt="Animal preview"
                    className="w-full h-[380px] object-cover"
                  />

                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute top-4 right-4 w-11 h-11 rounded-full bg-black/70 text-white flex items-center justify-center"
                  >
                    <X size={20} />
                  </button>

                </div>

              )}

            </div>

          )}

          {step === 2 && (

            <div>

              <div className="mb-7">

                <p className="text-xs uppercase tracking-[0.15em] text-[var(--v-muted)] mb-2">
                  Step 02
                </p>

                <h2 className="v-heading text-3xl">
                  What is happening?
                </h2>

              </div>

              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Example: I found a dog near the main road. It appears to have an injured back leg and is unable to walk properly."
                rows={7}
                className="w-full rounded-2xl border border-black/10 px-5 py-4 outline-none focus:border-[var(--v-terracotta)] resize-none"
              />

              <div className="mt-8">

                <p className="font-bold mb-4">
                  How urgent is the situation?
                </p>

                <div className="grid md:grid-cols-2 gap-3">

                  {urgencyOptions.map(option => (

                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setUrgency(option.value)
                      }
                      className={`text-left rounded-2xl border p-5 transition ${
                        urgency === option.value
                          ? "border-[var(--v-terracotta)] bg-[#FFF5EF]"
                          : "border-black/10 hover:border-black/20"
                      }`}
                    >

                      <div className="flex justify-between">

                        <span className="font-bold">
                          {option.label}
                        </span>

                        {urgency === option.value && (
                          <CheckCircle2
                            size={19}
                            className="text-[var(--v-terracotta)]"
                          />
                        )}

                      </div>

                      <p className="text-sm text-[var(--v-muted)] mt-2">
                        {option.description}
                      </p>

                    </button>

                  ))}

                </div>

              </div>

            </div>

          )}

          {step === 3 && (

            <div>

              <div className="mb-7">

                <p className="text-xs uppercase tracking-[0.15em] text-[var(--v-muted)] mb-2">
                  Step 03
                </p>

                <h2 className="v-heading text-3xl">
                  Where is the animal?
                </h2>

              </div>

              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={locationLoading}
                className="w-full rounded-2xl bg-[var(--v-forest)] text-white p-5 flex items-center justify-center gap-3 font-bold mb-5"
              >

                {locationLoading ? (
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                ) : (
                  <Navigation size={20} />
                )}

                {locationLoading
                  ? "Getting your location..."
                  : "Use my current location"}

              </button>

              <div className="flex items-center gap-4 my-6">

                <div className="h-px bg-black/10 flex-1" />

                <span className="text-xs uppercase text-[var(--v-muted)]">
                  or enter manually
                </span>

                <div className="h-px bg-black/10 flex-1" />

              </div>

              <div className="relative">

                <MapPin
                  size={20}
                  className="absolute left-4 top-4 text-[var(--v-muted)]"
                />

                <input
                  value={location}
                  onChange={e =>
                    setLocation(e.target.value)
                  }
                  placeholder="Area, landmark or coordinates (e.g. 22.7196, 75.8577)"
                  className="w-full rounded-2xl border border-black/10 py-4 pl-12 pr-4 outline-none focus:border-[var(--v-terracotta)]"
                />

              </div>

              {(latitude || longitude) && (

                <div className="mt-4 rounded-2xl bg-[#EEF4EF] p-4 text-sm">

                  <p className="font-bold text-[var(--v-forest)]">
                    GPS coordinates captured
                  </p>

                  <p className="text-[var(--v-muted)] mt-1">
                    {latitude}, {longitude}
                  </p>

                </div>

              )}

            </div>

          )}

          {step === 4 && (

            <div>

              <div className="mb-7">

                <p className="text-xs uppercase tracking-[0.15em] text-[var(--v-muted)] mb-2">
                  Step 04
                </p>

                <h2 className="v-heading text-3xl">
                  Review your report
                </h2>

              </div>

              <div className="space-y-4">

                {photoPreview && (

                  <img
                    src={photoPreview}
                    alt="Animal"
                    className="w-full h-64 object-cover rounded-2xl"
                  />

                )}

                <div className="rounded-2xl bg-[var(--v-ivory)] p-5">

                  <p className="text-xs uppercase tracking-wider text-[var(--v-muted)]">
                    Situation
                  </p>

                  <p className="mt-2">
                    {description}
                  </p>

                </div>

                <div className="grid md:grid-cols-2 gap-4">

                  <div className="rounded-2xl bg-[var(--v-ivory)] p-5">

                    <p className="text-xs uppercase tracking-wider text-[var(--v-muted)]">
                      Urgency
                    </p>

                    <p className="font-bold mt-2">
                      {
                        urgencyOptions.find(
                          x => x.value === urgency
                        )?.label
                      }
                    </p>

                  </div>

                  <div className="rounded-2xl bg-[var(--v-ivory)] p-5">

                    <p className="text-xs uppercase tracking-wider text-[var(--v-muted)]">
                      Location
                    </p>

                    <p className="font-bold mt-2">
                      {location}
                    </p>

                  </div>

                </div>

              </div>

              <p className="text-sm text-[var(--v-muted)] mt-6">
                Your report will be added to the rescue queue for coordinator review.
              </p>

            </div>

          )}

          <div className="flex justify-between gap-3 mt-10 pt-7 border-t border-black/5">

            {step > 1 ? (

              <button
                type="button"
                onClick={previousStep}
                className="px-6 py-3 rounded-full border border-black/10 font-bold"
              >
                Back
              </button>

            ) : (
              <div />
            )}

            {step < 4 ? (

              <button
                type="button"
                onClick={nextStep}
                className="px-7 py-3 rounded-full bg-[var(--v-terracotta)] text-white font-bold flex items-center gap-2"
              >
                Continue
                <ArrowRight size={18} />
              </button>

            ) : (

              <button
                type="button"
                disabled={submitting}
                onClick={submitReport}
                className="px-7 py-3 rounded-full bg-[var(--v-forest)] text-white font-bold flex items-center gap-2 disabled:opacity-60"
              >

                {submitting ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit report
                    <Upload size={18} />
                  </>
                )}

              </button>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}
