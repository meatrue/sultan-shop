import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import * as reduxHooks from 'react-redux';

import * as customUseSelector from '../hooks/useTypedSelector';
import * as cartSlice from '../store/slices/cart-slice';
import Cart from '../pages/cart/cart';

jest.mock('react-redux');
jest.mock('../hooks/useTypedSelector');
jest.mock('../store/slices/cart-slice');

const cartInitialState = {
  items: [
    {
      product: {
        name: 'Автмат Гель СМС жидкое в растворимых капсулах Liquid Capsules Горный родник',
        imageUrl: 'catalog-3.png',
        sizeType: 'г',
        size: '15X28.8',
        barcode: '4604409097548',
        producer: 4,
        brand: 2,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis.',
        price: 200,
        careType: [7],
        inStock: true,
      },
      count: 2,
    },
  ],
  totalPrice: 400,
  totalCount: 1,
};

const mockedSelector = jest.spyOn(customUseSelector, 'useTypedSelector');
const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockedAddToCart = jest.spyOn(cartSlice, 'addToCart');
const mockedDeleteFromCart = jest.spyOn(cartSlice, 'deleteFromCart');
const mockedClearCart = jest.spyOn(cartSlice, 'clearCart');

describe('Тест компонента <Cart />', () => {
  it('Рендер корзины', () => {
    mockedSelector.mockReturnValue(cartInitialState);

    render(
      <MemoryRouter initialEntries={['/cart']}>
        <Cart />
      </MemoryRouter>,
    );

    expect(screen.getAllByTestId('cart-item').length).toEqual(1);
    expect(screen.getAllByTestId('cart-item')[0]).toHaveTextContent(
      'Автмат Гель СМС жидкое в растворимых капсулах Liquid Capsules Горный родник',
    );

    const counterInput = screen.getByTestId('counter-input');
    expect(counterInput).toHaveValue(2);

    const cartItemPrice = screen.getByTestId('cart-item-price');
    expect(cartItemPrice).toHaveTextContent('400,00 ₸');
  });

  it('Проверка обработчиков нажатий на кнопки элемента корзины', () => {
    const dispatch = jest.fn();
    mockedSelector.mockReturnValue(cartInitialState);
    mockedDispatch.mockReturnValue(dispatch);

    render(
      <MemoryRouter initialEntries={['/cart']}>
        <Cart />
      </MemoryRouter>,
    );

    const incrementButton = screen.getByTestId('increment-button');
    fireEvent.click(incrementButton);
    expect(dispatch).toBeCalled();
    expect(mockedAddToCart).toHaveBeenCalled();

    const decrementButton = screen.getByTestId('decrement-button');
    fireEvent.click(decrementButton);
    expect(dispatch).toBeCalled();
    expect(mockedAddToCart).toHaveBeenCalled();

    const deleteButton = screen.getByTestId('delete-from-cart-button');
    fireEvent.click(deleteButton);
    expect(dispatch).toBeCalled();
    expect(mockedDeleteFromCart).toHaveBeenCalled();
  });

  it('Проверка обработчика нажатия на кнопку оформления заказа ', () => {
    const dispatch = jest.fn();
    mockedSelector.mockReturnValue(cartInitialState);
    mockedDispatch.mockReturnValue(dispatch);

    render(
      <MemoryRouter initialEntries={['/cart']}>
        <Cart />
      </MemoryRouter>,
    );

    const makeOrderButton = screen.getByTestId('make-order-button');
    fireEvent.click(makeOrderButton);
    expect(dispatch).toBeCalled();
    expect(mockedClearCart).toHaveBeenCalled();
  });
});
