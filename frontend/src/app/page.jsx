import TopNavBar from "@/components/layout/TopNavBar"
import Collection from "@/components/pages/collection/Collection"
import NewProduct from "@/components/pages/newProduct/NewProduct"
import Hotdeal from "@/components/pages/hotDeal/Hotdeal"
import TopSelling from "@/components/pages/topselling/TopSelling"
import NewsLetter from "@/components/pages/newsletter/NewsLetter"
import Footer from "@/components/pages/footer/Footer"
import NavBar from "@/components/layout/NavBar"

const page = () => {
  return (
    <div>
      <TopNavBar />
      <NavBar />
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