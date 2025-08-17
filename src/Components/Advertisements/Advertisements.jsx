import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaBullhorn } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios/useAxios";
import Loading from "../../Shared/Logo/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
const Advertisements = () => {
  const axiosInstance = useAxios();
  // console.log(ads);
  const {
    data: ads = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["approved-ads"],
    queryFn: async () => {
      const res = await axiosInstance.get("/approved/advertisements");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div className=" w-11/12 mx-auto ">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-4 flex items-center justify-center gap-2">
          <FaBullhorn className="text-green-700" />
          Advertisements
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Check out the latest deals and promotional offers from your nearby
          vendors and markets.
        </p>
      </div>
      <div>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          interval={3000}
          swipeable={false}
          emulateTouch={false}
          stopOnHover={false}
        >
          {ads.map((ad) => {
            return (
              <div
                key={ad._id}
                className="relative h-72 md:h-96 rounded-2xl overflow-hidden"
              >
                <img
                  className="w-full h-full object-cover"
                  src={ad.image}
                  alt={ad.title}
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white px-4 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {ad.title}
                  </h3>
                  <p className="text-base md:text-lg">{ad.description}</p>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Advertisements;
