import React from "react";

import LatestMarketProduct from "../../Components/LatestMarketProduct/LatestMarketProduct";
import Banner from "../../Components/Banner/Banner";
import Advertisements from "../../Components/Advertisements/Advertisements";
import UpcomingMarketDays from "../../Components/UpcomingMarketDays/UpcomingMarketDays";

const Home = () => {
  return (
    <div className="bg-base-200">
      {/* banner */}
      <div>
        <Banner></Banner>
      </div>
      {/* latest market product */}
      <div className="w-11/12 mx-auto">
        <LatestMarketProduct></LatestMarketProduct>
      </div>
      {/* advertisements */}
      <div>
        <Advertisements></Advertisements>
      </div>
      {/* upcoming market days */}
      <div>
        <UpcomingMarketDays></UpcomingMarketDays>
      </div>
    </div>
  );
};

export default Home;
