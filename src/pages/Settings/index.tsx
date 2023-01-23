import animatePresence from '@/components/AnimatePresence';
import {Button} from '@/components/Button';
import {Select} from '@/components/Select';
import useUser from '@/hooks/useUser';
import {optionsBackgroundColor} from '@/utils/mocks/optionsBackgroundColor';
import {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Container, FormContainer} from './styles';

interface SettingsProps {
  corDeFundo: {
    label: string;
    value: string;
  };
}

function Settings() {
  const {control, handleSubmit, reset} = useForm<SettingsProps>();
  const {userLogged} = useUser();

  function getCorDeFundoOption(value: string) {
    const findCorDeFundo = optionsBackgroundColor.find(
      (option) => option.value === value,
    );
    return findCorDeFundo;
  }

  function onSubmit({corDeFundo}: SettingsProps) {
    const updateCorDeFundo = {
      ...userLogged,
      corDeFundo: corDeFundo.value,
    };
    localStorage.setItem('login', JSON.stringify(updateCorDeFundo));
    window.location.reload();
  }

  useEffect(() => {
    if (userLogged) {
      const userData = {
        ...userLogged,
        corDeFundo: getCorDeFundoOption(userLogged.corDeFundo),
      };
      reset(userData);
    }
  }, []);

  return (
    <Container>
      <h1>Configurações</h1>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
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
        <Button text="Salvar alterações" type="submit" />
      </FormContainer>
    </Container>
  );
}

export default animatePresence(Settings, {
  animationType: 'onlyFadeIn',
});
