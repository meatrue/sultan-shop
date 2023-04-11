import { CARE_TYPE_FIELD } from '../store/care-types';
import { producers } from '../store/producers';
import { CartItem } from '../store/slices/cart-slice';
import { Brands, Producers, ProductItem } from '../types';

export function getItemsCountByFilter(
  items: ProductItem[],
  itemFieldName: string,
  filterItems: Producers | Brands,
  filterValue: string,
): number {
  const valueIndex = filterItems.indexOf(filterValue);

  if (valueIndex === -1) {
    return 0;
  }

  const filteredItems = items.filter((item) => item[itemFieldName] === valueIndex);

  return filteredItems.length;
}

export function getSortedItems(
  items: ProductItem[],
  { field, increase: isIncrease }: { field: string; increase: boolean },
): ProductItem[] {
  return [...items].sort((item1, item2) => {
    const value1 = item1[field];
    const value2 = item2[field];

    if (isIncrease) {
      if (value1 > value2) return 1;
      if (value1 < value2) return -1;
    }

    if (value2 > value1) return 1;
    if (value2 < value1) return -1;

    return 0;
  });
}

export function filterByCareType(items: ProductItem[], typeIndex: number | null): ProductItem[] {
  return typeIndex === null
    ? items
    : items.filter((item) => item[CARE_TYPE_FIELD].includes(typeIndex));
}

export function filterByValue(items: string[], value: string): string[] {
  return !value.trim()
    ? items
    : items.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()));
}

export function filterByPrice(items: ProductItem[], min: number, max: number): ProductItem[] {
  return items.filter((item) => item.price >= min && item.price <= max);
}

export function filterByProducers(items: ProductItem[], values: string[]): ProductItem[] {
  if (!values || !values.length) {
    return items;
  }

  const producersIndexes: number[] = [];

  values.forEach((value) => {
    const producerIndex = producers.indexOf(value);
    if (producerIndex !== -1) {
      producersIndexes.push(producerIndex);
    }
  });

  if (!producersIndexes.length) {
    return items;
  }

  return items.filter((item) => producersIndexes.includes(item.producer));
}

export function getProductById(
  items: ProductItem[],
  id: string | undefined,
): ProductItem | undefined {
  return items.find((item) => item.barcode === id);
}

export function getTotalPrice(cartItems: CartItem[]): number {
  return cartItems.reduce((sum, item) => {
    const { product, count } = item;
    return sum + product.price * count;
  }, 0);
}

export function getCartTotalCount(cartItems: CartItem[]): number {
  return cartItems.reduce((sum, item) => sum + item.count, 0);
}
