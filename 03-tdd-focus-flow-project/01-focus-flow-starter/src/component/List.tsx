import ItemCard from './ItemCard';
import { type Item } from '../utils';

const List =({
  items,
  onDelete,
}: {
  items: Item[];
  onDelete: (id: string) => void;
}) => {
  console.log(items)
  return (
    <section className='mt-8'>
      List
    </section>
  );
}

export default  List;