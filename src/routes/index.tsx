import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import balloonPink from "@/assets/balloon-pink.png";
import balloonOrange from "@/assets/balloon-orange.png";
import balloonYellow from "@/assets/balloon-yellow.png";
import balloonPurple from "@/assets/balloon-purple.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Friday Explosion Day — Mega Discounts Drop Friday" },
      { name: "description", content: "Get ready for Friday Explosion Day. Our biggest discount drop of the year ignites this Friday. Set a reminder before stock vanishes." },
      { property: "og:title", content: "Friday Explosion Day — Mega Discounts Drop Friday" },
      { property: "og:description", content: "The biggest price explosion of the year drops Friday. Be first in line." },
    ],
  }),
  component: Index,
});

function getNextFriday(): Date {
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay();
  const daysUntilFriday = (5 - day + 7) % 7 || 7;
  target.setDate(now.getDate() + daysUntilFriday);
  target.setHours(0, 0, 0, 0);
  return target;
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function Index() {
  const [target] = useState(() => getNextFriday());
  const { days, hours, minutes, seconds } = useCountdown(target);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Min", value: minutes },
    { label: "Sec", value: seconds },
  ];

  const balloons = [
    { src: balloonPink, className: "top-[8%] left-[6%] w-28 md:w-40 animate-float", delay: "0s" },
    { src: balloonOrange, className: "top-[22%] right-[8%] w-32 md:w-48 animate-drift", delay: "1s" },
    { src: balloonYellow, className: "bottom-[18%] left-[10%] w-28 md:w-44 animate-drift", delay: "2s" },
    { src: balloonPurple, className: "bottom-[10%] right-[12%] w-24 md:w-36 animate-float", delay: "0.5s" },
    { src: balloonPink, className: "top-[55%] left-[3%] w-20 md:w-28 animate-float opacity-70", delay: "3s" },
    { src: balloonYellow, className: "top-[40%] right-[3%] w-20 md:w-28 animate-drift opacity-70", delay: "1.5s" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Pulsing radial rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="animate-pulse-ring h-[80vmin] w-[80vmin] rounded-full border-2 border-white/40" />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="animate-pulse-ring h-[120vmin] w-[120vmin] rounded-full border-2 border-white/30" style={{ animationDelay: "1s" }} />
      </div>

      {/* Floating balloons */}
      {balloons.map((b, i) => (
        <img
          key={i}
          src={b.src}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute drop-shadow-2xl ${b.className}`}
          style={{ animationDelay: b.delay }}
        />
      ))}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        <span className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          Friday Exclusive · Explosion Day 2026
        </span>

        <div className="relative mb-2 flex items-end justify-center gap-4">
          <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-[8rem] font-black leading-none tracking-tighter text-transparent drop-shadow-lg md:text-[12rem]">
            BOOM
          </span>
        </div>
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.4em] text-white/90">
          Prices about to explode
        </p>

        <h1 className="mb-5 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white drop-shadow md:text-6xl">
          The Biggest Discounts Drop on{" "}
          <span className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-white bg-clip-text text-transparent">
            Friday
          </span>
        </h1>
        <p className="mb-10 max-w-xl font-mono text-sm text-white/90 md:text-base">
          This Friday at 12:00 AM — every price detonates. Once it drops, it's gone.
        </p>

        <div className="mb-3 inline-flex items-center gap-3 text-white/95">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-[oklch(0.62_0.21_45)] shadow-md">
            <span>⚡</span> Explosion
          </span>
          <span className="text-sm font-medium">ignites in:</span>
        </div>

        <div className="mb-10 flex gap-3 md:gap-5">
          {units.map((u) => (
            <div key={u.label} className="flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[oklch(0.78_0.09_200)] shadow-xl md:h-28 md:w-28">
                <span className="text-4xl font-black tabular-nums text-white md:text-6xl">
                  {pad(u.value)}
                </span>
              </div>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white md:text-xs">
                {u.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {["Limited Stock", "Friday Exclusive", "While Supplies Last", "Be First In Line"].map((t) => (
            <span key={t} className="rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              {t}
            </span>
          ))}
        </div>

        <div className="w-full max-w-md">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white">
            Get the explosion alert
          </p>
          {submitted ? (
            <div className="rounded-2xl bg-white px-6 py-5 text-center shadow-2xl">
              <p className="font-bold text-[oklch(0.62_0.21_45)]">You're on the list 🎉</p>
              <p className="mt-1 text-sm text-neutral-500">We'll ping you the second prices drop.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubmitted(true);
              }}
              className="flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 rounded-xl bg-transparent px-4 py-3 text-neutral-800 placeholder-neutral-400 outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-[oklch(0.65_0.22_45)] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-transform hover:scale-105 active:scale-100"
              >
                Notify Me →
              </button>
            </form>
          )}
          <p className="mt-3 text-xs text-white/80">
            Set a reminder · We'll alert you the moment Friday's prices explode
          </p>
        </div>
      </div>
    </main>
  );
}
