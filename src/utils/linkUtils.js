/**
 * Utility functions for validating and handling links across the portfolio.
 */

/**
 * Checks whether a given URL or link string is valid, non-empty, and renderable.
 * Returns false for null, undefined, empty strings, whitespace-only, or placeholders.
 *
 * @param {unknown} url
 * @returns {boolean}
 */
export const isValidUrl = (url) => {
  if (url === null || url === undefined) return false;
  if (typeof url !== "string") return false;
  const trimmed = url.trim();
  if (trimmed.length === 0) return false;
  if (trimmed === "#" || trimmed.toLowerCase() === "javascript:void(0)") return false;
  if (trimmed.toLowerCase() === "null" || trimmed.toLowerCase() === "undefined") return false;
  return true;
};

/**
 * Checks whether a label or string has meaningful display content.
 *
 * @param {unknown} str
 * @returns {boolean}
 */
export const isValidString = (str) => {
  if (str === null || str === undefined) return false;
  if (typeof str !== "string") return false;
  return str.trim().length > 0;
};
