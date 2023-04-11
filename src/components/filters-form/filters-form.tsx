import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../ui/button/button';
import SearchFilter from '../search-filter/search-filter';
import { filterByValue } from '../../utils/utils';
import { producers } from '../../store/producers';
import { setCareType, setFilters } from '../../store/slices/filters-slice';
import { Filters, Producers } from '../../types';
import { CARE_TYPE_DEFAULT, FILTERS_DEFAULT, PRICE_MAX, PRICE_MIN } from '../../store/filters';

import classes from './filters-form.module.scss';

const PRODUCERS_SEARCH_VALUE_DEFAULT = '';
const PRODUCERS_DEFAULT: Producers = [];

const FiltersForm: React.FC = () => {
  const dispatch = useDispatch();

  const [minPrice, setMinPrice] = useState<number>(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState<number>(PRICE_MAX);
  const [producersSearchValue, setProducersSearchValue] = useState<string>(
    PRODUCERS_SEARCH_VALUE_DEFAULT,
  );
  const [producersOptionsToShow, setProducersOptionsToShow] = useState<Producers>(producers);
  const [producersOptionsSelected, setProducersOptionsSelected] =
    useState<Producers>(PRODUCERS_DEFAULT);

  const getUpdatedFilters = (): Filters => {
    return {
      price: {
        min: Number(minPrice),
        max: Number(maxPrice),
      },
      producers: {
        values: producersOptionsSelected,
      },
    };
  };

  const resetForm = (): void => {
    setMinPrice(PRICE_MIN);
    setMaxPrice(PRICE_MAX);
    setProducersOptionsToShow(producers);
    setProducersSearchValue(PRODUCERS_SEARCH_VALUE_DEFAULT);
    setProducersOptionsSelected(PRODUCERS_DEFAULT);
    dispatch(setCareType(CARE_TYPE_DEFAULT));
  };

  const searchOptionsByValue = (value: string): void => {
    const filteredProducersItems = filterByValue(producers, value);
    setProducersOptionsToShow(filteredProducersItems);
  };

  const onMinPriceInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    setMinPrice(Number(e.currentTarget.value));
  };

  const onMaxPriceInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    setMaxPrice(Number(e.currentTarget.value));
  };

  const onProducersSearchConfirm = () => {
    searchOptionsByValue(producersSearchValue);
    setProducersSearchValue(PRODUCERS_SEARCH_VALUE_DEFAULT);
  };

  const onFiltersSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const updatedFilters = getUpdatedFilters();
    dispatch(setFilters(updatedFilters));
  };

  const onFiltersReset: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    resetForm();
    dispatch(setFilters(FILTERS_DEFAULT));
  };

  return (
    <form className={classes.filtersForm} onSubmit={onFiltersSubmit} onReset={onFiltersReset}>
      <div className={classes.priceContainer}>
        <h3 className={classes.priceTitle}>
          Цена <span className={classes.priceUnits}>₸</span>
        </h3>
        <label className={classes.priceInputsContainer}>
          <input
            className={classes.priceInput}
            type="number"
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={minPrice}
            onInput={onMinPriceInput}
          />
          <span className={classes.priceInputsSeparator}>-</span>
          <input
            className={classes.priceInput}
            type="number"
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={maxPrice}
            onInput={onMaxPriceInput}
          />
        </label>
      </div>

      <SearchFilter
        className={classes.searcFilters}
        title="Производитель"
        fieldName="producer"
        searchOptions={producersOptionsToShow}
        selectedOptions={producersOptionsSelected}
        searchValue={producersSearchValue}
        onSearchButtonClick={onProducersSearchConfirm}
        onValueInput={(e) => setProducersSearchValue(e.currentTarget.value)}
        onOptionsChange={setProducersOptionsSelected}
      />

      <div className={classes.formButtonsContainer}>
        <Button className={classes.formSubmitButton} type="submit" text="Показать" />
        <Button className={classes.formResetButton} type="reset" aria-label="Сбросить фильтры." />
      </div>
    </form>
  );
};

export default FiltersForm;
