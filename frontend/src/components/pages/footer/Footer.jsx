import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-[#1c1d21] text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* About Us */}
        <div>
          <h2 className="text-lg font-bold mb-4">ABOUT US</h2>
          <p className="text-sm mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <IoLocationSharp color="#D10024" size={15} />
              No 15 Galle Road, Colombo
            </li>
            <li className="flex items-center gap-2">
              <BsFillTelephoneFill color="#D10024" size={13} />
              +94-111324353
            </li>
            <li className="flex items-center gap-2">
              <MdEmail color="#D10024" size={15} />
              infoelctro@gmail.com
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-bold mb-4">CATEGORIES</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-red-500">
                Hot deals
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Laptops
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Smartphones
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Cameras
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Accessories
              </a>
            </li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h2 className="text-lg font-bold mb-4">INFORMATION</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-red-500">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Orders and Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Service */}
        <div>
          <h2 className="text-lg font-bold mb-4">SERVICE</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-red-500">
                My Account
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                View Cart
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Wishlist
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Track My Order
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Help
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex  md:flex-row items-center justify-center text-xs text-gray-400">
          <p className="text-center md:text-right">
            ©2025 All rights reserved | Developed by{" "}
            <span className="text-red-500 font-medium">Vidusha</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
