/**
 * Remove all types of whitespace:
 * spaces, full-width spaces, tabs, line breaks.
 *
 * @param value string | undefined | null
 * @returns cleaned string
 */
export function stringTrim(value: string): string {
  // Return empty string for null or undefined
  if (value === null || value === undefined) return '';

  // Convert to string safely
  const str = String(value);

  // Normalize full-width spaces to normal spaces
  const normalized = str.replace(/\u3000/g, ' ');

  // Remove all whitespace: spaces, tabs, newlines, full-width spaces
  return normalized.replace(/\s+/g, '');
}
