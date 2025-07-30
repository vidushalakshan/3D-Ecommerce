import Searchbar from "../content/Searchbar";
import { CiHeart, CiShoppingCart,CiUser  } from "react-icons/ci";

const NavBar = () => {
  return (
    <section className="bg-[#15161D] px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center md:gap-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
          <h1 className="text-5xl font-bold text-[#eeeeee]">
            Electro<span style={{ color: "rgba(39, 124, 217, 1)" }}>.</span>
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
          <Searchbar  
            className="bg-#277CD9"
          />
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
          <div>
            <CiHeart size={30}/>
          </div>
          <div>
            <CiShoppingCart size={30} />
          </div>
          <div>
            <CiUser size={28} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
