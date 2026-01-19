import React, { useState, useEffect } from 'react';
import Button from './Button';
import { CustomProduct } from '../types';

interface ManageCustomProductsProps {
  customProducts: CustomProduct[];
  onAddCustomProduct: (name: string, price: number) => void;
  onUpdateCustomProduct: (id: string, name: string, price: number) => void;
  onDeleteCustomProduct: (id: string) => void;
}

const ManageCustomProducts: React.FC<ManageCustomProductsProps> = ({
  customProducts,
  onAddCustomProduct,
  onUpdateCustomProduct,
  onDeleteCustomProduct,
}) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState<string>('');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  useEffect(() => {
    // Reset form when editing is cancelled or a new product is added/updated
    if (!editingProductId) {
      setItemName('');
      setItemPrice('');
    }
  }, [editingProductId, customProducts]);

  const handleEditClick = (product: CustomProduct) => {
    setItemName(product.name);
    setItemPrice(product.price.toString());
    setEditingProductId(product.id);
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setItemName('');
    setItemPrice('');
  };

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

    if (editingProductId) {
      onUpdateCustomProduct(editingProductId, itemName.trim(), price);
      setEditingProductId(null);
    } else {
      onAddCustomProduct(itemName.trim(), price);
    }
    setItemName('');
    setItemPrice('');
  };

  const handleDeleteClick = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDeleteCustomProduct(id);
      if (editingProductId === id) { // If deleting the item currently being edited
        handleCancelEdit();
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {editingProductId ? 'Edit Custom Item' : 'Add Custom Item'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
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
        <div className="flex space-x-2">
          <Button type="submit" fullWidth={true}>
            {editingProductId ? 'Save Changes' : 'Add Item'}
          </Button>
          {editingProductId && (
            <Button type="button" variant="secondary" onClick={handleCancelEdit} fullWidth={true}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-bold text-gray-800 mb-4">Your Custom Products</h3>
      {customProducts.length === 0 ? (
        <p className="text-gray-500 italic">No custom items added yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {customProducts.map((product) => (
            <li key={product.id} className="py-3 flex justify-between items-center">
              <div>
                <span className="font-medium text-gray-900">{product.name}</span>
                <span className="ml-2 text-sm text-gray-500">(PKR {product.price.toFixed(2)})</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="secondary" size="sm" onClick={() => handleEditClick(product)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(product.id, product.name)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageCustomProducts;