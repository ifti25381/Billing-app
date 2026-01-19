import React, { useState } from 'react';
import { Bill } from '../types';
import Button from './Button';
import Modal from './Modal'; // Assuming a Modal component for viewing details

interface BillingHistoryProps {
  history: Bill[];
}

const BillingHistory: React.FC<BillingHistoryProps> = ({ history }) => {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing History</h2>

      {history.length === 0 ? (
        <p className="text-gray-500 italic flex-grow flex items-center justify-center">
          No past bills yet.
        </p>
      ) : (
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bill ID
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {history.map((bill) => (
                <tr key={bill.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bill.id.substring(0, 8)}...
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(bill.date)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    PKR {bill.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <Button variant="secondary" size="sm" onClick={() => setSelectedBill(bill)}>
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedBill && (
        <Modal title={`Bill Details (ID: ${selectedBill.id.substring(0, 8)}...)`} onClose={() => setSelectedBill(null)}>
          <div className="p-4">
            <p className="mb-2"><strong>Date:</strong> {formatDateTime(selectedBill.date)}</p>
            <h3 className="text-lg font-bold mt-4 mb-2">Items:</h3>
            <ul className="list-disc list-inside space-y-1">
              {selectedBill.items.map((item) => (
                <li key={item.productId} className="text-gray-700">
                  {item.productName} (x{item.quantity}) - PKR {item.total.toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="text-xl font-bold mt-6 text-blue-700">Total Amount: PKR {selectedBill.totalAmount.toFixed(2)}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BillingHistory;