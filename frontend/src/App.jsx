import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPortal from "./pages/LoginPortal";
import Register from "./pages/Register";
import ReportAnimal from "./pages/ReportAnimal";
import CreateAnimal from "./pages/CreateAnimal";
import AdopterDashboard from "./pages/AdopterDashboard";

import CitizenDashboard from "./components/dashboards/CitizenDashboard";
import RescueTeamDashboard from "./components/dashboards/RescueTeamDashboard";
import MedicalDashboard from "./components/dashboards/MedicalDashboard";
import ShelterManagementDashboard from "./components/dashboards/ShelterManagementDashboard";
import AdminDashboard from "./components/dashboards/AdminDashboard";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import "./App.css";

function Unauthorized() {
  return (
    <div className="min-h-screen bg-[var(--v-ivory)] flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-black/5 shadow-[0_20px_70px_rgba(70,56,79,0.10)] p-10 text-center">
        <p className="text-xs uppercase tracking-[0.18em] font-bold text-[var(--v-terracotta)]">
          Vatsalya
        </p>
        <h1 className="v-heading text-4xl mt-3">
          Access not available
        </h1>
        <p className="v-body mt-4">
          Your current account does not have permission to open this workspace.
        </p>
        <a
          href="/"
          className="inline-flex mt-7 px-6 py-3 rounded-full bg-[var(--v-forest)] text-white font-semibold"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPortal />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/report"
        element={
          <ProtectedRoute allowedRoles={["CITIZEN", "ADOPTER"]}>
            <ReportAnimal />
          </ProtectedRoute>
        }
      />

      <Route
        path="/citizen"
        element={
          <ProtectedRoute allowedRoles={["CITIZEN"]}>
            <CitizenDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/adopter"
        element={
          <ProtectedRoute allowedRoles={["ADOPTER"]}>
            <AdopterDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["RESCUER"]}>
            <RescueTeamDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/medical"
        element={
          <ProtectedRoute allowedRoles={["VETERINARIAN"]}>
            <MedicalDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/shelter"
        element={
          <ProtectedRoute allowedRoles={["SHELTER"]}>
            <ShelterManagementDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/shelter/create-animal"
        element={
          <ProtectedRoute allowedRoles={["SHELTER"]}>
            <CreateAnimal />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function HomePage() {
  return <LandingPage />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
