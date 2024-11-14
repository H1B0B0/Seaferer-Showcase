const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof window !== "undefined" ? window.navigator.userAgent : ""
  );
};

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getOptimizedTransition = (transition) => {
  if (prefersReducedMotion) {
    return { duration: 0.1 };
  }
  return isMobile()
    ? {
        ...transition,
        duration: transition.duration ? transition.duration * 0.6 : undefined,
        stiffness: transition.stiffness
          ? transition.stiffness * 0.7
          : undefined,
        delay: transition.delay ? transition.delay * 0.5 : undefined,
      }
    : transition;
};

export const navVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    transition: getOptimizedTransition({
      type: "spring",
      stiffness: 300,
      damping: 140,
    }),
  },
  show: {
    opacity: 1,
    y: 0,
    transition: getOptimizedTransition({
      type: "spring",
      stiffness: 80,
      delay: 0.2,
    }),
  },
};

export const slideIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: getOptimizedTransition({
      type,
      delay,
      duration,
      ease: "easeOut",
    }),
  },
});

export const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: {
    transition: getOptimizedTransition({
      staggerChildren,
      delayChildren,
    }),
  },
});

export const textVariant = (delay) => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: getOptimizedTransition({
      type: "spring",
      duration: 1.25,
      delay,
    }),
  },
});

export const textContainer = {
  hidden: {
    opacity: 0,
  },
  show: (i = 1) => ({
    opacity: 1,
    transition: getOptimizedTransition({
      staggerChildren: 0.1,
      delayChildren: i * 0.1,
    }),
  }),
};

export const textVariant2 = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: getOptimizedTransition({
      type: "tween",
      ease: "easeIn",
    }),
  },
};

export const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: getOptimizedTransition({
      type,
      delay,
      duration,
      ease: "easeOut",
    }),
  },
});

export const planetVariants = (direction) => ({
  hidden: {
    x: direction === "left" ? "-300%" : "300%",
    rotate: isMobile() ? 60 : 120,
  },
  show: {
    x: 0,
    rotate: 0,
    transition: getOptimizedTransition({
      type: "spring",
      duration: 1.8,
      delay: 0.5,
    }),
  },
});

export const zoomIn = (delay, duration) => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: getOptimizedTransition({
      type: "tween",
      delay,
      duration,
      ease: "easeOut",
    }),
  },
});

export const footerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: getOptimizedTransition({
      type: "spring",
      stiffness: 300,
      damping: 140,
    }),
  },
  show: {
    opacity: 1,
    y: 0,
    transition: getOptimizedTransition({
      type: "spring",
      stiffness: 80,
      delay: 0.5,
    }),
  },
};
