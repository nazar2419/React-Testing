import { Trash2 } from 'lucide-react';

type ItemCardProps = {
  id: string;
  title: string;
  description: string;
  category: string;
  onDelete: (id: string) => void;
};

const categoryColors = {
  urgent: 'bg-red-500',
  important: 'bg-yellow-500',
  normal: 'bg-blue-500',
  low: 'bg-green-500',
};

const ItemCard = ({
  id,
  title,
  description,
  category,
  onDelete,
}: ItemCardProps) => {
  return (
    
  );
};
export default ItemCard;
