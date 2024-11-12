"use client";

import { motion } from "framer-motion";
import styles from "../styles";
import { newFeatures } from "../constants";
import { NewFeatures, TitleText, TypingText } from "../components";
import { staggerContainer, fadeIn } from "../utils/motion";

const Dashboard = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div
        variants={fadeIn("left", "tween", 0.2, 1)}
        className={`flex-1 ${styles.flexCenter}`}
      >
                <iframe src="https://lottie.host/embed/c6317966-19b6-48df-9723-6520b68e3ace/d8z7DNfoyT.json" width="100%" height="100%"></iframe>
      </motion.div>

      <motion.div
        variants={fadeIn("left", "tween", 0.2, 1)}
        className="flex-[0.95] flex justify-center flex-col text-white"
      >
        <TypingText title="| Dashboard" />
        <TitleText title={<>Manage your metrics in a glance</>} />
        <p className="mt-[48px] text-lg leading-relaxed">
          Manage your data easily with your personalized dashboard. Stay on top of your metrics with real-time updates and intuitive visualizations.
        </p>
        <br />
        <p> We use Grafana to provide you with the best experience in monitoring your data.</p>
      </motion.div>
    </motion.div>
  </section>
);

export default Dashboard;