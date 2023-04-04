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
