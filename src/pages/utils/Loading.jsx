import { ClockLoader, HashLoader, RingLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center gap-5">
      <h2 className="text-8xl uppercase animate-pulse">L</h2>
      <ClockLoader color="#caeb66" size={100} loading={true}></ClockLoader>
      <h2 className="text-8xl uppercase animate-pulse delay-150">ading</h2>
    </div>
  );
};

export default Loading;
