import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Activity, ShieldCheck } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import PageTransition from "../components/PageTransition";

export default function About() {
  const { aboutMe } = portfolioData;

  const principleIcons = [
    <Compass className="text-blue-500" size={18} />,
    <Activity className="text-purple-500" size={18} />,
    <ShieldCheck className="text-emerald-500" size={18} />,
  ];

  return (
    <PageTransition>
      <section className="pointer-events-auto">
        {/* Page Header */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400 dark:text-neutral-500 mb-2">
            My Story
          </h2>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
            Curious by Nature, Designer by Heart.
          </h1>
        </div>

        {/* Narrative & Vector Illustration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Column: High-Tech Abstract SVG Graphic representing a system canvas */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[360px] rounded-2xl border border-neutral-200/50 dark:border-neutral-800/80 bg-neutral-50/20 dark:bg-neutral-950/20 flex items-center justify-center p-6 shadow-sm overflow-hidden glassmorphism">
              {/* Soft Ambient Inner Glow */}
              <div className="absolute w-[200px] h-[200px] rounded-full bg-blue-500/5 blur-[60px]" />

              {/* Monogram Monolith SVG */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-neutral-300 dark:text-neutral-800"
              >
                {/* Outer rotating track */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  strokeDasharray="4 6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner smooth path */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="65"
                  stroke="#3B82F6"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                />

                {/* Orbiting dot indicator */}
                <motion.circle
                  cx="100"
                  cy="35"
                  r="3.5"
                  fill="#3B82F6"
                  animate={{
                    rotate: 360,
                    originX: "100px",
                    originY: "100px"
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />

                {/* Center digital cross-hairs */}
                <path d="M100 80 V120 M80 100 H120" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />

                {/* Tech Monogram abstract nodes */}
                <motion.path
                  d="M60 140 L100 60 L140 140"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                <motion.path
                  d="M100 60 V140"
                  stroke="#3B82F6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                />

                {/* Numeric technical markers */}
                <text x="100" y="25" fill="currentColor" fillOpacity="0.4" fontSize="6" textAnchor="middle" letterSpacing="1">01</text>
                <text x="175" y="103" fill="currentColor" fillOpacity="0.4" fontSize="6" textAnchor="middle" letterSpacing="1">02</text>
                <text x="100" y="182" fill="currentColor" fillOpacity="0.4" fontSize="6" textAnchor="middle" letterSpacing="1">03</text>
                <text x="25" y="103" fill="currentColor" fillOpacity="0.4" fontSize="6" textAnchor="middle" letterSpacing="1">04</text>
              </svg>
            </div>
          </div>

          {/* Right Column: Bio Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Who I am
              </h3>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                {aboutMe.shortBio}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {aboutMe.passionStatement}
              </p>
            </div>

            {/* Specialized Area of Study / Interests */}
            <div className="space-y-4 border-t border-neutral-100 dark:border-neutral-900/60 pt-8">
              <h3 className="text-xs uppercase tracking-wider font-bold text-neutral-900 dark:text-neutral-100">
                Core Research & Endeavors
              </h3>
              <ul className="space-y-3">
                {aboutMe.careerInterests.map((interest, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 text-xs md:text-sm text-neutral-500 dark:text-neutral-400"
                  >
                    <ArrowRight size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{interest}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Core Architectural Principles Grid */}
        <div className="border-t border-neutral-100 dark:border-neutral-900/60 pt-16">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400 dark:text-neutral-500 mb-2">
              Philosophies
            </h2>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
              The Code I Stand By
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutMe.principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col p-6 rounded-xl border border-neutral-200/50 dark:border-neutral-800/80 bg-neutral-50/10 dark:bg-neutral-950/10 shadow-sm glassmorphism hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900">
                    {principleIcons[index]}
                  </div>
                  <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
                    {principle.title}
                  </h4>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
