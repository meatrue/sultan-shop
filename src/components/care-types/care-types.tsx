import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { careTypes } from '../../store/care-types';
import { setCareType } from '../../store/slices/filters-slice';

import classes from './care-types.module.scss';

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

export enum CareTypesMode {
  BLOCKS = 'blocks',
  LINKS = 'links',
}

interface ICareTypesProps {
  className: string;
  mode?: CareTypesMode;
}

const CareTypes: React.FC<ICareTypesProps> = ({ className, mode = CareTypesMode.BLOCKS }) => {
  const { careType } = useTypedSelector((state) => state.filters);
  const dispatch = useDispatch();

  const onFilterClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number): void => {
    e.preventDefault();
    dispatch(setCareType(index));
  };

  const ContainerAdditionalClassName = className ? ` ${className}` : '';

  let listClassName = classes.typesListBlocks;
  let itemClassName = classes.typeItemBlock;
  let activeItemClassName = classes.isActiveBlock;

  if (mode === CareTypesMode.LINKS) {
    listClassName = classes.typesListLinks;
    itemClassName = classes.typeItemLink;
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
            style={mode === CareTypesMode.BLOCKS ? { width, minWidth: width } : {}}
            onClick={(e) => onFilterClick(e, index)}>
            {type}
          </a>
        );
      })}
    </div>
  );
};

export default CareTypes;
