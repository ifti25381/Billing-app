export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sectionId: string;
}

export interface CustomProduct {
  id: string;
  name: string;
  price: number;
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