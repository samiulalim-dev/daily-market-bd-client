import { Link } from "react-router";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center justify-center sm:gap-2 sm:p-2 relative group"
    >
      {/* Logo Image */}
      <img
        src="/logo1.png"
        alt="DailyMarketBD"
        className="h-10 w-10 md:h-16 md:w-16 object-contain transition-transform duration-300 group-hover:scale-110"
      />

      {/* Text */}
      <div className="flex flex-col items-start">
        <h1 className="text-md md:text-[27px] font-bold font-poppins leading-none">
          <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent transition-all duration-300 group-hover:from-green-500 group-hover:via-emerald-500 group-hover:to-green-600">
            DailyMarket
          </span>
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-orange-400 group-hover:to-red-400 sm:ml-1">
            BD
          </span>
        </h1>
        <div className="h-1 w-0 bg-gradient-to-r from-green-500 to-orange-500 group-hover:w-full transition-all duration-500 mt-1"></div>
      </div>
    </Link>
  );
};

export default Logo;
