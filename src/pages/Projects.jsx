import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import PageTransition from "../components/PageTransition";
import HardwareProjectGallery from "../components/HardwareProjectGallery";
import { cn } from "../utils/cn";
import { isValidUrl, isValidString } from "../utils/linkUtils";

const filters = [
  { id: "all", label: "All Works" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile App" },
  { id: "full", label: "Full Stack" },
  { id: "hardware", label: "Hardware" },
  { id: "aws", label: "AWS" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedHardwareProject, setSelectedHardwareProject] = useState(null);
  const { projects } = portfolioData;

  const projectCounts = useMemo(() => {
    const counts = { all: projects.length };
    for (const project of projects) {
      if (project.category) {
        counts[project.category] = (counts[project.category] || 0) + 1;
      }
    }
    return counts;
  }, [projects]);

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  return (
    <PageTransition>
      <section className="pointer-events-auto">
        {/* Page Header */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-neutral-400 dark:text-neutral-500 mb-2">
            Showcase
          </h2>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
            Curated Creations
          </h1>
          <p>
            Building scalable applications, immersive interfaces, and intelligent systems through code, creativity, and innovation.
          </p>
          <br></br>
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
            Note: Some projects may include only selected resources such as a live demo, GitHub repository, or LinkedIn showcase depending on deployment status, privacy, or project type.
          </p>
        </div>

        {/* Dynamic Filtering Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-neutral-200/50 dark:border-neutral-800/50 pb-4 mb-10">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            const count = projectCounts[filter.id] || 0;

            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "relative inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors duration-300",
                  isActive ? "text-neutral-950 dark:text-white" : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFilterTab"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    className="absolute inset-0 rounded-lg bg-neutral-100 dark:bg-neutral-900/60 -z-10"
                  />
                )}
                <span>{filter.label}</span>
                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors",
                    isActive
                      ? "text-neutral-500 dark:text-neutral-400"
                      : "text-neutral-400/80 dark:text-neutral-500"
                  )}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Shuffling Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isHardware = project.category === "hardware";
              const hasGithub = isValidUrl(project.githubUrl);
              const hasLive = !isHardware && isValidUrl(project.liveUrl);
              const hasBadge = !isHardware && !hasLive && isValidString(project.liveLogo) && isValidString(project.liveLabel);
              const hasLinkedin = isValidUrl(project.linkedin);
              const hasAnyFooterItem = hasGithub || hasLive || hasBadge || hasLinkedin;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -6 }}
                  onClick={isHardware ? () => setSelectedHardwareProject(project) : undefined}
                  onKeyDown={
                    isHardware
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedHardwareProject(project);
                          }
                        }
                      : undefined
                  }
                  tabIndex={isHardware ? 0 : undefined}
                  role={isHardware ? "button" : undefined}
                  aria-label={isHardware ? `Open ${project.title} showcase` : undefined}
                  className={cn(
                    "flex flex-col overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-800/80 bg-neutral-50/20 dark:bg-neutral-950/20 shadow-sm hover:shadow-md transition-all duration-200 glassmorphism",
                    isHardware && "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 active:scale-[0.99]"
                  )}
                >
                  {/* Thumbnail */}
                  <div className="relative h-55 overflow-hidden border-b border-neutral-200/60 dark:border-neutral-800/80 group">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col p-6 flex-grow">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 border border-neutral-200/40 dark:border-neutral-800/40 uppercase tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-neutral-950 dark:text-white mb-2 leading-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-light flex-grow mb-6">
                      {project.description}
                    </p>

                    {/* Footer */}
                    {hasAnyFooterItem && (
                      <div className="flex flex-wrap items-center gap-4 border-t border-neutral-200/50 dark:border-neutral-800/50 pt-4 mt-auto">
                        {/* GitHub */}
                        {hasGithub && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white font-semibold transition-colors duration-200"
                          >
                            <Github size={12} />
                            <span>Repository</span>
                          </a>
                        )}

                        {/* Live Site (Non-Hardware only) */}
                        {hasLive && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                          >
                            <ExternalLink size={12} />
                            <span>Live Site/App APK</span>
                          </a>
                        )}

                        {/* Partner / Sponsorship Badge (Non-Hardware only) */}
                        {hasBadge && (
                          <div 
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1"
                          >
                            <img
                              src={project.liveLogo}
                              alt={project.liveLabel || "Partner"}
                              className="h-4 w-4 object-contain"
                            />
                            <span className="text-[11px] font-semibold text-orange-500">
                              {project.liveLabel}
                            </span>
                          </div>
                        )}

                        {/* LinkedIn */}
                        {hasLinkedin && (
                          <a
                            href={project.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                          >
                            <ExternalLink size={12} />
                            <span>LinkedIn Post</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Dedicated Hardware Project Showcase Modal */}
        <HardwareProjectGallery
          key={selectedHardwareProject?.id || "hardware-modal"}
          project={selectedHardwareProject}
          isOpen={!!selectedHardwareProject}
          onClose={() => setSelectedHardwareProject(null)}
        />
      </section>
    </PageTransition>
  );
}
