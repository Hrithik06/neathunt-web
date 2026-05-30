export function getTodayDate(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formatted = `${year}-${month}-${day}`;
  return formatted;
}
export function convertToDateMonth(dateStr: string): string {
  const event = new Date(dateStr);
  return event.toLocaleString("en-US", {
    // weekday: "short",
    // year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
