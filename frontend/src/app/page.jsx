"use client";
import dynamic from "next/dynamic";
import TopNavBar from "@/components/layout/TopNavBar";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/app/pages/footer/Footer";

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
    <div className="bg-white">
      <TopNavBar />
      <NavBar />
      <Home />
      <Collection />
      <NewProduct />
      <Hotdeal />
      <TopSelling />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Page;
