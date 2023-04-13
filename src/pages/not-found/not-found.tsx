import React from 'react';

import classes from './not-found.module.scss';

const NotFound: React.FC = () => {
  return (
    <h2 className={classes.title} data-testid="not-found-title">
      Страница не найдена
    </h2>
  );
};

export default NotFound;
