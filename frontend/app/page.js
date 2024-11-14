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

const Page = () => {
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const splineRef = useRef(null);
  const lastScrollY = useRef(0);

  const Loading = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-black">
      <div className="flex flex-col items-center justify-center">
        <svg
          className="animate-spin h-24 w-24 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M12 2a10 10 0 00-1 19.95V22a1 1 0 001-1v-1.05A10 10 0 0012 2z"
          ></path>
        </svg>
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
      let favicon_video_images = [
        "https://favicongenerator.s3.amazonaws.com/e2d601855f281.png",
        "https://favicongenerator.s3.amazonaws.com/0a8e362c520cf.png",
        "https://favicongenerator.s3.amazonaws.com/833ef6d6cd6aa.png",
        "https://favicongenerator.s3.amazonaws.com/321ea9775c5ae.png",
        "https://favicongenerator.s3.amazonaws.com/08798572b3049.png",
        "https://favicongenerator.s3.amazonaws.com/e73823babe251.png",
        "https://favicongenerator.s3.amazonaws.com/39b711aded81f.png",
        "https://favicongenerator.s3.amazonaws.com/8008fabd0f4fc.png",
        "https://favicongenerator.s3.amazonaws.com/8d3ef4690287.png",
        "https://favicongenerator.s3.amazonaws.com/c79e699550c3f.png",
        "https://favicongenerator.s3.amazonaws.com/1fa4f0aa08906.png",
        "https://favicongenerator.s3.amazonaws.com/1e7bcb8c827d5.png",
        "https://favicongenerator.s3.amazonaws.com/c0388783cf789.png",
        "https://favicongenerator.s3.amazonaws.com/814476be0eab4.png",
        "https://favicongenerator.s3.amazonaws.com/72ae9e67a49f8.png",
        "https://favicongenerator.s3.amazonaws.com/b6d5548a7f8b7.png",
        "https://favicongenerator.s3.amazonaws.com/7a73b77c103f.png",
        "https://favicongenerator.s3.amazonaws.com/0d418783ce047.png",
        "https://favicongenerator.s3.amazonaws.com/d05cff4edde85.png",
        "https://favicongenerator.s3.amazonaws.com/ea5ee26e87e83.png",
        "https://favicongenerator.s3.amazonaws.com/71951a972e351.png",
        "https://favicongenerator.s3.amazonaws.com/fa84f8c29e9b8.png",
        "https://favicongenerator.s3.amazonaws.com/29a0d74562e14.png",
        "https://favicongenerator.s3.amazonaws.com/ec55e67ee340c.png",
        "https://favicongenerator.s3.amazonaws.com/7b5b017d5ca5.png",
        "https://favicongenerator.s3.amazonaws.com/f93318dc7b688.png",
        "https://favicongenerator.s3.amazonaws.com/527577a03a5e1.png",
        "https://favicongenerator.s3.amazonaws.com/6a187d82bc8e9.png",
        "https://favicongenerator.s3.amazonaws.com/177a725e2ec8a.png",
        "https://favicongenerator.s3.amazonaws.com/6acb462f52ee8.png",
        "https://favicongenerator.s3.amazonaws.com/a445ddb3e9ae.png",
        "https://favicongenerator.s3.amazonaws.com/1581dbb61e4e8.png",
        "https://favicongenerator.s3.amazonaws.com/0ed12d7e2ae73.png",
        "https://favicongenerator.s3.amazonaws.com/6eca92eb34d31.png",
        "https://favicongenerator.s3.amazonaws.com/e85aa71082512.png",
        "https://favicongenerator.s3.amazonaws.com/0da84116706f3.png",
        "https://favicongenerator.s3.amazonaws.com/96b7bce68a503.png",
        "https://favicongenerator.s3.amazonaws.com/eb16cee012fd7.png",
        "https://favicongenerator.s3.amazonaws.com/2ad278aee6688.png",
        "https://favicongenerator.s3.amazonaws.com/a1143ac1a1d8c.png",
        "https://favicongenerator.s3.amazonaws.com/673af1d9f9ecf.png",
        "https://favicongenerator.s3.amazonaws.com/05b929872f032.png",
        "https://favicongenerator.s3.amazonaws.com/4a58fc51b62a9.png",
        "https://favicongenerator.s3.amazonaws.com/614bf45d540cd.png",
        "https://favicongenerator.s3.amazonaws.com/94b7d77f4995c.png",
        "https://favicongenerator.s3.amazonaws.com/18fe51da04104.png",
        "https://favicongenerator.s3.amazonaws.com/40dd699929523.png",
        "https://favicongenerator.s3.amazonaws.com/2c2f48e818b95.png",
        "https://favicongenerator.s3.amazonaws.com/dfc58b666f38c.png",
        "https://favicongenerator.s3.amazonaws.com/9f7218d931452.png",
        "https://favicongenerator.s3.amazonaws.com/3fb07efe0f9a7.png",
        "https://favicongenerator.s3.amazonaws.com/86a5844ccf64.png",
        "https://favicongenerator.s3.amazonaws.com/5a7f6fc6d593b.png",
        "https://favicongenerator.s3.amazonaws.com/0d9a6fa281d4a.png",
        "https://favicongenerator.s3.amazonaws.com/15e8e0841b962.png",
        "https://favicongenerator.s3.amazonaws.com/682078e0a5f7f.png",
        "https://favicongenerator.s3.amazonaws.com/97ca7fd405b29.png",
        "https://favicongenerator.s3.amazonaws.com/a73a2cb1a0a8a.png",
        "https://favicongenerator.s3.amazonaws.com/659b4eaad60b3.png",
        "https://favicongenerator.s3.amazonaws.com/36d4afe8eb597.png",
        "https://favicongenerator.s3.amazonaws.com/46078e2a908d8.png",
        "https://favicongenerator.s3.amazonaws.com/3ddf2c9a186a4.png",
        "https://favicongenerator.s3.amazonaws.com/9cf8ddce40853.png",
        "https://favicongenerator.s3.amazonaws.com/e62528be8d42f.png",
        "https://favicongenerator.s3.amazonaws.com/3f137286506f4.png",
        "https://favicongenerator.s3.amazonaws.com/4896252340271.png",
        "https://favicongenerator.s3.amazonaws.com/b9ddd19cb17bd.png",
        "https://favicongenerator.s3.amazonaws.com/499ed571aab28.png",
        "https://favicongenerator.s3.amazonaws.com/4616b56cab936.png",
        "https://favicongenerator.s3.amazonaws.com/d035d3bf7b68e.png",
        "https://favicongenerator.s3.amazonaws.com/7d4d57d6dcf44.png",
        "https://favicongenerator.s3.amazonaws.com/cd4384c076ac1.png",
        "https://favicongenerator.s3.amazonaws.com/2f8d1f3f07283.png",
        "https://favicongenerator.s3.amazonaws.com/2f95af9ab68a1.png",
        "https://favicongenerator.s3.amazonaws.com/63523cc69518c.png",
        "https://favicongenerator.s3.amazonaws.com/406db219540e7.png",
        "https://favicongenerator.s3.amazonaws.com/056a764cabd23.png",
        "https://favicongenerator.s3.amazonaws.com/b1c0f3e98e2a7.png",
        "https://favicongenerator.s3.amazonaws.com/f2594a8de72aa.png",
        "https://favicongenerator.s3.amazonaws.com/10bfd4a64c986.png",
        "https://favicongenerator.s3.amazonaws.com/29579b9762e99.png",
        "https://favicongenerator.s3.amazonaws.com/f18e2b90ccf0b.png",
        "https://favicongenerator.s3.amazonaws.com/e4340079dbb85.png",
        "https://favicongenerator.s3.amazonaws.com/0d484631e4ce7.png",
        "https://favicongenerator.s3.amazonaws.com/d750fc7c599d1.png",
        "https://favicongenerator.s3.amazonaws.com/fd673c4effd67.png",
        "https://favicongenerator.s3.amazonaws.com/7e9b12a9598f7.png",
        "https://favicongenerator.s3.amazonaws.com/ae49605b6a1eb.png",
        "https://favicongenerator.s3.amazonaws.com/e9a81272f4118.png",
        "https://favicongenerator.s3.amazonaws.com/357dece5397a.png",
        "https://favicongenerator.s3.amazonaws.com/83f8a4be5a689.png",
        "https://favicongenerator.s3.amazonaws.com/e74cc0a393a73.png",
        "https://favicongenerator.s3.amazonaws.com/7dee3632b4c09.png",
        "https://favicongenerator.s3.amazonaws.com/1d28f90f1485a.png",
        "https://favicongenerator.s3.amazonaws.com/200fd4819257b.png",
        "https://favicongenerator.s3.amazonaws.com/d82ce5ca17adb.png",
        "https://favicongenerator.s3.amazonaws.com/141ef7d87b756.png",
        "https://favicongenerator.s3.amazonaws.com/491d050a5ee2.png",
        "https://favicongenerator.s3.amazonaws.com/c4d0e733a676e.png",
        "https://favicongenerator.s3.amazonaws.com/713149f9f9da2.png",
        "https://favicongenerator.s3.amazonaws.com/d6d1c2c6606dc.png",
        "https://favicongenerator.s3.amazonaws.com/452605c58dba7.png",
        "https://favicongenerator.s3.amazonaws.com/78d85fd65fa27.png",
        "https://favicongenerator.s3.amazonaws.com/e14e3fb960f69.png",
        "https://favicongenerator.s3.amazonaws.com/9922e60169953.png",
        "https://favicongenerator.s3.amazonaws.com/2158e2b2680e3.png",
        "https://favicongenerator.s3.amazonaws.com/dcb928c986e09.png",
        "https://favicongenerator.s3.amazonaws.com/06f8c9f632fa9.png",
        "https://favicongenerator.s3.amazonaws.com/112adf96d6a71.png",
        "https://favicongenerator.s3.amazonaws.com/fd738bd5432cb.png",
        "https://favicongenerator.s3.amazonaws.com/9a55c2ec19c17.png",
        "https://favicongenerator.s3.amazonaws.com/e394970965db.png",
        "https://favicongenerator.s3.amazonaws.com/ae9eb9aebfa12.png",
        "https://favicongenerator.s3.amazonaws.com/7765a074df50f.png",
        "https://favicongenerator.s3.amazonaws.com/74cdf75a6d04c.png",
        "https://favicongenerator.s3.amazonaws.com/fe74bbfbb9da3.png",
        "https://favicongenerator.s3.amazonaws.com/33f8c17283916.png",
        "https://favicongenerator.s3.amazonaws.com/5424f13351dae.png",
        "https://favicongenerator.s3.amazonaws.com/12bb96eacf2aa.png",
        "https://favicongenerator.s3.amazonaws.com/23762acbd2dcb.png",
        "https://favicongenerator.s3.amazonaws.com/9c10695bbb9b2.png",
        "https://favicongenerator.s3.amazonaws.com/427373fa2adff.png",
        "https://favicongenerator.s3.amazonaws.com/020159b8c4587.png",
        "https://favicongenerator.s3.amazonaws.com/682b7c50b2ec5.png",
        "https://favicongenerator.s3.amazonaws.com/3bcd1ca3ce188.png",
        "https://favicongenerator.s3.amazonaws.com/fc58135f7cb4a.png",
        "https://favicongenerator.s3.amazonaws.com/de08ba333bac7.png",
        "https://favicongenerator.s3.amazonaws.com/2f1a0bafef7d.png",
        "https://favicongenerator.s3.amazonaws.com/3190edc28f196.png",
        "https://favicongenerator.s3.amazonaws.com/c5778fb7facd2.png",
        "https://favicongenerator.s3.amazonaws.com/f3ee8e0e132c7.png",
        "https://favicongenerator.s3.amazonaws.com/d44dc9c5a9a61.png",
        "https://favicongenerator.s3.amazonaws.com/d6c523e2ccef9.png",
        "https://favicongenerator.s3.amazonaws.com/233d7e436b2a2.png",
        "https://favicongenerator.s3.amazonaws.com/7817ff1bdfb09.png",
        "https://favicongenerator.s3.amazonaws.com/12326a92318c8.png",
        "https://favicongenerator.s3.amazonaws.com/7d3bd42e3ce96.png",
        "https://favicongenerator.s3.amazonaws.com/36e5c8b3d8832.png",
        "https://favicongenerator.s3.amazonaws.com/059f6a9c82a7c.png",
        "https://favicongenerator.s3.amazonaws.com/04ca206f6137f.png",
        "https://favicongenerator.s3.amazonaws.com/2afed05757341.png",
        "https://favicongenerator.s3.amazonaws.com/59e9f6efba238.png",
        "https://favicongenerator.s3.amazonaws.com/c84e6376b2f8a.png",
        "https://favicongenerator.s3.amazonaws.com/ce7ce2bfb67f8.png",
        "https://favicongenerator.s3.amazonaws.com/ed09a5d6764e6.png",
        "https://favicongenerator.s3.amazonaws.com/765480aa43ac8.png",
        "https://favicongenerator.s3.amazonaws.com/af04ba68b3a54.png",
        "https://favicongenerator.s3.amazonaws.com/0ef055af4007d.png",
        "https://favicongenerator.s3.amazonaws.com/02f32b460f28f.png",
        "https://favicongenerator.s3.amazonaws.com/0e94f0052f11d.png",
        "https://favicongenerator.s3.amazonaws.com/9248833c5ebc9.png",
        "https://favicongenerator.s3.amazonaws.com/386b27496e347.png",
        "https://favicongenerator.s3.amazonaws.com/0b51cb42e4745.png",
        "https://favicongenerator.s3.amazonaws.com/c0cb09e7e3f8e.png",
        "https://favicongenerator.s3.amazonaws.com/d8f35626d3e2f.png",
        "https://favicongenerator.s3.amazonaws.com/6dd98eebc3ba.png",
        "https://favicongenerator.s3.amazonaws.com/21cf8f29ca1ad.png",
        "https://favicongenerator.s3.amazonaws.com/460ff61433a3a.png",
        "https://favicongenerator.s3.amazonaws.com/b4931ba6a6a2d.png",
        "https://favicongenerator.s3.amazonaws.com/40af0364672f6.png",
        "https://favicongenerator.s3.amazonaws.com/50c07749f82b.png",
        "https://favicongenerator.s3.amazonaws.com/b9847353d61eb.png",
        "https://favicongenerator.s3.amazonaws.com/35dcc1b931625.png",
        "https://favicongenerator.s3.amazonaws.com/b63b6074c7297.png",
        "https://favicongenerator.s3.amazonaws.com/34492d6f5d9af.png",
        "https://favicongenerator.s3.amazonaws.com/53617ba226ef1.png",
        "https://favicongenerator.s3.amazonaws.com/b14de3accb0dc.png",
        "https://favicongenerator.s3.amazonaws.com/6dbc291f21805.png",
        "https://favicongenerator.s3.amazonaws.com/4a8d132cf96ff.png",
        "https://favicongenerator.s3.amazonaws.com/1f455270e8f79.png",
        "https://favicongenerator.s3.amazonaws.com/494aa2390593.png",
        "https://favicongenerator.s3.amazonaws.com/76016a401d623.png",
        "https://favicongenerator.s3.amazonaws.com/18c5324f1dcb1.png",
        "https://favicongenerator.s3.amazonaws.com/d66c477150503.png",
        "https://favicongenerator.s3.amazonaws.com/b7fb00f2a4255.png",
        "https://favicongenerator.s3.amazonaws.com/3193b4a009878.png",
        "https://favicongenerator.s3.amazonaws.com/9b4fca3a4e7aa.png",
        "https://favicongenerator.s3.amazonaws.com/faa6d8a0f5e6e.png",
        "https://favicongenerator.s3.amazonaws.com/c283e346d5822.png",
      ];
      async function favicon_video_to_data_url(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          const reader = new FileReader();
          reader.onloadend = function () {
            // Create image element
            const img = new Image();
            img.onload = function () {
              // Create canvas
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");

              // Set canvas size (larger for better quality)
              canvas.width = 90;
              canvas.height = 90;

              // Draw background
              ctx.fillStyle = "#ffffff"; // Couleur de fond noir
              ctx.fillRect(0, 0, canvas.width, canvas.height);

              // Calculate image position to center it
              const x = (canvas.width - img.width) / 2;
              const y = (canvas.height - img.height) / 2;

              // Draw image on top of background
              ctx.drawImage(img, x, y, img.width, img.height);

              // Convert to data URL and callback
              callback(canvas.toDataURL("image/png"));
            };
            img.src = reader.result;
          };
          reader.readAsDataURL(xhr.response);
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
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
