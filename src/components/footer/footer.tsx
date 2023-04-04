import React from 'react';
import { useMediaQuery } from 'react-responsive';

import Logo from '../logo/logo';
import Navigation from '../navigation/navigation';

import WhatsAppIcon from '../../assets/svg/whatsapp.svg';
import TelegramIcon from '../../assets/svg/telegram.svg';
import VisaIcon from '../../assets/svg/visa.svg';
import MastercardIcon from '../../assets/svg/mastercard.svg';

import classes from './footer.module.scss';

const Footer: React.FC = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    <footer className={classes.footer}>
      <div className="wrapper">
        <div className={classes.wrapper}>
          <section className={classes.about}>
            <h3 className="visually-hidden">О компании.</h3>

            <div className={classes.logoContainer}>
              <Logo mode="light" />
              {isMobile && (
                <button className={`${classes.downloadButton} button`}>Прайс-лист</button>
              )}
            </div>

            <p className={classes.aboutText}>
              Компания «Султан» — снабжаем розничные магазины товарами "под ключ" в Кокчетаве и
              Акмолинской области
            </p>

            <form className={classes.emailForm}>
              <p className={classes.emailText}>Подпишись на скидки и акции</p>
              <p className={classes.emailInputWrapper}>
                <input
                  className={classes.emailInput}
                  type="email"
                  placeholder="Введите ваш Email"
                />
                <button className={classes.emailSubmit} type="submit" aria-label="Отправить.">
                  <svg
                    width="8"
                    height="15"
                    viewBox="0 0 8 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 12.8571L5 7.5L0 2.14286L1 0L8 7.5L1 15L0 12.8571Z" fill="white" />
                  </svg>
                </button>
              </p>
            </form>
          </section>

          <section className={classes.menu}>
            <h3 className={classes.sectionTitle}>Меню сайта:</h3>
            <Navigation mode="footer" />
          </section>

          <section className={classes.categories}>
            <h3 className={classes.sectionTitle}>Категории:</h3>
            <ul className="reset-list">
              <li className={classes.categoryItem}>
                <a className={classes.categoryLink} href="#">
                  Бытовая химия
                </a>
              </li>
              <li className={classes.categoryItem}>
                <a className={classes.categoryLink} href="#">
                  Косметика и гигиена
                </a>
              </li>
              <li className={classes.categoryItem}>
                <a className={classes.categoryLink} href="#">
                  Товары для дома
                </a>
              </li>
              <li className={classes.categoryItem}>
                <a className={classes.categoryLink} href="#">
                  Товары для детей и мам
                </a>
              </li>
              <li className={classes.categoryItem}>
                <a className={classes.categoryLink} href="#">
                  Посуда
                </a>
              </li>
            </ul>
          </section>

          <section className={classes.priceAndMessengers}>
            {!isMobile && (
              <>
                <h3 className={`${classes.sectionTitle} ${classes.priceListTitle}`}>
                  Скачать прайс-лист:
                </h3>
                <button className={`${classes.downloadButton} button`}>Прайс-лист</button>
              </>
            )}

            <p className={classes.messengersTitle}>Связь в мессенджерах:</p>
            <div className={classes.messengersList}>
              <a className={`${classes.messengerLink} ${classes.messengersWhatsApp}`} href="#">
                <img src={WhatsAppIcon} width="39" height="39" alt="Мы в WhatsApp." />
              </a>

              <a className={`${classes.messengerLink} ${classes.messengersTelegram}`} href="#">
                <img src={TelegramIcon} width="39" height="39" alt="Мы в Telegram." />
              </a>
            </div>
          </section>

          <section className={classes.contacts}>
            <h3 className={classes.sectionTitle}>Контакты:</h3>
            <div className={classes.contactsPhone}>
              <p className={classes.contactsPhoneItem}>
                <a className={classes.contactsLink} href="tel:+77774900091">
                  +7 (777) 490-00-91
                </a>
              </p>
              <p className={`${classes.contactsPhoneItem} ${classes.contactsText}`}>
                время работы: 9:00-20:00
              </p>
              <p className={classes.contactsPhoneItem}>
                <a className={classes.backCall} href="#">
                  Заказать звонок
                </a>
              </p>
            </div>

            <div className={classes.contactsEmail}>
              <p className={classes.contactsEmailItem}>
                <a className={classes.contactsLink} href="mailto:opt.sultan@mail.ru">
                  opt.sultan@mail.ru
                </a>
              </p>
              <p className={`${classes.contactsEmailItem} ${classes.contactsText}`}>
                На связи в любое время
              </p>
            </div>

            <div className={classes.cardsList}>
              <a className={classes.cardLink} href="#">
                <img src={VisaIcon} alt="Оплата картой Visa." />
              </a>

              <a className={classes.cardLink} href="#">
                <img src={MastercardIcon} alt="Оплата картой Mastercard." />
              </a>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
