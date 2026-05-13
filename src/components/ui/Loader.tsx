const Loader = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3 transition-opacity duration-300">
      <div className="text-lg font-black ">
        Neat<span className="text-orange-500">Hunt</span>
      </div>
      <div className="text-sm opacity-60">Loading your dashboard...</div>
    </div>
  );
};
export default Loader;
