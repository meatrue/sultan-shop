import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filters, SortingOption } from '../../types';

import {
  CARE_TYPE_DEFAULT,
  FILTERS_DEFAULT,
  SORTING_OPTIONS,
} from '../filters';

type FiltersState = {
  sorting: SortingOption;
  careType: number | null;
  filters: Filters;
};

const initialState: FiltersState = {
  sorting: SORTING_OPTIONS[0],
  careType: CARE_TYPE_DEFAULT,
  filters: FILTERS_DEFAULT
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,

  reducers: {
    setSorting(state, action: PayloadAction<SortingOption>) {
      state.sorting = action.payload;
    },

    setCareType(state, action: PayloadAction<number | null>) {
      state.careType = action.payload;
    },

    setFilters(state, action: PayloadAction<Filters>) {
      const {
        price,
        producers
      } = action.payload;

      state.filters.price.min = price.min;
      state.filters.price.max = price.max;
      state.filters.producers.values = producers.values;
    }
  }
});

export const {
  setSorting,
  setCareType,
  setFilters
} = filterSlice.actions;

export default filterSlice.reducer;
