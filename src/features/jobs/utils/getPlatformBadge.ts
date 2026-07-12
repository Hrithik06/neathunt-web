import { PLATFORM_CFG } from "../data/platformConfig";
import { formatPlatform } from "./formatPlatform";

export function getPlatformBadge(platform: string) {

  // const key = normalizePlatform(platform);

  return (
    PLATFORM_CFG[platform as keyof typeof PLATFORM_CFG] ?? {
      label: formatPlatform(platform),

      color: "#6B7280",
      darkColor: "#D1D5DB",

      bg: "#F3F4F6",
      darkBg: "#1A1A1A",
    }
  );
}
