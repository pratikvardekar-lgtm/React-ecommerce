import React, { useEffect } from "react";
import Slider from "react-slick";
import { getData } from "../context/DataContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category from "./Category.jsx";
import { Link } from "react-router-dom";

const Carousel = () => {
  const { data, fetchAllProducts } = getData();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // ✅ CUSTOM ARROWS
  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute right-6 top-1/2 -translate-y-1/2 z-10
      w-10 h-10 rounded-full bg-red-500 flex items-center justify-center
      cursor-pointer hover:bg-red-600"
    >
      ❯
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute left-6 top-1/2 -translate-y-1/2 z-10
      w-10 h-10 rounded-full bg-red-500 flex items-center justify-center
      cursor-pointer hover:bg-red-600"
    >
      ❮
    </div>
  );

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2500,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    // ✅ HIDE ARROWS ON MOBILE PROPERLY
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="mt-10">
      <Slider {...settings}>
        {data?.slice(0, 7)?.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 py-10"
          >
            <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 min-h-[440px]">

              {/* TEXT */}
              <div className="space-y-4 text-center md:text-left max-w-xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {item.title}
                </h1>

                <h2 className="text-xl md:text-3xl font-bold text-yellow-300">
                  ₹ {item.price}
                </h2>

                <p className="text-gray-300 text-sm sm:text-base">
                  {item.description}
                </p>

                <Link to="/products">
                  <button className="bg-purple-500 hover:bg-purple-600 transition text-white px-6 py-2 rounded-md">
                    Shop Now
                  </button>
                </Link>
              </div>

              {/* IMAGE */}
              <img
                src={item.image}
                alt="/product/${item.id}"
                className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] object-contain"
              />
            </div>
          </div>
        ))}
      </Slider>

      <Category />
    </div>
  );
};

export default Carousel;
