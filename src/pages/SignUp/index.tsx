import {useForm, Controller} from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import * as zod from 'zod';
import {Select} from '@/components/Select';
import {createUser} from '@/services/v1/user-service';
import {optionsBackgroundColor} from '@/utils/mocks/optionsBackgroundColor';
import {optionsLevel} from '@/utils/mocks/optionsLevel';
import genericLogo from '@/assets/logo-generic.svg';
import {FormContainer, SignContainer} from './styles';
import Input from '@/components/Input';
import {zodResolver} from '@hookform/resolvers/zod';
import animatePresence from '@/components/AnimatePresence';
import {Button} from '@/components/Button';

const newUserFormValidationSchema = zod
  .object({
    nivel: zod.object({
      value: zod.string(),
      label: zod.string(),
    }),
    nome: zod.string().min(1, 'Campo obrigatório'),
    telefone: zod.string().min(9, 'Campo obrigatório'),
    corDeFundo: zod.object({
      value: zod.string(),
      label: zod.string(),
    }),
    email: zod.string().min(1, 'Campo obrigatório'),
    senha: zod.string().min(8, 'Mínimo de 8 caracteres'),
  })
  .required();

export type NewUserFormData = zod.infer<typeof newUserFormValidationSchema>;

function SignUp() {
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
    } catch {
      throw new Error('Erro na API');
    } finally {
      reset();
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
