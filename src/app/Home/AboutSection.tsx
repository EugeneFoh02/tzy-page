"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "About1",
    id: "about1",
    content: (
      <ul className="list-disc pl-2">
        <li>1</li>
        <li>2</li>
      </ul>
    ),
  },
  {
    title: "About2",
    id: "about2",
    content: (
      <ul className="list-disc pl-2">
        <li>1</li>
        <li>2</li>
      </ul>
    ),
  },
  {
    title: "About3",
    id: "about3",
    content: (
      <ul className="list-disc pl-2">
        <li>1</li>
        <li>2</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("about1");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: React.SetStateAction<string>) => {
    startTransition(() => setTab(id));
  };

  return (
    <section id="about" className="text-black scroll-mt-16">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/about.jpg"
          alt="about-image"
          width={500}
          height={500}
        />
        <div className="mt-8 md:mt-0  text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-black mb-4">About Us</h2>
          <p className="text-base lg:text-lg">We are ...</p>
          <div className="flex flex-row mt-4">
            <TabButton
              selectTab={() => handleTabChange("about1")}
              active={tab === "about1"}
            >
              {" "}
              About 1{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("about2")}
              active={tab === "about2"}
            >
              {" "}
              About 2{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("about3")}
              active={tab === "about3"}
            >
              {" "}
              About 3{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((Tab) => Tab.id === tab)?.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
