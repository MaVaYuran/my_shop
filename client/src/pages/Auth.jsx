import { Input } from '../components/input/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './Auth.module.css';
import { Button } from '../components/button/Button';
import { Header } from '../components/header/Header';
import { useDispatch } from 'react-redux';
import { login, userRegister } from '../actions/authActions';
import { useNavigate } from 'react-router';

const registerSchema = yup.object().shape({
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
  name: yup
    .string()
    .required('Обязательное поле')
    .min(3, 'Минимум 3 символa')
    .max(20, 'Максимум 20 символов'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required('Обязательное поле'),
  password: yup
    .string()
    .required('Обязательное поле')
    .min(6, 'Минимум 6 символов')
    .max(16, 'Максимум 16 символов'),
});

export const Auth = ({ isRegister }) => {
  const navigate = useNavigate();
  const schema = isRegister ? registerSchema : loginSchema;
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '', passcheck: '', name: '' },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = async data => {
    setError(null);
    try {
      if (isRegister) {
        await dispatch(userRegister(data.email, data.password, data.name));
      } else {
        await dispatch(login(data.email, data.password));
      }
      navigate('/');
    } catch (error) {
      setError('root', {
        type: 'server',
        message: error.message || 'Ошибка регистрации/авторизации',
      });
    }
  };
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
              placeholder="Введите адрес почты..."
              {...register('email')}
            />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            <Input
              type="password"
              label="Password"
              placeholder="Введите пароль..."
              {...register('password')}
            />
            {errors.password && <span className={styles.error}>{errors.password.message}</span>}

            {isRegister && (
              <>
                <Input
                  type="password"
                  label="Password"
                  placeholder="Повторите пароль..."
                  {...register('passcheck')}
                />
                {errors.passcheck && (
                  <span className={styles.error}>{errors.passcheck.message}</span>
                )}
                <Input
                  type="text"
                  label="Name"
                  placeholder="Введите имя..."
                  {...register('name')}
                />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
              </>
            )}
            {errors.root && <div className={styles.serverError}>{errors.root.message} </div>}
            <Button type="submit" title={isRegister ? 'Зарегистрироваться' : 'Войти'} />
          </form>
        </div>
      </div>
    </>
  );
};
