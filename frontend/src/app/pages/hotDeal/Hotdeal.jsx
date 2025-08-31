"use client";
import Image from "next/image";
import images from "@/constants/images";
import { useEffect, useState } from "react";

const CountdownItem = ({ value, label }) => (
  <div className="flex flex-col justify-center items-center bg-blue-600 text-white rounded-full w-20 h-20 md:w-24 md:h-24 shadow-md">
    <span className="text-lg md:text-2xl font-bold">{value}</span>
    <span className="text-xs md:text-sm font-medium">{label}</span>
  </div>
);

const Hotdeal = () => {
  // Initial total time in seconds (e.g., 2 days, 12 hours, 30 mins, 45 secs)
  const initialTime = 2 * 24 * 3600 + 12 * 3600 + 30 * 60 + 45;

  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : initialTime));
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [initialTime]);

  // Convert timeLeft into days, hours, mins, secs
  const days = Math.floor(timeLeft / (24 * 3600));
  const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
  const mins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;

  return (
    <section className="w-full bg-gray-100 flex flex-col md:flex-row items-center justify-around mt-20 px-4 md:px-10 py-10 gap-8">
      {/* Left Image */}
      <Image
        src={images.collectionLaptop}
        alt="Hot Deal Laptop"
        className="w-[300px] md:w-[400px] h-auto object-cover rounded-lg"
        priority
      />

      {/* Middle Content */}
      <div className="flex flex-col items-center text-center gap-6">
        {/* Countdown */}
        <div className="flex gap-3 md:gap-4 font-bold text-gray-100">
          <CountdownItem value={String(days).padStart(2, "0")} label="DAYS" />
          <CountdownItem value={String(hours).padStart(2, "0")} label="HOUR" />
          <CountdownItem value={String(mins).padStart(2, "0")} label="MINS" />
          <CountdownItem value={String(secs).padStart(2, "0")} label="SECS" />
        </div>

        {/* Text */}
        <div className="text-gray-900">
          <h2 className="text-2xl md:text-4xl font-bold">HOT DEAL THIS WEEK</h2>
          <p className="text-lg md:text-[25px] mt-2">NEW COLLECTION UP TO 50% OFF</p>
        </div>

        {/* Button */}
        <button className="bg-blue-600 text-white px-8 py-3 rounded-4xl font-bold hover:bg-blue-800 transition duration-300">
          SHOP NOW
        </button>
      </div>

      {/* Right Image */}
      <Image
        src={images.collectionHeadset}
        alt="Hot Deal Headset"
        className="w-[300px] md:w-[400px] h-auto object-cover rounded-lg"
        priority
      />
    </section>
  );
};

export default Hotdeal;
