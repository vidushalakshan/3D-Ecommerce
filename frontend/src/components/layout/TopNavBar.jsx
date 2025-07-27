import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { LuBox } from "react-icons/lu";

const TopNavBar = () => {
  return (
    <section className="bg-[#1E1F29] text-white px-3 py-3 text-sm">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 max-w-7xl mx-auto">
        {/* Left Side Info */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <BsFillTelephoneFill color="#D10024" size={13} />
            <span className="text-[13px]">+94-111324353</span>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail color="#D10024" size={15} />
            <span className="text-[13px]">infoelctro@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <IoLocationSharp color="#D10024" size={15} />
            <span className="text-[13px]">No 15 Galle Road, Colombo</span>
          </div>
        </div>

        {/* Right Side Info */}
        <div className="flex items-center gap-2">
          <LuBox color="#D10024" size={15} />
          <span className="text-[13px]">Free Shipping for orders over $50</span>
        </div>
      </div>
    </section>
  );
};

export default TopNavBar;
