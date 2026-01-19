import React from 'react';
import { Product } from '../types';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  onAddItemToBill: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddItemToBill }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col items-center text-center">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
      <p className="text-blue-600 font-bold mb-3">PKR {product.price.toFixed(2)}</p>
      <Button onClick={() => onAddItemToBill(product)} fullWidth={true} size="sm">
        Add to Bill
      </Button>
    </div>
  );
};

export default ProductCard;