import { FaCarrot } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-green-700">
      {/* Rotating vegetable icon */}
      <div className="animate-spin text-6xl mb-4">
        <FaCarrot className="text-accent" />
      </div>
      <p className="text-xl font-semibold">Loading market data...</p>
      <span className="text-sm text-gray-500 mt-1">Please wait</span>
    </div>
  );
};

export default Loading;
