"use client"

// ProductsPage.jsx

import React, { useEffect, useState } from "react";
import Container from "./Container";
import ProductsData from "./ProductsData";
import { Products } from "../../type";
import { getProducts } from "@/helpers";
import CategoriesFilter from "./CategoriesFilter";

const ProductsPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        const productsWithQuantity = productsData.products.map((product: Products) => ({
          ...product,
          quantity: 1,
        }));
        setProducts(productsWithQuantity);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected category and brand
  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    if (selectedBrand && product.brand !== selectedBrand) {
      return false;
    }
    return true;
  });

  // Calculate index of the first and last product for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle category filter change
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset page to first page when category changes
  };

  // Handle brand filter change
  const handleBrandChange = (brand: string | null) => {
    setSelectedBrand(brand);
    setCurrentPage(1); // Reset page to first page when brand changes
  };

  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 -mt-10">
      <div className="col-span-1">
        <CategoriesFilter onSelectCategory={handleCategoryChange} onSelectBrand={handleBrandChange} />
      </div>
      <div className="col-span-1 md:col-span-2 xl:col-span-3">
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {currentProducts.map((item: Products) => (
            <ProductsData item={item} key={item?.id} />
          ))}
        </div>
        {/* Pagination */}
        <div className="mt-4 flex justify-center items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-2 px-4 py-2 rounded-md bg-blue-500 text-white"
          >
            Prev
          </button>
          {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-2 px-4 py-2 rounded-md ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
            className="mx-2 px-4 py-2 rounded-md bg-blue-500 text-white"
          >
            Next
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ProductsPage;



