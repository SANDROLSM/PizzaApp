import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


type TSort = {
  name: string;
  sortProperty: string;
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sort: TSort;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload;
    },
  },
});

export const selectCategory = (state: RootState) => state.filterSlice.categoryId;
export const selectFilter = (state: RootState) => state.filterSlice;
export const selectFilterSort = (state: RootState) => state.filterSlice.sort;

export const { setCategoryId, setSort, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;
