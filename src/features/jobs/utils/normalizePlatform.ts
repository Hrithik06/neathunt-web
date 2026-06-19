export function normalizePlatform(platform: string) {
  return platform
    .trim() // "   interview     completed    "-> "interview     completed"
    .toUpperCase() //"interview     completed" -> "INTERVIEW     COMPLETED"
    .replace(/[-_\s]+/g, "_"); //"INTERVIEW     COMPLETED" -> "INTERVIEW_COMPLETED"
}
