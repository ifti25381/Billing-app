import React, { useState, useEffect, useCallback } from 'react';
import { Product, BillItem, Bill, CustomProduct } from './types'; // Import CustomProduct
import { SECTIONS, PRODUCTS } from './constants';
import Navbar from './components/Navbar';
import SectionDisplay from './components/SectionDisplay';
import BillSummary from './components/BillSummary';
import BillingHistory from './components/BillingHistory';
import ManageCustomProducts from './components/ManageCustomProducts'; // Use the renamed component

function App() {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(SECTIONS[0].id);
  const [currentBillItems, setCurrentBillItems] = useState<BillItem[]>([]);
  const [billingHistory, setBillingHistory] = useState<Bill[]>([]);
  const [customProducts, setCustomProducts] = useState<CustomProduct[]>([]); // New state for custom products

  // Load data from local storage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('billingHistory');
      if (savedHistory) {
        setBillingHistory(JSON.parse(savedHistory));
      }
      const savedCustomProducts = localStorage.getItem('customProducts');
      if (savedCustomProducts) {
        setCustomProducts(JSON.parse(savedCustomProducts));
      }
    } catch (error) {
      console.error("Failed to load data from local storage", error);
    }
  }, []);

  // Save billing history to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('billingHistory', JSON.stringify(billingHistory));
    } catch (error) {
      console.error("Failed to save billing history to local storage", error);
    }
  }, [billingHistory]);

  // Save custom products to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('customProducts', JSON.stringify(customProducts));
    } catch (error) {
      console.error("Failed to save custom products to local storage", error);
    }
  }, [customProducts]);


  const handleSelectSection = useCallback((sectionId: string) => {
    setSelectedSectionId(sectionId);
  }, []);

  const handleAddItemToBill = useCallback((product: Product) => {
    setCurrentBillItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === product.id);

      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item
        );
        return updatedItems;
      } else {
        const newItem: BillItem = {
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: 1,
          total: product.price,
        };
        return [...prevItems, newItem];
      }
    });
  }, []);

  // Custom product management callbacks
  const handleAddCustomProduct = useCallback((name: string, price: number) => {
    setCustomProducts((prevProducts) => {
      const newId = `custom-prod-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      return [...prevProducts, { id: newId, name, price }];
    });
  }, []);

  const handleUpdateCustomProduct = useCallback((id: string, name: string, price: number) => {
    setCustomProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === id ? { ...product, name, price } : product))
    );
    // Also update current bill items if this product is already in the bill
    setCurrentBillItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === id
          ? { ...item, productName: name, price: price, total: price * item.quantity }
          : item
      )
    );
  }, []);

  const handleDeleteCustomProduct = useCallback((id: string) => {
    setCustomProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    // Also remove from current bill if present
    setCurrentBillItems((prevItems) => prevItems.filter((item) => item.productId !== id));
  }, []);


  const handleUpdateQuantity = useCallback((productId: string, quantity: number) => {
    setCurrentBillItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.productId !== productId);
      }
      return prevItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: quantity, total: quantity * item.price }
          : item
      );
    });
  }, []);

  const handleRemoveItem = useCallback((productId: string) => {
    setCurrentBillItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  }, []);

  const handleFinalizeBill = useCallback(() => {
    if (currentBillItems.length === 0) {
      alert('Please add items to the bill before finalizing.');
      return;
    }

    const subtotal = currentBillItems.reduce((acc, item) => acc + item.total, 0);
    const taxRate = 0.05; // 5% tax
    const taxAmount = subtotal * taxRate;
    const totalAmount = subtotal + taxAmount;

    const newBill: Bill = {
      id: `bill-${Date.now()}`,
      date: new Date().toISOString(),
      items: [...currentBillItems], // Deep copy current items
      totalAmount: parseFloat(totalAmount.toFixed(2)),
    };

    setBillingHistory((prevHistory) => [newBill, ...prevHistory]);
    setCurrentBillItems([]); // Clear current bill
    alert('Bill finalized successfully!');
  }, [currentBillItems]);

  const handleClearBill = useCallback(() => {
    if (window.confirm('Are you sure you want to clear the current bill?')) {
      setCurrentBillItems([]);
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Navigation Bar */}
      <Navbar
        sections={SECTIONS}
        selectedSectionId={selectedSectionId}
        onSelectSection={handleSelectSection}
      />

      {/* Main Content Area */}
      {/* Adjusted marginLeft for Navbar (w-48 = 192px) and marginRight for right panels (w-96 = 384px) */}
      <div className="flex-grow p-4 md:p-8 overflow-y-auto" style={{ marginLeft: '192px', marginRight: '384px' }}>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">General Store Billing</h1>
        <SectionDisplay
          products={PRODUCTS}
          customProducts={customProducts} // Pass custom products
          selectedSectionId={selectedSectionId}
          onAddItemToBill={handleAddItemToBill}
        />
      </div>

      {/* Right Side Panels (Bill Summary & History) */}
      <div className="fixed right-0 top-0 h-full w-96 flex flex-col bg-gray-100 shadow-xl z-20 p-4 overflow-y-auto">
        {/* Manage Custom Items */}
        <ManageCustomProducts
          customProducts={customProducts}
          onAddCustomProduct={handleAddCustomProduct}
          onUpdateCustomProduct={handleUpdateCustomProduct}
          onDeleteCustomProduct={handleDeleteCustomProduct}
        />

        {/* Bill Summary */}
        <div className="flex-1 mb-4 mt-4"> {/* Added mt-4 for spacing */}
          <BillSummary
            billItems={currentBillItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onFinalizeBill={handleFinalizeBill}
            onClearBill={handleClearBill}
          />
        </div>
        {/* Billing History */}
        <div className="flex-1 mt-4">
          <BillingHistory history={billingHistory} />
        </div>
      </div>
    </div>
  );
}

export default App;