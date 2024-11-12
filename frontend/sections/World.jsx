"use client";

import { motion } from "framer-motion";
import styles from "../styles";
import { TitleText, TypingText } from "../components";
import { staggerContainer, fadeIn } from "../utils/motion";

const World = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title="| Multiple Regions" textStyles="text-center" />
      <TitleText
        title={<>Deploy Your Infrastructure Across Multiple Regions</>}
        textStyles="text-center"
      />
      <p className="mt-4 text-center text-lg text-gray-300">
        Seamlessly deploy and manage your cloud infrastructure across various
        regions worldwide. Ensure high availability, low latency, and robust
        disaster recovery by leveraging our multi-region deployment
        capabilities.
      </p>

      <motion.div
        variants={fadeIn("up", "tween", 0.3, 1)}
        className="relative mt-[69px] flex w-full h-[550px]"
      >
        <img src="/map.png" alt="map" className="w-full h-full object-cover" />
        <div className="absolute top-[12%] left-[43%] w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]">
          <img
            src="/world-infra.png"
            alt="people"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="absolute top-[32%] left-[62%] w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]">
          <img
            src="/world-infra.png"
            alt="people"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="absolute sm:top-10 bottom-40 left-20 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]">
          <img
            src="/world-infra.png"
            alt="people"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="hidden lg:block absolute bottom-20 right-20 w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]">
          <img
            src="/world-infra.png"
            alt="people"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="hidden lg:block absolute bottom-[20%] left-[15%] w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]">
          <img
            src="/world-infra.png"
            alt="people"
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="absolute top-0 right-[22%] w-[70px] h-[70px] p-[6px] rounded-full bg-[#5d6680]">
          <img
            src="/world-infra.png"
            alt="people"
            className="w-full h-full rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default World;
