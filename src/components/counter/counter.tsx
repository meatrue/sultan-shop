import React, { useState } from 'react';

import classes from './counter.module.scss';

export interface ICounterProps {
  className?: String;
  initialValue: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<ICounterProps> = ({ className, initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue);

  const decrementValue = (): void => {
    let changedValue = Number(value);

    changedValue = changedValue <= 1 ? 1 : changedValue - 1;

    setValue(changedValue);
    onChange(changedValue);
  };

  const incrementValue = (): void => {
    const changedValue = Number(value) + 1;

    setValue(changedValue);
    onChange(changedValue);
  };

  const changeValue: React.FormEventHandler<HTMLInputElement> = (e) => {
    let changedValue = Number(e.currentTarget.value);

    changedValue = changedValue < 1 ? 1 : changedValue;

    setValue(changedValue);
    onChange(changedValue);
  };

  const counterClassNames = [classes.counter];
  className && counterClassNames.push(className);

  const incButtonClassNames = [classes.button, classes.incrementButton];
  const decButtonClassNames = [classes.button, classes.decrementButton];

  return (
    <div className={counterClassNames.join(' ')}>
      <button
        className={decButtonClassNames.join(' ')}
        aria-label="Уменьшить"
        onClick={decrementValue}
        data-testid="decrement-button"
      />
      <input
        className={classes.number}
        type="number"
        value={value}
        onInput={changeValue}
        data-testid="counter-input"
      />
      <button
        className={incButtonClassNames.join(' ')}
        aria-label="Увеличить"
        onClick={incrementValue}
        data-testid="increment-button"
      />
    </div>
  );
};

export default Counter;
