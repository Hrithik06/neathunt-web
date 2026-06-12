import StatCard from "@/components/ui/StatCard";
type StatCardsProps = {
  counts: Record<string, number>;
  responseRate: number;
};
const StatCards = ({ counts, responseRate }: StatCardsProps) => {
  const totalInterviews =
    (counts.INTERVIEW_COMPLETED ?? 0) + (counts.INTERVIEW_SCHEDULED ?? 0);

  const totalApplied =
    Object.values(counts).reduce((acc, curr) => acc + curr, 0) || 0;
  return (
    <div className="flex gap-3 mb-6 flex-wrap fade-up-1">
      <StatCard emoji="📨" label="Total Applied" value={totalApplied} isHero />
      <StatCard emoji="🎤" label="Interviews" value={totalInterviews} />
      <StatCard emoji="🎉" label="Offers" value={counts.OFFER || 0} />
      <StatCard emoji="📊" label="Response Rate" value={`${responseRate}%`} />
    </div>
  );
};

export default StatCards;
