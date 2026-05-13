import { useAuth } from "@/context/AuthContext";

export const useGreeting = () => {
  const { user } = useAuth();

  const hour = new Date().getHours();

  const firstName = user?.givenName || user?.name?.split(" ")[0] || "there";

  let greeting: string;
  let emoji = "👋";

  if (hour >= 21 || hour < 5) {
    greeting = "Burning the midnight oil";
    emoji = "🌙";
  } else if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  const subText =
    hour >= 21 || hour < 5
      ? "Late nights build great careers. Here's your progress."
      : hour < 12
        ? "Start strong — every application gets you closer."
        : hour < 17
          ? "Keep the momentum going — you're making solid progress."
          : "You're doing great — consistency pays off.";
  return {
    firstName,
    greeting,
    emoji,
    subText,
  };
};
