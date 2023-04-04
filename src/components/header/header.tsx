import React from 'react';
import { Link } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import Logo from '../logo/logo';
import Navigation from '../navigation/navigation';

import classes from './header.module.scss';

const Header: React.FC = () => {
  const { totalPrice, totalCount } = useTypedSelector((state) => state.cart);

  return (
    <header className={classes.header}>
      <div className={classes.menu}>
        <div className={`${classes.menuWrapper} wrapper`}>
          <ul className={`${classes.contacts} reset-list`}>
            <li className={`${classes.contactsItem} ${classes.contactsAddress}`}>
              <strong className={classes.contactsItemTitle}>
                г. Кокчетав, ул. Ж. Ташенова 129Б
              </strong>
              <span className={classes.contactsItemAdditional}>(Рынок Восточный)</span>
            </li>

            <li className={`${classes.contactsItem} ${classes.contactsEmail}`}>
              <a
                className={`${classes.contactsItemTitle} ${classes.contactsLink}`}
                href="mailto:opt.sultan@mail.ru">
                opt.sultan@mail.ru
              </a>
              <span className={classes.contactsItemAdditional}>На связи в любое время</span>
            </li>
          </ul>

          <Navigation mode="header" />
        </div>
      </div>

      <div className={classes.menuAdditional}>
        <div className={`${classes.menuAdditionalWrapper} wrapper`}>
          <button className={classes.menuButton}>
            <span className={classes.menuButtonInner}></span>
          </button>
          <Logo className={classes.headerLogo} />

          <div className={classes.tools}>
            <Link className={classes.catalogButton} to="/">
              <span className={classes.catalogButtonLabel}>Каталог</span>
            </Link>

            <form className={classes.searchForm}>
              <input className={classes.searchInput} type="text" placeholder="Поиск..." />
              <button
                className={classes.searchSubmit}
                type="submit"
                aria-label="Подтвердить."
                data-title="Поиск">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.5297 16.5294L13.0992 13.0928L16.5297 16.5294ZM15.0002 8.5C15.0002 10.2239 14.3154 11.8772 13.0964 13.0962C11.8775 14.3152 10.2242 15 8.50024 15C6.77634 15 5.12304 14.3152 3.90405 13.0962C2.68506 11.8772 2.00024 10.2239 2.00024 8.5C2.00024 6.77609 2.68506 5.12279 3.90405 3.90381C5.12304 2.68482 6.77634 2 8.50024 2C10.2242 2 11.8775 2.68482 13.0964 3.90381C14.3154 5.12279 15.0002 6.77609 15.0002 8.5V8.5Z"
                    stroke="white"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          <div className={classes.backCall}>
            <a className={classes.backCallPhone} href="tel:+77774900091">
              +7 (777) 490-00-91
            </a>
            <span className={classes.backCallTime}>время работы: 9:00-20:00</span>
            <a className={classes.backCallLink} href="#">
              Заказать звонок
            </a>
          </div>
          <button className={`${classes.downloadButton} button`}>Прайс-лист</button>
          <Link className={classes.cart} to="/cart">
            <span className={classes.cartCount}>
              {!!totalCount && (
                <strong className={classes.cartLabel} data-count={totalCount}></strong>
              )}
            </span>
            <span className={classes.cartAdditional}>
              <span className={classes.cartTitle}>Корзина</span>
              {!!totalPrice && (
                <span className={classes.cartTotal}>
                  {String(totalPrice.toFixed(2)).replace('.', ',')} ₸
                </span>
              )}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
