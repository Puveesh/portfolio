import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Play, 
  Layers, 
  Github, 
  ExternalLink 
} from "lucide-react";
import { isValidUrl } from "../utils/linkUtils";
import { getOptimizedMedia, preloadGalleryNeighbors } from "../utils/mediaOptimizer";

/**
 * HardwareProjectGallery Component
 * Dedicated showcase overlay and media gallery for hardware projects.
 *
 * @param {Object} props
 * @param {Object|null} props.project - The selected hardware project data
 * @param {boolean} props.isOpen - Whether the showcase modal is open
 * @param {Function} props.onClose - Callback to close the showcase
 */
export default function HardwareProjectGallery({ project, isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const videoRef = useRef(null);
  const modalRef = useRef(null);

  // Helper for sensible path comparison and deduplication (handles leading slashes and whitespace)
  const isSamePath = (pathA, pathB) => {
    if (!pathA || !pathB) return false;
    const cleanA = String(pathA).trim().replace(/^\/+/, "").toLowerCase();
    const cleanB = String(pathB).trim().replace(/^\/+/, "").toLowerCase();
    return cleanA === cleanB;
  };

  // Build the gallery media list: Card thumbnail first, followed by additional media items without duplicates
  const additionalMedia = (Array.isArray(project?.media) ? project.media : []).filter(
    (item) => item && item.src && !isSamePath(item.src, project?.image)
  );

  const hasThumbnail = isValidUrl(project?.image);
  const mediaList = hasThumbnail
    ? [
        {
          type: "image",
          src: project.image,
          alt: project.title || "Project Preview",
          title: `${project.title || "Project"} - Overview`,
        },
        ...additionalMedia,
      ]
    : additionalMedia;

  const hasMedia = mediaList.length > 0;
  const currentMedia = hasMedia ? mediaList[activeIndex] || mediaList[0] : null;

  // Background preloading for adjacent media items to ensure zero-latency navigation
  useEffect(() => {
    if (isOpen && hasMedia) {
      preloadGalleryNeighbors(mediaList, activeIndex);
    }
  }, [isOpen, hasMedia, activeIndex, mediaList]);


  // Pause and mute video whenever switching media items or closing modal
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
    }
  }, [activeIndex, isOpen]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const handleNext = useCallback(() => {
    if (!hasMedia || mediaList.length <= 1) return;
    setIsImageLoading(true);
    setActiveIndex((prev) => (prev + 1) % mediaList.length);
  }, [hasMedia, mediaList.length]);

  const handlePrev = useCallback(() => {
    if (!hasMedia || mediaList.length <= 1) return;
    setIsImageLoading(true);
    setActiveIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
  }, [hasMedia, mediaList.length]);

  // Keyboard navigation: Escape to close, Left/Right arrows for media cycling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLightboxOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !project) return null;

  const hasGithub = isValidUrl(project.githubUrl);
  const hasLinkedin = isValidUrl(project.linkedin);

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hardware-showcase-title"
      >
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md -z-10"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ type: "spring", damping: 28, stiffness: 350 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/95 dark:bg-[#0c0c0c]/95 backdrop-blur-2xl shadow-2xl overflow-hidden text-neutral-900 dark:text-white"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/30">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                Hardware Showcase
              </span>
              {hasMedia && mediaList.length > 1 && (
                <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium">
                  {activeIndex + 1} / {mediaList.length}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close project showcase"
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Project Header Info */}
            <div>
              <h2
                id="hardware-showcase-title"
                className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white mb-2"
              >
                {project.title}
              </h2>

              {/* Tags */}
              {Array.isArray(project.tags) && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 text-[10px] font-semibold text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-800/50 uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Media Gallery Section */}
            <div className="rounded-xl border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-100/50 dark:bg-neutral-950/40 p-3 sm:p-4">
              {!hasMedia ? (
                /* Fallback State for Projects with No Media */
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <div className="h-12 w-12 rounded-full bg-neutral-200/60 dark:bg-neutral-800/60 flex items-center justify-center text-neutral-400 dark:text-neutral-500 mb-3">
                    <Layers size={22} />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                    Project media coming soon
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm font-light">
                    Photos, build schematics, and demonstration videos for this hardware build are currently being compiled and will be added here shortly.
                  </p>
                </div>
              ) : (
                /* Active Media Gallery Display */
                <div className="space-y-4">
                  {/* Featured Media Viewer */}
                  <div className="relative group w-full aspect-video max-h-[52vh] rounded-lg bg-black flex items-center justify-center overflow-hidden">
                    {currentMedia.type === "video" ? (
                      (() => {
                        const videoOpt = getOptimizedMedia(currentMedia.src, {
                          fallbackPoster: currentMedia.poster,
                        });
                        return (
                          <video
                            key={currentMedia.src}
                            ref={videoRef}
                            src={videoOpt.src}
                            poster={videoOpt.poster}
                            controls
                            muted
                            playsInline
                            preload="metadata"
                            autoPlay={false}
                            className="w-full h-full object-contain"
                          >
                            Your browser does not support HTML5 video playback.
                          </video>
                        );
                      })()
                    ) : (
                      (() => {
                        const opt = getOptimizedMedia(currentMedia.src, { size: "full" });
                        return (
                          <div className="relative w-full h-full flex items-center justify-center">
                            {isImageLoading && (
                              <div className="absolute inset-0 bg-neutral-900/40 animate-pulse pointer-events-none" />
                            )}
                            <picture className="w-full h-full flex items-center justify-center">
                              {opt.webp && <source srcSet={opt.webp} type="image/webp" />}
                              <img
                                key={opt.fallback}
                                src={opt.fallback}
                                onError={(e) => {
                                  if (opt.originalFallback && e.currentTarget.src !== opt.originalFallback) {
                                    e.currentTarget.src = opt.originalFallback;
                                  }
                                }}
                                onLoad={() => setIsImageLoading(false)}
                                alt={currentMedia.alt || `${project.title} showcase media`}
                                loading="eager"
                                decoding="async"
                                fetchPriority="high"
                                className={`w-full h-full object-contain cursor-zoom-in transition-opacity duration-200 ${
                                  isImageLoading ? "opacity-0" : "opacity-100"
                                }`}
                                onClick={() => setIsLightboxOpen(true)}
                              />
                            </picture>
                            {/* Enlarge Button */}
                            <button
                              type="button"
                              onClick={() => setIsLightboxOpen(true)}
                              aria-label="Enlarge image"
                              className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100"
                            >
                              <Maximize2 size={16} />
                            </button>
                          </div>
                        );
                      })()
                    )}

                    {/* Previous Button (if multiple items) */}
                    {mediaList.length > 1 && (
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous media"
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-all opacity-80 hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        <ChevronLeft size={20} />
                      </button>
                    )}

                    {/* Next Button (if multiple items) */}
                    {mediaList.length > 1 && (
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next media"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-all opacity-80 hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </div>

                  {/* Media Caption / Title / Alt */}
                  {(currentMedia.title || currentMedia.alt) && (
                    <div className="text-center px-2">
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                        {currentMedia.title || currentMedia.alt}
                      </p>
                    </div>
                  )}

                  {/* Thumbnail Selector Strip (if > 1 media item) */}
                  {mediaList.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin">
                      {mediaList.map((item, idx) => {
                        const isActive = idx === activeIndex;
                        const isVideo = item.type === "video";
                        const thumbOpt = getOptimizedMedia(item.src, {
                          size: "thumb",
                          fallbackPoster: item.poster,
                        });

                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              if (idx !== activeIndex) {
                                setIsImageLoading(true);
                                setActiveIndex(idx);
                              }
                            }}
                            aria-label={`View media ${idx + 1}: ${item.title || item.alt || item.type}`}
                            className={`relative flex-shrink-0 h-16 w-24 rounded-lg overflow-hidden border transition-all ${
                              isActive
                                ? "border-blue-500 ring-2 ring-blue-500/50 scale-[1.02]"
                                : "border-neutral-300 dark:border-neutral-700 opacity-70 hover:opacity-100"
                            }`}
                          >
                            {isVideo ? (
                              <div className="w-full h-full bg-neutral-900 flex items-center justify-center relative">
                                {thumbOpt.poster ? (
                                  <picture className="w-full h-full">
                                    <source srcSet={thumbOpt.poster} type="image/webp" />
                                    <img
                                      src={thumbOpt.poster}
                                      alt={item.title || "Video thumbnail"}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  </picture>
                                ) : (
                                  <div className="w-full h-full bg-neutral-800" />
                                )}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                  <Play size={16} className="text-white fill-white" />
                                </div>
                              </div>
                            ) : (
                              <picture className="w-full h-full">
                                {thumbOpt.webp && <source srcSet={thumbOpt.webp} type="image/webp" />}
                                <img
                                  src={thumbOpt.fallback}
                                  onError={(e) => {
                                    if (thumbOpt.originalFallback && e.currentTarget.src !== thumbOpt.originalFallback) {
                                      e.currentTarget.src = thumbOpt.originalFallback;
                                    }
                                  }}
                                  alt={item.alt || `Thumbnail ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </picture>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer Bar with Project Links (if available) */}
          {(hasGithub || hasLinkedin) && (
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-t border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/30">
              <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                External Resources
              </span>
              <div className="flex items-center gap-4">
                {hasGithub && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white font-semibold transition-colors"
                  >
                    <Github size={13} />
                    <span>Repository</span>
                  </a>
                )}
                {hasLinkedin && (
                  <a
                    href={project.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    <ExternalLink size={13} />
                    <span>LinkedIn Post</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Lightbox Modal for Enlarge Image Preview */}
        {isLightboxOpen && currentMedia?.type === "image" && (
          (() => {
            const lightboxOpt = getOptimizedMedia(currentMedia.src, { size: "full" });
            return (
              <div
                className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                onClick={() => setIsLightboxOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close enlarged preview"
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <Minimize2 size={20} />
                </button>
                <picture className="max-w-full max-h-[90vh] flex items-center justify-center">
                  {lightboxOpt.webp && <source srcSet={lightboxOpt.webp} type="image/webp" />}
                  <img
                    src={lightboxOpt.fallback}
                    onError={(e) => {
                      if (lightboxOpt.originalFallback && e.currentTarget.src !== lightboxOpt.originalFallback) {
                        e.currentTarget.src = lightboxOpt.originalFallback;
                      }
                    }}
                    alt={currentMedia.alt || project.title}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />
                </picture>
              </div>
            );
          })()
        )}
      </div>
    </AnimatePresence>
  );
}
