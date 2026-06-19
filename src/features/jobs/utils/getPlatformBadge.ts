import { PLATFORM_CFG } from "../data/platformConfig";
// import { normalizePlatform } from "./normalizePlatform";

export function getPlatformBadge(platform: string) {
  // const key = normalizePlatform(platform);
  return (
    PLATFORM_CFG[platform as keyof typeof PLATFORM_CFG] ?? {
      label: platform
        .trim() // "   interview     completed    "-> "interview     completed"
        .replace(/\s+/g, " ") //Removing extra space "interview     completed" -> "interview completed"
        .replace(/\b\w/g, (c) => c.toUpperCase()), // Title case "Interview Completed"

      color: "#6B7280",
      darkColor: "#D1D5DB",

      bg: "#F3F4F6",
      darkBg: "#1A1A1A",
    }
  );
}
