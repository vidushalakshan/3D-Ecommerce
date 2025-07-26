import TopNavBar from "@/components/layout/TopNavBar"
import NavBar from "@/components/layout/NavBar"
import BottomNavBar from "@/components/layout/BottomNavBar"
import Collection from "@/components/pages/collection/Collection"
import NewProduct from "@/components/pages/newProduct/NewProduct"

const page = () => {
  return (
    <div>
      <TopNavBar />
      <NavBar />
      <BottomNavBar />
      <Collection />
      <NewProduct />
    </div>
  )
}

export default page