import { motion } from "framer-motion";
import { FileCode } from "lucide-react";
import { cn } from "../utils/cn";

// Default code lines with syntax highlighting
const defaultCodeLines = [
  {
    num: 1,
    content: (
      <>
        <span className="text-purple-600 dark:text-purple-400 font-medium">import</span>{" "}
        <span className="text-cyan-600 dark:text-cyan-300">React</span>{" "}
        <span className="text-purple-600 dark:text-purple-400 font-medium">from</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-400">"react"</span>
        <span className="text-neutral-400 dark:text-neutral-500">;</span>
      </>
    ),
  },
  {
    num: 2,
    content: (
      <>
        <span className="text-purple-600 dark:text-purple-400 font-medium">import</span>{" "}
        <span className="text-neutral-400 dark:text-neutral-500">&#123;</span>{" "}
        <span className="text-cyan-600 dark:text-cyan-300">motion</span>{" "}
        <span className="text-neutral-400 dark:text-neutral-500">&#125;</span>{" "}
        <span className="text-purple-600 dark:text-purple-400 font-medium">from</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-400">"framer-motion"</span>
        <span className="text-neutral-400 dark:text-neutral-500">;</span>
      </>
    ),
  },
  {
    num: 3,
    content: <>&nbsp;</>,
  },
  {
    num: 4,
    content: (
      <>
        <span className="text-purple-600 dark:text-purple-400 font-medium">const</span>{" "}
        <span className="text-amber-600 dark:text-amber-300">Developer</span>{" "}
        <span className="text-cyan-600 dark:text-cyan-400">=</span>{" "}
        <span className="text-neutral-400 dark:text-neutral-500">()</span>{" "}
        <span className="text-purple-600 dark:text-purple-400 font-medium">=&gt;</span>{" "}
        <span className="text-neutral-400 dark:text-neutral-500">&#123;</span>
      </>
    ),
  },
  {
    num: 5,
    content: (
      <>
        <span className="inline-block w-4" />
        <span className="text-purple-600 dark:text-purple-400 font-medium">const</span>{" "}
        <span className="text-sky-600 dark:text-sky-300">profile</span>{" "}
        <span className="text-cyan-600 dark:text-cyan-400">=</span>{" "}
        <span className="text-neutral-400 dark:text-neutral-500">&#123;</span>
      </>
    ),
  },
  {
    num: 6,
    content: (
      <>
        <span className="inline-block w-8" />
        <span className="text-sky-600 dark:text-sky-300">name</span>
        <span className="text-neutral-400 dark:text-neutral-500">:</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-400">"Puveesh Keshav"</span>
        <span className="text-neutral-400 dark:text-neutral-500">,</span>
      </>
    ),
  },
  {
    num: 7,
    content: (
      <>
        <span className="inline-block w-8" />
        <span className="text-sky-600 dark:text-sky-300">role</span>
        <span className="text-neutral-400 dark:text-neutral-500">:</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-400">"Software Engineer"</span>
        <span className="text-neutral-400 dark:text-neutral-500">,</span>
      </>
    ),
  },
  {
    num: 8,
    content: (
      <>
        <span className="inline-block w-8" />
        <span className="text-sky-600 dark:text-sky-300">passion</span>
        <span className="text-neutral-400 dark:text-neutral-500">:</span>{" "}
        <span className="text-neutral-400 dark:text-neutral-500">[</span>
        <span className="text-emerald-600 dark:text-emerald-400">"Development"</span>
        <span className="text-neutral-400 dark:text-neutral-500">,</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-400">"Technology"</span>
        <span className="text-neutral-400 dark:text-neutral-500">,</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-400">"Music"</span>
        <span className="text-neutral-400 dark:text-neutral-500">]</span>
      </>
    ),
  },
  {
    num: 9,
    content: (
      <>
        <span className="inline-block w-4" />
        <span className="text-neutral-400 dark:text-neutral-500">&#125;;</span>
      </>
    ),
  },
  {
    num: 10,
    content: <>&nbsp;</>,
  },
  {
    num: 11,
    content: (
      <>
        <span className="inline-block w-4" />
        <span className="text-purple-600 dark:text-purple-400 font-medium">return</span>{" "}
        <span className="text-neutral-400 dark:text-neutral-500">(</span>
      </>
    ),
  },
  {
    num: 12,
    content: (
      <>
        <span className="inline-block w-8" />
        <span className="text-neutral-400 dark:text-neutral-500">&lt;</span>
        <span className="text-amber-600 dark:text-amber-300">Portfolio</span>{" "}
        <span className="text-sky-600 dark:text-sky-300">profile</span>
        <span className="text-cyan-600 dark:text-cyan-400">=</span>
        <span className="text-neutral-400 dark:text-neutral-500">&#123;</span>
        <span className="text-sky-600 dark:text-sky-300">profile</span>
        <span className="text-neutral-400 dark:text-neutral-500">&#125;</span>{" "}
        <span className="text-neutral-400 dark:text-neutral-500">/&gt;</span>
      </>
    ),
  },
  {
    num: 13,
    content: (
      <>
        <span className="inline-block w-4" />
        <span className="text-neutral-400 dark:text-neutral-500">);</span>
      </>
    ),
  },
  {
    num: 14,
    content: (
      <>
        <span className="text-neutral-400 dark:text-neutral-500">&#125;;</span>
      </>
    ),
  },
  {
    num: 15,
    content: <>&nbsp;</>,
  },
  {
    num: 16,
    content: (
      <>
        <span className="text-purple-600 dark:text-purple-400 font-medium">export</span>{" "}
        <span className="text-purple-600 dark:text-purple-400 font-medium">default</span>{" "}
        <span className="text-amber-600 dark:text-amber-300">Developer</span>
        <span className="text-neutral-400 dark:text-neutral-500">;</span>
        <span className="inline-block w-1.5 h-3.5 ml-1.5 bg-blue-500 dark:bg-blue-400 animate-pulse align-middle" />
      </>
    ),
  },
];

// Helper to reliably parse opacity from numbers, percentage strings, or Tailwind classes
function parseOpacity(val) {
  if (val === undefined || val === null) return 0.35;
  if (typeof val === "number") {
    return val > 1 ? val / 100 : val;
  }
  const str = String(val).trim();
  const match = str.match(/(\d+(?:\.\d+)?)/);
  if (match) {
    const num = parseFloat(match[1]);
    return num > 1 ? num / 100 : num;
  }
  return 0.35;
}

/**
 * CodeWindow Component
 *
 * macOS-style floating code editor window that sits quietly in the background
 * behind the hero section. Fully decorative, pointer-events-none, and non-intrusive.
 *
 * Customization Props:
 * @param {string} filename - Filename displayed in the macOS title tab (default: "Developer.jsx")
 * @param {number|string} opacity - Opacity level (default: 0.35, accepts 0.0-1.0, percentages like "50%", or numbers like 40)
 * @param {number} floatDuration - Seconds per float cycle (default: 8)
 * @param {number} floatDistance - Amplitude of vertical float in px (default: 8)
 * @param {string} blur - Backdrop blur utility class (default: "backdrop-blur-sm")
 * @param {Array} customLines - Optional custom code lines array (defaults to defaultCodeLines)
 * @param {string} className - Additional CSS classes applied to window container
 * @param {object} style - Additional inline styles
 */
export default function CodeWindow({
  filename = "Developer.jsx",
  opacity = 0.9,
  floatDuration = 8,
  floatDistance = 8,
  blur = "backdrop-blur-sm",
  customLines,
  className = "",
  style = {},
}) {
  const lines = customLines || defaultCodeLines;
  const numericOpacity = parseOpacity(opacity);

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden",
        className
      )}
      style={{
        opacity: numericOpacity,
        ...style,
      }}
      aria-hidden="true"
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-floatDistance, floatDistance, -floatDistance] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "relative w-[92%] sm:w-[580px] md:w-[660px] max-w-2xl rounded-xl sm:rounded-2xl border border-neutral-300/40 dark:border-neutral-700/40 bg-white/50 dark:bg-[#0D1117]/60 shadow-2xl dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden scale-90 sm:scale-95 md:scale-100 transition-all duration-300",
          blur,
          className
        )}
      >
        {/* Subtle ambient accent glow behind the card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl -z-10" />

        {/* macOS Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 sm:py-3 border-b border-neutral-200/50 dark:border-neutral-800/60 bg-neutral-100/50 dark:bg-[#161B22]/50">
          {/* Traffic light buttons */}
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-xs inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-xs inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-xs inline-block" />
          </div>

          {/* Centered Filename Tab */}
          <div className="flex items-center space-x-1.5 px-3 py-0.5 rounded-md bg-white/40 dark:bg-white/5 border border-neutral-200/40 dark:border-white/5 text-[11px] sm:text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <FileCode size={12} className="text-blue-500 dark:text-blue-400" />
            <span>{filename}</span>
          </div>

          {/* Spacer to balance traffic lights */}
          <div className="w-14" />
        </div>

        {/* Code Editor Body */}
        <div className="p-3 sm:p-5 font-mono text-[11px] sm:text-xs md:text-[13px] leading-relaxed overflow-x-hidden text-neutral-800 dark:text-neutral-200">
          {lines.map((line) => (
            <div key={line.num} className="flex items-baseline py-0.5">
              <span className="w-6 sm:w-8 shrink-0 text-right pr-3 sm:pr-4 text-neutral-400/50 dark:text-neutral-600 select-none text-[10px] sm:text-xs">
                {line.num}
              </span>
              <div className="truncate whitespace-pre font-mono">
                {line.content}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}