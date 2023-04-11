import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

import { useGetFilteredProducts } from '../../hooks/useGetFilteredProducts';
import { ProductItem } from '../../types';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import catalogItems from '../../assets/catalog-items.json';
import CatalogList from '../../components/catalog-list/catalog-list';
import Sorting from '../../components/sorting/sorting';
import Categories, { CategoriesMode } from '../../components/categories/categories';
import Pagination from '../../components/pagination/pagination';
import GoBack from '../../components/go-back/go-back';
import FiltersForm from '../../components/filters-form/filters-form';
import Accordion, { Types } from '../../components/accordion/accordion';
import Title from '../../components/title/title';

import classes from './catalog.module.scss';
import '../../scss/style.scss';

export const FiltersContext = React.createContext('');

export const ITEMS_PER_PAGE_COUNT = 15;
export const ITEM_OFFSET_DEFAULT = 0;

const Catalog: React.FC = () => {
  const { sorting, careType, filters } = useTypedSelector((state) => state.filters);
  const products = useTypedSelector((state) => state.products.items);

  const [itemOffset, setItemOffset] = useState<number>(ITEM_OFFSET_DEFAULT);
  const [currentItems, setCurrentItems] = useState<ProductItem[]>(
    products.slice(ITEM_OFFSET_DEFAULT, ITEMS_PER_PAGE_COUNT),
  );
  const [currentPage, setCurrentPage] = useState<number>(0);

  useGetFilteredProducts({ sorting, careType, filters }, setCurrentItems, setCurrentPage);

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    catalogItems && (
      <div className={classes.mainWrapper}>
        {isMobile ? (
          <GoBack className={classes.goBack} />
        ) : (
          <div className={`${classes.breadcrumbs} breadcrumbs`}>
            <Link className="breadcrumbsItem" to="/">
              Главная
            </Link>
            <span className="breadcrumbsItem">Каталог</span>
          </div>
        )}

        <div className={classes.titleContainer}>
          <Title tag="h1" size="large" className={classes.title} text="Каталог" />

          {!isMobile && <Sorting />}
        </div>

        {!isMobile && <Categories className={classes.careTypes} />}

        <section className={classes.filters}>
          {isMobile ? (
            <Accordion
              className={classes.filtersAccordion}
              title="Подбор по параметрам"
              type={Types.STYLED}>
              <FiltersForm />
            </Accordion>
          ) : (
            <>
              <h2 className={classes.filtersTitle}>Подбор по параметрам</h2>
              <FiltersForm />
            </>
          )}

          <Categories className={classes.careTypes} mode={CategoriesMode.LINKS} />
        </section>

        {!!currentItems.length ? (
          <CatalogList items={currentItems} className={classes.catalog} />
        ) : (
          <h2 className={classes.notFound}>Товары не найдены</h2>
        )}

        <Pagination
          className={classes.pagination}
          items={products}
          itemsPerPage={ITEMS_PER_PAGE_COUNT}
          setCurrentItems={setCurrentItems}
          setItemOffset={setItemOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <p className={classes.bottomText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo,
          vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis.
          Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris
          venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.
        </p>
      </div>
    )
  );
};

export default Catalog;
