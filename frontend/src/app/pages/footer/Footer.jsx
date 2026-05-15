"use client";
import { motion } from "framer-motion";
import { BsFillTelephoneFill, BsArrowRightShort } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { HiCpuChip } from "react-icons/hi2";

const FooterLink = ({ href, children }) => (
  <li>
    <motion.a
      href={href}
      whileHover={{ x: 5, color: "#3b82f6" }}
      className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-all duration-300 group"
    >
      <BsArrowRightShort className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
      <span className="font-medium">{children}</span>
    </motion.a>
  </li>
);

export default function Footer() {
  return (
    <footer className="relative bg-[#020202] text-gray-300 pt-24 border-t border-white/5 overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-blue-600/5 to-transparent blur-[120px]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <HiCpuChip className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">3D TECH STORE<span className="text-blue-500">.</span></h2>
            </motion.div>
            
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
              Next-generation 3D marketplace empowering creators with professional assets, high-fidelity models, and digital architecture.
            </p>

            <ul className="space-y-4">
              <motion.li whileHover={{ x: 5 }} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-500/50 transition-all">
                  <IoLocationSharp className="text-blue-500 text-sm" />
                </div>
                <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">NO 15 GALLE ROAD, COLOMBO</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-500/50 transition-all">
                  <BsFillTelephoneFill className="text-blue-500 text-xs" />
                </div>
                <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">+94-111324353</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-500/50 transition-all">
                  <MdEmail className="text-blue-500 text-sm" />
                </div>
                <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors uppercase">INFO3DTECHSTORE@GMAIL.COM</span>
              </motion.li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-8">
            <h3 className="text-xs font-black italic uppercase tracking-[0.4em] text-white/40">Categories</h3>
            <ul className="space-y-4">
              <FooterLink href="#">Hot Deals</FooterLink>
              <FooterLink href="#">Laptops</FooterLink>
              <FooterLink href="#">Smartphones</FooterLink>
              <FooterLink href="#">Cameras</FooterLink>
              <FooterLink href="#">Accessories</FooterLink>
            </ul>
          </div>

          {/* Information */}
          <div className="space-y-8">
            <h3 className="text-xs font-black italic uppercase tracking-[0.4em] text-white/40">Information</h3>
            <ul className="space-y-4">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Orders and Returns</FooterLink>
              <FooterLink href="#">Terms & Conditions</FooterLink>
            </ul>
          </div>

          {/* Service */}
          <div className="space-y-8">
            <h3 className="text-xs font-black italic uppercase tracking-[0.4em] text-white/40">Service</h3>
            <ul className="space-y-4">
              <FooterLink href="#">My Account</FooterLink>
              <FooterLink href="#">View Cart</FooterLink>
              <FooterLink href="#">Wishlist</FooterLink>
              <FooterLink href="#">Track My Order</FooterLink>
              <FooterLink href="#">Help Center</FooterLink>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/5 bg-white/[0.01] backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
            © 2026 ALL RIGHTS RESERVED | <span className="text-blue-500">3DTECHSTORE ARCHITECTURE</span>
          </p>
          <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
            DEVELOPED BY <span className="text-white hover:text-blue-500 cursor-pointer transition-colors">VIDUSHA LAKSHAN</span>
          </div>
        </div>
      </div>

      {/* Decorative Stage Finish */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
    </footer>
  );
}