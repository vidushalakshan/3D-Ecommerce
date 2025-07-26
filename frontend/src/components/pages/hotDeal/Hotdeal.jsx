import Image from "next/image";
import images from "@/constants/images";

const CountdownItem = ({ value, label }) => (
  <div className="flex flex-col justify-center items-center bg-red-700 text-white rounded-full w-20 h-20 md:w-24 md:h-24 shadow-md">
    <span className="text-lg md:text-2xl font-bold">{value}</span>
    <span className="text-xs md:text-sm font-medium">{label}</span>
  </div>
);

const Hotdeal = () => {
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
          <CountdownItem value="02" label="DAYS" />
          <CountdownItem value="12" label="HOUR" />
          <CountdownItem value="30" label="MINS" />
          <CountdownItem value="45" label="SECS" />
        </div>

        {/* Text */}
        <div className="text-gray-900">
          <h2 className="text-2xl md:text-4xl font-bold">HOT DEAL THIS WEEK</h2>
          <p className="text-lg md:text-2xl mt-1">NEW COLLECTION UP TO 50% OFF</p>
        </div>

        {/* Button */}
        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300">
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
