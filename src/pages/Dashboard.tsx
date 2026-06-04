import { useEffect, useState } from "react";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import JobPipeline from "@/features/dashboard/components/JobPipeline";
import StatCards from "@/features/dashboard/components/StatCards";
import TrophyCard from "@/features/dashboard/components/TrophyCard";
import ApplicationsTable from "@/features/dashboard/components/ApplicationsTable";
import DasboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import LogApplicationModal from "@/features/dashboard/components/JobForm/LogApplicationModal";
import { useNavigate } from "react-router";
import { http } from "@/services/http";
import type { Job } from "@/features/dashboard/types";
import EmptyApplicationsState from "@/features/dashboard/components/EmptyApplicationsState";
import { useQuery } from "@tanstack/react-query";

async function getAllJobs() {
  try {
    const response = await http.get(`/jobs`, {
      withCredentials: true,
    });
    return response?.data;
  } catch (err) {
    console.log(err);
  }
}

// ── Main ─────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [filter, setFilter] = useState("All");
  // const [jobData, setJobData] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [isJobModalOpen, setIsJobModalOpen] = useState(false); // ← lifted here
  const [selectedJob, setSelectedJob] = useState<Job | null>(null); // ← lifted here
  const navigate = useNavigate();
  // Access the client
  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => getAllJobs(),
  });

  const jobData: Job[] = data || [];
  const counts =
    jobData?.reduce<Record<string, number>>(
      (a, j) => ({ ...a, [j.status]: (a[j.status] || 0) + 1 }),
      {},
    ) || {};

  const responseRate = Math.round(
    (jobData.filter((j) => j.status !== "APPLIED").length / jobData.length) *
      100,
  );

  const filtered = jobData.length
    ? jobData.filter(
        (j) =>
          (filter === "All" || j.status === filter) &&
          (j.company.toLowerCase().includes(search.toLowerCase()) ||
            j.title.toLowerCase().includes(search.toLowerCase())),
      )
    : [];
  // Replace history entry on mount to prevent back button from going to
  // Google OAuth pages after login redirect
  useEffect(() => {
    navigate("/dashboard", { replace: true });
  }, []);

  function handleEdit(job: Job) {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  }
  function handleCreate() {
    setSelectedJob(null);
    setIsJobModalOpen(true);
  }
  // function handleDelete(jobId: string) {}

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
        <DashboardHeader handleCreate={handleCreate} />

        {/* Stat Cards */}
        <StatCards counts={counts} responseRate={responseRate} />

        {/* Pipeline + Trophy */}
        <div className="flex gap-5 mb-6 flex-wrap fade-up-2">
          <JobPipeline counts={counts} filter={filter} setFilter={setFilter} />
          <TrophyCard counts={counts} responseRate={responseRate} />
        </div>

        {/* Applications Table */}
        {jobData.length === 0 ? (
          <EmptyApplicationsState onOpenModal={() => setIsJobModalOpen(true)} />
        ) : (
          <ApplicationsTable
            filtered={filtered}
            filter={filter}
            setFilter={setFilter}
            search={search}
            setSearch={setSearch}
            handleEdit={handleEdit}
          />
        )}
      </main>

      {/* ── Modal — rendered at page root, above everything ──────── */}
      <LogApplicationModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        selectedJob={selectedJob}
      />
    </div>
  );
}
