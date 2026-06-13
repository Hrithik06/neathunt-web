import { BRAND } from "@/constants/brand";
type TrophyCardProps = {
  counts: Record<string, number>;
  responseRate: number;
};
const TrophyCard = ({ counts, responseRate }: TrophyCardProps) => {
  return (
    <div
      className="w-full sm:w-48 shrink-0 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden offer-glow "
      style={{ background: "linear-gradient(135deg,#1E2D5F,#2D3F7A)" }}
    >
      <div
        className="absolute -top-5 -right-5 w-20 h-20 rounded-full opacity-10"
        style={{ background: BRAND.gold }}
      />
      <div>
        <div className="text-3xl mb-2">🏆</div>
        <div className="text-white font-black text-sm leading-snug">
          {responseRate}% response rate!
        </div>
        {/*<div className="text-xs font-bold mt-2" style={{ color: BRAND.gold }}>
          Industry avg is ~12%.
          <br />
          You're ahead. 🔥
        </div>*/}
      </div>
      <div
        className="mt-4 rounded-xl px-3 py-2"
        style={{ background: "rgba(255,201,71,0.15)" }}
      >
        <div className="text-xs font-black" style={{ color: BRAND.gold }}>
          🎤 {counts.INTERVIEW_SCHEDULED || 0} interview
          {(counts.INTERVIEW_SCHEDULED || 0) !== 1 ? "s" : ""} lined up!
        </div>
      </div>
    </div>
  );
};

export default TrophyCard;
