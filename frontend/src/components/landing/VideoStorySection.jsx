import React, { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "From report to rescue",
    category: "Rescue",
    src: "/videos/rescue/rescue1.mp4"
  },
  {
    id: 2,
    title: "Care that continues",
    category: "Medical",
    src: "/videos/medical/medical1.mp4"
  },
  {
    id: 3,
    title: "A place to heal",
    category: "Shelter",
    src: "/videos/shelter/shelter1.mp4"
  },
  {
    id: 4,
    title: "Finding the right home",
    category: "Adoption",
    src: "/videos/adoption/adoption1.mp4"
  }
];

export default function VideoStorySection() {
  const [selected, setSelected] = useState(videos[0]);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = async () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      try {
        await videoRef.current.play();
      } catch {
        setPlaying(false);
      }
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <section id="stories" className="bg-[#17352D] px-5 py-24 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#D7A95B]">
            Stories from the network
          </p>

          <h2 className="font-serif text-4xl font-bold md:text-6xl">
            Every rescue has a story.
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/65">
            Add your own Vatsalya videos to show the people, animals and
            shelters behind the platform.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_0.5fr]">

          <div className="overflow-hidden rounded-[32px] bg-black shadow-2xl">
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                key={selected.src}
                src={selected.src}
                muted={muted}
                playsInline
                preload="metadata"
                controls
                className="h-full w-full object-cover"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
              />

              {!playing && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#C96F4A] text-white shadow-xl"
                >
                  <Play fill="currentColor" size={25} />
                </button>
              )}

              <button
                type="button"
                onClick={() => setMuted(!muted)}
                className="absolute bottom-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur"
              >
                {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#D7A95B]">
                  {selected.category}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-bold">
                  {selected.title}
                </h3>
              </div>

              {playing && (
                <button
                  onClick={togglePlay}
                  className="rounded-xl border border-white/20 px-4 py-2 text-sm"
                >
                  <Pause size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {videos.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => {
                  setSelected(video);
                  setPlaying(false);
                }}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  selected.id === video.id
                    ? "border-[#C96F4A] bg-white/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-widest text-[#D7A95B]">
                  {video.category}
                </div>

                <div className="mt-2 font-serif text-xl font-bold">
                  {video.title}
                </div>

                <div className="mt-2 text-sm text-white/50">
                  {video.src}
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
