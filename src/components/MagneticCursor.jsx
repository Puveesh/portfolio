import React, { useEffect, useRef, useState } from "react";

export const CURSOR_CONFIG = {
  // --- Dimensions ---
  dotSize: 10,                    // Diameter of the inner cursor dot (px)
  ringSize: 30,                  // Diameter of the outer magnetic ring (px)
  ringBorderWidth: 2,          // Border thickness of the outer ring (px)

  // --- Hover & Click Scale Factors ---
  hoverDotScale: 0.5,            // Scale of the inner dot when hovering interactive items
  hoverRingScale: 1.35,          // Scale of outer ring when hovering interactive items
  activeClickScale: 0.85,        // Scale of the ring when the mouse is pressed down (click feedback)

  // --- Physics & Magnetic Attraction ---
  smoothing: 0.5,               // Dot interpolation factor (0.05 = slow/lazy, 0.35 = snappy)
  ringSmoothing: 0.12,           // Ring interpolation factor (creates fluid trailing momentum)
  magneticStrength: 0.5,        // Strength of magnetic attraction (0 = no pull, 1 = snapped to center)
  maxDisplacement: 22,           // Maximum px cursor can be pulled toward element center
  detectionDistance: 50,         // Radius (px) from element bounds to engage magnetic attraction

  // --- Visual Colors & Opacity ---
  dotColor: "#3B82F6",           // Inner dot color (Tailwind accent blue matching portfolio theme)
  ringBorderColor: "rgba(59, 130, 246, 0.45)",     // Default outer ring border color
  hoverRingBorderColor: "rgba(59, 130, 246, 0.85)",// Outer ring border color when hovering
  hoverRingBgColor: "rgba(59, 130, 246, 0.08)",    // Subtle ring background fill when hovering
  normalOpacity: 0.9,            // Base opacity of the cursor
  hoverOpacity: 1.0,             // Opacity when active/hovering

  // --- Target Selectors ---
  // Elements that trigger the magnetic attraction and hover appearance
  interactiveSelector: "a, button, [role='button'], [role='link'], input[type='submit'], input[type='button'], input[type='reset'], .cursor-pointer, [data-magnetic]",

  // Elements where native cursor MUST be preserved and custom cursor hidden (inputs, textareas, etc.)
  nativeCursorSelector: "input:not([type='submit']):not([type='button']):not([type='reset']), textarea, select, [contenteditable='true']",

  // High z-index to stay above modal backdrops and elements without intercepting clicks
  zIndex: 99999,
};

/**
 * MagneticCursor Component
 * 
 * Standalone, high-performance magnetic cursor for React.
 * Uses requestAnimationFrame and direct DOM manipulation to achieve 60-120fps
 * without triggering React re-renders on mouse movement.
 */
export default function MagneticCursor() {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafId = useRef(null);

  // Position and state tracking ref (avoids React re-renders on mouse movement)
  const state = useRef({
    mouseX: -100,
    mouseY: -100,
    targetX: -100,
    targetY: -100,
    dotX: -100,
    dotY: -100,
    ringX: -100,
    ringY: -100,
    isHovering: false,
    isOverNative: false,
    isClicking: false,
    isVisible: false,
    hasInitialized: false,
  });

  // 1. Detect pointer device (mouse vs touch)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updatePointerSupport = () => {
      setIsPointerDevice(mediaQuery.matches);
    };

    updatePointerSupport();

    // Listen for changes (e.g. tablet mode toggle)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePointerSupport);
      return () => mediaQuery.removeEventListener("change", updatePointerSupport);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(updatePointerSupport);
      return () => mediaQuery.removeListener(updatePointerSupport);
    }
  }, []);

  // 2. Mouse tracking and animation loop
  useEffect(() => {
    if (!isPointerDevice) return;

    const s = state.current;

    // Animation tick using requestAnimationFrame
    const tick = () => {
      if (s.isVisible && !s.isOverNative) {
        // Interpolate dot toward target
        s.dotX += (s.targetX - s.dotX) * CURSOR_CONFIG.smoothing;
        s.dotY += (s.targetY - s.dotY) * CURSOR_CONFIG.smoothing;

        // Interpolate ring toward target with fluid lag
        s.ringX += (s.targetX - s.ringX) * CURSOR_CONFIG.ringSmoothing;
        s.ringY += (s.targetY - s.ringY) * CURSOR_CONFIG.ringSmoothing;

        // Calculate dynamic scale factors
        let dotScale = 1;
        let ringScale = 1;

        if (s.isHovering) {
          dotScale = CURSOR_CONFIG.hoverDotScale;
          ringScale = CURSOR_CONFIG.hoverRingScale;
        }

        if (s.isClicking) {
          ringScale *= CURSOR_CONFIG.activeClickScale;
          dotScale *= 0.85;
        }

        // Apply hardware-accelerated transforms directly
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${s.dotX}px, ${s.dotY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
          dotRef.current.style.opacity = s.isHovering ? String(CURSOR_CONFIG.hoverOpacity) : String(CURSOR_CONFIG.normalOpacity);
        }

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${s.ringX}px, ${s.ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
          ringRef.current.style.opacity = s.isHovering ? String(CURSOR_CONFIG.hoverOpacity) : String(CURSOR_CONFIG.normalOpacity);
          ringRef.current.style.borderColor = s.isHovering ? CURSOR_CONFIG.hoverRingBorderColor : CURSOR_CONFIG.ringBorderColor;
          ringRef.current.style.backgroundColor = s.isHovering ? CURSOR_CONFIG.hoverRingBgColor : "transparent";
        }
      } else {
        // Hide custom cursor elements when outside or over text fields
        if (dotRef.current) dotRef.current.style.opacity = "0";
        if (ringRef.current) ringRef.current.style.opacity = "0";
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    // Event listener: Mouse movement & magnetic target calculation
    const handleMouseMove = (e) => {
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;

      if (!s.hasInitialized) {
        s.hasInitialized = true;
        s.dotX = e.clientX;
        s.dotY = e.clientY;
        s.ringX = e.clientX;
        s.ringY = e.clientY;
      }

      s.isVisible = true;

      const targetEl = e.target;

      // Check if mouse is over an input, textarea or text-selection element
      if (targetEl && targetEl.closest && targetEl.closest(CURSOR_CONFIG.nativeCursorSelector)) {
        s.isOverNative = true;
        s.isHovering = false;
        s.targetX = e.clientX;
        s.targetY = e.clientY;
        return;
      }
      s.isOverNative = false;

      // Identify closest interactive element
      let interactive = targetEl && targetEl.closest ? targetEl.closest(CURSOR_CONFIG.interactiveSelector) : null;

      // Proximity detection: If not hovering directly, check nearby points
      if (!interactive && CURSOR_CONFIG.detectionDistance > 0) {
        const d = CURSOR_CONFIG.detectionDistance;
        const testPoints = [
          [e.clientX - d, e.clientY],
          [e.clientX + d, e.clientY],
          [e.clientX, e.clientY - d],
          [e.clientX, e.clientY + d],
        ];

        for (const [px, py] of testPoints) {
          if (px >= 0 && py >= 0 && px <= window.innerWidth && py <= window.innerHeight) {
            const el = document.elementFromPoint(px, py);
            const match = el && el.closest ? el.closest(CURSOR_CONFIG.interactiveSelector) : null;
            if (match) {
              interactive = match;
              break;
            }
          }
        }
      }

      // Compute magnetic attraction vector if interactive element is found
      if (interactive) {
        s.isHovering = true;
        const rect = interactive.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distToCenter = Math.hypot(centerX - e.clientX, centerY - e.clientY);
        const influenceRadius = Math.max(rect.width, rect.height) / 2 + CURSOR_CONFIG.detectionDistance;

        if (distToCenter < influenceRadius) {
          // Linear falloff: stronger pull closer to element center
          const falloff = Math.max(0, 1 - distToCenter / influenceRadius);
          const pull = CURSOR_CONFIG.magneticStrength * falloff;

          const rawOffsetX = (centerX - e.clientX) * pull;
          const rawOffsetY = (centerY - e.clientY) * pull;

          // Clamp displacement to prevent unnatural large jumps on big elements
          const clampedOffsetX = Math.max(-CURSOR_CONFIG.maxDisplacement, Math.min(CURSOR_CONFIG.maxDisplacement, rawOffsetX));
          const clampedOffsetY = Math.max(-CURSOR_CONFIG.maxDisplacement, Math.min(CURSOR_CONFIG.maxDisplacement, rawOffsetY));

          s.targetX = e.clientX + clampedOffsetX;
          s.targetY = e.clientY + clampedOffsetY;
        } else {
          s.targetX = e.clientX;
          s.targetY = e.clientY;
        }
      } else {
        s.isHovering = false;
        s.targetX = e.clientX;
        s.targetY = e.clientY;
      }
    };

    const handleMouseDown = () => {
      s.isClicking = true;
    };

    const handleMouseUp = () => {
      s.isClicking = false;
    };

    const handleMouseEnter = () => {
      s.isVisible = true;
    };

    const handleMouseLeave = () => {
      s.isVisible = false;
    };

    const handleWindowBlur = () => {
      s.isVisible = false;
    };

    const handleScroll = () => {
      if (s.isVisible && !s.isOverNative && s.mouseX >= 0 && s.mouseY >= 0) {
        const el = document.elementFromPoint(s.mouseX, s.mouseY);
        if (el) {
          handleMouseMove({ clientX: s.mouseX, clientY: s.mouseY, target: el });
        }
      }
    };

    // Attach listeners
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleWindowBlur);

    // Cleanup
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [isPointerDevice]);

  // Do not render anything on touch-only devices
  if (!isPointerDevice) {
    return null;
  }

  return (
    <>
      {/* 
        Global style overrides:
        Hides default browser cursor for standard and interactive elements on pointer devices,
        while strictly preserving native cursors for inputs, textareas, and editable fields.
      */}
      <style>{`
        @media (pointer: fine) {
          body, a, button, [role="button"], [role="link"], .cursor-pointer, [data-magnetic] {
            cursor: none !important;
          }
          input:not([type="submit"]):not([type="button"]):not([type="reset"]),
          textarea,
          select,
          [contenteditable="true"] {
            cursor: auto !important;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: CURSOR_CONFIG.zIndex,
          overflow: "hidden",
        }}
      >
        {/* Outer magnetic fluid ring */}
        <div
          ref={ringRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: `${CURSOR_CONFIG.ringSize}px`,
            height: `${CURSOR_CONFIG.ringSize}px`,
            borderRadius: "50%",
            border: `${CURSOR_CONFIG.ringBorderWidth}px solid ${CURSOR_CONFIG.ringBorderColor}`,
            backgroundColor: "transparent",
            pointerEvents: "none",
            willChange: "transform, opacity, border-color, background-color",
            opacity: 0,
            transition: "opacity 0.2s ease-out, border-color 0.2s ease, background-color 0.2s ease",
            transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
          }}
        />

        {/* Inner precise cursor dot */}
        <div
          ref={dotRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: `${CURSOR_CONFIG.dotSize}px`,
            height: `${CURSOR_CONFIG.dotSize}px`,
            borderRadius: "50%",
            backgroundColor: CURSOR_CONFIG.dotColor,
            pointerEvents: "none",
            willChange: "transform, opacity",
            opacity: 0,
            transition: "opacity 0.2s ease-out",
            transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
          }}
        />
      </div>
    </>
  );
}
