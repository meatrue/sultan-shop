import React, { useState } from 'react';

import { producers } from '../../store/producers';
import { getItemsCountByFilter } from '../../utils/utils';
import { Producers } from '../../types';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import classes from './search-filter.module.scss';

const OPTIONS_TO_SHOW = 4;
const IS_VISIBLE_DEFAULT = false;

interface SearchFilterProps {
  className: string;
  title: string;
  searchOptions: Producers;
  selectedOptions: Producers;
  fieldName: string;
  searchValue: string;
  onSearchButtonClick: () => void;
  onValueInput: (e: React.FormEvent<HTMLInputElement>) => void;
  onOptionsChange: React.Dispatch<React.SetStateAction<Producers>>;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  className,
  title,
  searchOptions,
  selectedOptions,
  fieldName,
  searchValue,
  onSearchButtonClick,
  onValueInput,
  onOptionsChange,
}) => {
  const filteredItems = useTypedSelector((state) => state.products.items);

  const [isVisible, setIsVisible] = useState(IS_VISIBLE_DEFAULT);

  const onCheckboxChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      const updatedSelectedOptions = selectedOptions.filter((option) => option !== value);
      onOptionsChange(updatedSelectedOptions);
      return;
    }

    const updatedSelectedOptions = [...selectedOptions, value];
    onOptionsChange(updatedSelectedOptions);
  };

  const additionalClassName = className ? ` ${className}` : '';

  return (
    <>
      <div className={`${classes.inputContainer}${additionalClassName}`}>
        <h3 className={classes.filterTitle}>{title}</h3>

        <label className={classes.searchLabel}>
          <input
            className={classes.searchInput}
            type="text"
            placeholder="Поиск..."
            value={searchValue}
            onInput={onValueInput}
          />
          <button className={classes.searchButton} type="button" onClick={onSearchButtonClick} />
        </label>
      </div>

      <div className={classes.optionsList}>
        {searchOptions.map((option, index) => {
          const filtredItemsCount = getItemsCountByFilter(
            filteredItems,
            fieldName,
            producers,
            option,
          );
          const isChecked = selectedOptions.some((selectedOption) => selectedOption === option);

          if (!isVisible && index >= OPTIONS_TO_SHOW) {
            return false;
          }

          return (
            <label key={index} className={classes.option}>
              <input
                className={classes.checkbox}
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  onCheckboxChange(option, isChecked);
                }}
              />
              <span className={classes.checkboxValue}>{option}</span>
              <span className={classes.filtredItemsCount}>({filtredItemsCount})</span>
            </label>
          );
        })}
      </div>

      <button
        className={isVisible ? classes.hide : classes.showMore}
        onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Скрыть' : 'Показать все'}
      </button>
    </>
  );
};

export default SearchFilter;
