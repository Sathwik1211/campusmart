import { memo } from 'react';

interface MemoizedCardProps {
  children: React.ReactNode;
  className?: string;
}

const MemoizedCard = memo(({ children, className = '' }: MemoizedCardProps) => (
  <div className={`bg-white rounded-2xl shadow-card border border-gray-100 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 ${className}`}>
    {children}
  </div>
));

MemoizedCard.displayName = 'MemoizedCard';
export default MemoizedCard;
