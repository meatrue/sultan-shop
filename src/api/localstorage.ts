import { ProductItem } from "../types";

export const CATALOG_STORAGE_NAME = 'sultanCtalogItems';

const DATA_PROCESSING_ERROR = 'Ошибка обработки данных';

export class Storage {
  static saveToStorage (data: ProductItem[] | null, storageName: string): string {
    let error = '';

    data =
      (data && data.length)
        ? data
        : null;

    try {
      localStorage.setItem(storageName, JSON.stringify(data));
    } catch (e) {
      error = DATA_PROCESSING_ERROR;
    }

    return error;
  }

  static getFromStorage (storageName: string): [items: ProductItem[], error: string] {
    const data: string | null = localStorage.getItem(storageName);
    let items: ProductItem[] = [];
    let error = '';

    try {
      if (data && data.length) {
        items = JSON.parse(data);
      }
    } catch (e) {
      error = DATA_PROCESSING_ERROR;
    }

    return [items, error];
  }
}
