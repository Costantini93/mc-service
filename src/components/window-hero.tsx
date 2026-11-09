"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Phone } from "lucide-react";
import { sunPosition } from "@/lib/sun";
import { site } from "@/lib/site";
import heroPhoto from "../../public/photos/lavori/lavoro-coppi-esterno.jpg";

type Sun = { time: string; elevation: number; azimuth: number } | null;

function useVeronaSun() {
  const [sun, setSun] = useState<Sun>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const { elevation, azimuth } = sunPosition(now);
      setSun({
        time: new Intl.DateTimeFormat("it-IT", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Rome" }).format(now),
        elevation,
        azimuth,
      });
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return sun;
}

// Velatura sulla foto: arriva dalla direzione del sole, più calda quando è basso, blu di notte.
function sunTint(sun: Sun) {
  if (!sun) return undefined;
  if (sun.elevation < 0) return { background: "rgba(40, 56, 96, 0.22)", mixBlendMode: "multiply" as const };
  const warmth = sun.elevation < 15 ? "238, 154, 69" : "243, 194, 77";
  const strength = Math.max(0.35, Math.min(0.7, 0.8 - sun.elevation / 100));
  return {
    background: `linear-gradient(${Math.round(sun.azimuth + 90)}deg, rgba(${warmth}, ${strength}) 0%, rgba(${warmth}, 0) 60%)`,
    mixBlendMode: "soft-light" as const,
  };
}

function SunCaption({ sun }: { sun: Sun }) {
  if (!sun) return <>La luce sulla foto segue il sole di Verona.</>;
  if (sun.elevation < 0) return <>Ore {sun.time} a Verona: il sole è tramontato e la foto prende la luce della sera.</>;
  return <>Ore {sun.time} a Verona, sole a {Math.round(sun.elevation)}°. La luce sulla foto arriva dalla sua direzione.</>;
}

function CallButton() {
  return (
    <a href={site.phoneHref}
      className="inline-flex items-center gap-2.5 rounded-full bg-light px-6 py-3.5 text-lg font-semibold text-ink transition-transform hover:-translate-y-0.5">
      <Phone aria-hidden className="size-5" />
      Chiama {site.phoneDisplay}
    </a>
  );
}

const intro = "Riparazione, manutenzione e sostituzione di finestre per mansarde e sottotetti, in tutta la provincia. Da un tecnico che ha lavorato 13 anni in VELUX.";

export function WindowHero() {
  const reduced = useReducedMotion();
  const sun = useVeronaSun();
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setNarrow(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  if (reduced) return <StaticHero sun={sun} />;
  return <AnimatedHero key={narrow ? "narrow" : "wide"} narrow={narrow} sun={sun} />;
}

function AnimatedHero({ narrow, sun }: { narrow: boolean; sun: Sun }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // La foto parte dentro una finestra da tetto vista in prospettiva e si apre fino a riempire lo schermo.
  const closed = narrow
    ? "polygon(14% 56%, 84% 52%, 90% 88%, 8% 92%)"
    : "polygon(54% 30%, 88% 25%, 93% 84%, 49% 90%)";
  const open = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
  const clip = useTransform(scrollYProgress, [0.05, 0.6], [closed, open]);
  const scale = useTransform(scrollYProgress, [0.05, 0.6], [1.2, 1]);
  // Da chiusa, la finestra vera della foto viene centrata nella sagoma della finestra disegnata.
  const imgX = useTransform(scrollYProgress, [0.05, 0.6], [narrow ? "0%" : "21%", "0%"]);
  const imgY = useTransform(scrollYProgress, [0.05, 0.6], [narrow ? "22%" : "6%", "0%"]);
  const introOpacity = useTransform(scrollYProgress, [0.12, 0.32], [1, 0]);
  const introY = useTransform(scrollYProgress, [0.12, 0.32], [0, -40]);
  const outroOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative h-[240svh]">
      <HeroLayers clip={clip} scale={scale} imgX={imgX} imgY={imgY} introOpacity={introOpacity} introY={introY} outroOpacity={outroOpacity} sun={sun} />
    </section>
  );
}

function StaticHero({ sun }: { sun: Sun }) {
  return (
      <section aria-labelledby="hero-title" className="pt-28">
        <div className="mx-auto max-w-[96rem] px-4 sm:px-8">
          <h1 id="hero-title" className="text-[clamp(3rem,9vw,9rem)] font-light leading-[0.92] tracking-[-0.045em]">
            Finestre da tetto a Verona
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-graphite">{intro}</p>
          <div className="mt-8"><CallButton /></div>
        </div>
        <figure className="relative mt-12 aspect-[16/9] w-full">
          <Image src={heroPhoto} alt="Finestra da tetto montata da MC Service tra i coppi, con il cielo riflesso nel vetro" fill priority sizes="100vw" className="object-cover object-[50%_42%]" />
          <div aria-hidden className="absolute inset-0" style={sunTint(sun)} />
          <figcaption className="absolute bottom-4 left-4 right-4 text-sm text-white sm:left-8"><SunCaption sun={sun} /></figcaption>
        </figure>
      </section>
  );
}

type Layers = {
  clip: MotionValue<string>;
  scale: MotionValue<number>;
  imgX: MotionValue<string>;
  imgY: MotionValue<string>;
  introOpacity: MotionValue<number>;
  introY: MotionValue<number>;
  outroOpacity: MotionValue<number>;
  sun: Sun;
};

function HeroLayers({ clip, scale, imgX, imgY, introOpacity, introY, outroOpacity, sun }: Layers) {
  return (
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <motion.div className="absolute inset-0" style={{ scale, x: imgX, y: imgY }}>
            <Image src={heroPhoto} alt="Finestra da tetto montata da MC Service tra i coppi, con il cielo riflesso nel vetro"
              fill priority sizes="100vw" placeholder="blur" className="object-cover object-[50%_42%]" />
          </motion.div>
          <div aria-hidden className="absolute inset-0 transition-[background] duration-1000" style={sunTint(sun)} />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: introOpacity, y: introY }}
          className="relative mx-auto flex h-full max-w-[96rem] flex-col px-4 pt-28 sm:px-8 md:pt-32">
          <h1 id="hero-title" className="max-w-[11ch] text-[clamp(3rem,9vw,9rem)] font-light leading-[0.92] tracking-[-0.045em] md:max-w-[8ch]">
            Finestre da tetto a Verona
          </h1>
          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-graphite md:max-w-[34ch]">{intro}</p>
          <div className="mt-8 hidden sm:block"><CallButton /></div>
        </motion.div>

        <motion.div style={{ opacity: outroOpacity }}
          className="absolute inset-x-0 bottom-0 mx-auto max-w-[96rem] px-4 pb-24 text-white sm:px-8 sm:pb-12">
          <p className="max-w-[14ch] text-[clamp(2.4rem,6vw,6rem)] font-light leading-[0.95] tracking-[-0.04em]">
            Il sole entra. La pioggia no.
          </p>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="hidden sm:block"><CallButton /></div>
            <p className="max-w-[44ch] text-sm text-white/85"><SunCaption sun={sun} /></p>
          </div>
        </motion.div>
      </div>
  );
}
