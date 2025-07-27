import TopNavBar from "@/components/layout/TopNavBar"
import NavBar from "@/components/layout/NavBar"
import BottomNavBar from "@/components/layout/BottomNavBar"
import Collection from "@/components/pages/collection/Collection"
import NewProduct from "@/components/pages/newProduct/NewProduct"
import Hotdeal from "@/components/pages/hotDeal/Hotdeal"
import TopSelling from "@/components/pages/topselling/TopSelling"
import NewsLetter from "@/components/pages/newsletter/NewsLetter"
import Footer from "@/components/pages/footer/Footer"

const page = () => {
  return (
    <div>
      <TopNavBar />
      <NavBar />
      <BottomNavBar />
      <Collection />
      <NewProduct />
      <Hotdeal />
      <TopSelling />
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default page