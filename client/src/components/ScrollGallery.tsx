import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDownRight, ArrowUpRight, Plus } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { ProjectModal } from "@/components/ProjectModal";

type ScrollGalleryProps = {
  projects: Project[];
};

export function ScrollGallery({ projects }: ScrollGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const raw = Math.min(1, Math.max(0, -rect.top / scrollable));
      setActiveIndex(Math.min(projects.length - 1, Math.round(raw * (projects.length - 1))));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [projects.length]);

  const activeProject = projects[activeIndex];

  return (
    <>
      <section ref={sectionRef} id="universe" className="universe-scene" aria-label="Project universe">
        <div className="universe-scene__sticky">
          <div className="scene-caption scene-caption--universe">
            <p className="eyebrow">04 / PROJECT UNIVERSE</p>
            <p>Scroll to scrub through nine systems.</p>
          </div>

          <div className="universe-count" aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span>/ {String(projects.length).padStart(2, "0")}</span>
          </div>

          <div className="project-orbit" style={{ "--project-accent": activeProject.color } as CSSProperties}>
            {projects.map((project, index) => {
              const distance = index - activeIndex;
              const isActive = index === activeIndex;
              return (
                <button
                  key={project.id}
                  type="button"
                  aria-label={`Open ${project.title}`}
                  onClick={() => setSelectedProject(project)}
                  className={`project-card ${isActive ? "is-active" : ""}`}
                  style={
                    {
                      "--card-color": project.color,
                      "--card-x": `${distance * 42}vw`,
                      "--card-y": `${distance * -3}vh`,
                      "--card-rotation": `${distance * 6}deg`,
                      "--card-opacity": isActive ? 1 : 0,
                    } as CSSProperties
                  }
                >
                  <span className="project-card__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="project-card__disc" aria-hidden="true">
                    <span />
                  </span>
                  <span className="project-card__eyebrow">{project.eyebrow}</span>
                  <strong>{project.title}</strong>
                  <span className="project-card__line">{project.oneLiner}</span>
                  <span className="project-card__meta">
                    {project.stack.slice(0, 2).join(" · ")} <i /> {project.year}
                  </span>
                  {isActive && (
                    <span className="project-card__open">
                      <Plus size={16} /> View project <ArrowUpRight size={16} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="universe-controls" aria-hidden="true">
            <ArrowDownRight size={18} />
            <span>KEEP MOVING</span>
          </div>
        </div>
      </section>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
