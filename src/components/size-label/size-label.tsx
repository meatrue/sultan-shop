import React from 'react';

import classes from './size-label.module.scss';

const SIZE_TYPES = [
  {
    units: 'мл',
    className: classes.sizeVolume,
  },

  {
    units: 'л',
    className: classes.sizeWeight,
  },
];

const findClassNameBySizeType = (sizeType: string): string =>
  SIZE_TYPES.find((sizeTypeItem) => sizeTypeItem.units === sizeType)?.className;

interface ISizeLabelReactProps {
  size: string;
  sizeType: string;
  className?: string;
}

const SizeLabel: React.FC<ISizeLabelReactProps> = ({ size, sizeType, className }) => {
  const classNames = [];
  let sizeTypeClassName = findClassNameBySizeType(sizeType);

  sizeTypeClassName && classNames.push(sizeTypeClassName);
  className && classNames.push(className);

  return (
    <div className={classNames.join(' ')}>
      {size} {sizeType}
    </div>
  );
};

export default SizeLabel;
