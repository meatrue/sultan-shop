import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Title from '../../components/title/title';
import Button from '../../ui/button/button';
import CartItem from '../../components/cart-item/cart-item';
import { clearCart } from '../../store/slices/cart-slice';
import GoBack from '../../components/go-back/go-back';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import classes from './cart.module.scss';

const Cart: React.FC = () => {
  const { items, totalPrice } = useTypedSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [orderIsDone, setOrderIsDone] = useState<boolean>(false);

  const makeOrder = (): void => {
    dispatch(clearCart());
    setOrderIsDone(true);
  };

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    <>
      {isMobile ? (
        <GoBack className={classes.goBack} />
      ) : (
        <div className={`breadcrumbs`}>
          <Link className="breadcrumbsItem" to="/">
            Главная
          </Link>
          <span className="breadcrumbsItem">Корзина</span>
        </div>
      )}

      <section>
        <Title tag="h1" size="large" className={classes.title} text="Корзина" />

        {!!items.length && !orderIsDone && (
          <>
            <ul className={`${classes.cartList} reset-list`}>
              {items.map((item) => {
                const { product, count } = item;
                return (
                  <li key={product.barcode} className={classes.cartItem}>
                    <CartItem item={product} count={count} />
                  </li>
                );
              })}
            </ul>
            <div className={classes.order}>
              <Button
                className={classes.orderButton}
                text="Оформить заказ"
                onClick={makeOrder}
                data-testid="make-order-button"
              />

              <span className={classes.total}>
                {String(totalPrice.toFixed(2)).replace('.', ',')} ₸
              </span>
            </div>
          </>
        )}
        {!items.length && !orderIsDone && <h2 className={classes.titleSecondary}>Корзина пуста</h2>}
        {!!orderIsDone && <h2 className={classes.titleSecondary}>Спасибо за заказ</h2>}
      </section>
    </>
  );
};

export default Cart;
