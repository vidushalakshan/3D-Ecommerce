"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Home = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoSrc = "/video/background.mp4"; // Adjust the path as necessary
  
const router = useRouter();

  const handleClick = () => {
    router.push("/allCategories"); // Navigate to the All Categories page
    window.scrollTo(0, 0); // Scroll to the top of the page
  }

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
      <div className="relative z-10 w-full px-6 py-20 flex justify-center items-center">
        {/* Content Container */}
        <div className="text-center text-white flex flex-col justify-center items-center space-y-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Welcome to TechStore
          </h2>

          <p className="text-lg md:text-xl text-gray-300">
            Explore our premium selection of electronics — from high-performance
            laptops and smart devices to essential accessories and cameras.
          </p>

          <p className="text-base md:text-lg text-gray-400">
            Discover the latest technology at competitive prices, backed by fast
            shipping and reliable customer service.
          </p>

          <button onClick={handleClick} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition duration-300">
            Browse All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
