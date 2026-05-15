"use client";
import dynamic from "next/dynamic";
import TopNavBar from "@/components/layout/TopNavBar";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/app/pages/footer/Footer";
import DashboardHome from "./dashboard/page";
import Promote from "./pages/promote/Promote";
import BottomNavBar from "@/components/layout/BottomNavBar";
import Model from "./pages/Model/Model";

// ✅ Dynamically import all client-fetching sections
const Home = dynamic(() => import("./pages/home/Home"), { ssr: false });
const Collection = dynamic(() => import("@/app/pages/collection/Collection"), {
  ssr: false,
});
const NewProduct = dynamic(() => import("@/app/pages/newProduct/NewProduct"), {
  ssr: false,
});
const Hotdeal = dynamic(() => import("@/app/pages/hotDeal/Hotdeal"), {
  ssr: false,
});
const TopSelling = dynamic(() => import("@/app/pages/topselling/TopSelling"), {
  ssr: false,
});
const NewsLetter = dynamic(() => import("@/app/pages/newsletter/NewsLetter"), {
  ssr: false,
});

const Page = () => {
  return (
    <div className="bg-[#020202]">
      <NavBar />
      <Home />
      <NewProduct />
      {/* <Model /> */}
      <Hotdeal />
      <Collection />
      <TopSelling />
      <NewsLetter />
      <Footer />
    </div>
    // <div>
    //   <DashboardHome />
    // </div>
  );
};

export default Page;