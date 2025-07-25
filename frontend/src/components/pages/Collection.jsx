import Image from "next/image";
import images from "../../constants/images";

const CollectionCard = ({ imgSrc, title }) => {
  return (
  
    <div className="relative w-[350px] h-[250px] overflow-hidden group shadow-lg">
      {/* Image */}
      <Image
        src={imgSrc}
        alt={title}
        
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-red-600 clip-triangle opacity-90"></div>

      {/* Text Content */}
      <div className="absolute top-6 left-6 text-white">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-2 flex items-center gap-1 text-sm font-medium cursor-pointer hover:underline">
          SHOP NOW <span>➔</span>
        </p>
      </div>
    </div>
  );
};

const Collection = () => {
  return (
    <section className="flex justify-between items-center flex-wrap pt-10 max-w-7xl mx-auto">
      <CollectionCard imgSrc={images.collectionLaptop} title="Laptop Collection" />
      <CollectionCard imgSrc={images.collectionHeadset} title={`Accessories Collection`}/>
      <CollectionCard imgSrc={images.collectionCamara} title="Cameras Collection" />
    </section>
  );
};

export default Collection;
