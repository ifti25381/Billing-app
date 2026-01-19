import React from 'react';
import { Product, CustomProduct } from '../types'; // Import CustomProduct
import ProductCard from './ProductCard';

interface SectionDisplayProps {
  products: Product[];
  customProducts: CustomProduct[]; // New prop for custom products
  selectedSectionId: string;
  onAddItemToBill: (product: Product) => void;
}

const SectionDisplay: React.FC<SectionDisplayProps> = ({
  products,
  customProducts, // Destructure customProducts
  selectedSectionId,
  onAddItemToBill,
}) => {
  let itemsToDisplay: Product[] = [];
  let sectionTitle = '';

  if (selectedSectionId === 'user-defined-items') {
    // Map CustomProduct to Product for consistent rendering with ProductCard
    itemsToDisplay = customProducts.map(cp => ({
      id: cp.id,
      name: cp.name,
      price: cp.price,
      imageUrl: 'https://picsum.photos/100/100?grayscale', // Generic image for custom items
      sectionId: 'user-defined-items',
    }));
    sectionTitle = 'User-Defined Items';
  } else {
    itemsToDisplay = products.filter(
      (product) => product.sectionId === selectedSectionId
    );
    sectionTitle = itemsToDisplay.length > 0
      ? itemsToDisplay[0].sectionId.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : 'Products'; // Fallback if section has no products
  }


  if (!selectedSectionId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-xl">
        Select a section from the right sidebar to view products.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
        {sectionTitle}
      </h2>
      {itemsToDisplay.length === 0 ? (
        <p className="text-gray-600 text-lg">No products available in this section.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {itemsToDisplay.map((product) => (
            <ProductCard key={product.id} product={product} onAddItemToBill={onAddItemToBill} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionDisplay;