import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="flex  items-center gap-1 justify-center">
      <img
        src="/logo.png"
        alt="DailyMarketBD"
        className=" h-12 w-12 md:h-15 md:w-15 object-contain"
      />
      <h1 className="text-xl md:text-2xl font-bold font-poppins text-primary hover:text-green-600 transition-all">
        DailyMarket
        <span className="text-secondary">BD</span>
      </h1>
    </Link>
  );
};

export default Logo;
