import TopNavBar from "@/components/layout/TopNavBar"
import NavBar from "@/components/layout/NavBar"
import Collection from "@/app/pages/collection/Collection"
import NewProduct from "@/app/pages/newProduct/NewProduct"
import Hotdeal from "@/app/pages/hotDeal/Hotdeal"
import TopSelling from "@/app/pages/topselling/TopSelling"
import NewsLetter from "@/app/pages/newsletter/NewsLetter"
import Footer from "@/app/pages/footer/Footer"
import Home from "./pages/home/Home"

const page = () => {
  return (
    <div>
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
  )
}

export default page