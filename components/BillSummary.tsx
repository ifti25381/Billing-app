import React from 'react';
import { BillItem } from '../types';
import Button from './Button';

interface BillSummaryProps {
  billItems: BillItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onFinalizeBill: () => void;
  onClearBill: () => void;
}

const BillSummary: React.FC<BillSummaryProps> = ({
  billItems,
  onUpdateQuantity,
  onRemoveItem,
  onFinalizeBill,
  onClearBill,
}) => {
  const subtotal = billItems.reduce((acc, item) => acc + item.total, 0);
  const taxRate = 0.05; // 5% tax
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + taxAmount;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Bill</h2>

      {billItems.length === 0 ? (
        <p className="text-gray-500 italic flex-grow flex items-center justify-center">
          No items added to the bill yet.
        </p>
      ) : (
        <div className="overflow-x-auto flex-grow mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {billItems.map((item) => (
                <tr key={item.productId}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.productName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    PKR {item.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-0.5 w-6 h-6 flex items-center justify-center"
                      >
                        -
                      </Button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.productId, parseInt(e.target.value))}
                        className="w-12 text-center border-gray-300 rounded-md shadow-sm text-sm"
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                        className="p-0.5 w-6 h-6 flex items-center justify-center"
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    PKR {item.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onRemoveItem(item.productId)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="border-t border-gray-200 pt-4 mt-auto">
        <div className="flex justify-between text-lg font-medium text-gray-800 mb-2">
          <span>Subtotal:</span>
          <span>PKR {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base text-gray-600 mb-4">
          <span>Tax (5%):</span>
          <span>PKR {taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-blue-700 mb-6">
          <span>Total:</span>
          <span>PKR {totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex space-x-4">
          <Button onClick={onFinalizeBill} disabled={billItems.length === 0} fullWidth={true}>
            Finalize Bill
          </Button>
          <Button variant="secondary" onClick={onClearBill} disabled={billItems.length === 0} fullWidth={true}>
            Clear Bill
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillSummary;