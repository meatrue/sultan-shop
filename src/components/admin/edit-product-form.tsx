import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { InStockOption, ProductItem } from '../../types';
import { brands } from '../../store/brands';
import { careTypes } from '../../store/care-types';
import { producers } from '../../store/producers';
import { changeProduct, deleteProduct } from '../../store/slices/products-slice';
import { CATALOG_STORAGE_NAME, Storage } from '../../api/localstorage';

import classes from './admin.module.scss';

const SIZE_TYPE_OPTIONS = ['мл', 'г'];

interface IEditProductForm {
  className: string;
  product: ProductItem;
}

const EditProductForm: React.FC<IEditProductForm> = ({ className, product }) => {
  const [name, setName] = useState<string>(product.name);
  const [description, setDescription] = useState<string>(product.description);
  const [price, setPrice] = useState<number>(product.price);
  const [barcode, setBarcode] = useState<string>(product.barcode);
  const [imageUrl, setImageUrl] = useState<string>(product.imageUrl);
  const [size, setSize] = useState<string>(product.size);
  const [sizeType, setSizeType] = useState<string>(product.sizeType);
  const [producerOption, setProducerOption] = useState<number>(product.producer);
  const [brandOption, setBrandOption] = useState<number>(product.brand);
  const [careTypeOptions, setCareTypeOptions] = useState<number[]>(product.careType);
  const [inStockOption, setInStockOption] = useState<string>(String(product.inStock));

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

  const classNames = [];
  className && classNames.push(className);

  const resetForm: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setBarcode(product.barcode);
    setImageUrl(product.imageUrl);
    setSize(product.size);
    setSizeType(product.sizeType);
    setProducerOption(product.producer);
    setBrandOption(product.brand);
    setCareTypeOptions(product.careType);
    setInStockOption(String(product.inStock));
  };

  const saveChanges: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const changedProduct: ProductItem = {
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

    dispatch(changeProduct(changedProduct));

    const updatedIndex = products.findIndex(
      (product) => product.barcode === changedProduct.barcode,
    );

    if (updatedIndex === -1) return;

    const updatedProducts = [...products];
    updatedProducts.splice(updatedIndex, 1, changedProduct);
    Storage.saveToStorage(updatedProducts, CATALOG_STORAGE_NAME);
  };

  const deleteFromList: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(deleteProduct(product));

    const newProducts = products.filter((productItem) => productItem.barcode !== product.barcode);
    Storage.saveToStorage(newProducts, CATALOG_STORAGE_NAME);
  };

  return (
    <form className={classNames.join(' ')} onSubmit={saveChanges} onReset={resetForm}>
      <h3 className={classes.formTitleSecondary}>{name}</h3>

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
            onInput={(e) => setPrice(Number(e.currentTarget.value))}
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
            required
          />
          <select
            className={`${classes.formSelect} ${classes.formSizeType}`}
            value={sizeType}
            onChange={(e) => setSizeType(e.target.value)}
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
            value={inStockOption}
            onChange={(e) => setInStockOption(e.currentTarget.value)}
            required>
            <option value={InStockOption.TRUE}>да</option>
            <option value={InStockOption.FALSE}>нет</option>
          </select>
        </label>
      </p>

      <div className={classes.editButtonsContainer}>
        <button className={`${classes.saveButton} button`} type="submit">
          Сохнарить
        </button>
        <button className={`${classes.cancelButton} button`} type="reset">
          Отмена
        </button>
        <button className={`${classes.deleteButton} button`} type="button" onClick={deleteFromList}>
          Удалить
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
