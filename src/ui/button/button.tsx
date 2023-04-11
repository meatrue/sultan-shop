import React, { ReactNode } from 'react';

import classes from './button.module.scss';

type ButtonType = 'button' | 'submit' | 'reset';
enum ModeType {
  BUTTON = 'button',
  LINK = 'link',
}

type ButtonProps = {
  mode?: ModeType.BUTTON;
  className?: string;
  text?: string;
  children?: ReactNode;
  type?: ButtonType;
  ['aria-label']?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
};

type LinkProps = {
  mode?: ModeType.LINK;
  className?: string;
  text?: string;
  children?: ReactNode;
  hrerf?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
};

type IButtonProps = ButtonProps | LinkProps;

const Button: React.FC<IButtonProps> = ({ className, children, text, mode, ...props }) => {
  const classNames = [classes.button];
  className && classNames.push(className);

  if (!mode || mode === ModeType.BUTTON) {
    return (
      <button className={classNames.join(' ')} {...props}>
        {children ?? text ?? ''}
      </button>
    );
  }

  return (
    <a className={classNames.join(' ')} {...props}>
      {children ?? text ?? ''}
    </a>
  );
};

export default Button;
