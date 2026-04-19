import { Input } from '../components/input/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './Auth.module.css';
import { Button } from '../components/button/Button';
import { Header } from '../components/header/Header';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const formSchema = yup.object().shape({
  email: yup.string().email().required('Обязательное поле'),
  password: yup
    .string()
    .required('Обязательное поле')
    .min(6, 'Минимум 6 символов')
    .max(16, 'Максимум 16 символов'),
  passcheck: yup
    .string()
    .required('Обязательное поле')
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
  name: yup.string().min(3, 'Минимум 3 символa').max(20, 'Максимум 20 символов'),
});

export const Auth = ({ isRegister }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '', passcheck: '', name: '' },
    resolver: yupResolver(formSchema),
  });

  const [serverError, setServerError] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = {};
  return (
    <>
      <Header />
      <div style={{ marginTop: '70px' }}>
        <h2>{isRegister ? 'Регистрация' : 'Авторизация'}</h2>
        <div className={styles.authContainer}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              label="Email"
              value="email"
              placeholder="Введите адрес почты..."
              {...register('email')}
            />
            <Input
              type="password"
              label="Password"
              value="password"
              placeholder="Введите пароль..."
              {...register('password')}
            />
            {isRegister && (
              <Input
                type="password"
                label="Password"
                value="passcheck"
                placeholder="Повторите пароль..."
                {...register('passcheck')}
              />
            )}
            {isRegister && (
              <Input
                type="text"
                label="Name"
                value="name"
                placeholder="Введите имя..."
                {...register('name')}
              />
            )}
            <Button type="submit" title={isRegister ? 'Зарегистрироваться' : 'Войти'} />
          </form>
        </div>
      </div>
    </>
  );
};
