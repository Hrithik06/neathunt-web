export function normalizePlatform(platform: string) {
  return platform.trim().toUpperCase().replace(/\s+/g, "_");
}
