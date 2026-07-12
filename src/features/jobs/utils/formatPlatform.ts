/**
 * Convert UPPER_SNAKE_CASE values from the DB into Title Case for display.
 *
 * Examples:
 * "LINKED_IN"          -> "Linked In"
 * "NAUKRI_COM"         -> "Naukri Com"
 * "INTERVIEW_SCHEDULED"-> "Interview Scheduled"
 */
export function formatPlatform(platform: string) {
  return platform
    .toLowerCase() // Convert everything to lowercase first
    .replace(/[_-]+/g, " ") // Replace underscores and hyphens with spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize the first letter of each word
}
