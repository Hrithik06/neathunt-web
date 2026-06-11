import { BRAND } from "@/constants/brand";
const pieces = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  color: [BRAND.gold, BRAND.coral, BRAND.mint, BRAND.lavender][i % 4],
  delay: Math.random() * 0.8,
  size: 5 + Math.random() * 5,
}));
// ── Confetti — no theme dependency ───────────────────────────────
const Confetti = () => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <style>{`@keyframes confettiFall { 0%{transform:translateY(-10px) rotate(0deg);opacity:1} 100%{transform:translateY(110px) rotate(360deg);opacity:0} }`}</style>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animation: `confettiFall 2s ease-in ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};
export default Confetti;
