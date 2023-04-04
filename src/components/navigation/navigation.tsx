import React from 'react';

import classes from './navigation.module.scss';

const NAVIGATION_ITEMS = [
  {
    id: 0,
    title: 'О компании',
    link: '#',
  },
  {
    id: 1,
    title: 'Доставка и оплата',
    link: '#',
  },
  {
    id: 2,
    title: 'Возврат',
    link: '#',
  },
  {
    id: 3,
    title: 'Контакты',
    link: '#',
  },
];

interface INavigationProps {
  mode?: string;
}

const Navigation: React.FC<INavigationProps> = ({ mode }) => {
  const navClassName = mode ? `navigation--${mode}` : `navigation`;

  return (
    <nav className={classes[navClassName]}>
      {NAVIGATION_ITEMS.map((navItem) => (
        <div className={classes.item} key={navItem.id}>
          <a className={classes.link} href={navItem.link}>
            {navItem.title}
          </a>
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
