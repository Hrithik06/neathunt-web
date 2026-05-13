import { useEffect, useRef, useState } from "react";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import JobPipeline from "@/features/dashboard/components/JobPipeline";
import StatCards from "@/features/dashboard/components/StatCards";
import TrophyCard from "@/features/dashboard/components/TrophyCard";
import ApplicationsTable from "@/features/dashboard/components/ApplicationsTable";
import { JOBS } from "@/features/dashboard/data/jobs";
import DasboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import LogApplicationModal from "@/features/dashboard/components/JobForm/LogApplicationModal";
import { http } from "@/services/http";
import { useNavigate } from "react-router";

// ── Main ─────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // ← lifted here
  const navigate = useNavigate();

  const counts = JOBS.reduce<Record<string, number>>(
    (a, j) => ({ ...a, [j.status]: (a[j.status] || 0) + 1 }),
    {},
  );

  const responseRate = Math.round(
    (JOBS.filter((j) => j.status !== "Applied").length / JOBS.length) * 100,
  );

  const filtered = JOBS.filter(
    (j) =>
      (filter === "All" || j.status === filter) &&
      (j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.title.toLowerCase().includes(search.toLowerCase())),
  );

  const hasRun = useRef(false);

  //send user timezone
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // run logic
    const init = async () => {
      const res = await fetch("/user/me", {
        credentials: "include",
      });

      const user = await res.json();

      const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      if (!user.timezoneInitialized) {
        await http.request({
          method: "PATCH",
          url: "/user/timezone",
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({ timezone: clientTimezone }),
        });
      }
    };

    init();
  }, []);

  // Replace history entry on mount to prevent back button from going to
  // Google OAuth pages after login redirect
  useEffect(() => {
    navigate("/dashboard", { replace: true });
  }, []);
  return (
    <div
      className="flex min-h-screen transition-colors duration-500"
      style={{
        background: "var(--page-bg)",
        fontFamily: "'Nunito', 'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ticker  { 0%{opacity:0;transform:translateY(8px)} 15%,85%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-8px)} }
        @keyframes glow    { 0%,100%{box-shadow:0 0 8px 2px rgba(255,201,71,0.2)} 50%{box-shadow:0 0 18px 4px rgba(255,201,71,0.4)} }
        .fade-up   { animation: fadeUp 0.5s ease both; }
        .fade-up-1 { animation: fadeUp 0.5s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.5s ease 0.2s both; }
        .fade-up-3 { animation: fadeUp 0.5s ease 0.3s both; }
        .ticker-text { animation: ticker 4s ease-in-out forwards; }
        .offer-glow  { animation: glow 2.5s ease-in-out infinite; }
        .cta-btn:hover { transform: translateY(-2px); }
        .nav-item:hover { background: rgba(255,201,71,0.1); }
        .app-row:hover td { background: var(--row-hover-bg, rgba(255,201,71,0.04)); }
      `}</style>

      {/* ── Sidebar ──────────────────────────────────────────────── */}
      <DasboardSidebar counts={counts} />

      {/* ── Main ─────────────────────────────────────────────────── */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header — receives open handler, no modal inside */}
        <DashboardHeader onOpenModal={() => setIsModalOpen(true)} />

        {/* Stat Cards */}
        <StatCards counts={counts} responseRate={responseRate} />

        {/* Pipeline + Trophy */}
        <div className="flex gap-5 mb-6 flex-wrap fade-up-2">
          <JobPipeline counts={counts} filter={filter} setFilter={setFilter} />
          <TrophyCard counts={counts} responseRate={responseRate} />
        </div>

        {/* Applications Table */}
        <ApplicationsTable
          filtered={filtered}
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />
      </main>

      {/* ── Modal — rendered at page root, above everything ──────── */}
      <LogApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
