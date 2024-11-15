const defaultTransition = {
  type: "tween",
  duration: 0.3,
  ease: "easeOut",
};

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof window !== "undefined" ? window.navigator.userAgent : ""
  );
};

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getOptimizedTransition = (transition = defaultTransition) => {
  if (prefersReducedMotion) {
    return { duration: 0.1 };
  }

  if (isMobile()) {
    return {
      ...transition,
      duration: 0.2,
      delay: 0,
      ease: "easeOut",
      type: "tween",
    };
  }

  return transition;
};

const getMobileVariants = (desktopVariants) => {
  if (!isMobile()) return desktopVariants;

  return {
    hidden: {
      opacity: 0,
      transition: getOptimizedTransition(),
    },
    show: {
      opacity: 1,
      transition: getOptimizedTransition(),
    },
  };
};

export const navVariants = getMobileVariants({
  hidden: {
    opacity: 0,
    y: -50,
    transition: defaultTransition,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
});

export const slideIn = (direction, type, delay, duration) => {
  const variants = {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
      opacity: 0,
      transition: defaultTransition,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        ...defaultTransition,
        delay,
        duration,
      },
    },
  };

  return getMobileVariants(variants);
};

export const staggerContainer = () => ({
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: defaultTransition,
  },
});

export const textVariant = (delay) => {
  const variants = {
    hidden: {
      y: 50,
      opacity: 0,
      transition: defaultTransition,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        ...defaultTransition,
        delay,
      },
    },
  };

  return getMobileVariants(variants);
};

export const textContainer = {
  hidden: {
    opacity: 0,
    transition: defaultTransition,
  },
  show: (i = 1) => ({
    opacity: 1,
    transition: {
      ...defaultTransition,
      staggerChildren: 0.1,
      delayChildren: i * 0.1,
    },
  }),
};

export const textVariant2 = getMobileVariants({
  hidden: {
    opacity: 0,
    y: 20,
    transition: defaultTransition,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
});

export const fadeIn = (direction, type, delay, duration) => {
  const variants = {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
      transition: defaultTransition,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        ...defaultTransition,
        delay,
        duration,
      },
    },
  };

  return getMobileVariants(variants);
};

export const planetVariants = (direction) => {
  const variants = {
    hidden: {
      x: direction === "left" ? "-300%" : "300%",
      rotate: 120,
      opacity: 0,
      transition: defaultTransition,
    },
    show: {
      x: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        ...defaultTransition,
        duration: 1.8,
        delay: 0.5,
      },
    },
  };

  return getMobileVariants(variants);
};

export const zoomIn = (delay, duration) => {
  const variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition: defaultTransition,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        ...defaultTransition,
        delay,
        duration,
      },
    },
  };

  return getMobileVariants(variants);
};

export const footerVariants = getMobileVariants({
  hidden: {
    opacity: 0,
    y: 50,
    transition: defaultTransition,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ...defaultTransition,
      delay: 0.5,
    },
  },
});
