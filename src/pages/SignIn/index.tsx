import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import genericLogo from '@/assets/logo-generic.svg';
import useAuth from '@/hooks/useAuth';
import Input from '@/components/Input';
import {zodResolver} from '@hookform/resolvers/zod';
import animatePresence from '@/components/AnimatePresence';
import {Button} from '@/components/Button';
import {SignInFormData, SignInFormValidationSchema} from './SignInSchema';
import {FormContainer, SignContainer} from './styles';

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
  const {handleLogin} = useAuth();

  async function onSubmit(data: SignInFormData) {
    if (data.email === 'admin@whitelabel.com' && data.senha === '12345678') {
      handleLogin(data, true);
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
        <Button
          text="Registrar"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        />
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
