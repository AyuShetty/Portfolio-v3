import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/data/portfolio";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const sectionLabels = [
  ["Overview", "overview"],
  ["Problem", "problem"],
  ["Why Built", "overview"],
  ["Objectives", "objectives"],
  ["Role", "role"],
  ["Architecture", "architecture"],
  ["Engineering Challenges", "challenges"],
  ["Development Process", "process"],
  ["Key Features", "features"],
  ["Implementation Details", "implementation"],
  ["Future Improvements", "future"],
  ["Lessons Learned", "lessons"],
] as const;

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, project]);

  if (!project) return null;

  return (
    <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="case-study-title">
      <button className="project-modal__backdrop" aria-label="Close case study" onClick={onClose} />
      <article className="project-modal__panel" style={{ "--project-accent": project.color } as CSSProperties}>
        <header className="project-modal__head">
          <div>
            <p className="eyebrow">{project.eyebrow}</p>
            <h2 id="case-study-title">{project.title}</h2>
          </div>
          <button ref={closeRef} className="icon-button" onClick={onClose} aria-label="Close case study">
            <X size={22} strokeWidth={1.6} />
          </button>
        </header>

        <div className="project-modal__intro">
          <p className="project-modal__statement">{project.oneLiner}</p>
          <div className="modal-meta">
            <span>{project.year}</span>
            <span>{project.mode}</span>
            <span>{project.stack.join(" · ")}</span>
          </div>
        </div>

        <div className="case-study-grid">
          {sectionLabels.map(([label, field], index) => {
            const content = project[field];
            const body = Array.isArray(content) ? (
              <ul>
                {content.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{content}</p>
            );
            return (
              <section className="case-study-section" key={label}>
                <p className="case-study-section__index">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h3>{label}</h3>
                  {body}
                </div>
              </section>
            );
          })}
          <section className="case-study-section">
            <p className="case-study-section__index">13</p>
            <div>
              <h3>Related Projects</h3>
              <ul>
                {project.related.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <footer className="project-modal__foot">
          <span>Placeholder case-study text — replace in <code>client/src/data/portfolio.ts</code>.</span>
          <button onClick={onClose} className="text-button">
            Back to the universe <ArrowUpRight size={16} />
          </button>
        </footer>
      </article>
    </div>
  );
}
