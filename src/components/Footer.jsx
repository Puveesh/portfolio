import React from "react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Footer() {
  const { name, socials } = portfolioData.personalInfo;

  return (
    <footer className="w-full border-t border-neutral-200/50 dark:border-neutral-800/50 py-8 bg-neutral-50/30 dark:bg-neutral-950/20 backdrop-blur-sm pointer-events-auto">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand/Copyright */}
        <div className="text-center md:text-left">
          <p className="text-[12px] uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
            &copy; {new Date().getFullYear()}. {name}. Built with precision & Passion.
          </p>
        </div>

        {/* Right: Social icons */}
        <div className="flex items-center space-x-6">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors duration-300"
            aria-label="GitHub Link"
          >
            <Github size={20} className="stroke-[2]" />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors duration-300"
            aria-label="LinkedIn Link"
          >
            <Linkedin size={20} className="stroke-[2]" />
          </a>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors duration-300"
            aria-label="Instagram Link"
          >
            <Instagram size={20} className="stroke-[2]" />
          </a>
          <a
            href={`mailto:${socials.email}`}
            className="text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors duration-300"
            aria-label="Email Link"
          >
            <Mail size={20} className="stroke-[2]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
