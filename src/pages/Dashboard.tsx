import "./Dashboard.css";
import { useEffect, useState } from "react";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import JobPipeline from "@/features/jobs/components/JobPipeline";
import StatCards from "@/features/dashboard/components/StatCards";
import TrophyCard from "@/features/dashboard/components/TrophyCard";
import ApplicationsTable from "@/features/jobs/components/ApplicationsTable";
import DesktopSidebar from "@/features/dashboard/components/DesktopSidebar";
import LogApplicationModal from "@/features/jobs/forms/LogApplicationModal";
import { useNavigate } from "react-router";
import type { Job } from "@/features/jobs/types";
import EmptyApplicationsState from "@/features/jobs/components/EmptyApplicationsState";
import { useJobs } from "@/features/jobs/hooks/useJobs";
import ApplicationsTableSkeleton from "@/features/jobs/components/ApplicationsTableSkeleton";
import JobPipelineSkeleton from "@/features/jobs/components/JobPipelineSkeleton";
import TrophyCardSkeleton from "@/features/dashboard/components/TrophyCardSkeleton";
import StatCardsSkeleton from "@/features/dashboard/components/StatCardsSkeleton";
import { showToast } from "@/components/ui/showToast";
import { Menu } from "lucide-react";
import MobileSidebar from "@/features/dashboard/components/MobileSidebar";
import { useIsMobile } from "@/features/dashboard/hooks/useIsMobile";

// ── Main ─────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [filter, setFilter] = useState("All");
  // const [jobData, setJobData] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useJobs();

  const jobData: Job[] = data || [];
  const counts =
    jobData?.reduce<Record<string, number>>(
      (a, j) => ({ ...a, [j.status]: (a[j.status] || 0) + 1 }),
      {},
    ) || {};

  const responseRate = jobData.length
    ? Math.round(
        (jobData.filter((j) => j.status !== "APPLIED").length /
          jobData.length) *
          100,
      )
    : 0;

  const filtered = jobData.filter(
    (j) =>
      (filter === "All" || j.status === filter) &&
      (j.company.toLowerCase().includes(search.toLowerCase()) ||
        j.title.toLowerCase().includes(search.toLowerCase())),
  );

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
  useEffect(() => {
    if (isError) {
      console.log(error);
      showToast(error.message || "Failed to load jobs", "error");
    }
  }, [isError, error]);
  return (
    <div
      className="flex min-h-screen transition-colors duration-500"
      style={{
        background: "var(--page-bg)",
        fontFamily: "'Nunito', 'DM Sans', sans-serif",
      }}
    >
      {/* ── Sidebar ──────────────────────────────────────────────── */}

      {!isMobile ? (
        <DesktopSidebar counts={counts} />
      ) : isSidebarOpen ? (
        <MobileSidebar
          counts={counts}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      ) : (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute mt-10 ml-4"
        >
          <Menu color="var(--muted)" />
        </button>
      )}

      {/* ── Main ─────────────────────────────────────────────────── */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header — receives open handler, no modal inside */}
        <DashboardHeader handleCreate={handleCreate} />

        {/* Stat Cards */}

        {isLoading ? (
          <StatCardsSkeleton />
        ) : (
          <StatCards counts={counts} responseRate={responseRate} />
        )}

        {/* Pipeline + Trophy */}
        <div className="flex gap-5 mb-6 flex-wrap fade-up-2">
          {isLoading ? (
            <>
              <JobPipelineSkeleton />
              <TrophyCardSkeleton />
            </>
          ) : (
            <>
              <JobPipeline
                counts={counts}
                filter={filter}
                setFilter={setFilter}
              />

              <TrophyCard counts={counts} responseRate={responseRate} />
            </>
          )}
        </div>

        {/* Applications Table */}
        {isLoading ? (
          <ApplicationsTableSkeleton />
        ) : jobData.length === 0 ? (
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
