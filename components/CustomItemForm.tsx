import React, { useState } from 'react';
import Button from './Button';

interface CustomItemFormProps {
  onAddCustomItem: (name: string, price: number, quantity: number) => void;
}

const CustomItemForm: React.FC<CustomItemFormProps> = ({ onAddCustomItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState<string>('');
  const [itemQuantity, setItemQuantity] = useState<string>('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(itemPrice);
    const quantity = parseInt(itemQuantity);

    if (!itemName.trim()) {
      alert('Item Name cannot be empty.');
      return;
    }
    if (isNaN(price) || price <= 0) {
      alert('Price must be a positive number.');
      return;
    }
    if (isNaN(quantity) || quantity <= 0) {
      alert('Quantity must be a positive integer.');
      return;
    }

    onAddCustomItem(itemName.trim(), price, quantity);
    setItemName('');
    setItemPrice('');
    setItemQuantity('1');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Custom Item</h2>
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
        <div className="grid grid-cols-2 gap-4">
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
            <label htmlFor="itemQuantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="itemQuantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              min="1"
              step="1"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              aria-label="Item Quantity"
            />
          </div>
        </div>
        <Button type="submit" fullWidth={true}>
          Add Custom Item
        </Button>
      </form>
    </div>
  );
};

export default CustomItemForm;