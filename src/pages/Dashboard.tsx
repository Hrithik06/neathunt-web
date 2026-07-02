import { lazy, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import "./Dashboard.css";
import { useResponsive } from "@/context/ResponsiveContext";
import type { Job } from "@/features/jobs/types";
import { useJobs } from "@/features/jobs/hooks/useJobs";
import { showToast } from "@/components/ui/showToast";
import { Menu } from "lucide-react";

import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import JobPipeline from "@/features/jobs/components/JobPipeline";
import StatCards from "@/features/dashboard/components/StatCards";
// import TrophyCard from "@/features/dashboard/components/TrophyCard";
import ApplicationsTable from "@/features/jobs/components/ApplicationsTable";
import DesktopSidebar from "@/features/dashboard/components/DesktopSidebar";
import EmptyApplicationsState from "@/features/jobs/components/EmptyApplicationsState";
import ApplicationsTableSkeleton from "@/features/jobs/components/ApplicationsTableSkeleton";
import JobPipelineSkeleton from "@/features/jobs/components/JobPipelineSkeleton";
// import TrophyCardSkeleton from "@/features/dashboard/components/TrophyCardSkeleton";
import StatCardsSkeleton from "@/features/dashboard/components/StatCardsSkeleton";
import MobileSidebar from "@/features/dashboard/components/MobileSidebar";
import MobileApplicationsGrid from "@/features/jobs/components/MobileApplicationsGrid";

const LogApplicationModal = lazy(
  () => import("@/features/jobs/forms/LogApplicationModal"),
);
// ── Main ─────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [filter, setFilter] = useState("All");
  // const [jobData, setJobData] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { isMobile } = useResponsive();

  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useJobs();

  const jobData: Job[] = useMemo(() => data ?? [], [data]);

  const counts = useMemo(() => {
    return jobData.reduce<Record<string, number>>((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {});
  }, [jobData]);

  const responseRate = jobData.length
    ? Math.round(
        (jobData.filter((j) => j.status !== "APPLIED").length /
          jobData.length) *
          100,
      )
    : 0;

  const filtered = useMemo(() => {
    return jobData.filter(
      (j) =>
        (filter === "All" || j.status === filter) &&
        (j.company.toLowerCase().includes(search.toLowerCase()) ||
          j.title.toLowerCase().includes(search.toLowerCase())),
    );
  }, [search, filter, jobData]);

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
      showToast(error.message || "Failed to load jobs", "error");
    }
  }, [isError, error]);
  return (
    <div
      className="flex h-screen transition-colors duration-500"
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
          className="absolute mt-8 ml-3 z-99999"
        >
          <Menu color="var(--muted)" />
        </button>
      )}

      {/* ── Main ─────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        {/* Header — receives open handler, no modal inside */}
        <DashboardHeader handleCreate={handleCreate} />
        <div className="p-8">
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
                {/*<TrophyCardSkeleton />*/}
              </>
            ) : (
              <>
                <JobPipeline
                  counts={counts}
                  filter={filter}
                  setFilter={setFilter}
                />

                {/*<TrophyCard counts={counts} responseRate={responseRate} />*/}
              </>
            )}
          </div>

          {/* Applications Table */}
          {isLoading ? (
            <ApplicationsTableSkeleton />
          ) : jobData.length === 0 ? (
            <EmptyApplicationsState
              onOpenModal={() => setIsJobModalOpen(true)}
            />
          ) : isMobile ? (
            <MobileApplicationsGrid
              filtered={filtered}
              filter={filter}
              setFilter={setFilter}
              search={search}
              setSearch={setSearch}
              handleEdit={handleEdit}
            />
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
        </div>
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
