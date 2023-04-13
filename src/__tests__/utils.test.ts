import { getProductById } from "../utils/utils";
import catalogItems from '../assets/catalog-items.json';

describe('Проверка вспомогательных функций', () => {
  it('Проверка функции поиска элемента по баркоду', () => { 
    const foundItem = getProductById(catalogItems, '4704049097548');
    expect(foundItem?.name).toEqual('Автмат Гель СМС жидкое в растворимых капсулах Liquid Capsules Горный родник');
  });
});

