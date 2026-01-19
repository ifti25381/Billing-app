export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sectionId: string; // The section this product belongs to
}

export interface Section {
  id: string;
  name: string;
}

export interface BillItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Bill {
  id: string;
  date: string; // ISO string
  items: BillItem[];
  totalAmount: number;
}