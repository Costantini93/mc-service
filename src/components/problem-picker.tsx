"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";
import SegmentedControl from "@/components/ui/segmented-control";
import { site } from "@/lib/site";
import coppiInterno from "../../public/photos/coppi-interno.jpg";
import finestraTenda from "../../public/photos/finestra-tenda.jpg";
import tettoFinestre from "../../public/photos/tetto-finestre.jpg";
import abbaini from "../../public/photos/abbaini.jpg";
import capriate from "../../public/photos/capriate.jpg";

type Problem = {
  value: string;
  label: string;
  service: string;
  title: string;
  body: string;
  photo: StaticImageData;
  alt: string;
};

const problems: Problem[] = [
  {
    value: "acqua",
    label: "Entra acqua",
    service: "Riparazioni",
    title: "Un'infiltrazione si ferma prima che rovini il soffitto",
    body: "Di solito il problema è il raccordo con le tegole o una guarnizione consumata. Veniamo a vedere, ripariamo quello che si può riparare e, se la finestra è troppo vecchia, ti diciamo onestamente che conviene cambiarla.",
    photo: coppiInterno,
    alt: "Coppi e travi visti dall'interno del tetto",
  },
  {
    value: "caldo",
    label: "D'estate fa troppo caldo",
    service: "Tende e oscuranti",
    title: "Il calore va fermato fuori, prima del vetro",
    body: "Tapparelle e tende parasole esterne bloccano gran parte del sole sulla falda; le tende interne servono per oscurare e per la privacy. Le montiamo anche su finestre già installate.",
    photo: finestraTenda,
    alt: "Finestra da tetto con tenda oscurante, in una mansarda rivestita in legno",
  },
  {
    value: "luce",
    label: "Voglio più luce",
    service: "Prima installazione",
    title: "Una finestra nuova nel tetto cambia la stanza",
    body: "Sottotetto buio o mansarda da recuperare: scegliamo insieme dove aprire, che misura serve e che tipo di apertura è più comoda. Raccordi e finiture interne li facciamo noi.",
    photo: tettoFinestre,
    alt: "Tetto in tegole con finestre da tetto e abbaini",
  },
  {
    value: "vecchia",
    label: "È vecchia, va cambiata",
    service: "Sostituzione",
    title: "La nuova finestra entra al posto della vecchia",
    body: "Nella maggior parte dei casi la sostituzione si fa dall'interno, senza ponteggi, e in giornata. Ti seguiamo anche nelle pratiche per le detrazioni fiscali.",
    photo: abbaini,
    alt: "Tetto scuro con abbaini contro il cielo",
  },
  {
    value: "apertura",
    label: "Non arrivo ad aprirla",
    service: "Motorizzazione",
    title: "Si apre con un tasto, e si chiude da sola se piove",
    body: "Aggiungiamo un motore alla finestra, con comando a parete o telecomando. Con il sensore pioggia si chiude da sola quando inizia a piovere.",
    photo: capriate,
    alt: "Capriate in legno sotto una finestra da tetto alta",
  },
];

export function ProblemPicker() {
  const [value, setValue] = useState(problems[0].value);
  const reduced = useReducedMotion();
  const current = problems.find((p) => p.value === value) ?? problems[0];
  const fade = reduced
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 } };

  return (
    <div>
      <SegmentedControl label="Scegli il problema" options={problems} value={value} onValueChange={setValue} />
      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 lg:pr-8" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={current.value} {...fade}>
              <p className="text-graphite">{current.service}</p>
              <h3 className="mt-3 text-[clamp(2rem,3.6vw,3.25rem)] font-light leading-[1.02] tracking-[-0.03em]">
                {current.title}
              </h3>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-graphite">{current.body}</p>
            </motion.div>
          </AnimatePresence>
          <a href={site.phoneHref}
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink px-5 py-3 font-medium transition-colors hover:bg-ink hover:text-paper">
            <Phone aria-hidden className="size-4" />
            Chiama per un sopralluogo
          </a>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-mist lg:col-span-6">
          <AnimatePresence initial={false}>
            <motion.div key={current.value} className="absolute inset-0" {...fade}>
              <Image src={current.photo} alt={current.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" placeholder="blur" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
