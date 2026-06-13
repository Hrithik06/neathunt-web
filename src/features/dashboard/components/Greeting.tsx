import { useGreeting } from "@/hooks/useGreeting";

type GreetingProps = {
  headingColor?: string;
  subTextColor?: string;
};

export default function Greeting({
  headingColor = "var(--heading)",
  subTextColor = "var(--muted)",
}: GreetingProps) {
  const { firstName, greeting, emoji, subText } = useGreeting();

  return (
    <>
      <h1
        className="text-2xl font-black tracking-tight"
        style={{ color: headingColor }}
      >
        {greeting} {emoji}, {firstName}
      </h1>

      <p className="text-sm font-semibold mt-1" style={{ color: subTextColor }}>
        {subText}
      </p>
    </>
  );
}
