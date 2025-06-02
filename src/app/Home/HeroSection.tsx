import React from "react";
import Image from "next/image";
import Animation from "./Animation";

const HeroSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-8 place-self-center text-center sm:text-left justify-self-start">
          <h1 className="text-black mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Hello, We are{" "}
            </span>
            <br></br>
            <Animation />
          </h1>
          <p className="text-[#ADB7BE] text-lg mb-6 lg:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            pharetra elementum leo, egestas volutpat velit sollicitudin quis.
          </p>
        </div>
        <div className="col-span-4 place-self-center mt-4 lg:mt-0">
          <div className="rounded-full bg-white w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] relative">
            <Image
              src="/images/logo.png"
              alt="hero image"
              fill
              className="object-contain rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
