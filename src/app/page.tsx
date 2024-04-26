import Banner from "@/components/Banner";
import Products from "@/components/Products";
import { getProducts } from "@/helpers";
import Image from "next/image";

export const metadata = {
  title: "ShopCart",
  description: "E-Commerce App Using Nextjs",
}

export default async function Home() {
  // const products = await getProducts();
  // console.log(products);
  return (
  <main>
    <Banner />
    <Products />

  </main>
  );
}
