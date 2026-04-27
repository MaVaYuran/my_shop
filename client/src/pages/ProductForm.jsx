import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Input } from '../components/input/Input';
import { Button } from '../components/button/Button';
import { useEffect, useState } from 'react';
import { addProduct, fetchProducts, updateProduct } from '../actions/productsActions';
import { useDispatch } from 'react-redux';
import styles from './Product.module.css';
import { useNavigate } from 'react-router';

const productSchema = yup.object().shape({
  title: yup.string().required().min(5).max(60),
  description: yup.string().max(800).nullable(),
  price: yup
    .number()
    .required('Цена обязательна')
    .positive('Цена должна быть положительной')
    .min(0, 'Цена не может быть отрицательной'),
  stock: yup
    .number()
    .typeError('Количество должно быть числом')
    .integer('Количество должно быть целым числом')
    .min(0, 'Количество не может быть отрицательным')
    .default(50),
  available: yup.boolean().default(true),
  image: yup.string().url('Введите корректный URL изображения').nullable().default(''),
  categories: yup.string().required(),
});

export const ProductForm = ({ categories = [], initialData = null, setIsEditing }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      price: initialData?.price || '',
      stock: initialData?.stock || 50,
      available: initialData?.available || true,
      image: initialData?.image || '',
      categories: initialData?.categories || '',
    },
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        if (key !== 'id') {
          setValue(key, value);
        }
      });
    }
  }, [initialData, setValue]);

  const onSubmit = async data => {
    setError(null);
    setIsSubmitting(true);
    try {
      if (initialData && initialData.id) {
        await dispatch(
          updateProduct({
            id: initialData.id,
            data: {
              title: data.title,
              description: data.description,
              price: Number(data.price),
              stock: Number(data.stock),
              available: data.available,
              image: data.image,
              categories: data.categories,
            },
          }),
        );
        setIsEditing(false);
        navigate(`/`);
      } else {
        await dispatch(
          addProduct({
            title: data.title,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            available: data.available,
            image: data.image,
            categories: data.categories,
          }),
        );
      }
      alert(`Товар ${data.title} успешно сохранён`);
      reset();
    } catch (error) {
      console.error('Ошибка при сохранении товара', error);
      setError('root', {
        type: 'server',
        message: error.message || 'Произошла ошибка при сохранении товара',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputs}>
        <Input
          type="text"
          label=""
          placeholder="Введите название товара..."
          {...register('title')}
        />{' '}
        {errors.title && <span className={styles.errorText}>{errors.title.message}</span>}
        <Input
          type="text"
          label=""
          placeholder="Добавьте описание товара..."
          {...register('description')}
        />
        {errors.description && (
          <span className={styles.errorText}>{errors.description.message}</span>
        )}
        <Input type="number" label="" placeholder="Стоимость товара..." {...register('price')} />
        {errors.price && <span className={styles.errorText}>{errors.price.message}</span>}
        <Input
          type="number"
          label=""
          placeholder="Количество на складе..."
          {...register('stock')}
        />
        {errors.stock && <span className={styles.errorText}>{errors.stock.message}</span>}
        <Input
          type="checkbox"
          label="Товар доступен"
          className={styles.checkbox}
          {...register('available')}
        />
        <Input type="text" label="" placeholder="URL картинки" {...register('image')} />
        {errors.image && <span className={styles.errorText}>{errors.image.message}</span>}
        <div className={styles.btnContainer}>
          <label htmlFor="categories">Категория</label>
          <select id="categories" {...register('categories')}>
            <option value="">Выберите категорию</option>
            {categories.length > 0 &&
              categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
          </select>
        </div>
        {errors.categories && <span className={styles.errorText}>{errors.categories.message}</span>}
        {errors.root && <div className={styles.serverError}>{errors.root.message} </div>}
      </div>
      <div className={styles.btnContainer}>
        <Button
          type="submit"
          title={initialData ? 'Изменить товар' : 'Создать товар'}
          disabled={isSubmitting}
        />
        <Button type="button" title="Очистить форму" onClick={() => reset()} />
      </div>
    </form>
  );
};
