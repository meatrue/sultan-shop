import { Filters, FiltersMethods, PriceFilter, ProducersFilter, ProductItem, SortingOption } from '../types';
import { filterByPrice, filterByProducers } from '../utils/utils';

export const PRICE_MIN = 0;
export const PRICE_MAX = 10000;

export const SORTING_OPTIONS: SortingOption[] = [
  {
    title: 'Название по возрастанию',
    field: 'name',
    increase: true
  },
  {
    title: 'Название по убыванию',
    field: 'name',
    increase: false
  },
  {
    title: 'Цена по возрастанию',
    field: 'price',
    increase: true
  },
  {
    title: 'Цена по убыванию',
    field: 'price',
    increase: false
  },
];

export const FILTERS_DEFAULT: Filters = {
  price: {
    min: PRICE_MIN,
    max: PRICE_MAX
  },

  producers: {
    values: []
  }
};

export const filtersMethods: FiltersMethods = {
  price,
  producers
}

function price(this: PriceFilter, items: ProductItem[]): ProductItem[] {
  return filterByPrice(items, this.min, this.max);
}

function producers(this: ProducersFilter, items: ProductItem[]): ProductItem[] {
  return filterByProducers(items, this.values);
}

export const CARE_TYPE_DEFAULT = null;
