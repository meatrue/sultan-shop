import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';

import Accordion from '../../components/accordion/accordion';
import Counter from '../../components/counter/counter';
import SizeLabel from '../../components/size-label/size-label';
import { brands } from '../../store/brands';
import catalogItems from '../../store/catalog-items.json';
import { producers } from '../../store/producers';
import { getProductById } from '../../utils/utils';
import { addToCart } from '../../store/slices/cart-slice';
import GoBack from '../../components/go-back/go-back';
import { ProductItem } from '../../types';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import classes from './product.module.scss';

const IN_STOCK_LABEL_PARAMS = {
  inStock: {
    title: 'В наличии',
    className: classes.inStock,
  },

  notInStock: {
    title: 'Нет в наличии',
    className: classes.notInStock,
  },
};

const Product: React.FC = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const isMobileMedium = useMediaQuery({
    query: '(max-width: 630px)',
  });

  const { id } = useParams();
  const product: ProductItem | undefined = getProductById(catalogItems, id);

  const dispatch = useDispatch();
  const foundItem = useTypedSelector((state) =>
    state.cart.items.find((item) => item.product.barcode === id),
  );
  const foundCount: number = foundItem?.count ?? 0;
  const [countInCart, setCountInCart] = useState<number>(foundCount);

  if (!product) {
    return <h2 className={classes.notFound}>Товар не найден</h2>;
  }

  const addItemToCart = (): void => {
    if (!countInCart) return;

    dispatch(
      addToCart({
        product,
        count: countInCart,
      }),
    );
  };

  const { name, description, imageUrl, sizeType, size, barcode, producer, brand, price, inStock } =
    product;

  const inStockLabelParams = inStock
    ? IN_STOCK_LABEL_PARAMS.inStock
    : IN_STOCK_LABEL_PARAMS.notInStock;

  return (
    <div className={classes.wrapper}>
      {isMobile ? (
        <GoBack className={classes.goBack} />
      ) : (
        <div className={`${classes.breadcrumbs} breadcrumbs`}>
          <Link className="breadcrumbsItem" to="/">
            Главная
          </Link>
          <Link className="breadcrumbsItem" to="/">
            Каталог
          </Link>
          <span className="breadcrumbsItem">
            {brands[brand].toUpperCase()} {name}
          </span>
        </div>
      )}

      <div className={classes.imageWrapper}>
        <img className={classes.image} src={`/img/catalog/${imageUrl}`} alt={name} />
      </div>

      <div className={classes.contentWrapper}>
        <div className={`${classes.inStockLabel} ${inStockLabelParams.className}`}>
          {inStockLabelParams.title}
        </div>
        <h1 className={classes.title}>
          <span className={classes.titleBrand}>{brands[brand]}</span> {name}
        </h1>

        <SizeLabel size={size} sizeType={sizeType} className={classes.size} />
        {!isMobileMedium && (
          <div className={classes.addProductContainer}>
            <strong className={classes.price}>{String(price).replace('.', ',')} ₸</strong>
            <Counter
              className={classes.counter}
              initialValue={countInCart}
              onChange={setCountInCart}
            />
            <button className={`${classes.buyButton} button`} onClick={addItemToCart}>
              В корзину
            </button>
          </div>
        )}

        {isMobileMedium && (
          <>
            <div className={classes.addProductContainer}>
              <strong className={classes.price}>{String(price).replace('.', ',')} ₸</strong>
              <Counter
                className={classes.counter}
                initialValue={countInCart}
                onChange={setCountInCart}
              />
            </div>

            <div className={classes.addProductContainer}>
              <button className={`${classes.buyButton} button`} onClick={addItemToCart}>
                В корзину
              </button>
              <button
                className={`${classes.shareButton} button`}
                type="button"
                aria-label="Поделиться."
              />
            </div>
          </>
        )}

        <div className={classes.additionalButtonsContainer}>
          {!isMobileMedium && (
            <button className={classes.shareButton} type="button" aria-label="Поделиться." />
          )}
          <div className={classes.delivery}>
            <span>
              При покупке от <strong>10 000 ₸</strong> бесплатная доставка по Кокчетаву и области
            </span>
          </div>
          <a className={classes.priceList} href="#">
            <span>Прайс-лист</span>
          </a>
        </div>

        <div className={classes.info}>
          <dl className={classes.infoItem}>
            <dt className={classes.infoTitle}>Производитель: </dt>
            <dd className={classes.infoContent}>{producers[producer]}</dd>
          </dl>
          <dl className={classes.infoItem}>
            <dt className={classes.infoTitle}>Брэнд:</dt>
            <dd className={classes.infoContent}>{brands[brand]}</dd>
          </dl>
          <dl className={classes.infoItem}>
            <dt className={classes.infoTitle}>Артикул:</dt>
            <dd className={classes.infoContent}>460404</dd>
          </dl>
          <dl className={classes.infoItem}>
            <dt className={classes.infoTitle}>Штрихкод:</dt>
            <dd className={classes.infoContent}>{barcode}</dd>
          </dl>
        </div>

        <Accordion className={classes.description} title="Описание">
          <p className={classes.descriptionContent}>{description}</p>
        </Accordion>

        <Accordion className={classes.characteristics} title="Характеристики">
          <div>
            <dl className={classes.infoItem}>
              <dt className={classes.infoTitle}>Назначение:</dt>
              <dd className={classes.infoContent}>BioMio</dd>
            </dl>
            <dl className={classes.infoItem}>
              <dt className={classes.infoTitle}>Тип:</dt>
              <dd className={classes.infoContent}>BioMio</dd>
            </dl>
            <dl className={classes.infoItem}>
              <dt className={classes.infoTitle}>Производитель:</dt>
              <dd className={classes.infoContent}>{producers[producer]}</dd>
            </dl>
            <dl className={classes.infoItem}>
              <dt className={classes.infoTitle}>Бренд:</dt>
              <dd className={classes.infoContent}>{brands[brand]}</dd>
            </dl>
            <dl className={classes.infoItem}>
              <dt className={classes.infoTitle}>Артикул:</dt>
              <dd className={classes.infoContent}>460404</dd>
            </dl>
            <dl className={classes.infoItem}>
              <dt className={classes.infoTitle}>Штрихкод:</dt>
              <dd className={classes.infoContent}>{barcode}</dd>
            </dl>
            <dl className={classes.infoItem}>
              <dt className={classes.infoTitle}>Вес:</dt>
              <dd className={classes.infoContent}>300 г</dd>
            </dl>
            <dl className={classes.infoItem}>
              <dt className={classes.infoTitle}>Объем:</dt>
              <dd className={classes.infoContent}>200 мл</dd>
            </dl>
            <dl className={classes.infoItem}>
              <dt className={classes.infoTitle}>Кол-во в коробке:</dt>
              <dd className={classes.infoContent}>12</dd>
            </dl>
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default Product;
