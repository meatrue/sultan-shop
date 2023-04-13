import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import * as reduxHooks from 'react-redux';

import * as cartSlice from '../store/slices/cart-slice';
import catalogItems from '../assets/catalog-items.json';
import CatalogItem from '../components/catalog-item/catalog-item';

jest.mock('react-redux');
jest.mock('../store/slices/cart-slice');

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockedAddToCart = jest.spyOn(cartSlice, 'addToCart');

describe('Тест компонента <CatalogItem />', () => {
  it('Рендер компонента', () => {
    mockedDispatch.mockReturnValue(jest.fn());

    render(
      <MemoryRouter>
        <CatalogItem item={catalogItems[0]} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/средство для мытья посуды Crystal/i)).toBeInTheDocument();
  });

  it('Проверка действия кнопки Добавить в корзину', () => {
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);

    render(
      <MemoryRouter>
        <CatalogItem item={catalogItems[0]} />
      </MemoryRouter>,
    );

    const addToCart = screen.getByTestId('add-to-cart');
    fireEvent.click(addToCart);
    expect(dispatch).toHaveBeenCalled();
    expect(mockedAddToCart).toHaveBeenCalled();
  });
});
