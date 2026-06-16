import { PLATFORM_CFG } from "../data/platformConfig";

export function getPlatformBadge(platform: string) {
  return (
    PLATFORM_CFG[platform as keyof typeof PLATFORM_CFG] ?? {
      label: platform
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),

      color: "#6B7280",
      darkColor: "#D1D5DB",

      bg: "#F3F4F6",
      darkBg: "#1A1A1A",
    }
  );
}
