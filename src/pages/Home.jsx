import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Download, 
  Code, 
  Server, 
  Cpu, 
  Terminal,
  Calendar,
  Briefcase,
  GraduationCap,
  BrainCircuit,
  Languages
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import PageTransition from "../components/PageTransition";

// Container transition helper
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      stiffness: 100, 
      damping: 15 
    } 
  },
};

export default function Home() {
  const { personalInfo, aboutMe, skills, timeline } = portfolioData;

  // Map icons to categories
  const categoryIcons = {
    frontend: <Code className="text-blue-500" size={18} />,
    backend: <Server className="text-emerald-500" size={18} />,
    ai_ml: <Cpu className="text-purple-500" size={18} />,
    language: <Languages className="text-violet-500" size={18} />,
    tools: <Terminal className="text-amber-500" size={18} />,
  };

  return (
    <PageTransition>
      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col items-center text-center justify-center min-h-[0vh] py-12 md:py-20 pointer-events-auto">
        {/* Glow behind title */}
        <div className="absolute top-[30%] w-[300px] h-[300px] rounded-full bg-blue-500/10 dark:bg-blue-400/[0.04] blur-[100px] pointer-events-none" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-3xl flex flex-col items-center"
        >
          {/* Subtle Accent Tag */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-[12px] uppercase tracking-[0.2em] font-semibold text-neutral-500 dark:text-neutral-400 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
            <span>Available for opportunities!</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1] mb-6"
          >
            Hi, I'm <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent text-[56px]">{personalInfo.name}</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl font-medium text-neutral-700 dark:text-neutral-300 tracking-wide max-w-2xl mb-4"
          >
            {personalInfo.role}
          </motion.p>

          {/* Intro Description */}
          <motion.p
            variants={fadeInUp}
            className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl mb-10"
          >
            {personalInfo.intro}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
          >
            <Link
              to="/projects"
              className="group flex items-center justify-center space-x-2 w-full sm:w-auto rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-black px-6 py-3 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-300 shadow-md"
            >
              <span>Explore Projects</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 w-full sm:w-auto rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-800 dark:text-neutral-200 px-6 py-3 text-sm font-semibold hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition-colors duration-300 shadow-sm"
            >
              <Download size={14} />
              <span>Get Resume</span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. ABOUT SUMMARY SECTION */}
      <section className="py-12 md:py-24 border-t border-neutral-100 dark:border-neutral-900/60 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 items-start">
          {/* Label Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-neutral-400 dark:text-neutral-500 mb-2">
              Background / Bio
            </h2>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              My Philosophy
            </h3>
          </motion.div>

          {/* Core Content */}
          <div className="md:col-span-2 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-light"
            >
              {aboutMe.shortBio}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed"
            >
              {aboutMe.passionStatement}
            </motion.p>
          </div>
        </div>
      </section>

      {/* 3. SKILLS GRID SECTION */}
      <section className="py-12 md:py-24 border-t border-neutral-100 dark:border-neutral-900/60 pointer-events-auto">
        <div className="mb-12">
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-neutral-400 dark:text-neutral-500 mb-2">
            Expertise / Tooling
          </h2>
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Technical Superpowers
          </h3>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {Object.entries(skills).map(([category, items]) => (
            <motion.div
              key={category}
              variants={fadeInUp}
              whileHover={{ y: -20 }}
              className="flex flex-col rounded-xl border border-neutral-200/60 dark:border-neutral-800/80 bg-neutral-50/30 dark:bg-neutral-900/30 p-6 shadow-sm hover:shadow-md transition-all duration-20 glassmorphism"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  {categoryIcons[category]}
                </div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-800 dark:text-neutral-200">
                  {category.replace("_", " ")}
                </h4>
              </div>

              <div className="space-y-4 flex-grow">
                {items.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">{skill.name}</span>
                      <span className="text-neutral-400 dark:text-neutral-500">{skill.level}%</span>
                    </div>
                    {/* Minimal Progress indicator */}
                    <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-blue-500 dark:bg-blue-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. EXPERIENCE & EDUCATION TIMELINE */}
      <section className="py-12 md:py-24 border-t border-neutral-100 dark:border-neutral-900/60 pointer-events-auto">
        <div className="mb-16">
          <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold text-neutral-400 dark:text-neutral-500 mb-2">
            Chronology
          </h2>
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Journey & Milestones
          </h3>
        </div>

        <div className="relative max-w-3xl pl-8 md:pl-12 border-l-4 border-neutral-200 dark:border-neutral-800/80 space-y-12">
          {timeline.map((item, index) => {
            const isWork = item.type === "work";
            const isHack = item.type === "hackathon";
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Indicator Dot */}
                <span className="absolute -left-[41px] md:-left-[69px] top-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-darkBg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 shadow-sm z-10 transition-colors group-hover:border-blue-500">
                  {isWork ? (<Briefcase size={20} />) : (isHack ? <BrainCircuit size={20} /> : <GraduationCap size={20} />)}
                </span>

                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                      {item.role}
                    </h4>
                    <span className="inline-flex items-center text-xs text-neutral-400 dark:text-neutral-500 font-medium">
                      <Calendar size={11} className="mr-1" />
                      {item.duration}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {item.company}
                  </div>

                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-light mt-2 max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
}
