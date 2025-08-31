import SearchBar from "@/components/content/Searchbar";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagramSquare } from "react-icons/fa";

const socialLinks = [
  { icon: <FaFacebookF />, label: "Facebook" },
  { icon: <FaTwitter />, label: "Twitter" },
  { icon: <FaLinkedinIn />, label: "LinkedIn" },
  { icon: <FaInstagramSquare />, label: "Instagram" },
];

const NewsLetter = () => {
  return (
    <section className="bg-white py-20 ">
      <div className="flex flex-col items-center max-w-7xl mx-auto text-gray-950 px-4">
        {/* Title */}
        <h2 className="text-[27px] font-bold">
          <span className="font-normal">Sign Up for the </span>NEWSLETTER
        </h2>
        
        {/* Subtitle */}
        <p className="text-gray-600 text-[16px] mt-4 text-center max-w-md">
          Subscribe to our newsletter for the latest updates and offers.
        </p>

        {/* SearchBar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto">
          <SearchBar
            placeholder="Enter your email"
            buttonText="Subscribe"
            iconPosition="left"
            className="w-full sm:w-96"
            inputClassName="bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none"
            buttonClassName="bg-[#D10024] text-white font-bold text-[16px] hover:bg-red-600 transition"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 12a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0zM12 8.25v3.75m0 3.75h.008v.008H12V15z"
                />
              </svg>
            }
            iconClassName="text-gray-500"
          />
        </div>

        {/* Privacy Note */}
        <p className="text-gray-500 text-[13px] mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>

        {/* Social Links */}
        <div className="flex gap-5 text-gray-500 text-[20px] mt-4 pb-10">
          {socialLinks.map((social, index) => (
            <span key={index} aria-label={social.label} className="cursor-pointer hover:text-[#D10024] transition">
              {social.icon}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
