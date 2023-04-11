import { CartIem } from './../redux/slices/cartSlice';
export const calcTotalPrice = (items: CartIem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
