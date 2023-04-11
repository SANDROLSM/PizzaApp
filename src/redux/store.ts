import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import { composeWithDevTools } from '@redux-devtools/extension';
import cartSlice from './slices/cartSlice';
import pizza from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizza,
  },
  // @ts-ignore
  composeWithDevTools,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
