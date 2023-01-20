import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import genericLogo from '@/assets/logo-generic.svg';
import useAuth from '@/hooks/useAuth';
import {getAllUsers} from '@/services/v1/user-service';
import {getToken} from '@/utils/authUtils';
import {FormContainer, SignContainer} from './styles';
import {useNavigate} from 'react-router-dom';

type User = {
  nome: string;
  email: string;
};

export default function SignIn() {
  const {register, handleSubmit} = useForm();
  const [error, setError] = useState<Error | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const {handleLogin, loading} = useAuth();
  const isAuth = getToken();
  const navigate = useNavigate();

  async function getUsers() {
    const data = await getAllUsers();
    setUsers(data);
  }

  useEffect(() => {
    (async () => {
      getUsers();
    })();
  }, []);

  async function onSubmit(data: any) {
    const findUser = users.find((user) => user.email === data.email);
    try {
      if (findUser) {
        handleLogin(findUser, true);
      }
    } catch (error) {
      setError({
        name: 'Erro',
        message: (error as Error)!.message,
      });
    }
  }

  // useEffect(() => {
  //   if (isAuth) {
  //     navigate("/");
  //   }
  // }, [isAuth]);

  return (
    <SignContainer>
      <header>
        <img src={genericLogo} alt="Logomarca da empresa" />
        <strong>Olá, seja bem vindo ao </strong>
        <span>SisLoterica</span>
      </header>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          {...register('email')}
          id="email"
          type="email"
          placeholder="E-mail"
        />
        <label htmlFor="password">Senha</label>
        <input
          {...register('senha')}
          id="password"
          type="password"
          placeholder="Senha"
        />
        <button type="submit">Entrar</button>
      </FormContainer>
      <footer>
        <span>
          Ainda não possui uma conta?{' '}
          <NavLink to="/signup">Registre-se</NavLink>
        </span>
      </footer>
    </SignContainer>
  );
}
