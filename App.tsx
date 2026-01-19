import React, { useState, useEffect, useCallback } from 'react';
import { Product, BillItem, Bill, Section } from './types';
import { SECTIONS, PRODUCTS } from './constants';
import Navbar from './components/Navbar';
import SectionDisplay from './components/SectionDisplay';
import BillSummary from './components/BillSummary';
import BillingHistory from './components/BillingHistory';
import AddNewProductForm from './components/AddNewProductForm'; // Renamed and simplified
import ProductEditModal from './components/ProductEditModal'; // New component

function App() {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(SECTIONS[0].id);
  const [currentBillItems, setCurrentBillItems] = useState<BillItem[]>([]);
  const [billingHistory, setBillingHistory] = useState<Bill[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Single source of truth for all products
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // State for editing modal

  // Load data from local storage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('billingHistory');
      if (savedHistory) {
        setBillingHistory(JSON.parse(savedHistory));
      }

      const savedProducts = localStorage.getItem('allProducts');
      if (savedProducts) {
        setAllProducts(JSON.parse(savedProducts));
      } else {
        // Initialize with predefined products if no saved products exist
        setAllProducts(PRODUCTS);
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

  // Save all products to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('allProducts', JSON.stringify(allProducts));
    } catch (error) {
      console.error("Failed to save all products to local storage", error);
    }
  }, [allProducts]);


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

  // Product management callbacks
  const handleAddNewProduct = useCallback((name: string, price: number, imageUrl: string, sectionId: string) => {
    setAllProducts((prevProducts) => {
      const newId = `prod-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      return [...prevProducts, { id: newId, name, price, imageUrl, sectionId }];
    });
    alert(`"${name}" added successfully!`);
  }, []);

  const handleUpdateProduct = useCallback((updatedProduct: Product) => {
    setAllProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
    // Also update current bill items if this product is already in the bill
    setCurrentBillItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === updatedProduct.id
          ? {
              ...item,
              productName: updatedProduct.name,
              price: updatedProduct.price,
              total: updatedProduct.price * item.quantity,
            }
          : item
      )
    );
    alert(`"${updatedProduct.name}" updated successfully!`);
  }, []);

  const handleDeleteProduct = useCallback((productId: string, productName: string) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      setAllProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      // Also remove from current bill if present
      setCurrentBillItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
      alert(`"${productName}" deleted successfully!`);
    }
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
      <div className="flex-grow p-4 md:p-8 overflow-y-auto" style={{ marginLeft: '192px', marginRight: '384px' }}>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">General Store Billing</h1>
        <SectionDisplay
          allProducts={allProducts} // Pass all products
          selectedSectionId={selectedSectionId}
          onAddItemToBill={handleAddItemToBill}
          onEditProduct={setEditingProduct} // Set product to be edited
          onDeleteProduct={handleDeleteProduct} // Pass delete handler
        />
      </div>

      {/* Right Side Panels (Bill Summary, History & Add New Product) */}
      <div className="fixed right-0 top-0 h-full w-96 flex flex-col bg-gray-100 shadow-xl z-20 p-4 overflow-y-auto">
        {/* Bill Summary */}
        <div className="flex-1 mb-4">
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
        {/* Add New Product - Now at the bottom */}
        <div className="flex-none mt-4">
          <AddNewProductForm
            sections={SECTIONS}
            onAddNewProduct={handleAddNewProduct}
          />
        </div>
      </div>

      {/* Product Edit Modal */}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          sections={SECTIONS}
          onSave={handleUpdateProduct}
          onDelete={handleDeleteProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}

export default App;