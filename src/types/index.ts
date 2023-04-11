interface IProductItemDynamicKeys {
  [key: string]: string | number | number[] | boolean;
}
export interface ProductItem extends IProductItemDynamicKeys {
  name: string;
  imageUrl: string;
  sizeType: string;
  size: string;
  barcode: string;
  producer: number;
  brand: number;
  description: string;
  price: number;
  careType: number[];
  inStock: boolean;
};

export type Producers = string[];

export type Brands = string[];

export type CareTypes = string[];

export enum InStockOption {
  TRUE = 'true',
  FALSE = 'false',
}

export type SortingOption = {
  title: string;
  field: string;
  increase: boolean
};

export type PriceFilter = {
  min: number;
  max: number;
};

export type ProducersFilter = {
  values: string[];
};

interface FiltersDinamicKeys {
  [keys: string]: PriceFilter | ProducersFilter;
}

export interface Filters extends FiltersDinamicKeys {
  price: PriceFilter;
  producers: ProducersFilter;
};

type PriceFilterMethod = (this: PriceFilter, items: ProductItem[]) => ProductItem[];
type ProducersFilterMethod = (this: ProducersFilter, items: ProductItem[]) => ProductItem[];

export interface FiltersMethods {
  [key: string]: PriceFilterMethod | ProducersFilterMethod;
}
