"use client";

import { motion } from "framer-motion";
import { TypingText } from "../components";
import styles from "../styles";
import { fadeIn, staggerContainer } from "../utils/motion";

const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About Seaferer" textStyles="text-center" />

      <motion.p
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        <p>
          <span className="font-extrabold">Seaferer</span> offers a
          groundbreaking approach to infrastructure setup by providing a fully
          automated, user-friendly interface. This solution revolutionizes the
          traditionally complex and labor-intensive DevOps tasks by making
          deployment accessible, intuitive, and efficient.
        </p>

        <p>
          Through advanced integration of{" "}
          <span className="font-semibold">Docker</span> and{" "}
          <span className="font-semibold">Kubernetes </span>
          technologies, Seaferer replaces much of the manual DevOps intervention
          with an intuitive UI that allows for rapid and reliable infrastructure
          setup. This approach removes the need for deep DevOps knowledge,
          making it ideal for teams and individuals who want to manage their
          environments with minimal complexity.
        </p>

        <p>
          With Seaferer, users can seamlessly{" "}
          <span className="font-semibold">deploy, manage, and scale</span>{" "}
          infrastructure, ensuring high levels of{" "}
          <span className="font-semibold">consistency, reliability,</span> and{" "}
          <span className="font-semibold">speed </span>
          in deployment processes. This solution empowers teams to take control
          of their environments effortlessly, enhancing operational efficiency
          and flexibility across all stages of infrastructure management.
        </p>
      </motion.p>

      <motion.img
        variants={fadeIn("up", "tween", 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow-down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
