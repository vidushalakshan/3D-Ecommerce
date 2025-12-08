// src/app/pages/collection/Collection.jsx
import Image from "next/image";
import {
  collectionLaptop,
  collectionHeadset,
  collectionCamara,
} from "@/constants/images";   // named imports

const CollectionCard = ({ imgSrc, title }) => {
  return (
    <div className="relative w-[350px] h-[250px] overflow-hidden group shadow-lg rounded-3xl">
      <Image
        src={imgSrc}
        alt={title}
        width={350}
        height={250}
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-blue-600 clip-triangle opacity-90"></div>

      <div className="absolute top-6 left-6 text-white">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-2 flex items-center gap-1 text-sm font-medium cursor-pointer hover:underline">
          SHOP NOW <span>→</span>
        </p>
      </div>
    </div>
  );
};

const Collection = () => {
  return (
    <section className="flex flex-wrap justify-center gap-8 pt-10 max-w-7xl mx-auto">
      <CollectionCard imgSrc={collectionLaptop} title="Laptop Collection" />
      <CollectionCard imgSrc={collectionHeadset} title="Accessories Collection" />
      <CollectionCard imgSrc={collectionCamara} title="Cameras Collection" />
    </section>
  );
};

export default Collection;