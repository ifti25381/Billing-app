import React, { useState } from 'react';
import Button from './Button';
import { Section } from '../types'; // Import Section type

interface AddNewProductFormProps {
  sections: Section[]; // Pass all sections for the dropdown
  onAddNewProduct: (name: string, price: number, imageUrl: string, sectionId: string) => void;
}

const AddNewProductForm: React.FC<AddNewProductFormProps> = ({ sections, onAddNewProduct }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [selectedSectionId, setSelectedSectionId] = useState<string>(sections[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(itemPrice);

    if (!itemName.trim()) {
      alert('Item Name cannot be empty.');
      return;
    }
    if (isNaN(price) || price <= 0) {
      alert('Price must be a positive number.');
      return;
    }
    if (!selectedSectionId) {
      alert('Please select a section for the new product.');
      return;
    }

    // Use a placeholder image if no URL is provided
    const finalImageUrl = imageUrl.trim() || 'https://picsum.photos/100/100?grayscale';

    onAddNewProduct(itemName.trim(), price, finalImageUrl, selectedSectionId);
    setItemName('');
    setItemPrice('');
    setImageUrl('');
    setSelectedSectionId(sections[0]?.id || ''); // Reset to first section or empty
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., Special Candy"
            aria-label="Item Name"
          />
        </div>
        <div>
          <label htmlFor="itemPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Price (PKR)
          </label>
          <input
            type="number"
            id="itemPrice"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            min="0.01"
            step="0.01"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="0.00"
            aria-label="Item Price in PKR"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL (Optional)
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="https://example.com/image.jpg"
            aria-label="Image URL"
          />
        </div>
        <div>
          <label htmlFor="sectionId" className="block text-sm font-medium text-gray-700 mb-1">
            Section
          </label>
          <select
            id="sectionId"
            value={selectedSectionId}
            onChange={(e) => setSelectedSectionId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            aria-label="Product Section"
          >
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" fullWidth={true}>
          Add New Product
        </Button>
      </form>
    </div>
  );
};

export default AddNewProductForm;