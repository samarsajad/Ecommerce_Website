import Image from 'next/image';
import { Product } from '@/lib/types';
import { Badge } from './UI/badge';
import { Rating } from './UI/rating';

type ProductCardProps = {
  product: Product;
  selectedColor?: string; 
};

export const ProductCard = ({ product, selectedColor }: ProductCardProps) => {
  const discountPercent = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100
  );

  
  const imageBgColor = selectedColor || '#F3F4F6'; 

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {product.isHot && <Badge>HOT</Badge>}
      
      <div 
        className="aspect-square w-full mx-auto overflow-hidden transition-colors"
        style={{ backgroundColor: imageBgColor }}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover object-center transition-transform group-hover:scale-105 rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <h3 className="text-lg font-bold text-gray-800 truncate">{product.name}</h3>
        <Rating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="flex items-baseline justify-center gap-3">
          <span className="text-2xl font-bold text-blue-600">Rs{product.discountPrice.toFixed(2)}</span>
          <span className="text-md text-gray-400 line-through">Rs{product.price.toFixed(2)}</span>
          <span className="text-sm font-semibold text-red-500">{discountPercent}% OFF</span>
        </div>
      </div>
    </div>
  );
};

