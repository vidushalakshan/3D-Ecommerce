"use client";
import { useState } from "react";

const Home = () => {
   const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoSrc = "/video/background.mp4";

  return (
    <section className="relative flex items-center justify-center h-screen bg-black overflow-hidden">
      {/* Fullscreen Background Video */}
      <video
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        loop
        onCanPlayThrough={() => setIsVideoLoaded(true)}
      />

      {/* Blur/Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-0" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side: Text Content */}
        <div className="text-white space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Welcome to TechStore
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-md">
            Explore our premium selection of electronics – from high-performance
            laptops to accessories and cameras, all crafted for tech enthusiasts.
          </p>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition">
            Browse All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;