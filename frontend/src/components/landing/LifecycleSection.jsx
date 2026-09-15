import React from "react";
import {
  Camera,
  Ambulance,
  Stethoscope,
  Home,
  HeartHandshake,
  ClipboardCheck
} from "lucide-react";

const stages = [
  {
    number: "01",
    title: "Report",
    text: "A citizen can report an animal using a photo, description and location.",
    image: "/images/animals/dogs/dog1.jpg",
    icon: Camera
  },
  {
    number: "02",
    title: "Rescue",
    text: "Cases are prioritised and connected with the appropriate rescue team.",
    image: "/images/animals/cattle/cattle1.jpg",
    icon: Ambulance
  },
  {
    number: "03",
    title: "Heal",
    text: "Veterinary teams record diagnosis, treatment, vaccination and recovery.",
    image: "/images/animals/horses/horse1.jpg",
    icon: Stethoscope
  },
  {
    number: "04",
    title: "Shelter",
    text: "Animals are placed into suitable shelters or foster environments.",
    image: "/images/animals/cats/cat1.jpg",
    icon: Home
  },
  {
    number: "05",
    title: "Adopt",
    text: "Responsible adopters are matched with animals based on compatibility.",
    image: "/images/animals/rabbits/rabbit1.jpg",
    icon: HeartHandshake
  },
  {
    number: "06",
    title: "Follow-up",
    text: "The journey continues through post-adoption welfare monitoring.",
    image: "/images/animals/birds/bird1.jpg",
    icon: ClipboardCheck
  }
];

export default function LifecycleSection() {
  return (
    <section
      id="lifecycle"
      className="overflow-hidden bg-[#F7F3EA] py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#C96F4A]">
            The Vatsalya lifecycle
          </p>

          <h2 className="font-['Playfair_Display'] text-5xl font-semibold leading-tight text-[#46384F] md:text-6xl">
            One connected journey.
          </h2>

          <p className="mt-5 text-lg leading-8 text-[#6D686D]">
            Vatsalya connects every stage of animal welfare instead of
            letting cases disappear between disconnected systems.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {stages.map((stage) => {
            const Icon = stage.icon;

            return (
              <article
                key={stage.title}
                className="group relative min-h-[340px] overflow-hidden rounded-[30px] bg-[#17352D]"
              >

                <img
                  src={stage.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-25 transition duration-700 group-hover:scale-105 group-hover:opacity-35"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-br from-[#17352D]/95 via-[#17352D]/75 to-[#46384F]/65" />

                <div className="relative flex h-full flex-col p-7 text-white">

                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] text-white/45">
                      {stage.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md">
                      <Icon size={19} />
                    </div>
                  </div>

                  <div className="mt-auto">

                    <h3 className="font-['Playfair_Display'] text-4xl font-semibold">
                      {stage.title}
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
                      {stage.text}
                    </p>

                    <div className="mt-6 h-px w-full bg-white/10" />

                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#D7A95B]">
                      Part of one connected record
                    </p>

                  </div>
                </div>

              </article>
            );
          })}

        </div>

      </div>
    </section>
  );
}
