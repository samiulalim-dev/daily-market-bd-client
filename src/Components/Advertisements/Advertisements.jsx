import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slider1 from "../../assets/slider1.webp";
import slider2 from "../../assets/slider2.webp";
import slider3 from "../../assets/slider3.webp";

const Advertisements = () => {
  return (
    <div className=" w-11/12 mx-auto ">
      <h1 className=" text-4xl font-bold pb-7">Advertisements</h1>
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
