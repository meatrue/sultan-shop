import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { careTypes } from '../../store/care-types';
import { setCareType } from '../../store/slices/filters-slice';

import classes from './categories.module.scss';

enum BlockWidth {
  MIN = '100px',
  MID = '120px',
  MAX = '140px',
}

const getBlockWidth = (string: string): BlockWidth => {
  const stringLength = string.length;

  if (stringLength <= 16) {
    return BlockWidth.MIN;
  }

  if (stringLength >= 20) {
    return BlockWidth.MAX;
  }

  return BlockWidth.MID;
};

export enum CategoriesMode {
  BLOCKS = 'blocks',
  LINKS = 'links',
}

interface ICategoriesProps {
  className: string;
  mode?: CategoriesMode;
}

const Categories: React.FC<ICategoriesProps> = ({ className, mode = CategoriesMode.BLOCKS }) => {
  const { careType } = useTypedSelector((state) => state.filters);
  const dispatch = useDispatch();

  const onFilterClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number): void => {
    e.preventDefault();
    dispatch(setCareType(index));
  };

  const ContainerAdditionalClassName = className ? ` ${className}` : '';

  let listClassName = classes.listBlocks;
  let itemClassName = classes.itemBlock;
  let activeItemClassName = classes.isActiveBlock;

  if (mode === CategoriesMode.LINKS) {
    listClassName = classes.listLinks;
    itemClassName = classes.itemLink;
    activeItemClassName = classes.isActiveLink;
  }

  return (
    <div className={`${listClassName}${ContainerAdditionalClassName}`}>
      {careTypes.map((type, index) => {
        const width = getBlockWidth(type);
        const isActiveClassName = index === careType ? ` ${activeItemClassName}` : '';

        return (
          <a
            href="#"
            key={index}
            className={itemClassName + isActiveClassName}
            style={mode === CategoriesMode.BLOCKS ? { width, minWidth: width } : {}}
            onClick={(e) => onFilterClick(e, index)}>
            {type}
          </a>
        );
      })}
    </div>
  );
};

export default Categories;
