import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { InStockOption } from '../../types';
import { brands } from '../../store/brands';
import { careTypes } from '../../store/care-types';
import { producers } from '../../store/producers';
import { addProduct } from '../../store/slices/products-slice';
import { CATALOG_STORAGE_NAME, Storage } from '../../api/localstorage';

import classes from './admin.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const DEFAULT_TEXT = '';
const SIZE_TYPE_OPTIONS = ['мл', 'г'];
const SIZE_TYPE_DEFAULT = SIZE_TYPE_OPTIONS[0];
const PRODUCERS_DEFAULT = 0;
const BRANDS_DEFAULT = 0;
const CARE_TYPES_DEFAULT: number[] = [];
const IN_STOCK_DEFAULT = true;

interface IAddProductForm {
  className: string;
}

const AddProductForm: React.FC<IAddProductForm> = ({ className }) => {
  const [name, setName] = useState<string>(DEFAULT_TEXT);
  const [description, setDescription] = useState<string>(DEFAULT_TEXT);
  const [price, setPrice] = useState<string>(DEFAULT_TEXT);
  const [barcode, setBarcode] = useState<string>(DEFAULT_TEXT);
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_TEXT);
  const [size, setSize] = useState<string>(DEFAULT_TEXT);
  const [sizeType, setSizeType] = useState<string>(SIZE_TYPE_DEFAULT);
  const [producerOption, setProducerOption] = useState<number>(PRODUCERS_DEFAULT);
  const [brandOption, setBrandOption] = useState<number>(BRANDS_DEFAULT);
  const [careTypeOptions, setCareTypeOptions] = useState<number[]>(CARE_TYPES_DEFAULT);
  const [inStockOption, setInStockOption] = useState<string>(String(IN_STOCK_DEFAULT));

  const products = useTypedSelector((state) => state.products.items);
  const dispatch = useDispatch();

  const onCareTypeChange = (value: number, isChecked: boolean): void => {
    if (isChecked) {
      const updatedCareTypeOptions = careTypeOptions.filter((option) => option !== value);
      setCareTypeOptions(updatedCareTypeOptions);
      return;
    }

    setCareTypeOptions([...careTypeOptions, value]);
  };

  const addProductToList: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      description,
      price: Number(price),
      barcode,
      imageUrl,
      size,
      sizeType,
      producer: producerOption,
      brand: brandOption,
      careType: careTypeOptions,
      inStock: inStockOption === InStockOption.TRUE ? true : false,
    };

    dispatch(addProduct(newProduct));
    Storage.saveToStorage([...products, newProduct], CATALOG_STORAGE_NAME);

    resetForm(e);
  };

  const resetForm: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setName(DEFAULT_TEXT);
    setDescription(DEFAULT_TEXT);
    setPrice(DEFAULT_TEXT);
    setBarcode(DEFAULT_TEXT);
    setImageUrl(DEFAULT_TEXT);
    setSize(DEFAULT_TEXT);
    setSizeType(SIZE_TYPE_DEFAULT);
    setProducerOption(PRODUCERS_DEFAULT);
    setBrandOption(BRANDS_DEFAULT);
    setCareTypeOptions(CARE_TYPES_DEFAULT);
    setInStockOption(String(IN_STOCK_DEFAULT));
  };

  const classNames = [];
  className && classNames.push(className);

  return (
    <form className={classNames.join(' ')} onSubmit={addProductToList} onReset={resetForm}>
      <h2 className={classes.formTitle}>Добавить товар</h2>

      <p className={classes.formItem}>
        <label className={classes.formItemLabel}>
          <span className={classes.formItemTitle}>Название:</span>
          <input
            className={classes.formTextInput}
            type="text"
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
            required
          />
        </label>
      </p>

      <p className={classes.formItem}>
        <label className={classes.formItemLabel}>
          <span className={classes.formItemTitle}>Описание:</span>
          <textarea
            className={classes.formTextArea}
            value={description}
            onInput={(e) => setDescription(e.currentTarget.value)}
            required
          />
        </label>
      </p>

      <p className={classes.formItem}>
        <label className={classes.formItemLabel}>
          <span className={classes.formItemTitle}>Цена:</span>
          <input
            className={`${classes.formTextInput} ${classes.formPrice}`}
            type="number"
            value={price}
            onInput={(e) => setPrice(e.currentTarget.value)}
            required
          />
          <span className={classes.formPriceLabel}>₸</span>
        </label>
      </p>

      <p className={classes.formItem}>
        <label className={classes.formItemLabel}>
          <span className={classes.formItemTitle}>Штрих-код:</span>
          <input
            className={`${classes.formTextInput} ${classes.formBarcode}`}
            type="number"
            value={barcode}
            onInput={(e) => setBarcode(e.currentTarget.value)}
            required
          />
        </label>
      </p>

      <p className={classes.formItem}>
        <label className={classes.formItemLabel}>
          <span className={classes.formItemTitle}>Имя файла изображения:</span>
          <input
            className={`${classes.formTextInput} ${classes.formImageUrl}`}
            type="text"
            value={imageUrl}
            onInput={(e) => setImageUrl(e.currentTarget.value)}
            required
          />
        </label>
      </p>

      <p className={classes.formItem}>
        <label className={classes.formItemLabel}>
          <span className={classes.formItemTitle}>Размер:</span>
          <input
            className={`${classes.formTextInput} ${classes.formSize}`}
            type="text"
            value={size}
            onInput={(e) => setSize(e.currentTarget.value)}
          />
          <select
            className={`${classes.formSelect} ${classes.formSizeType}`}
            value={sizeType}
            onChange={(e) => setSizeType(e.currentTarget.value)}
            required>
            {SIZE_TYPE_OPTIONS.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </p>

      <p className={classes.formItem}>
        <label className={classes.formItemLabel}>
          <span className={classes.formItemTitle}>Производитель:</span>
          <select
            className={classes.formSelect}
            value={producerOption}
            onChange={(e) => setProducerOption(Number(e.currentTarget.value))}
            required>
            {producers.map((producer, index) => (
              <option key={index} value={index}>
                {producer}
              </option>
            ))}
          </select>
        </label>
      </p>

      <p className={classes.formItem}>
        <label className={classes.formItemLabel}>
          <span className={classes.formItemTitle}>Брэнд:</span>
          <select
            className={classes.formSelect}
            value={brandOption}
            onChange={(e) => setBrandOption(Number(e.currentTarget.value))}
            required>
            {brands.map((brand, index) => (
              <option key={index} value={index}>
                {brand}
              </option>
            ))}
          </select>
        </label>
      </p>

      <fieldset className={`${classes.formItem} ${classes.formItemFieldset}`}>
        <span className={classes.formItemFieldsetTitle}>Категория:</span>
        {careTypes.map((type, index) => {
          const isChecked = careTypeOptions.includes(index);

          return (
            <label key={index}>
              <input
                type="checkbox"
                checked={isChecked}
                value={index}
                onChange={() => onCareTypeChange(index, isChecked)}
              />{' '}
              {type}
            </label>
          );
        })}
      </fieldset>

      <p className={classes.formItem}>
        <label className={classes.formItemLabel}>
          <span className={classes.formItemTitle}>В наличии:</span>
          <select
            className={classes.formSelect}
            value={String(inStockOption)}
            onChange={(e) => setInStockOption(e.currentTarget.value)}
            required>
            <option value={InStockOption.TRUE}>да</option>
            <option value={InStockOption.FALSE}>нет</option>
          </select>
        </label>
      </p>

      <div className={classes.formButtonsContainer}>
        <button className={`${classes.formButton} button`} type="submit">
          Добавить
        </button>
        <button className={`${classes.formButton} button`} type="reset">
          Очистить
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
