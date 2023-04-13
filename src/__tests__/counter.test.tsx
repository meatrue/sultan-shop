import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Counter from '../components/counter/counter';

describe('Тестирование Компонента счётчика', () => {
  it('Все элементы компонента успешно рендерятся', () => {
    render(<Counter initialValue={0} onChange={() => {}} />);
    const input = screen.getByTestId('counter-input');
    expect(input).toBeInTheDocument();
    const incrementButton = screen.getByTestId('increment-button');
    expect(incrementButton).toBeInTheDocument();
    const decrementButton = screen.getByTestId('decrement-button');
    expect(decrementButton).toBeInTheDocument();
  });

  it('Инициализирующее значение передаётся в input', () => {
    render(<Counter initialValue={0} onChange={() => {}} />);
    const input = screen.getByTestId('counter-input');
    expect(input.getAttribute('value')).toBe('0');
  });

  it('Значение инпута правильно изменяется', () => {
    render(<Counter initialValue={0} onChange={() => {}} />);
    const input = screen.getByTestId('counter-input');
    fireEvent.input(input, {
      target: { value: '10' },
    });
    expect(input.getAttribute('value')).toBe('10');

    const incrementButton = screen.getByTestId('increment-button');
    fireEvent.click(incrementButton);
    expect(input.getAttribute('value')).toBe('11');
    const decrementButton = screen.getByTestId('decrement-button');
    fireEvent.click(decrementButton);
    expect(input.getAttribute('value')).toBe('10');
  });
});
