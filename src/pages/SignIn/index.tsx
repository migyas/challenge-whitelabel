import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import * as zod from 'zod';
import genericLogo from '@/assets/logo-generic.svg';
import useAuth from '@/hooks/useAuth';
import {getAllUsers} from '@/services/v1/user-service';
import {FormContainer, SignContainer} from './styles';
import Input from '@/components/Input';
import {zodResolver} from '@hookform/resolvers/zod';
import animatePresence from '@/components/AnimatePresence';
import {NewUserFormData} from '../SignUp';
import Loader from '@/components/Loader';

const SignInFormValidationSchema = zod.object({
  email: zod.string().min(1, 'Campo obrigatório'),
  senha: zod.string().min(8, 'Mínimo de 8 caracteres'),
});

export type SignInFormData = zod.infer<typeof SignInFormValidationSchema>;

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(SignInFormValidationSchema),
  });
  const [error, setError] = useState<Error | null>(null);
  const [users, setUsers] = useState<NewUserFormData[]>([]);
  const {handleLogin, loading} = useAuth();

  async function getUsers() {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      console.log('Erro na API');
    }
  }

  useEffect(() => {
    (async () => {
      getUsers();
    })();
  }, []);

  async function onSubmit(data: SignInFormData) {
    const findUser = users.find((user) => user.email === data.email);

    if (findUser) {
      handleLogin(findUser, true);
    } else {
      setError({
        name: 'Erro',
        message: 'Usuário não encontrado',
      });
    }
  }

  return (
    <SignContainer>
      <header>
        <img src={genericLogo} alt="Logomarca da empresa" />
        <strong>Olá, seja bem vindo ao </strong>
        <span>SisLoterica</span>
      </header>
      {error && (
        <span className="signin__message--error">* {error.message}</span>
      )}
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          labelText="Email"
          placeholder="Email"
          {...register('email')}
          helperText={errors.email?.message?.toString()}
          error={!!errors.email}
        />
        <Input
          type="password"
          labelText="Senha"
          {...register('senha')}
          placeholder="Senha"
          helperText={errors.senha?.message?.toString()}
          error={!!errors.senha}
        />
        <button type="submit">
          Entrar {loading && <Loader color="#fff" />}
        </button>
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

export default animatePresence(SignIn, {
  animationType: 'slideRight',
});
