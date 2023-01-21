import {useForm, Controller} from 'react-hook-form';
import {NavLink, useNavigate} from 'react-router-dom';
import {zodResolver} from '@hookform/resolvers/zod';
import {Select} from '@/components/Select';
import Input from '@/components/Input';
import animatePresence from '@/components/AnimatePresence';
import {Button} from '@/components/Button';
import {createUser} from '@/services/v1/user-service';
import {optionsBackgroundColor} from '@/utils/mocks/optionsBackgroundColor';
import {optionsLevel} from '@/utils/mocks/optionsLevel';
import {FormContainer, SignContainer} from './styles';
import useCustomToast from '@/hooks/useCustomToast';
import genericLogo from '@/assets/logo-generic.svg';
import {
  NewUserFormData,
  newUserFormValidationSchema,
} from '../Users/UserSchema';

function SignUp() {
  const navigate = useNavigate();
  const toast = useCustomToast();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {errors},
    setValue,
  } = useForm<NewUserFormData | any>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(newUserFormValidationSchema),
  });

  async function onSubmit({nivel, corDeFundo, ...rest}: NewUserFormData) {
    try {
      await createUser({
        ...rest,
        nivel: nivel.value,
        corDeFundo: corDeFundo.value,
      });
      navigate('/signin');
      reset();
    } catch {
      toast({
        data: {
          color: 'error',
          message: 'Servidor fora do ar!',
        },
      });
      throw new Error('Erro na API');
    }
  }

  return (
    <SignContainer>
      <header>
        <img src={genericLogo} alt="Logomarca da empresa" />
        <strong>Criar uma conta no</strong>
        <span>SisLoterica</span>
      </header>
      <FormContainer>
        <Input
          labelText="Nome"
          {...register('nome')}
          placeholder="Nome"
          helperText={errors.nome?.message?.toString()}
          error={!!errors.nome}
        />
        <Input
          type="password"
          labelText="Senha"
          {...register('senha')}
          placeholder="Senha"
          helperText={errors.senha?.message?.toString()}
          error={!!errors.senha}
        />
        <Input
          labelText="Telefone"
          {...register('telefone')}
          mask="(99) 9 9999-9999"
          setValue={setValue}
          placeholder="Telefone"
          helperText={errors.telefone?.message?.toString()}
          error={!!errors.telefone}
        />
        <Input
          type="email"
          labelText="Email"
          placeholder="Email"
          {...register('email')}
          helperText={errors.email?.message?.toString()}
          error={!!errors.email}
        />
        <Controller
          name="nivel"
          control={control}
          render={({field}) => (
            <Select
              {...field}
              options={optionsLevel}
              labelText="Nível"
              helperText={errors.nivel?.message && 'Campo obrigatório'}
              error={!!errors.nivel}
            />
          )}
        />
        <Controller
          name="corDeFundo"
          control={control}
          rules={{required: 'Obrigatório'}}
          render={({field}) => (
            <Select
              {...field}
              options={optionsBackgroundColor}
              labelText="Cor de fundo"
              helperText={errors.corDeFundo?.message && 'Campo obrigatório'}
              error={!!errors.corDeFundo}
            />
          )}
        />
        <Button
          text="Registrar"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        />
      </FormContainer>
      <footer>
        <span>
          Você já possui conta? <NavLink to="/signin">Entrar</NavLink>
        </span>
      </footer>
    </SignContainer>
  );
}

export default animatePresence(SignUp, {
  animationType: 'slideRight',
});
