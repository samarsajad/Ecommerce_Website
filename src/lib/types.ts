export type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  discountPrice: number;
  isHot: boolean;
  rating: number;
  reviewCount: number;
  colors: string[]; 
  imageUrl: string;
};