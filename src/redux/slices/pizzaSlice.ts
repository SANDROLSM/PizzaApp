import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type PizzaItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

enum Status {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

type FetchPizzasArgs = Record<string, string>;

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasArgs) => {
    const { search, sortBy, category } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://640f129a4ed25579dc44dccc.mockapi.io/items?${category}&sortBy=${sortBy}&order=asc${search}`,
    );
    return data as PizzaItem[];
  },
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending.type]: (state) => {
      state.status = Status.LOADING;
      state.items = [];
    },
    [fetchPizzas.fulfilled.type]: (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    },
    [fetchPizzas.rejected.type]: (state) => {
      state.status = Status.ERROR;
      state.items = [];
    },
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
