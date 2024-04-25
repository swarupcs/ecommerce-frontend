"use client"


import React, { useEffect, useState } from "react";
import { getProducts } from "@/helpers";

const CategoriesFilter = ({ onSelectCategory, onSelectBrand }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        const uniqueCategories = [...new Set(data.products.map((product) => toTitleCase(product.category)))];
        const uniqueBrands = [...new Set(data.products.map((product) => product.brand))];
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Error fetching categories and brands:", error);
      }
    };

    fetchData();
  }, []);

  // Function to convert string to title case
  const toTitleCase = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleCategoryChange = (category) => {
    const lowerCaseCategory = category.toLowerCase();
    if (lowerCaseCategory === selectedCategory) {
      setSelectedCategory(null);
      onSelectCategory(null);
    } else {
      setSelectedCategory(lowerCaseCategory);
      onSelectCategory(lowerCaseCategory);
    }
  };

  const handleBrandChange = (brand) => {
    if (brand === selectedBrand) {
      setSelectedBrand(null);
      onSelectBrand(null);
    } else {
      setSelectedBrand(brand);
      onSelectBrand(brand);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Categories</h2>
      <ul className="divide-y divide-gray-200">
        {categories.map((category, index) => (
          <li key={index} className="py-2 flex items-center">
            <input
              type="checkbox"
              id={`category-${index}`}
              value={category}
              checked={category.toLowerCase() === selectedCategory}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={`category-${index}`} className="ml-2">
              {category}
            </label>

          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4 mb-2">Brands</h2>
      <ul className="divide-y divide-gray-200">
        {brands.map((brand, index) => (
          <li key={index} className="py-2 flex items-center">
            <input
              type="checkbox"
              id={`brand-${index}`}
              value={brand}
              checked={brand === selectedBrand}
              onChange={() => handleBrandChange(brand)}
            />
            <label htmlFor={`brand-${index}`} className="ml-2">
              {brand}
            </label>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesFilter;


