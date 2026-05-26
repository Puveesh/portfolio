import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import PageTransition from "../components/PageTransition";
import { cn } from "../utils/cn";

const filters = [
  { id: "all", label: "All Works" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile App" },
  { id: "full", label: "Full Stack" },
  { id: "hardware", label: "Hardware" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { projects } = portfolioData;

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
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">Note: Some projects may include only selected resources such as a live demo, GitHub repository, or LinkedIn showcase depending on deployment status, privacy, or project type. </p>
        </div>

        {/* Dynamic Filtering Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-neutral-200/50 dark:border-neutral-800/50 pb-4 mb-10">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "relative px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors duration-300",
                  isActive ? "text-neutral-950 dark:text-white" : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-600"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFilterTab"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    className="absolute inset-0 rounded-lg bg-neutral-100 dark:bg-neutral-900/60 -z-10"
                  />
                )}
                {filter.label}
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
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="flex flex-col overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-800/80 bg-neutral-50/20 dark:bg-neutral-950/20 shadow-sm hover:shadow-md transition-all duration-20 glassmorphism"
              >
                {/* Visual Thumbnail */}
                <div className="relative h-55 overflow-hidden border-b border-neutral-200/60 dark:border-neutral-800/80 group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card Context */}
                <div className="flex flex-col p-6 flex-grow">
                  {/* Technology Badges */}
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

                  {/* Title & Info */}
                  <h3 className="text-base font-bold text-neutral-950 dark:text-white mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-light flex-grow mb-6">
                    {project.description}
                  </p>

                  {/* Actions Links */}
                  <div className="flex items-center space-x-4 border-t border-neutral-200/50 dark:border-neutral-800/50 pt-4 mt-auto">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white font-semibold transition-colors duration-200"
                    >
                      <Github size={12} />
                      <span>Repository</span>
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      <ExternalLink size={12} />
                      <span>Live Site/App APK</span>
                    </a>
                    <a
                      href={project.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      <ExternalLink size={12} />
                      <span>LinkedIn Post</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </PageTransition>
  );
}
