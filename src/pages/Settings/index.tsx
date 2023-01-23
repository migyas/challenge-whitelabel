import animatePresence from '@/components/AnimatePresence';
import {Button} from '@/components/Button';
import Input from '@/components/Input';
import {Select} from '@/components/Select';
import useUser from '@/hooks/useUser';
import {optionsBackgroundColor} from '@/utils/mocks/optionsBackgroundColor';
import {optionsLevel} from '@/utils/mocks/optionsLevel';
import {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {CorDeFundo} from '../Users';
import {NewUserFormData} from '../Users/UserSchema';
import {Container, FormContainer, InputWrapper} from './styles';

interface SettingsProps {
  corDeFundo: {
    label: string;
    value: string;
  };
}

function Settings() {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: {errors},
    setValue,
  } = useForm<NewUserFormData | any>();
  const {userLogged} = useUser();

  function getCorDeFundoOption(value: string) {
    const findCorDeFundo = optionsBackgroundColor.find(
      (option) => option.value === value,
    );
    return findCorDeFundo;
  }

  function getNivelOption(value: string) {
    const findNivel = optionsLevel.find((option) => option.value === value);
    return findNivel;
  }

  function onSubmit({corDeFundo, nivel, ...rest}: NewUserFormData) {
    // const findIndexUser = users.findIndex((item) => item.id === user.id);
    const updateUser = {
      ...rest,
      id: userLogged.id,
      nivel: nivel.value,
      corDeFundo: corDeFundo.value as CorDeFundo,
    };
    // users[findIndexUser] = updateUser;
    // localStorage.setItem('users', JSON.stringify(users));
    // setUsers((prevState) => [...prevState]);
    localStorage.setItem('login', JSON.stringify(updateUser));
    window.location.reload();
  }

  function optionsLevelFilteredOperator() {
    return optionsLevel.filter((option) => option.value === 'operator');
  }

  useEffect(() => {
    if (userLogged) {
      const userData = {
        ...userLogged,
        corDeFundo: getCorDeFundoOption(userLogged.corDeFundo),
        nivel: getNivelOption(userLogged.nivel),
      };
      reset(userData);
    }
  }, []);

  return (
    <Container>
      <h1>Configurações</h1>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Input
            labelText="Nome"
            {...register('nome')}
            placeholder="Nome"
            helperText={errors.nome?.message?.toString()}
            error={!!errors.nome}
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
            control={control}
            name="telefone"
            render={({field}) => (
              <Input
                {...field}
                labelText="Telefone"
                mask="(99) 9 9999-9999"
                setValue={setValue}
                placeholder="Telefone"
                helperText={errors.telefone?.message?.toString()}
                error={!!errors.telefone}
              />
            )}
          />
          <Input
            type="password"
            labelText="Senha"
            {...register('senha')}
            placeholder="Senha"
            helperText={errors.senha?.message?.toString()}
            error={!!errors.senha}
          />
          <Controller
            name="nivel"
            control={control}
            render={({field}) => (
              <Select
                {...field}
                options={
                  userLogged.nivel === 'operator'
                    ? optionsLevelFilteredOperator()
                    : optionsLevel
                }
                labelText="Nível"
                helperText={errors.nivel?.message && 'Campo obrigatório'}
                error={!!errors.nivel}
              />
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
        </InputWrapper>
        <div>
          <Button text="Salvar alterações" type="submit" />
        </div>
      </FormContainer>
    </Container>
  );
}

export default animatePresence(Settings, {
  animationType: 'onlyFadeIn',
});
