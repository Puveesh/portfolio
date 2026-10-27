/**
 * Media Optimizer Utility
 * Resolves media sources into optimized WebP/JPEG formats, thumbnails, and handles prefetching.
 * Keeps portfolioData.js clean and untouched for easy project updates.
 */

// In-memory cache to prevent duplicate preloads
const preloadedUrls = new Set();

/**
 * Normalizes asset paths (ensuring valid root-relative or absolute URLs)
 * @param {string} path - Media path from portfolioData
 * @returns {string} Normalized path
 */
export function normalizePath(path) {
  if (!path) return "";
  const trimmed = String(path).trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
    return trimmed;
  }
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

/**
 * Checks if a given URL is a video
 * @param {string} url - Media URL
 * @returns {boolean}
 */
export function isVideoUrl(url) {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov)$/i.test(url);
}

/**
 * Resolves an image or video URL into its best optimized formats (WebP, JPEG, Thumbnails)
 * @param {string} src - Source path from portfolioData
 * @param {Object} options
 * @param {("full"|"thumb")} options.size - Desired resolution size
 * @param {string} [options.fallbackPoster] - Optional fallback poster for videos
 * @returns {Object} { src, webp, fallback, isVideo, poster }
 */
export function getOptimizedMedia(src, { size = "full", fallbackPoster = null } = {}) {
  const normSrc = normalizePath(src);
  if (!normSrc) {
    return { src: "", webp: null, fallback: "", isVideo: false, poster: null };
  }

  const isVideo = isVideoUrl(normSrc);

  if (isVideo) {
    // If it's a video, attempt to resolve an automatic poster matching the video name
    const videoBase = normSrc.replace(/\.[^/.]+$/, "");
    const poster = fallbackPoster || `${videoBase}_poster.webp`;

    return {
      src: normSrc,
      webp: null,
      fallback: normSrc,
      isVideo: true,
      poster: normalizePath(poster),
      thumbPoster: `${videoBase}_poster.webp`,
    };
  }

  // Handle external or data URLs without local modifications
  if (normSrc.startsWith("http://") || normSrc.startsWith("https://") || normSrc.startsWith("data:")) {
    return {
      src: normSrc,
      webp: null,
      fallback: normSrc,
      isVideo: false,
      poster: null,
    };
  }

  // Parse path components for local files
  const match = normSrc.match(/^(.*\/)?([^/]+)\.([a-zA-Z0-9]+)$/);
  if (!match) {
    return {
      src: normSrc,
      webp: null,
      fallback: normSrc,
      isVideo: false,
      poster: null,
    };
  }

  const [, dir = "/", baseName, ext] = match;
  const cleanDir = dir.endsWith("/") ? dir : `${dir}/`;

  // Only apply webp/thumb paths to media that have pre-generated webp assets (dphoto_1 .. dphoto_10)
  const isOptimizedDroneAsset = /^dphoto_\d+$/i.test(baseName);

  if (isOptimizedDroneAsset) {
    if (size === "thumb") {
      // High-efficiency thumbnail (around 7KB-15KB WebP)
      return {
        src: `${cleanDir}${baseName}_thumb.webp`,
        webp: `${cleanDir}${baseName}_thumb.webp`,
        fallback: `${cleanDir}${baseName}_thumb.jpg`,
        originalFallback: normSrc,
        isVideo: false,
        poster: null,
      };
    }

    // Full viewer resolution (optimized WebP ~100KB, fallback JPEG ~180KB)
    return {
      src: `${cleanDir}${baseName}.webp`,
      webp: `${cleanDir}${baseName}.webp`,
      fallback: `${cleanDir}${baseName}.jpg`,
      originalFallback: normSrc,
      isVideo: false,
      poster: null,
    };
  }

  // Any other media asset: safe pass-through without modifying file extensions
  return {
    src: normSrc,
    webp: null,
    fallback: normSrc,
    originalFallback: normSrc,
    isVideo: false,
    poster: null,
  };
}

/**
 * Silently preloads an image into the browser cache
 * @param {string} url - URL to preload
 */
export function preloadImage(url) {
  if (!url || preloadedUrls.has(url)) return;
  preloadedUrls.add(url);

  if (typeof window !== "undefined") {
    const img = new Image();
    img.src = url;
  }
}

/**
 * Intelligently preloads neighboring media items in a gallery
 * @param {Array} mediaList - List of media items
 * @param {number} currentIndex - Currently active index
 */
export function preloadGalleryNeighbors(mediaList, currentIndex) {
  if (!Array.isArray(mediaList) || mediaList.length <= 1) return;

  const preloadIndex = (idx) => {
    const item = mediaList[idx];
    if (item && item.type !== "video" && item.src) {
      const optimized = getOptimizedMedia(item.src, { size: "full" });
      if (optimized.webp) preloadImage(optimized.webp);
      if (optimized.fallback) preloadImage(optimized.fallback);
    }
  };

  // Schedule neighbor preloading during browser idle time or next tick
  const runPreload = () => {
    const nextIdx = (currentIndex + 1) % mediaList.length;
    const prevIdx = (currentIndex - 1 + mediaList.length) % mediaList.length;

    preloadIndex(nextIdx);
    if (prevIdx !== nextIdx) {
      preloadIndex(prevIdx);
    }
  };

  if (typeof window !== "undefined") {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(runPreload, { timeout: 1500 });
    } else {
      setTimeout(runPreload, 150);
    }
  }
}
