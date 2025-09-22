import Image from 'next/image';
import { Product } from '@/lib/types';
import { Rating } from './UI/rating';

type ProductRowProps = {
  product: Product;
  selectedColor?: string; 
};

export const ProductRow = ({ product, selectedColor }: ProductRowProps) => {
  const discountPercent = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100
  );

 
  const imageBgColor = selectedColor || '#F3F4F6'; 

  return (
    <div className="group bg-white border border-gray-200 rounded-lg p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col sm:flex-row gap-6 w-full">
     
      <div 
        className="sm:w-1/4 aspect-square w-full overflow-hidden rounded-md transition-colors"
        style={{ backgroundColor: imageBgColor }}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex-1 flex flex-col gap-2 text-left">
        <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
        <Rating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="flex items-baseline gap-3 my-2">
          <span className="text-2xl font-bold text-blue-600">Rs{product.discountPrice.toFixed(2)}</span>
          <span className="text-md text-gray-400 line-through">Rs{product.price.toFixed(2)}</span>
          <span className="text-sm font-semibold text-red-500">{discountPercent}% OFF</span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae nunc nec dui finibus pulvinar. Praesent eget scelerisque ipsum.
        </p>
      </div>
    </div>
  );
};

