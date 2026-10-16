import { FormEvent, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type RefObject } from "react";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Command, Download, Mail, MoveDownRight, Send, Sparkles } from "lucide-react";
import { ConstellationScene } from "@/components/ConstellationScene";
import { HeroSignalPortrait } from "@/components/HeroSignalPortrait";
import { ScrollFrameSequence } from "@/components/ScrollFrameSequence";
import { ScrollGallery } from "@/components/ScrollGallery";
import {
  contactConfig,
  experience,
  heroConfig,
  highlights,
  identityCards,
  projects,
  skillGroups,
} from "@/data/portfolio";

function useElementProgress<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const scrollable = Math.max(1, element.offsetHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / scrollable)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return progress;
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const identityRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const heroProgress = useElementProgress(heroRef);
  const identityProgress = useElementProgress(identityRef);
  const skillsProgress = useElementProgress(skillsRef);
  const timelineProgress = useElementProgress(timelineRef);
  const [mailNotice, setMailNotice] = useState("");
  const [heroSignal, setHeroSignal] = useState(false);
  const [heroOffset, setHeroOffset] = useState({ x: 0, y: 0 });
  const [selectedIdentityId, setSelectedIdentityId] = useState(identityCards[0].id);
  const selectedIdentity = identityCards.find((card) => card.id === selectedIdentityId) ?? identityCards[0];

  const handleHeroPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 22;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 16;
    setHeroOffset({ x, y });
  };

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const scope = String(form.get("scope") || "");
    const timeline = String(form.get("timeline") || "");
    const body = `Name: ${name}\n\nScope:\n${scope}\n\nTimeline / budget context:\n${timeline}`;
    const url = `mailto:${contactConfig.email}?subject=${encodeURIComponent(`New portfolio enquiry from ${name || "a collaborator"}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setMailNotice("Your email app should now be open. Replace the placeholder address in the content file before launch.");
  };

  return (
    <main className="portfolio-page">
      <nav className="floating-nav" aria-label="Portfolio navigation">
        <a href="#top" className="floating-nav__mark" aria-label="Back to opening scene">
          <Command size={17} strokeWidth={2} />
          <span>YN/26</span>
        </a>
        <div className="floating-nav__links">
          <a href="#universe">Work</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section
        id="top"
        ref={heroRef}
        className="hero-scene"
        style={{ "--scene-progress": heroProgress } as CSSProperties}
      >
        <div className="hero-scene__sticky">
          <div
            className={`hero-scene__visual ${heroSignal ? "is-signal-active" : ""}`}
            style={{
              "--hero-x": `${heroOffset.x}px`,
              "--hero-y": `${heroOffset.y}px`,
              "--aura-x": `${heroOffset.x * 0.32}px`,
              "--aura-y": `${heroOffset.y * 0.32}px`,
            } as CSSProperties}
            onPointerMove={handleHeroPointerMove}
            onPointerLeave={() => setHeroOffset({ x: 0, y: 0 })}
          >
            <HeroSignalPortrait active={heroSignal} offset={heroOffset} progress={heroProgress} />
            {heroConfig.frameSequenceReady && (
              <ScrollFrameSequence frames={heroConfig.frames} progress={heroProgress} enabled={heroConfig.frameSequenceReady} />
            )}
            <div className="hero-signal-aura" aria-hidden="true" />
            <div className="hero-grid" aria-hidden="true" />
            <button
              type="button"
              className="hero-signal-trigger"
              aria-pressed={heroSignal}
              onClick={() => setHeroSignal((current) => !current)}
            >
              <span className="hero-signal-trigger__dot" aria-hidden="true" />
              {heroSignal ? "Signal live" : "Activate signal"}
            </button>
            <p className="hero-stage-label">{heroSignal ? "SIGNAL / LIVE" : heroProgress < 0.54 ? "TURN / 01" : "STEP / 02"}</p>
          </div>

          <div className="hero-copy">
            <p className="eyebrow hero-copy__eyebrow">{heroConfig.title}</p>
            <h1 aria-label={heroConfig.name}>
              <span>YOUR</span>
              <span className="hero-copy__accent">NAME</span>
            </h1>
            <p className="hero-copy__tagline">{heroConfig.tagline}</p>
          </div>

          <div className="hero-scene__footer">
            <span>Scroll is the navigation</span>
            <span className="hero-progress">{String(Math.round(heroProgress * 100)).padStart(2, "0")}%</span>
            <a href="#identity" className="scroll-prompt">
              <ArrowDown size={18} />
              Continue
            </a>
          </div>
        </div>
      </section>

      <section
        id="identity"
        ref={identityRef}
        className="identity-scene"
        style={{ "--scene-progress": identityProgress } as CSSProperties}
      >
        <div className="identity-scene__lead">
          <p className="eyebrow">02 / IDENTITY, IN FRAGMENTS</p>
          <h2>
            A LITTLE
            <br />
            <em>LESS</em> LINEAR.
          </h2>
          <p>
            Not a gallery. A scattered record of texture, place, late nights, and the things that make a builder human.
          </p>
        </div>
        <div className="identity-collage" aria-label="Replaceable identity image collage">
          {identityCards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                aria-pressed={selectedIdentityId === card.id}
                aria-label={`Inspect ${card.label}`}
                onClick={() => setSelectedIdentityId(card.id)}
                className={`identity-card ${card.className} ${selectedIdentityId === card.id ? "is-selected" : ""}`}
                style={{ "--card-index": index, "--scene-progress": identityProgress } as CSSProperties}
              >
              <div className="identity-card__noise" />
              <span className="identity-card__id">{card.id}</span>
              <span className="identity-card__label">{card.label}</span>
              <span className="identity-card__slot">{card.note}</span>
              <MoveDownRight size={22} className="identity-card__arrow" />
              </button>
            ))}
          <p className="identity-collage__scribble">SELECT A FRAME / FOLLOW THE THREAD</p>
          <p className="identity-collage__caption" aria-live="polite">
            <span>ACTIVE FRAME / {selectedIdentity.id}</span>
            {selectedIdentity.label} — {selectedIdentity.note}
          </p>
        </div>
      </section>

      <section
        ref={skillsRef}
        className="skills-scene"
        style={{ "--scene-progress": skillsProgress } as CSSProperties}
      >
        <div className="skills-scene__topline">
          <p className="eyebrow">03 / HIGHLIGHTS + SKILLS</p>
          <p>Scroll rotates the field</p>
        </div>
        <div className="skills-scene__title">
          <h2>EVERYTHING<br />CONNECTS.</h2>
          <p>
            The constellation is intentionally small: enough signal to show the system, not so much noise that the story disappears.
          </p>
        </div>
        <ConstellationScene nodes={highlights} progress={skillsProgress} />
        <div className="skill-strips">
          {skillGroups.map((group) => (
            <article key={group.id} className="skill-strip">
              <span>{group.id}</span>
              <div>
                <h3>{group.title}</h3>
                <p>{group.skills.join(" · ")}</p>
              </div>
              <ArrowDownRight size={20} />
            </article>
          ))}
        </div>
      </section>

      <ScrollGallery projects={projects} />

      <section
        ref={timelineRef}
        className="timeline-scene"
        style={{ "--scene-progress": timelineProgress } as CSSProperties}
      >
        <div className="timeline-scene__intro">
          <p className="eyebrow">05 / EXPERIENCE, NOT A LADDER</p>
          <h2>WORK LEAVES<br /><span>A TRAIL.</span></h2>
          <p>Some chapters become roles. Some become responsibility. All of them change the next thing you make.</p>
        </div>
        <div className="timeline-path" aria-hidden="true">
          <div className="timeline-path__line" />
          <span className="timeline-path__pulse" />
        </div>
        <div className="experience-cards">
          {experience.map((item, index) => (
            <article
              key={`${item.company}-${item.role}`}
              className="experience-card"
              style={{ "--item-index": index, "--scene-progress": timelineProgress } as CSSProperties}
            >
              <p className="experience-card__period">{item.period}</p>
              <div className="experience-card__role">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.company}</h3>
              </div>
              <p className="experience-card__title">{item.role}</p>
              <p className="experience-card__note">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-scene">
        <div className="contact-scene__stamp">06 / LAST FRAME</div>
        <div className="contact-scene__copy">
          <p className="eyebrow">THE CALM AFTER THE SIGNAL</p>
          <h2>READY TO<br /><em>BUILD?</em></h2>
          <p>
            Share the scope and timeline so we can map the launch together. Best work begins with an honest brief and a little momentum.
          </p>
          <div className="contact-actions">
            <a href={`mailto:${contactConfig.email}`} className="pill-button pill-button--primary">
              <Mail size={17} /> {contactConfig.email}
            </a>
            <a href={contactConfig.resumePath} className="pill-button" download>
              <Download size={17} /> Resume placeholder
            </a>
            <a href={contactConfig.writingUrl} className="pill-button" target="_blank" rel="noreferrer">
              <Sparkles size={16} /> Writing <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleContact}>
          <div className="contact-form__head">
            <p>START A CONVERSATION</p>
            <Send size={18} />
          </div>
          <label>
            <span>Your name</span>
            <input name="name" required placeholder="Introduce yourself" />
          </label>
          <label>
            <span>What are we building?</span>
            <textarea name="scope" required placeholder="A product, prototype, experience, system…" rows={4} />
          </label>
          <label>
            <span>Timing / anything helpful</span>
            <input name="timeline" placeholder="A few details are plenty" />
          </label>
          <button className="form-submit" type="submit">
            Draft the email <ArrowUpRight size={18} />
          </button>
          {mailNotice && <p className="contact-form__notice">{mailNotice}</p>}
        </form>

        <footer className="contact-scene__footer">
          <span>BUILT AS A SCENE, NOT A TEMPLATE.</span>
          <span>© 2026 / YOUR NAME</span>
        </footer>
      </section>
    </main>
  );
}
