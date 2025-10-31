"use client";
import { useEffect, useState } from "react";

const CountdownItem = ({ value, label }) => (
  <div className="flex flex-col justify-center items-center bg-blue-600 text-white rounded-full w-16 h-16 md:w-20 md:h-20 shadow-lg">
    <span className="text-lg md:text-2xl font-bold leading-none">{value}</span>
    <span className="text-xs md:text-sm font-medium uppercase tracking-wider">{label}</span>
  </div>
);

const Hotdeal = () => {
  const initialTime = 2 * 24 * 3600 + 12 * 3600 + 30 * 60 + 45; // 2d 12h 30m 45s
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const videoLeft = "/video/left.mp4";
  const videoRight = "/video/right.mp4";

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : initialTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [initialTime]);

  const days = String(Math.floor(timeLeft / (24 * 3600))).padStart(2, "0");
  const hours = String(Math.floor((timeLeft % (24 * 3600)) / 3600)).padStart(2, "0");
  const mins = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  return (
    <section className="w-full bg-white py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-16">
          
          {/* Left Video */}
          <div className="order-1 md:order-1 flex justify-center">
            <video
              autoPlay
              loop
              muted
              playsInline
              src={videoRight}
              className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] h-[350px] md:h-[420px] object-cover rounded-full shadow-xl"
            />
          </div>

          {/* Middle Content */}
          <div className="order-3 md:order-2 flex flex-col items-center text-center gap-6 max-w-md">
            {/* Countdown */}
            <div className="flex gap-2 md:gap-3">
              <CountdownItem value={days} label="Days" />
              <CountdownItem value={hours} label="Hours" />
              <CountdownItem value={mins} label="Mins" />
              <CountdownItem value={secs} label="Secs" />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                HOT DEAL THIS WEEK
              </h2>
              <p className="text-lg md:text-xl mt-2 text-gray-700 font-medium">
                NEW COLLECTION UP TO <span className="text-blue-600">50% OFF</span>
              </p>
            </div>

            {/* Button */}
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm md:text-base hover:bg-blue-700 transition duration-300 shadow-md">
              SHOP NOW
            </button>
          </div>

          {/* Right Video */}
          <div className="order-2 md:order-3 flex justify-center">
            <video
              autoPlay
              loop
              muted
              playsInline
              src={videoLeft}
              className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] h-[350px] md:h-[420px] object-cover rounded-full shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hotdeal;