import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { SORTING_OPTIONS } from '../../store/filters';
import { setSorting } from '../../store/slices/filters-slice';

import classes from './sorting.module.scss';

const IS_OPEN_DEFAULT = false;

const Sorting: React.FC = () => {
  const selectedSorting = useTypedSelector((state) => state.filters.sorting);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(IS_OPEN_DEFAULT);
  const sortingContainerClassName = classes.sortingContainer;

  const onSelectClick = (): void => {
    setIsOpen(!isOpen);
  };

  const onOptionClick = (index: number): void => {
    setIsOpen(!isOpen);
    dispatch(setSorting(SORTING_OPTIONS[index]));
  };

  const onDocumentClick = (e: MouseEvent) => {
    if (e.target instanceof Element) {
      if (!e.target.closest(`.${sortingContainerClassName}`)) {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', onDocumentClick);

    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  const isArrowUpClassName = isOpen ? ' ' + classes.isArrowUp : '';
  const isSelectClose = isOpen ? '' : ' ' + classes.isClose;

  return (
    <div className={sortingContainerClassName}>
      <div className={classes.sortingValueContainer + isArrowUpClassName} onClick={onSelectClick}>
        <div className={classes.sortingValueInner}>
          <span className={classes.sortingLabel}>Сортировка:</span>
          <span className={classes.sortingValue}>{selectedSorting.title}</span>
        </div>
      </div>

      <div className={`${classes.sortingOptionsList}${isSelectClose}`}>
        {SORTING_OPTIONS.map((option, index) => {
          let sortingOptionClassName = classes.sortingOption;
          selectedSorting === option && (sortingOptionClassName += ` ${classes.activeSorting}`);

          return (
            <div
              key={index}
              className={sortingOptionClassName}
              onClick={() => onOptionClick(index)}>
              {option.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sorting;
