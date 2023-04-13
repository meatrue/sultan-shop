import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ProductItem } from '../../types';
import Button from '../../ui/button/button';
import SizeLabel from '../size-label/size-label';
import { brands } from '../../store/brands';
import { producers } from '../../store/producers';
import { addToCart } from '../../store/slices/cart-slice';

import classes from './catalog-item.module.scss';

interface ICatalogItemProps {
  item: ProductItem;
}

const CatalogItem: React.FC<ICatalogItemProps> = ({ item }) => {
  const { name, imageUrl, sizeType, size, barcode, producer, brand, price } = item;

  const dispatch = useDispatch();

  const onBuyButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(
      addToCart({
        product: item,
        count: 1,
      }),
    );
  };

  const itemLink = `products/${barcode}`;

  return (
    <article className={classes.container}>
      <Link className={classes.imageLink} to={itemLink}>
        <img className={classes.image} src={`img/catalog/${imageUrl}`} alt={name} />
      </Link>
      <SizeLabel size={size} sizeType={sizeType} className={classes.size} />
      <Link className={classes.titleLink} to={itemLink}>
        <h3 className={classes.title}>
          <span className={classes.titleBrand}>{brands[brand]}</span> {name}
        </h3>
      </Link>

      <div className={classes.infoContainer}>
        <p className={classes.infoItem}>
          Штрихкод: <strong className={classes.infoData}>{barcode}</strong>
        </p>
        <p className={classes.infoItem}>
          Производитель: <strong className={classes.infoData}>{producers[producer]}</strong>
        </p>
        <p className={classes.infoItem}>
          Брэнд: <strong className={classes.infoData}>{brands[brand]}</strong>
        </p>
      </div>

      <p className={classes.priceCntainer}>
        <strong className={classes.price}>{String(price).replace('.', ',')} ₸</strong>

        <Button
          data-testid="add-to-cart"
          className={classes.buyButton}
          text="В корзину"
          onClick={onBuyButtonClick}
        />
      </p>
    </article>
  );
};

export default CatalogItem;
