import React, { useState } from 'react';
import { Product } from '../types';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  onAddItemToBill: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string, productName: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddItemToBill, onEditProduct, onDeleteProduct }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from happening
    setShowMenu(!showMenu);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditProduct(product);
    setShowMenu(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteProduct(product.id, product.name);
    setShowMenu(false);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col items-center text-center relative"
      onClick={() => onAddItemToBill(product)} // Add to bill on click anywhere on the card
      tabIndex={0} // Make the div focusable
      role="button" // Indicate it's clickable
      aria-label={`Add ${product.name} to bill`} // Accessibility label
    >
      <div className="absolute top-2 right-2">
        <button
          onClick={handleMenuToggle}
          className="text-gray-500 hover:text-gray-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Product options menu"
          aria-expanded={showMenu}
          aria-haspopup="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            {/* Changed to horizontal ellipsis */}
            <path d="M4 10a2 2 0 110-4 2 2 0 010 4zM10 10a2 2 0 110-4 2 2 0 010 4zM16 10a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <Button
              variant="secondary"
              size="sm"
              fullWidth={true}
              onClick={handleEdit}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-md"
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              fullWidth={true}
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 hover:bg-red-50 rounded-b-md"
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
      <p className="text-blue-600 font-bold mb-3">PKR {product.price.toFixed(2)}</p>
      {/* The original "Add to Bill" button is now redundant if the whole card adds to bill, but keeping it for explicit clarity if needed */}
      {/* <Button onClick={(e) => { e.stopPropagation(); onAddItemToBill(product); }} fullWidth={true} size="sm">
        Add to Bill
      </Button> */}
    </div>
  );
};

export default ProductCard;