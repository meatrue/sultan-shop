import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import SearchFilter from '../search-filter/search-filter';
import CareTypes, { CareTypesMode } from '../care-types/care-types';
import { filterByValue } from '../../utils/utils';
import { producers } from '../../store/producers';
import { setCareType, setFilters } from '../../store/slices/filters-slice';
import { Producers } from '../../types';
import {
  CARE_TYPE_DEFAULT,
  Filters,
  FILTERS_DEFAULT,
  PRICE_MAX,
  PRICE_MIN,
} from '../../store/filters';

import classes from './filters.module.scss';

const PRODUCERS_SEARCH_VALUE_DEFAULT = '';
const PRODUCERS_DEFAULT: Producers = [];

interface IFiltersProps {
  className: string;
}

const FiltersBlock: React.FC<IFiltersProps> = ({ className }) => {
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

  const additionalClassName = className ? ` ${className}` : '';

  return (
    <section className={`${classes.wrapper}${additionalClassName}`}>
      <h2 className={classes.title}>Подбор по параметрам</h2>
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
          <button className={`${classes.formSubmitButton} button`} type="submit">
            Показать
          </button>
          <button
            className={`${classes.formResetButton} button`}
            type="reset"
            aria-label="Сбросить фильтры."
          />
        </div>
      </form>

      <CareTypes className={classes.careTypes} mode={CareTypesMode.LINKS} />
    </section>
  );
};

export default FiltersBlock;
