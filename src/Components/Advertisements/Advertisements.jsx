import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slider1 from "../../assets/slider1.webp";
import slider2 from "../../assets/slider2.webp";
import slider3 from "../../assets/slider3.webp";
import { FaBullhorn } from "react-icons/fa";
const Advertisements = () => {
  return (
    <div className=" w-11/12 mx-auto ">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4 flex items-center justify-center gap-2">
          <FaBullhorn className="text-primary" />
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
          <div>
            <img className=" rounded-2xl" src={slider1} alt="" />
          </div>
          <div>
            <img className=" rounded-2xl" src={slider2} alt="" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Advertisements;
