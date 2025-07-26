import Image from "next/image";
import images from "@/constants/images";


const Hotdeal = () => {
  return (
    <section className="h-90 w-full bg-gray-100 flex items-center  justify-around  mt-20">
        <div className="flex justify-between items-center gap-4">
            <Image
                src={images.collectionLaptop}
                alt="Hot Deal"
                className="w-full h-auto object-cover"
                style={{ maxHeight: "400px", maxWidth: "100%" }}
                priority
            >
            </Image>
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-4">
            <div className="flex justify-center items-center gap-4 font-bold text-[20px] text-shadow-white">
                <span className=" border rounded-full w-25 h-25 flex justify-center items-center bg-red-700 ">02 <br /> DAYS</span>
                <span className="border rounded-full w-25 h-25 flex justify-center items-center bg-red-700">12 <br /> HOUR</span>
                <span className="border rounded-full w-25 h-25 flex justify-center items-center bg-red-700">30 <br /> MINS</span>  
                <span className="border rounded-full w-25 h-25 flex justify-center items-center bg-red-700">45 <br /> SECS</span>
            </div>
            <div>
                <h2>HOT DEAL THIS WEEK</h2>
                <span>NEW COLLECTION UP TO 50% OFF</span>
            </div>
            <div>
                <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300">
                    SHOP NOW
                </button>
            </div>
        </div>
        <div>
            <Image
                src={images.collectionHeadset}
                alt="Hot Deal"
                className="w-full h-auto object-cover"
                style={{ maxHeight: "400px", maxWidth: "100%" }}
                priority
            />
        </div>
    </section>
  )
}

export default Hotdeal