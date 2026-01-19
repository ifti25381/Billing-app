import React from 'react';
import { Product, Section } from '../types';
import ProductCard from './ProductCard';
import { SECTIONS } from '../constants'; // Import SECTIONS to get names

interface SectionDisplayProps {
  allProducts: Product[]; // Now receives all products
  selectedSectionId: string;
  onAddItemToBill: (product: Product) => void;
  onEditProduct: (product: Product) => void; // New prop for editing
  onDeleteProduct: (productId: string, productName: string) => void; // New prop for deleting
}

const SectionDisplay: React.FC<SectionDisplayProps> = ({
  allProducts,
  selectedSectionId,
  onAddItemToBill,
  onEditProduct,
  onDeleteProduct,
}) => {
  const itemsToDisplay = allProducts.filter(
    (product) => product.sectionId === selectedSectionId
  );

  const currentSection = SECTIONS.find(section => section.id === selectedSectionId);
  const sectionTitle = currentSection ? currentSection.name : 'Products';

  if (!selectedSectionId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-xl">
        Select a section from the left sidebar to view products.
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
            <ProductCard
              key={product.id}
              product={product}
              onAddItemToBill={onAddItemToBill}
              onEditProduct={onEditProduct}
              onDeleteProduct={onDeleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionDisplay;