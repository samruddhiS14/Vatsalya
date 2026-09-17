import React from "react";
import Hero from "../components/Hero";
import AdoptableAnimalsSection from "../components/landing/AdoptableAnimalsSection";
import LifecycleSection from "../components/landing/LifecycleSection";
import AITriageSection from "../components/landing/AITriageSection";
import ShelterDirectorySection from "../components/landing/ShelterDirectorySection";
import VideoStorySection from "../components/landing/VideoStorySection";
import FinalCTA from "../components/landing/FinalCTA";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <main>
        <Hero />
        <AdoptableAnimalsSection />
        <LifecycleSection />
        <AITriageSection />
        <ShelterDirectorySection />
        <VideoStorySection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
