import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';
import { Product, Section } from '../types';

interface ProductEditModalProps {
  product: Product;
  sections: Section[];
  onSave: (updatedProduct: Product) => void;
  onDelete: (productId: string, productName: string) => void;
  onClose: () => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  product,
  sections,
  onSave,
  onDelete,
  onClose,
}) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [sectionId, setSectionId] = useState(product.sectionId);

  // Update form fields if the product prop changes (e.g., if another product is selected for edit)
  useEffect(() => {
    setName(product.name);
    setPrice(product.price.toString());
    setImageUrl(product.imageUrl);
    setSectionId(product.sectionId);
  }, [product]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = parseFloat(price);

    if (!name.trim()) {
      alert('Item Name cannot be empty.');
      return;
    }
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('Price must be a positive number.');
      return;
    }
    if (!sectionId) {
      alert('Please select a section for the product.');
      return;
    }

    const updatedProduct: Product = {
      ...product,
      name: name.trim(),
      price: parsedPrice,
      imageUrl: imageUrl.trim() || 'https://picsum.photos/100/100?grayscale', // Default if empty
      sectionId: sectionId,
    };
    onSave(updatedProduct);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      onDelete(product.id, product.name);
      onClose();
    }
  };

  return (
    <Modal title={`Edit Product: ${product.name}`} onClose={onClose}>
      <form onSubmit={handleSave} className="space-y-4 p-4">
        <div>
          <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
            Item Name
          </label>
          <input
            type="text"
            id="edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            aria-label="Edit Item Name"
          />
        </div>
        <div>
          <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700 mb-1">
            Price (PKR)
          </label>
          <input
            type="number"
            id="edit-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0.01"
            step="0.01"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            aria-label="Edit Item Price in PKR"
          />
        </div>
        <div>
          <label htmlFor="edit-imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            id="edit-imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="https://example.com/image.jpg"
            aria-label="Edit Image URL"
          />
        </div>
        <div>
          <label htmlFor="edit-section" className="block text-sm font-medium text-gray-700 mb-1">
            Section
          </label>
          <select
            id="edit-section"
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            aria-label="Edit Product Section"
          >
            {sections.map((sec) => (
              <option key={sec.id} value={sec.id}>
                {sec.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <Button type="button" variant="danger" onClick={handleDelete}>
            Delete Product
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductEditModal;