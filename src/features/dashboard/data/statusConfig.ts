// Per-status colors — data-driven, not theme tokens — stays in JS

// export const STATUS_LABELS = {
//   APPLIED: "Applied",
//   INTERVIEW_SCHEDULED: "Interview Scheduled",
//   INTERVIEW_COMPLETED: "Interview Completed",
//   OFFER: "Offer",
//   ACCEPTED: "Accepted",
//   REJECTED: "Rejected",
//   WITHDRAWN: "Withdrawn",
// } as const;

export const STATUS_CFG = {
  APPLIED: {
    label: "Applied",
    color: "#B45309",
    bg: "#FEF3C7",
    darkBg: "#292011",
    darkColor: "#FCD34D",
    emoji: "📬",
    msg: "Application sent ✨",
  },
  INTERVIEW_SCHEDULED: {
    label: "Interview Scheduled",
    color: "#7C3AED",
    bg: "#EDE9FE",
    darkBg: "#1E1330",
    darkColor: "#C4B5FD",
    emoji: "📅",
    msg: "Interview locked in!",
  },
  INTERVIEW_COMPLETED: {
    label: "Interview Completed",
    color: "#C026D3", // Fuchsia 600 (Distinct Magenta-Pink)
    bg: "#FAE8FF", // Fuchsia 100
    darkBg: "#4A044E", // Fuchsia 950 (Contrasts sharply with dark blue)
    darkColor: "#E879F9", // Fuchsia 400
    emoji: "🎤",
    msg: "Nicely done 👏",
  },
  OFFER: {
    label: "Offer",
    color: "#0D9488",
    bg: "#CCFBF1",
    darkBg: "#115E59",
    darkColor: "#5EEAD4",
    emoji: "🎉",
    msg: "Offer received 🥳",
  },
  ACCEPTED: {
    label: "Accepted",
    color: "#16A34A",
    bg: "#DCFCE7",
    darkBg: "#14532D",
    darkColor: "#86EFAC",
    emoji: "✅",
    msg: "New journey begins!",
  },
  REJECTED: {
    label: "Rejected",
    color: "#6B7280",
    bg: "#F3F4F6",
    darkBg: "#1C1C1C",
    darkColor: "#9CA3AF",
    emoji: "🌱",
    msg: "Keep moving forward",
  },
  WITHDRAWN: {
    label: "Withdrawn",
    color: "#DC2626", // True Red 600
    bg: "#FEE2E2", // True Red 100
    darkBg: "#450A0A", // True Red 950 (Deep dark red, zero pink hues)
    darkColor: "#F87171", // True Red 400
    emoji: "↩️",
    msg: "Application withdrawn",
  },
} as const;
