// app/pages/promote/Promote.js
import React, { useState } from "react";

const Promote = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoPromotion = "/video/promotion.mp4"; // Put video in public/video/

  return (
    <section className="relative h-[500px] w-full overflow-hidden bg-black">
      {/* Background Video */}
      <video
        src={videoPromotion}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoadedData={() => setIsVideoLoaded(true)}
        preload="auto"
      />

      {/* Loading State */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-pulse text-white text-lg font-medium">
            Loading...
          </div>
        </div>
      )}

      {/* Optional: Add Your Text/Logo Here */}
      {/*
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          Your Brand Here
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl drop-shadow-md">
          Elevate your presence with cinematic excellence.
        </p>
      </div>
      */}
    </section>
  );
};

export default Promote;