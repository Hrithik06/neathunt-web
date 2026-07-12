import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Analytics() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  const intervalId = setInterval(() => {
    if (count > 0) {
      setCount(count - 1);
    } else setCount(0);
  }, 1000);
  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate("/dashboard");
    }, 5 * 1000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timerId);
    };
  }, []);
  return (
    <div className="flex flex-col gap-14 justify-center items-center min-h-screen text-6xl text-white">
      <div>Analytics coming soon... 🚧</div>
      <Link to={"/dashboard "}>
        <button className="p-4 bg-purple-500 rounded-xl">
          Dashboard {count}
        </button>
      </Link>
    </div>
  );
}
