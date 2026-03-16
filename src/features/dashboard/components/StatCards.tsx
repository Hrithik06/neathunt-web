import StatCard from "@/components/ui/StatCard";
import { JOBS } from "../data/jobs";
type Props = {
  counts: Record<string, number>;
  responseRate: number;
};
const StatCards = ({ counts, responseRate }: Props) => {
  return (
    <div className="flex gap-3 mb-6 flex-wrap fade-up-1">
      <StatCard emoji="📨" label="Total Applied" value={JOBS.length} isHero />
      <StatCard emoji="🎤" label="Interviews" value={counts.Interview || 0} />
      <StatCard emoji="🎉" label="Offers" value={counts.Offer || 0} />
      <StatCard emoji="📊" label="Response Rate" value={`${responseRate}%`} />
    </div>
  );
};

export default StatCards;
