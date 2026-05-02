import { useState } from "react";

function getTodayDate(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formatted = `${year}-${month}-${day}`;
  return formatted;
}
export default function useTodayDate() {
  const [todayDate, setTodayDate] = useState(getTodayDate());
  return todayDate;
}
