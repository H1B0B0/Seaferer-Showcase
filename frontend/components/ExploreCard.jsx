"use client";

import { motion } from "framer-motion";
import styles from "../styles";
import { fadeIn } from "../utils/motion";

const ExploreCard = ({ id, imgUrl, title, index, active, handleClick }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className={`relative ${
      active === id ? "lg:flex-[3.5] flex-[10]" : "lg:flex-[0.5] flex-[2]"
    } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
    onClick={() => handleClick(id)}
  >
    <img
      src={imgUrl}
      alt={title}
      className="absolute w-full h-full object-cover rounded-[24px]"
    />

    {active !== id ? (
      <h3
        className="font-semibold 
        text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[26px]
        w-full text-white absolute bottom-0 
        bg-[rgba(0,0,0,0.7)] z-10 
        rounded-b-[24px] 
        py-2 sm:py-3 md:py-4 
        px-3 sm:px-4 md:px-6
        text-center
        truncate
        overflow-hidden
        whitespace-nowrap"
      >
        {title}
      </h3>
    ) : (
      <div className="absolute bottom-0 p-8 justify-start w-full flex-col bg-[rgba(0,0,0,0.7)] rounded-b-[24px]">
        <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white truncate">
          {title}
        </h2>
      </div>
    )}
  </motion.div>
);

export default ExploreCard;
