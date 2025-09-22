import { Star } from 'lucide-react';

type RatingProps = {
  rating: number;
  reviewCount: number;
};

export const Rating = ({ rating, reviewCount }: RatingProps) => {
  return (
    <div className="flex items-center justify-center gap-1 text-yellow-500">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < Math.round(rating) ? 'fill-current' : 'text-gray-300'}
        />
      ))}
      <span className="text-gray-500 text-sm ml-1">({reviewCount})</span>
    </div>
  );
};