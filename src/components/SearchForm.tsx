'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchForm = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Redirect to search page with the search query as a parameter
        if (searchQuery.trim() !== '') {
          router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
      };


      const handleChange = async (e) => {
        const query = e.target.value.trim();
        setSearchQuery(query);
        if (query === '') {
          setSuggestions([]);
          return;
        }
        try {
          // Fetch product data from the API
          const res = await fetch(`https://dummyjson.com/products?limit=100`);
          if (!res.ok) {
            throw new Error('Failed to fetch products');
          }
          const products = await res.json();
          // Filter products based on the search query
          const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
          );
          setSuggestions(filteredProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
          setSuggestions([]);
        }
      };
  return (
    <div className="w-full hidden md:flex items-center gap-x-1 border-0 border-lightText/50 rounded-full px-4 py-1.5 focus-within:border-orange-600 group">
      <form className="max-w-md mx-auto w-full" onSubmit={handleSubmit}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Products"
            value={searchQuery}
            onChange={handleChange}
            required
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg divide-y divide-gray-200 dark:bg-slate-800 dark:border-gray-700 dark:divide-gray-700">
              {suggestions.map((product) => (
                <li key={product.id} className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900">
                  {product.title}
                </li>
              ))}
            </ul>
          )}
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchForm
