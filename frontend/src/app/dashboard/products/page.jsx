"use client";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";


const DashoboardProduct = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-5">
        <div className="mb-4">
          <Label htmlFor="picture" className="mb-4">
            Product Name
          </Label>
          <Input
            type="text"
            placeholder="Product Name"
            className="w-full max-w-xl"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="picture" className="mb-4">
            Product Category
          </Label>
          <Input
            type="text"
            placeholder="Product Category"
            className="w-full max-w-xl"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="picture" className="mb-4">
            Product Type
          </Label>
          <Input
            type="text"
            placeholder="Product Type"
            className="w-full max-w-xl"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="picture" className="mb-4">
            Product Price
          </Label>
          <Input
            type="text"
            placeholder="Product Price"
           className="w-full max-w-xl"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="picture" className="mb-4">
            Product Old Price
          </Label>
          <Input
            type="text"
            placeholder="Product Old Price"
          className="w-full max-w-xl"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="picture" className="mb-4">
            Product isHot
          </Label>
          <Input
            type="text"
            placeholder="Product isHot"
          className="w-full max-w-xl"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="picture" className="mb-4">
            Product Image
          </Label>
          <Input
            type="file"
            placeholder="Product Name"
          className="w-full max-w-xl hover:cursor-pointer"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="picture" className="mb-4">
            Product Description
          </Label>
          <Input
            type="text"
            placeholder="Product Description"
             className="w-full max-w-xl"
          />
        </div>
      </div>
      
    </div>
  );
};

export default DashoboardProduct;
