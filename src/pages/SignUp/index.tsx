import {useForm, Controller} from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import * as zod from 'zod';
import {Select} from '@/components/Select';
import {createUser} from '@/services/v1/user-service';
import {optionsBackgroundColor} from '@/utils/mocks/optionsBackgroundColor';
import {optionsLevel} from '@/utils/mocks/optionsLevel';
import genericLogo from '@/assets/logo-generic.svg';
import {FormContainer, SignContainer} from './styles';

const defaultOption = {
  value: '',
  label: 'Selecione a opção',
};

const newUserFormValidationSchema = zod.object({
  nivel: zod.object({
    value: zod.string(),
    label: zod.string(),
  }),
  nome: zod.string(),
  telefone: zod.string(),
  corDeFundo: zod.object({
    value: zod.string(),
    label: zod.string(),
  }),
  email: zod.string(),
  senha: zod.string(),
});

export type NewUserFormData = zod.infer<typeof newUserFormValidationSchema>;

export default function SignUp() {
  const {register, handleSubmit, control, reset} = useForm<NewUserFormData>({
    defaultValues: {
      nome: '',
      telefone: '',
      email: '',
      senha: '',
      corDeFundo: defaultOption,
      nivel: defaultOption,
    },
  });

  async function onSubmit({nivel, corDeFundo, ...rest}: NewUserFormData) {
    try {
      await createUser({
        ...rest,
        nivel: nivel.value,
        corDeFundo: corDeFundo.value,
      });
    } catch {
      console.log('deu erro');
    } finally {
      console.log('terminou');
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
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nome</label>
        <input {...register('nome')} id="name" placeholder="Nome" />
        <label htmlFor="email">Email</label>
        <input
          {...register('email')}
          id="email"
          type="email"
          placeholder="E-mail"
        />
        <label htmlFor="telephone">Telefone</label>
        <input
          {...register('telefone')}
          id="telephone"
          placeholder="Telefone"
        />
        <Controller
          name="nivel"
          control={control}
          render={({field}) => (
            <Select {...field} options={optionsLevel} labelText="Nível" />
          )}
        />
        <Controller
          name="corDeFundo"
          control={control}
          render={({field}) => (
            <Select
              {...field}
              options={optionsBackgroundColor}
              labelText="Cor de fundo"
            />
          )}
        />
        <label htmlFor="password">Senha</label>
        <input
          {...register('senha')}
          id="password"
          type="password"
          placeholder="Senha"
        />
        <button type="submit">Registrar</button>
      </FormContainer>
      <footer>
        <span>
          Você já possui conta? <NavLink to="/signin">Entrar</NavLink>
        </span>
      </footer>
    </SignContainer>
  );
}
