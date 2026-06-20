/**
 * Convert user input into UPPER_SNAKE_CASE for storing in the DB.
 *
 * Examples:
 * "Linked In"      -> "LINKED_IN"
 * "naukri-com"     -> "NAUKRI_COM"
 * "  asd   asd  "  -> "ASD_ASD"
 */
export function toUpperSnakeCase(value: string) {
  return value
    .trim() // Remove leading and trailing spaces
    .toUpperCase() // Convert all characters to uppercase
    .replace(/[-_\s]+/g, "_"); // Replace spaces, hyphens, or multiple underscores with a single underscore
}
