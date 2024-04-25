"use client";

import { useState } from 'react';
import Image from "next/image";
import FormattedPrice from "./FormattedPrice";
import { IoMdCart } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/shoppingSlice";
import toast, { Toaster } from "react-hot-toast";

const SingleProduct = ({ product }: any) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(product?.thumbnail);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-5 bg-white p-4 rounded-lg">
      <div className="flex justify-center items-center">
        <div className="relative w-full max-h-[700px] overflow-hidden rounded-lg border border-gray-200">
          <Image
            src={selectedImage}
            alt="product image"
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {product.images.map((image: string, index: number) => (
            <div key={index} className="relative cursor-pointer" onClick={() => handleImageClick(image)}>
              <Image
                src={image}
                alt={`product image ${index}`}
                width={100}
                height={100}
                className={`object-cover rounded-lg ${selectedImage === image ? 'border-2 border-blue-500' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center gap-y-10">
        <div>
          <p className="text-3xl font-semibold">{product?.title}</p>
          <p className="text-xl font-semibold">
            <FormattedPrice amount={product?.price} />
          </p>
        </div>
        <p className="text-lightText">{product?.description}</p>
        <div className="text-sm text-lightText flex flex-col">
          <span>
            {/* SKU: <span className="text-darkText">{product?._id}</span> */}
          </span>
          <span>
            Category: <span className="text-darkText">{product?.category}</span>
          </span>
        </div>

        <div className="flex items-center cursor-pointer group">
          <button 
            onClick={() =>
              dispatch(addToCart(product)) &&
              toast.success(
                `${product?.title.substring(0, 15)} added successfully!`
              )
            }
            className="bg-darkText text-slate-100 px-6 py-3 text-sm uppercase flex items-center border-r-[1px] border-r-slate-500"
          >
            add to cart
          </button>
          <span className="bg-darkText text-xl text-slate-100 w-12 flex items-center justify-center group-hover:bg-orange-500 duration-200 py-3">
            <IoMdCart />
          </span>
        </div>
        <p className="flex items-center gap-x-2 text-sm">
          <MdFavoriteBorder className="text-xl" />
          Add to wishlist
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default SingleProduct;
