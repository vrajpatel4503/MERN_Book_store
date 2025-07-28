import React from "react";
import heroImage from "../../assets/hero.jpg";

const Hero = () => {
  return (
    <div className="relative h-[83.95vh] lg:h-[88.7vh] w-full">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      />

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex items-center px-4">
        <div className="lg:w-full  mx-auto flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-semibold text-amber-300">
            Your next great read is just a click away
          </h1>
          <p className="mt-4 text-[15px] lg:text-2xl text-white">
            Dive into stories that inspire, entertain, and enlighten. At
            BookBazaar,
            <p>
              we believe every book holds the power to change your world—one
              page at a time.
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
