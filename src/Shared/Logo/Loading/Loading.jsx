import { FaCarrot } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-green-700">
      <div className="w-12 h-12 border-2 border-primary rounded-full relative animate-spin">
        <span className="block w-[3px] h-6 bg-red-600 absolute left-1/2 top-0 transform -translate-x-1/2"></span>
      </div>
      <p className="text-xl font-semibold">Loading market data...</p>
      <span className="text-sm text-gray-500 mt-1">Please wait</span>
    </div>
  );
};

export default Loading;
