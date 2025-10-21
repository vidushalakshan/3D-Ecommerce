'use client';

import { useState } from 'react';
import ProductCard from '@/components/common/ProductCard';
import images from '@/constants/images';

const products = [
  {
    id: 1,
    category: 'Laptop',
    name: 'Acer Predator',
    type: 'Gaming Laptop',
    model: 'G930',
    price: 2018.0,
    oldPrice: 2500.0,
    isHot: false,
    image: images.collectionLaptop,
  },
  {
    id: 2,
    category: 'Headphone',
    name: 'Sony WH-1000XM5',
    type: 'Wireless Headset',
    model: 'XM5',
    price: 418.0,
    oldPrice: 500.0,
    isHot: true,
    image: images.collectionHeadset,
  },
  {
    id: 3,
    category: 'Smartphone',
    name: 'Samsung Galaxy S24',
    type: 'Flagship Phone',
    model: 'S24',
    price: 1199.0,
    oldPrice: 1299.0,
    isHot: true,
    image: images.collectionLaptop,
  },
  {
    id: 4,
    category: 'Camera',
    name: 'Canon EOS R6',
    type: 'DSLR Camera',
    model: 'R6',
    price: 2499.0,
    oldPrice: 2800.0,
    isHot: false,
    image: images.collectionCamara,
  },
  {
    id: 5,
    category: 'Smartwatch',
    name: 'Apple Watch Ultra',
    type: 'Rugged Watch',
    model: 'Ultra 2',
    price: 799.0,
    oldPrice: 899.0,
    isHot: true,
    image: images.collectionCamara,
  },
];

export default function ProductsCollection() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'laptops', 'accessories', 'cameras'];

  // Filter products based on category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((product) => {
        if (selectedCategory === 'laptops') return product.category === 'Laptop';
        if (selectedCategory === 'accessories') return ['Headphone', 'Smartwatch'].includes(product.category);
        if (selectedCategory === 'cameras') return product.category === 'Camera';
        return true;
      });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-12 animate-fade-in">
          Products Collection
        </h1>

        {/* Category Navigation */}
        <nav className="mb-12">
          <ul className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-blue-700 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)} Collection
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}