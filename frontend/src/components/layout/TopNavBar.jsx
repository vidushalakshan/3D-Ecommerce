import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";

const TopNavBar = () => {
  return (
    <section className="bg-[#1E1F29] shadow-md transition-all duration-300 px-3 py-3 text-sm">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 max-w-7xl mx-auto">
        {/* Left Side Info */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <BsFillTelephoneFill color="#277CD9" size={11} />
            <span className="text-[13px]">+94-111324353</span>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail color="#277CD9" size={13} />
            <span className="text-[13px]">infoelctro@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <IoLocationSharp color="#277CD9" size={13} />
            <span className="text-[13px]">No 15 Galle Road, Colombo</span>
          </div>
        </div>

        {/* Right Side Info */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
          <div>
            <CiHeart size={26} />
          </div>
          <div>
            <CiShoppingCart size={26} />
          </div>
          <div>
            <CiUser size={25} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopNavBar;
