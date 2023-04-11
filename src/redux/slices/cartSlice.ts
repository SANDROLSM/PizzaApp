import { calcTotalPrice } from './../../utils/calcTotalPrice';
import { getCartFromLocalStorage } from './../../utils/getCartFromLocalStorage';
import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartIem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartIem[];
}

const cartData = getCartFromLocalStorage();

const initialState: CartSliceState = {
  items: cartData.items,
  totalPrice: cartData.totalPrice,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartIem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<CartIem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price;
      }

      // Вместо дизейбла кнопки можем повесить удаление
      // state.items = state.items.filter((obj) => obj.count !== 0);
    },
    removeItem(state, action: PayloadAction<CartIem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        state.totalPrice = state.totalPrice - findItem.price * findItem.count;
      }
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id);
export const selectCart = (state: RootState) => state.cartSlice;

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
