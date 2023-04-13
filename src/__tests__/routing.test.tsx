import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

import App from '../components/app/app';
import catalogItems from '../assets/catalog-items.json';
import { CARE_TYPE_DEFAULT, FILTERS_DEFAULT, SORTING_OPTIONS } from '../store/filters';
import * as customUseSelector from '../hooks/useTypedSelector';

jest.mock('../hooks/useTypedSelector');
jest.mock('react-redux');

const filtersInitialState = {
  sorting: SORTING_OPTIONS[0],
  careType: CARE_TYPE_DEFAULT,
  filters: FILTERS_DEFAULT,
};

const cartInitialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const initialState = {
  products: {
    items: catalogItems,
  },
  filters: filtersInitialState,
  cart: cartInitialState,
};

const mockedSelector = jest.spyOn(customUseSelector, 'useTypedSelector');

describe('Тест Роутинга', () => {
  it('Проверка роутинга на страницу NotFound', () => {
    mockedSelector.mockReturnValue(initialState);

    render(
      <MemoryRouter initialEntries={['/jvyhj']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('not-found-title')).toBeInTheDocument();
  });
});
