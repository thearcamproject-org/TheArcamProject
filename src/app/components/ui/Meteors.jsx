"use client";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

export const Meteors = ({ number, className }) => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const meteorStyles = new Array(number || 20).fill(true).map(() => ({
      left: Math.floor(Math.random() * 100) + "%",
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
    }));
    setMeteors(meteorStyles);
  }, [number]);

  return (
    <>
      {meteors.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={clsx(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-[#E7B366] shadow-[0_0_0_1px_#E7B36610] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#E7B366]/40 before:to-transparent",
            className
          )}
          style={{ ...style, top: -5 }}
        ></span>
      ))}
    </>
  );
};
