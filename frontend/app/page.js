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
import { favicon_video_images } from "../constants";

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

const Page = () => {
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const splineRef = useRef(null);
  const lastScrollY = useRef(0);

  const Loading = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#181F54]">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-32 h-32">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 left-1/2 bg-white rounded-full"
              style={{
                width: `${8 + Math.random() * 8}px`,
                height: `${8 + Math.random() * 8}px`,
                animation: `loadingBubble 2s ease-in-out infinite ${i * 0.4}s`,
                opacity: 0,
                left: `${30 + Math.random() * 40}%`,
              }}
            />
          ))}
        </div>
        <div className="mt-4 text-white text-2xl text-center">
          Loading Experience...
        </div>
      </div>
    </div>
  );
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
  useEffect(() => {
    setTimeout(() => {
      let favicon_video_icon_tag = document.querySelector("link[rel='icon']");
      if (!favicon_video_icon_tag) {
        favicon_video_icon_tag = document.createElement("link");
        favicon_video_icon_tag.rel = "icon";
        favicon_video_icon_tag.type = "image/png";
        document.head.appendChild(favicon_video_icon_tag);
      }

      let favicon_video_image_counter = 0;

      async function favicon_video_to_data_url(url, callback) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();

          const reader = new FileReader();
          reader.onloadend = () => callback(reader.result);
          reader.readAsDataURL(blob);
        } catch (error) {
          console.error("Error loading favicon:", error);
        }
      }
      let favicon_video_loaded_images = [];
      favicon_video_images.map((url, idx) => {
        favicon_video_to_data_url(url, function (dataUrl) {
          favicon_video_loaded_images[idx] = dataUrl;
        });
      });
      setInterval(function () {
        if (favicon_video_loaded_images[favicon_video_image_counter]) {
          favicon_video_icon_tag.href = favicon_video_loaded_images[
            favicon_video_image_counter
          ].replace("application/octet-stream", "image/png");
        }
        if (
          favicon_video_image_counter ==
          favicon_video_loaded_images.length - 1
        )
          favicon_video_image_counter = 0;
        else favicon_video_image_counter++;
      }, 100);
    }, 2000);
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#181F54] via-[#0B0F2E] to-[#050716] overflow-hidden">
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
