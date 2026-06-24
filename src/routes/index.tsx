import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bell, User, HelpCircle, ToggleRight, Sparkles, ExternalLink, X } from "lucide-react";
import confetti from "canvas-confetti";
import balloonPink from "@/assets/balloon-pink.png";
import balloonOrange from "@/assets/balloon-orange.png";
import balloonYellow from "@/assets/balloon-yellow.png";
import balloonPurple from "@/assets/balloon-purple.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Friday Explosion Day — Mega Discounts Drop Friday" },
      { name: "description", content: "Final Explosion Friday — up to ₦25,000 off. Prices detonate Friday at 12:00 AM. Set a reminder before stock vanishes." },
      { property: "og:title", content: "Final Explosion Friday — Up to ₦25,000 Off" },
      { property: "og:description", content: "The final price explosion drops Friday at 12:00 AM. Up to ₦25,000 off. Be first in line." },
    ],
  }),
  component: Index,
});

function getNextFridayMidnight(): Date {
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay();
  let daysUntilFriday = (5 - day + 7) % 7;
  // If it's Friday and already past midnight, go to next Friday
  if (daysUntilFriday === 0 && (now.getHours() > 0 || now.getMinutes() > 0 || now.getSeconds() > 0)) {
    daysUntilFriday = 7;
  }
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
  const [target] = useState(() => getNextFridayMidnight());
  const { days, hours, minutes, seconds } = useCountdown(target);
  const [notifyOpen, setNotifyOpen] = useState(false);

  useEffect(() => {
    // Launch continuous side-bursts every 3.5 seconds
    const intervalId = setInterval(() => {
      // Left side burst
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.85 },
        colors: ["#ff0055", "#00ffcc", "#ffcc00", "#9900ff", "#ff5500"],
      });
      // Right side burst
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.85 },
        colors: ["#ff0055", "#00ffcc", "#ffcc00", "#9900ff", "#ff5500"],
      });
    }, 3500);

    // Initial bursts
    const timeoutId1 = setTimeout(() => {
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.85 },
      });
    }, 500);
    const timeoutId2 = setTimeout(() => {
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.85 },
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, []);

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
          Final Explosion Friday · Up to ₦25,000 Off
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
          Up to{" "}
          <span className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-white bg-clip-text text-transparent">
            ₦25,000 Off
          </span>{" "}
          — Final Explosion{" "}
          <span className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-white bg-clip-text text-transparent">
            Friday
          </span>
        </h1>
        <p className="mb-10 max-w-xl font-mono text-sm text-white/90 md:text-base">
          Get ready. This Friday at 12:00 AM. The final explosion drops — once it's gone, it's gone.
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
            Unlock the best prices first
          </p>
          <button
            onClick={() => {
              if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
                window.open(
                  "https://www.jumia.com.ng/customer/newsletter/manage/",
                  "JumiaNewsletter",
                  "width=900,height=700,left=200,top=100,resizable=yes,scrollbars=yes"
                );
              } else {
                setNotifyOpen(true);
              }
            }}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold uppercase tracking-wider text-[oklch(0.62_0.21_45)] shadow-2xl transition-transform hover:scale-[1.02] active:scale-100"
          >
            <Sparkles className="h-5 w-5" />
            Notify Me
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
          <p className="mt-3 text-xs text-white/80">
            Set a reminder · We'll alert you the moment Friday's prices explode
          </p>
        </div>
      </div>

      {notifyOpen && <NotifyModal onClose={() => setNotifyOpen(false)} />}
    </main>
  );
}

function NotifyModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"app" | "web">("app");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const steps = [
    { icon: Bell, label: "Open the Jumia App" },
    { icon: User, label: "Tap on Account" },
    { icon: HelpCircle, label: "Go to Help & Support" },
    { icon: ToggleRight, label: "Turn on Push Notifications" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-full bg-black/5 p-2 text-neutral-600 transition hover:bg-black/10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="bg-gradient-to-br from-[oklch(0.78_0.18_55)] to-[oklch(0.65_0.22_45)] px-6 pb-5 pt-7 text-center">
          <h2 className="text-xl font-bold text-white">
            Notifications Off? Let's fix that 🔧
          </h2>
          <div className="mt-4 inline-flex rounded-full bg-white/20 p-1 backdrop-blur-sm">
            <button
              onClick={() => setTab("app")}
              className={`rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                tab === "app" ? "bg-white text-[oklch(0.62_0.21_45)]" : "text-white"
              }`}
            >
              On the App
            </button>
            <button
              onClick={() => setTab("web")}
              className={`rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                tab === "web" ? "bg-white text-[oklch(0.62_0.21_45)]" : "text-white"
              }`}
            >
              On the Web
            </button>
          </div>
        </div>

        <div className="px-6 py-6">
          {tab === "app" ? (
            <>
              <ul className="space-y-4">
                {steps.map((s, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
                        <s.icon className="h-6 w-6 text-[oklch(0.65_0.22_45)]" strokeWidth={2.2} />
                      </div>
                      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-purple-400 text-[10px] font-bold text-white shadow">
                        {pad(i + 1)}
                      </span>
                    </div>
                    <span className="text-base font-semibold text-neutral-800">
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>

              <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[oklch(0.78_0.18_55)] to-[oklch(0.65_0.22_45)] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-[1.02]">
                <Sparkles className="h-4 w-4" />
                Enable Notification
              </button>

              <button
                onClick={() => setTab("web")}
                className="mt-4 flex w-full items-center justify-center gap-1.5 text-center text-sm text-neutral-500 hover:text-neutral-700"
              >
                Not using the app? Continue to Newsletter
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <>
              <p className="text-sm leading-relaxed text-neutral-600">
                Subscribe to the Jumia newsletter to get the explosion alert
                straight to your inbox — manage your preferences in one click.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[oklch(0.65_0.22_45)]">✓</span>
                  First access to Friday's exploded prices
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[oklch(0.65_0.22_45)]">✓</span>
                  Exclusive coupons before stock runs out
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[oklch(0.65_0.22_45)]">✓</span>
                  Unsubscribe anytime
                </li>
              </ul>

              <button
                onClick={() =>
                  window.open(
                    "https://www.jumia.com.ng/customer/newsletter/manage/",
                    "JumiaNewsletter",
                    "width=900,height=700,left=200,top=100,resizable=yes,scrollbars=yes"
                  )
                }
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[oklch(0.78_0.18_55)] to-[oklch(0.65_0.22_45)] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                Manage Newsletter
                <ExternalLink className="h-4 w-4" />
              </button>

              <button
                onClick={() => setTab("app")}
                className="mt-4 block w-full text-center text-sm text-neutral-500 hover:text-neutral-700"
              >
                Prefer the app? See app steps →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
