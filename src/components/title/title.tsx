import React from 'react';

import classes from './title.module.scss';

type TitleTag = 'h1' | 'h2' | 'h3';
type TitleType = 'large' | 'medium' | 'small';

interface ITitleProps {
  tag?: TitleTag;
  size?: TitleType;
  text: string;
  className?: string;
}

const Title: React.FC<ITitleProps> = ({ tag, size, text, className }) => {
  const classNames = [classes.title];
  className && classNames.push(className);
  size && classes[size] && classNames.push(classes[size]);

  const Tag = tag || 'h1';

  return <Tag className={classNames.join(' ')}>{text}</Tag>;
};

export default Title;
