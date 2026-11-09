import Image from "next/image";
import { Phone } from "lucide-react";
import { WindowHero } from "@/components/window-hero";
import { ProblemPicker } from "@/components/problem-picker";
import { site } from "@/lib/site";
import coppi from "../../public/photos/coppi.jpg";
import lavoroCoppiEsterno from "../../public/photos/lavori/lavoro-coppi-esterno.jpg";
import lavoroNuovaApertura from "../../public/photos/lavori/lavoro-nuova-apertura.jpg";
import lavoroSottotettoLegno from "../../public/photos/lavori/lavoro-sottotetto-legno.jpg";
import lavoroTendaOscurante from "../../public/photos/lavori/lavoro-tenda-oscurante.jpg";
import lavoroSaloneLucernari from "../../public/photos/lavori/lavoro-salone-lucernari.jpg";
import lavoroCorniceDecorata from "../../public/photos/lavori/lavoro-cornice-decorata.jpg";

const works = [
  { photo: lavoroCoppiEsterno, caption: "Finestra nuova su tetto in coppi", alt: "Finestra da tetto con raccordo grigio montata tra i coppi, con il cielo riflesso nel vetro" },
  { photo: lavoroNuovaApertura, caption: "Nuova apertura nel tetto, dal cantiere alla finestra finita", alt: "Tre foto: il foro aperto tra i coppi, il telaio in posa e la finestra finita vista dall'interno" },
  { photo: lavoroSottotettoLegno, caption: "Sottotetto rivestito in legno", alt: "Finestra da tetto vista dal basso in un sottotetto con rivestimento in legno scuro" },
  { photo: lavoroTendaOscurante, caption: "Tenda oscurante su finestra esistente", alt: "Finestra da tetto con tenda oscurante bianca abbassata, in una mansarda in legno chiaro" },
  { photo: lavoroSaloneLucernari, caption: "Lucernari in serie per un salone", alt: "Salone da parrucchiere illuminato da una lunga serie di finestre nel tetto" },
  { photo: lavoroCorniceDecorata, caption: "Oscurante su finestra con cornice decorata", alt: "Finestra da tetto con oscurante, incorniciata da una cornice dorata decorata" },
];

const steps = [
  { title: "Ci chiami o ci scrivi", body: "Raccontaci cosa succede. Spesso bastano due foto su WhatsApp per capire che lavoro serve." },
  { title: "Sopralluogo", body: "Veniamo a casa tua, misuriamo la finestra e guardiamo il tetto. Senza impegno." },
  { title: "Preventivo scritto", body: "Modello, prezzo e tempi nero su bianco, con le detrazioni a cui hai diritto." },
  { title: "Montaggio", body: "Proteggiamo la stanza, montiamo, puliamo e portiamo via la finestra vecchia." },
];

const nav = [
  { href: "#servizi", label: "Servizi" },
  { href: "#come-lavoriamo", label: "Come lavoriamo" },
  { href: "#zona", label: "Zona" },
  { href: "#contatti", label: "Contatti" },
];

const container = "mx-auto max-w-[96rem] px-4 sm:px-8";
const h2 = "text-[clamp(2.5rem,5.5vw,5.5rem)] font-light leading-[0.95] tracking-[-0.04em]";

export default function Home() {
  return (
    <>
      <a href="#servizi" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-paper focus:px-4 focus:py-2">
        Vai ai contenuti
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-rule/70 bg-paper/90 backdrop-blur-md">
        <div className={`${container} flex h-16 items-center justify-between gap-6`}>
          <a href="#" className="flex items-center gap-3" aria-label="MCservice, torna all'inizio">
            <Image src="/logo.png" alt="" width={44} height={44} priority className="size-11 rounded-full ring-1 ring-rule" />
            <span className="text-lg font-medium tracking-tight">MCservice</span>
          </a>
          <nav aria-label="Sezioni" className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-graphite transition-colors hover:text-ink">
                {item.label}
              </a>
            ))}
          </nav>
          <a href={site.phoneHref} className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2 font-medium text-paper sm:inline-flex">
            <Phone aria-hidden className="size-4" />
            {site.phoneDisplay}
          </a>
        </div>
      </header>

      <main>
        <WindowHero />

        <section id="servizi" aria-labelledby="servizi-title" className="scroll-mt-16 py-24 sm:py-32">
          <div className={container}>
            <div className="grid gap-6 lg:grid-cols-12">
              <h2 id="servizi-title" className={`${h2} lg:col-span-7`}>Qual è il problema?</h2>
              <p className="max-w-[40ch] self-end text-lg leading-relaxed text-graphite lg:col-span-4 lg:col-start-9">
                Scegli quello che succede a casa tua: ti diciamo come lo risolviamo.
              </p>
            </div>
            <div className="mt-14">
              <ProblemPicker />
            </div>
          </div>
        </section>

        <section id="come-lavoriamo" aria-labelledby="come-title" className="scroll-mt-16 border-t border-rule py-24 sm:py-32">
          <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-8`}>
            <h2 id="come-title" className={`${h2} lg:col-span-4`}>Come lavoriamo</h2>
            <ol className="lg:col-span-8">
              {steps.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-rule py-8 last:border-b sm:grid-cols-[6rem_1fr_1.3fr] sm:gap-8">
                  <span aria-hidden className="text-4xl font-light leading-none text-graphite sm:text-5xl">{i + 1}</span>
                  <h3 className="text-2xl font-normal tracking-tight">{step.title}</h3>
                  <p className="col-start-2 leading-relaxed text-graphite sm:col-start-3">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="zona" aria-labelledby="zona-title" className="relative scroll-mt-16 overflow-hidden bg-ink text-paper">
          <Image src={coppi} alt="" fill sizes="100vw" placeholder="blur" className="object-cover opacity-55" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className={`${container} relative py-28 sm:py-40`}>
            <h2 id="zona-title" className={h2}>Verona e provincia</h2>
            <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-paper/85">
              Lavoriamo in città e in tutta la provincia. Se sei appena fuori, chiamaci lo stesso.
            </p>
            <ul className="mt-12 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-3 text-xl font-light sm:grid-cols-4">
              {site.area.map((place) => (
                <li key={place} className="border-t border-paper/30 pt-3">{place}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="detrazioni" aria-labelledby="detrazioni-title" className="scroll-mt-16 py-24 sm:py-32">
          <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-8`}>
            <h2 id="detrazioni-title" className={`${h2} lg:col-span-7`}>Le pratiche per le detrazioni le seguiamo noi</h2>
            <div className="max-w-[52ch] space-y-5 self-end text-lg leading-relaxed text-graphite lg:col-span-4 lg:col-start-9">
              <p>
                Sostituire una finestra da tetto o aggiungere tende e tapparelle esterne può darti diritto alle
                detrazioni fiscali previste per serramenti e schermature solari.
              </p>
              <p>Le regole cambiano spesso: nel preventivo ti indichiamo quali valgono oggi per casa tua e ti prepariamo i documenti.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="lavori-title" className="border-t border-rule py-24 sm:py-32">
          <div className={container}>
            <h2 id="lavori-title" className={h2}>Lavori fatti</h2>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-graphite">
              Alcuni dei lavori che abbiamo fatto, dalle case in coppi ai locali commerciali.
            </p>
            {/* Foto reali MCservice. Didascalie scritte guardando le foto: da confermare con il cliente. */}
            <ul className="mt-14 gap-8 sm:columns-2 lg:columns-3">
              {works.map((w) => (
                <li key={w.caption} className="mb-10 break-inside-avoid">
                  <Image src={w.photo} alt={w.alt} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    placeholder="blur" className="h-auto w-full bg-mist" />
                  <p className="mt-4 text-lg">{w.caption}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer id="contatti" className="scroll-mt-16 bg-ink pb-32 pt-24 text-paper sm:pb-16 sm:pt-32">
        <div className={container}>
          <h2 className="text-xl text-paper/70">Chiamaci per un sopralluogo</h2>
          <a href={site.phoneHref} className="mt-4 block text-[clamp(3rem,11vw,11rem)] font-light leading-none tracking-[-0.05em] hover:text-light">
            {site.phoneDisplay}
          </a>
          <div className="mt-16 grid gap-8 border-t border-paper/20 pt-8 text-lg sm:grid-cols-2 lg:grid-cols-4">
            <a href={site.whatsappHref} className="hover:underline">WhatsApp<br /><span className="text-paper/70">{site.whatsappDisplay}</span></a>
            <a href={`mailto:${site.email}`} className="hover:underline">Email<br /><span className="text-paper/70">{site.email}</span></a>
            <p>Indirizzo<br /><span className="text-paper/70">{site.address}</span></p>
            <p>Orari<br /><span className="text-paper/70">{site.hours}</span></p>
          </div>
          <div className="mt-16 flex flex-wrap gap-x-8 gap-y-2 text-sm text-paper/50">
            <span>MCservice, {site.vat}</span>
            <span>Rivenditore VELUX. VELUX è un marchio registrato del Gruppo VELUX.</span>
            <span>Foto segnaposto: Unsplash</span>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper/95 p-3 backdrop-blur sm:hidden">
        <a href={site.phoneHref} className="flex items-center justify-center gap-2 rounded-full bg-light py-3.5 text-lg font-semibold text-ink">
          <Phone aria-hidden className="size-5" />
          Chiama ora
        </a>
      </div>
    </>
  );
}
