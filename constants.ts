import { Product, Section } from './types';

export const SECTIONS: Section[] = [
  { id: 'cool-drinks-juices', name: 'Cool Drinks & Juices' },
  { id: 'chips-chana-chore', name: 'Chips & Chana Chore' },
  { id: 'toffees-bubble-gums', name: 'Toffees & Bubble Gums' },
  { id: 'biscuits', name: 'Biscuits' },
  { id: 'garments', name: 'Garments' },
  { id: 'stationaries', name: 'Stationaries' },
  { id: 'user-defined-items', name: 'User-Defined Items' }, // New section for custom items
];

export const PRODUCTS: Product[] = [
  // Cool Drinks & Juices
  { id: 'coke-300ml', name: 'Coke 300ml', price: 20, imageUrl: 'https://picsum.photos/100/100?random=1', sectionId: 'cool-drinks-juices' },
  { id: 'sprite-300ml', name: 'Sprite 300ml', price: 20, imageUrl: 'https://picsum.photos/100/100?random=2', sectionId: 'cool-drinks-juices' },
  { id: 'fanta-300ml', name: 'Fanta 300ml', price: 20, imageUrl: 'https://picsum.photos/100/100?random=3', sectionId: 'cool-drinks-juices' },
  { id: 'mango-juice-200ml', name: 'Mango Juice 200ml', price: 30, imageUrl: 'https://picsum.photos/100/100?random=4', sectionId: 'cool-drinks-juices' },
  { id: 'orange-juice-200ml', name: 'Orange Juice 200ml', price: 30, imageUrl: 'https://picsum.photos/100/100?random=5', sectionId: 'cool-drinks-juices' },
  { id: 'apple-juice-200ml', name: 'Apple Juice 200ml', price: 30, imageUrl: 'https://picsum.photos/100/100?random=6', sectionId: 'cool-drinks-juices' },
  { id: 'water-bottle-500ml', name: 'Water Bottle 500ml', price: 15, imageUrl: 'https://picsum.photos/100/100?random=7', sectionId: 'cool-drinks-juices' },

  // Chips & Chana Chore
  { id: 'lays-classic', name: 'Lays Classic', price: 10, imageUrl: 'https://picsum.photos/100/100?random=8', sectionId: 'chips-chana-chore' },
  { id: 'lays-masala', name: 'Lays Masala', price: 10, imageUrl: 'https://picsum.photos/100/100?random=9', sectionId: 'chips-chana-chore' },
  { id: 'kurkure-masala', name: 'Kurkure Masala', price: 10, imageUrl: 'https://picsum.photos/100/100?random=10', sectionId: 'chips-chana-chore' },
  { id: 'cheetos-crunchy', name: 'Cheetos Crunchy', price: 20, imageUrl: 'https://picsum.photos/100/100?random=11', sectionId: 'chips-chana-chore' },
  { id: 'chana-dal', name: 'Chana Dal', price: 15, imageUrl: 'https://picsum.photos/100/100?random=12', sectionId: 'chips-chana-chore' },
  { id: 'mixture-namkeen', name: 'Mixture Namkeen', price: 25, imageUrl: 'https://picsum.photos/100/100?random=13', sectionId: 'chips-chana-chore' },

  // Toffees & Bubble Gums
  { id: 'eclairs-pack', name: 'Eclairs Pack', price: 50, imageUrl: 'https://picsum.photos/100/100?random=14', sectionId: 'toffees-bubble-gums' },
  { id: 'melody-chocolate', name: 'Melody Chocolate', price: 5, imageUrl: 'https://picsum.photos/100/100?random=15', sectionId: 'toffees-bubble-gums' },
  { id: 'pulse-candy', name: 'Pulse Candy', price: 5, imageUrl: 'https://picsum.photos/100/100?random=16', sectionId: 'toffees-bubble-gums' },
  { id: 'boomer-gum', name: 'Boomer Gum', price: 5, imageUrl: 'https://picsum.photos/100/100?random=17', sectionId: 'toffees-bubble-gums' },
  { id: 'center-fresh-gum', name: 'Center Fresh Gum', price: 10, imageUrl: 'https://picsum.photos/100/100?random=18', sectionId: 'toffees-bubble-gums' },

  // Biscuits
  { id: 'oreo-cream', name: 'Oreo Cream Biscuit', price: 30, imageUrl: 'https://picsum.photos/100/100?random=19', sectionId: 'biscuits' },
  { id: 'parle-g', name: 'Parle-G Biscuit', price: 10, imageUrl: 'https://picsum.photos/100/100?random=20', sectionId: 'biscuits' },
  { id: 'britannia-good-day', name: 'Britannia Good Day', price: 25, imageUrl: 'https://picsum.photos/100/100?random=21', sectionId: 'biscuits' },
  { id: 'digestive-biscuits', name: 'Digestive Biscuits', price: 70, imageUrl: 'https://picsum.photos/100/100?random=22', sectionId: 'biscuits' },
  { id: 'jim-jam', name: 'Jim Jam', price: 30, imageUrl: 'https://picsum.photos/100/100?random=23', sectionId: 'biscuits' },

  // Garments
  { id: 'men-tshirt-m', name: 'Men\'s T-Shirt (M)', price: 350, imageUrl: 'https://picsum.photos/100/100?random=24', sectionId: 'garments' },
  { id: 'women-top-s', name: 'Women\'s Top (S)', price: 400, imageUrl: 'https://picsum.photos/100/100?random=25', sectionId: 'garments' },
  { id: 'kids-jeans-5y', name: 'Kids Jeans (5Y)', price: 500, imageUrl: 'https://picsum.photos/100/100?random=26', sectionId: 'garments' },
  { id: 'socks-pair', name: 'Socks (Pair)', price: 80, imageUrl: 'https://picsum.photos/100/100?random=27', sectionId: 'garments' },
  { id: 'handkerchief', name: 'Handkerchief', price: 20, imageUrl: 'https://picsum.photos/100/100?random=28', sectionId: 'garments' },

  // Stationaries
  { id: 'ball-pen-blue', name: 'Ball Pen (Blue)', price: 10, imageUrl: 'https://picsum.photos/100/100?random=29', sectionId: 'stationaries' },
  { id: 'notebook-a4', name: 'Notebook A4', price: 60, imageUrl: 'https://picsum.photos/100/100?random=30', sectionId: 'stationaries' },
  { id: 'pencil-pack', name: 'Pencil Pack (5)', price: 30, imageUrl: 'https://picsum.photos/100/100?random=31', sectionId: 'stationaries' },
  { id: 'eraser', name: 'Eraser', price: 5, imageUrl: 'https://picsum.photos/100/100?random=32', sectionId: 'stationaries' },
  { id: 'sharpener', name: 'Sharpener', price: 5, imageUrl: 'https://picsum.photos/100/100?random=33', sectionId: 'stationaries' },
  { id: 'geometry-box', name: 'Geometry Box', price: 120, imageUrl: 'https://picsum.photos/100/100?random=34', sectionId: 'stationaries' },
];