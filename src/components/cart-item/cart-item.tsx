import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { brands } from '../../store/brands';
import { addToCart, deleteFromCart } from '../../store/slices/cart-slice';
import { ProductItem } from '../../types';
import Button from '../../ui/button/button';
import Counter from '../counter/counter';
import SizeLabel from '../size-label/size-label';

import classes from './cart-item.module.scss';

interface IPropsCartItem {
  item: ProductItem;
  count: number;
}

const CartItem: React.FC<IPropsCartItem> = ({ item, count }) => {
  const { name, description, imageUrl, sizeType, size, barcode, brand, price } = item;

  const dispatch = useDispatch();

  const changeCountOfItem = (count: number): void => {
    if (!count) return;

    dispatch(
      addToCart({
        product: item,
        count,
      }),
    );
  };

  const deleteItem = () => {
    dispatch(deleteFromCart(item));
  };

  const itemFullPrice = price * count;

  return (
    <div className={classes.container}>
      <Link className={classes.image} to={`/products/${barcode}`}>
        <img src={`img/catalog/${imageUrl}`} alt={name} />
      </Link>

      <div className={classes.description}>
        <SizeLabel size={size} sizeType={sizeType} className={classes.size} />
        <h2 className={classes.itemTitle}>
          <Link className={classes.itemTitleLink} to={`/products/${barcode}`}>
            <span className={classes.titleBrand}>{brands[brand]}</span> {name}
          </Link>
        </h2>
        <p className={classes.descriptionText}>{description}</p>
      </div>

      <div className={classes.controls}>
        <div className={classes.controlsItem}>
          <Counter className={classes.counter} initialValue={count} onChange={changeCountOfItem} />
        </div>
        <div className={classes.controlsItem}>
          <span className={classes.price}>
            {String(itemFullPrice.toFixed(2)).replace('.', ',')}&nbsp;₸
          </span>
        </div>
        <div className={classes.controlsItem}>
          <Button className={classes.deleteButton} aria-label="Удалить." onClick={deleteItem} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
