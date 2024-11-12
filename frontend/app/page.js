"use client";
import { useEffect, useState, useRef } from "react";
import { Footer, Navbar } from "../components";
import {
  About,
  Explore,
  Feedback,
  GetStarted,
  Hero,
  Insights,
  WhatsNew,
  World,
} from "../sections";
import Spline from "@splinetool/react-spline";

const ScrollIndicator = () => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-50">
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
      <p className="mt-4 text-white text-2xl text-center">
        Loading Experience...
      </p>
    </div>
  </div>
);

const Page = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const lastScrollTime = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const position = window.scrollY;
          setScrollPosition(position);

          lastScrollTime.current = position;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const onSplineLoad = (spline) => {
    setIsLoading(false);
  };
  return (
    <div className="bg-primary-black overflow-hidden">
      {isLoading && <Loading />}
      <div
        className="fixed top-0 left-0 w-screen h-screen z-10"
        style={{
          opacity: Math.max(0, 1 - scrollPosition / (window.innerHeight * 0.4)),
          transform: `scale(${
            1 + (scrollPosition / window.innerHeight) * 0.1
          }) translateZ(0)`,
          willChange: "transform, opacity",
          pointerEvents:
            scrollPosition > window.innerHeight / 2 ? "none" : "auto",
        }}
      >
        <Spline
          scene="https://prod.spline.design/A6geAl3g2ozafJjK/scene.splinecode"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            willChange: "transform",
          }}
          onLoad={onSplineLoad}
        />
        {!isLoading && scrollPosition < 100 && <ScrollIndicator />}
      </div>

      <div
        style={{
          transform: `translateY(${Math.max(
            0,
            -100 + scrollPosition / 2
          )}px) translateZ(0)`,
          opacity: Math.min(
            1,
            (scrollPosition - window.innerHeight * 0.3) /
              (window.innerHeight * 0.2)
          ),
          willChange: "transform, opacity",
        }}
        className="relative z-20 mt-[100vh] pb-[100vh]"
      >
        <Hero />
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
        <World />
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
