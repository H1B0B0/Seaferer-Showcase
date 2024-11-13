"use client";
import { useEffect, useState, useRef } from "react";
import { Footer } from "../components";
import {
  About,
  Dashboard,
  Explore,
  Feedback,
  GetStarted,
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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const ScrollIndicator = () => (
  <div className="absolute bottom-8 left-0 right-0 mx-auto w-fit animate-bounce z-20">
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
  const splineRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onSplineLoad = (spline) => {
    splineRef.current = spline;
    setIsLoading(false);

    if (windowWidth < 768) {
      splineRef.current.zoom = 0.8;
    }
  };

  const splineOpacity = Math.max(0, 1 - scrollPosition / (windowHeight * 2));
  const contentOpacity = Math.min(1, scrollPosition / windowHeight);

  return (
    <div className="bg-primary-black overflow-hidden">
      {isLoading && <Loading />}
      <div
        className="fixed top-0 left-0 w-screen h-screen z-10"
        style={{
          opacity: splineOpacity,
          transition: "opacity 0.5s ease-out",
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
          }}
          onLoad={onSplineLoad}
        />
        {!isLoading && splineOpacity > 0 && <ScrollIndicator />}
      </div>

      <div
        className="relative z-20 mt-[200vh]"
        style={{
          opacity: contentOpacity,
          transition: "opacity 0.5s ease-in",
        }}
      >
        <div className="relative py-8 mt-[100vh]">
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
