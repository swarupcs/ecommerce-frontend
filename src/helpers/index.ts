import { productData } from "@/constants/data";

export const getProducts = async () => {
    // const res = await fetch("https://fakestoreapiserver.reactbd.com/smart");
    // const res = await fetch("http://localhost:3000/api/products");
    const res = await fetch("https://dummyjson.com/products?limit=100");
    if (!res.ok) {
      throw new Error("Faild to fetch products");
    }
    return res.json();
  };



  // export const getTrendingProducts = async () => {
  //   const res = await fetch(
  //     "https://fakestoreapiserver.reactbd.com/smarttrending"
  //   );
  //   if (!res.ok) {
  //     throw new Error("Faild to fetch products");
  //   }
  //   return res.json();
  // };


  export const calculatePercentage = (oldPrice: any, price: any) => {
    return !!parseFloat(price) && !!parseFloat(oldPrice)
      ? (100 - (oldPrice / price) * 100).toFixed(0)
      : 0;
  };

// In helpers.ts file

// export const getSingleProduct = (_id: number) => {
  
//   const item = productData.find((product) => product._id === _id);
//   return item;
// };


export const getSingleProduct = async (_id: number) => {
  try {
    // Fetch product data from the API
    const res = await fetch("https://dummyjson.com/products?limit=100");
    if (!res.ok) {
      throw new Error("Failed to fetch product details");
    }
    const responseData = await res.json();
    // console.log("Response data:", responseData); // Log the response data

    // Check if the response contains products
    if (!responseData || !responseData.products || !Array.isArray(responseData.products)) {
      throw new Error("Invalid response from the server");
    }

    // Find the product with the specified _id
    const item = responseData.products.find((product: any) => product.id === _id);
    // console.log("Found item:", item); // Log the found item
    return item;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};






  
  
  