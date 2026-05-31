type EmptyApplicationsStateProps = {
  onOpenModal: () => void;
};

export default function EmptyApplicationsState({
  onOpenModal,
}: EmptyApplicationsStateProps) {
  return (
    <section
      className="rounded-3xl border p-10 text-center fade-up-3"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="mb-4 text-5xl">📭</div>

      <h3
        className="mb-2 text-2xl font-black"
        style={{ color: "var(--heading)" }}
      >
        No applications yet
      </h3>

      <p
        className="mx-auto mb-6 max-w-md text-sm leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        Start tracking your job hunt by logging your first application. Watch
        your pipeline grow from application to offer.
      </p>

      <button
        onClick={onOpenModal}
        className="px-6 py-3 rounded-2xl font-extrabold transition-all duration-200 cta-btn"
        style={{
          background: "linear-gradient(135deg, var(--brand-coral), #ff9f6e)",
          color: "#fff",
          boxShadow: "0 8px 24px rgba(255,140,90,0.25)",
        }}
      >
        + Log First Application
      </button>

      <div
        className="mt-8 flex justify-center gap-6 text-sm flex-wrap"
        style={{ color: "var(--muted)" }}
      >
        <span>📬 Track applications</span>
        <span>🎤 Manage interviews</span>
        <span>🎉 Record offers</span>
      </div>
    </section>
  );
}
