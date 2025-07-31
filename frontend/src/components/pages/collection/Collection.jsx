"use client";
import { useState } from "react";
import Image from "next/image";
import images from "../../../constants/images";

const CollectionCard = ({ imgSrc, title }) => {
  return (
    <div className="relative w-[350px] h-[250px] overflow-hidden group shadow-lg z-10">
      {/* Image */}
      <Image
        src={imgSrc}
        alt={title}
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-700 clip-triangle opacity-70" />

      {/* Text Content */}
      <div className="absolute top-6 left-6 text-white">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-2 flex items-center gap-1 text-sm font-medium cursor-pointer hover:underline">
          SHOP NOW <span>➔</span>
        </p>
      </div>
    </div>
  );
};

const Collection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Path to the video in your public folder
 const videoSrc = "/video/background.mp4";
  // const isMobileVideo = videoSrc === "/videos/footer_bg.mp4"; // optional logic

  return (
    <section className="relative flex justify-center items-center h-screen bg-black overflow-hidden">
      {/* Fullscreen Background Video */}
      <video
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        onCanPlayThrough={() => setIsVideoLoaded(true)}
        loop
      />

      {/* Overlay on top of video */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0" />

      {/* Cards Content */}
      <div className="relative z-10 flex justify-between items-center gap-25 flex-wrap pt-10 max-w-7xl mx-auto">
        <CollectionCard
          imgSrc={images.collectionLaptop}
          title="Laptop Collection"
        />
        <CollectionCard
          imgSrc={images.collectionHeadset}
          title="Accessories Collection"
        />
        <CollectionCard
          imgSrc={images.collectionCamara}
          title="Cameras Collection"
        />
      </div>
    </section>
  );
};

export default Collection;
