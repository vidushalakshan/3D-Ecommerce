import TopNavBar from "@/components/layout/TopNavBar"
import NavBar from "@/components/layout/NavBar"
import BottomNavBar from "@/components/layout/BottomNavBar"
import Collection from "@/components/pages/Collection"

const page = () => {
  return (
    <div>
      <TopNavBar />
      <NavBar />
      <BottomNavBar />
      <Collection />
    </div>
  )
}

export default page