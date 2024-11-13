"use client";
import { useEffect, useState, useRef } from "react";
import { Footer, Navbar } from "../components";
import {
  About,
  Dashboard,
  Explore,
  Feedback,
  GetStarted,
  Hero,
  Insights,
  WhatsNew,
  World,
} from "../sections";
import Spline from "@splinetool/react-spline";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    width: typeof window !== "undefined" ? window.innerWidth : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const ScrollIndicator = () => (
  <div className="absolute bottom-8 left-0 right-0 mx-auto w-fit animate-bounce z-50">
    <div className="flex flex-col items-center text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
      <span className="text-sm mt-2">Press ↓ or scroll</span>
      <span className="text-xs opacity-75">to continue</span>
    </div>
  </div>
);

const Loading = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-black">
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white mx-auto"></div>
      <div className="mt-4 text-white text-2xl text-center">
        Loading Experience...
      </div>
    </div>
  </div>
);

const Page = () => {
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [splineComplete, setSplineComplete] = useState(false);
  const splineRef = useRef(null);
  const lastScrollTime = useRef(0);
  const rafId = useRef(null);

  const [isMounted, setIsMounted] = useState(false);

  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function (...args) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const handleScroll = throttle(() => {
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          const position = window.scrollY;
          const scrollingUp = position < lastScrollTime.current;

          setScrollPosition(position);

          if (splineRef.current) {
            splineRef.current.emitEvent("scroll", {
              deltaY: position - lastScrollTime.current,
              normalized: (position / windowHeight) * 100,
            });
          }

          if (position / windowHeight > 0.5 !== splineComplete) {
            setSplineComplete(!splineComplete);
          }

          lastScrollTime.current = position;
          rafId.current = null;
        });
      }
    }, 16);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [windowHeight, splineComplete]);

  const onSplineLoad = (spline) => {
    splineRef.current = spline;
    setIsLoading(false);

    if (windowWidth < 768) {
      spline.setZoom(0.8);
    }
  };

  const splineOpacity = Math.max(0, 1 - scrollPosition / (windowHeight * 3));
  const splineScale =
    windowWidth < 768
      ? 1 + (scrollPosition / windowHeight) * 0.05
      : 1 + (scrollPosition / windowHeight) * 0.15;
  const splineBlur = Math.min(
    20,
    Math.max(0, ((scrollPosition - windowHeight) / windowHeight) * 5)
  );
  const contentOpacity = Math.min(
    1,
    Math.max(0, ((scrollPosition - windowHeight * 1.2) / windowHeight) * 1.2)
  );

  const contentTransform = Math.max(
    0,
    -50 + (scrollPosition / windowHeight) * 50
  );

  if (!isMounted) return null;

  return (
    <div className="bg-primary-black overflow-hidden">
      {isLoading && <Loading />}
      <div
        className="fixed top-0 left-0 w-screen h-screen z-10"
        style={{
          transform: `scale(${splineScale}) translate3d(0,0,0)`,
          opacity: splineOpacity,
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          perspective: 1000,
          transition: "transform 0.2s ease-out",
          visibility: scrollPosition > windowHeight * 3 ? "hidden" : "visible",
          filter: `blur(${splineBlur}px)`,
        }}
      >
        <Spline
          scene="https://prod.spline.design/A6geAl3g2ozafJjK/scene.splinecode"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            willChange: "transform",
            transform: "translate3d(0,0,0)",
          }}
          onLoad={onSplineLoad}
          width={windowWidth}
          height={windowHeight}
        />
        {!isLoading && !splineComplete && <ScrollIndicator />}
      </div>

      <div
        style={{
          transform: `translateY(${contentTransform}px) translateZ(0)`,
          opacity: contentOpacity,
          willChange: "transform, opacity",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className="relative z-20 mt-[150vh] mb-[50vh]"
      >
        <div className="relative py-8">
          <About />
          <div className="gradient-03 z-0" />
          <Explore />
        </div>

        <div className="relative py-8">
          <GetStarted />
          <div className="gradient-04 z-0" />
          <WhatsNew />
        </div>
        <div className="relative py-16">
          <Dashboard />
        </div>
        <div className="relative py-8">
          <World />
        </div>
        <div className="relative py-8">
          <Insights />
          <div className="gradient-04 z-0" />
          <Feedback />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
