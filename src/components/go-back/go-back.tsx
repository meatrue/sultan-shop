import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './go-back.module.scss';

interface IGoBackProps {
  className: String;
}

const GoBack: React.FC<IGoBackProps> = ({ className }) => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const classNames = [classes.goBack];
  className && classNames.push(className);

  return (
    <button className={classNames.join(' ')} onClick={goBack} type="button">
      Назад
    </button>
  );
};

export default GoBack;
