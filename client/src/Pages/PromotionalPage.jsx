import React, { useEffect, useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import img1 from "../Assets/promotional/1.png";
import img2 from "../Assets/promotional/2.png";
import img3 from "../Assets/promotional/3.png";
import img4 from "../Assets/promotional/4.png";
import { Footer } from "../Components";
import useWindowSize from "../utils/useWindowSize";

const promotionalImages = {
  img1,
  img2,
  img3,
  img4,
};

const PromotionalPage = () => {
  const { height, width } = useWindowSize();
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-16 snap-always snap-mandatory snap-y	h-screen w-full relative bg-black font-cabin">
      <div
        style={{ background: `url("${img1}") no-repeat fixed center/cover` }}
        className="snap-top h-full relative flex flex-col items-center justify-between"
      >
        <h2 className="relative md:right-12 text-gray-100 capitalize capitalize text-5xl md:text-6xl self-end pt-7 mr-4">
          Promotional
        </h2>
        <div
          style={{ backgroundColor: "rgba(0,0,0,.75)" }}
          className="w-full md:max-w-md relative md:absolute md:right-5 md:top-24 text-gray-100 text-left md:text-right p-8"
        >
          ColorWare's corporate division is designed with you in mind. We open new doors with our groundbreaking ability
          to offer your company a unique custom designed product for any occasion. By using multiple application
          techniques, we turn everyday items into breathtaking displays of advertising for your company.
          <br /> Contact branding@colorware.com to discuss the nearly limitless possibilities.
        </div>
        <ChevronDown
          className="text-6xl absolute top-1/3 right-4 md:top-2/3 md:right-36 md:mt-20 text-white animate-bounce"
          style={{ opacity: `${1 - offsetY}` }}
        />
      </div>

      <div
        style={{ background: `url("${img2}") no-repeat fixed center/cover` }}
        className="snap-top h-full relative md:flex md:flex-center md:justify-start md:gap-8 overflow-hidden"
      >
        <h2 className="w-full md:w-min relative top-4 left-8 z-10 md:top-8 pt-4 text-black text-left capitalize text-5xl md:text-6xl whitespace-nowrap">
          Cost Effective
        </h2>
        <div>
          <p
            style={{ backgroundColor: "rgba(250,250,250,.65)" }}
            className="h-min max-w-md relative md:-top-2 text-black p-8"
          >
            When cost and timeliness play a factor in creating promotional products for your company, we offer
            inexpensive ways to advertise. Single color logo application starts at $25. Shorter lead times than full
            customization. We can print directly to a variety of surfaces.
          </p>
        </div>
      </div>

      <div style={{ background: `url("${img3}") no-repeat fixed center/cover` }} className="snap-top h-full relative">
        <h2 className="relative w-full right-5 md:right-16 top-5 text-gray-100 text-right capitalize text-5xl md:text-6xl md:whitespace-nowrap">
          Custom Color Matching
        </h2>

        <div
          style={{ backgroundColor: "rgba(0,0,0,.75)" }}
          className="w-full md:max-w-md absolute bottom-0 md:left-0 md:bottom-1/3 text-gray-100 text-right p-8"
        >
          ColorWare understands the importance of building a brand, which is why we offer custom color matching. We can
          help you express the core of your company on a variety of products. We match paint colors to pantone numbers
          or physical samples like fabric, wood, or metal.
        </div>
      </div>

      <div
        style={{ background: `url("${img4}") no-repeat fixed center/cover` }}
        className="snap-top h-full relative flex flex-col items-center justify-center md:block"
      >
        <h2 className="relative top-2 pl-4 md:left-6 md:top-2/4 text-gray-100 capitalize text-5xl md:text-6xl whitespace-nowrap">
          custom Art
        </h2>
        <div
          style={{ backgroundColor: "rgba(0,0,0,.65)" }}
          className="w-full md:max-w-md absolute bottom-0 md:left-6 text-gray-100 text-left p-8"
        >
          ColorWare has the ability to create simple, one-color logos, or large, full-color artwork. So let us help you
          represent your company or team with the highest quality art application techniques. The art application
          process is completed in a temperature controlled clean room. with color corrected light bulbs and air
          filtration system.
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PromotionalPage;
