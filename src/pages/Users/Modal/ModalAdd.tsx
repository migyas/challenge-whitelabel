import {Dispatch, SetStateAction} from 'react';
import {PlusCircle} from 'phosphor-react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Input from '@/components/Input';
import {Modal, ModalBody, ModalFooter} from '@/components/Modal';
import {Select} from '@/components/Select';
import {optionsBackgroundColor} from '@/utils/mocks/optionsBackgroundColor';
import {optionsLevel} from '@/utils/mocks/optionsLevel';
import {Button} from '@/components/Button';
import {ButtonContainer, InputWrapper, ModalContent, ModalForm} from './styles';
import useCustomToast from '@/hooks/useCustomToast';
import {NewUserFormData, newUserFormValidationSchema} from '../UserSchema';
import {CorDeFundo, UserData} from '..';
import useUser from '@/hooks/useUser';

interface ModalAddProps {
  isOpen: boolean;
  toggle: () => void;
  setUsers: Dispatch<SetStateAction<UserData[]>>;
}

export function ModalAdd({isOpen, toggle}: ModalAddProps) {
  const toast = useCustomToast();
  const {userLogged, createNewUserInLocalStorage} = useUser();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: {errors},
  } = useForm<NewUserFormData | any>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(newUserFormValidationSchema),
  });

  function optionsLevelFilteredOperator() {
    return optionsLevel.filter((option) => option.value === 'operator');
  }

  async function onSubmit({nivel, corDeFundo, ...rest}: NewUserFormData) {
    try {
      const newUser = {
        id: new Date().getMilliseconds(),
        ...rest,
        nivel: nivel.value,
        corDeFundo: corDeFundo.value as CorDeFundo,
      };
      createNewUserInLocalStorage(newUser);

      toast({
        data: {
          color: 'success',
          message: 'O <strong>usuário</strong> foi criado com sucesso!',
        },
      });
      reset();
    } catch {
      toast({
        data: {
          color: 'error',
          message: 'Servidor fora do ar!',
        },
      });
      throw new Error('Servidor fora do ar');
    } finally {
      toggle();
    }
  }

  function handleToggleReset() {
    reset();
    toggle();
  }

  return (
    <Modal
      isOpen={isOpen}
      toggle={handleToggleReset}
      size="lg"
      headerIcon={<PlusCircle />}
    >
      <ModalBody>
        <ModalContent>
          <header>
            <strong>Novo cadastro de usuário</strong>
          </header>
          <ModalForm>
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
                    helperText={
                      errors.corDeFundo?.message && 'Campo obrigatório'
                    }
                    error={!!errors.corDeFundo}
                  />
                )}
              />
            </InputWrapper>
          </ModalForm>
        </ModalContent>
      </ModalBody>
      <ModalFooter>
        <ButtonContainer>
          <Button
            text="Cancelar"
            variant="outlined"
            onClick={handleToggleReset}
          />
          <Button text="Criar" type="submit" onClick={handleSubmit(onSubmit)} />
        </ButtonContainer>
      </ModalFooter>
    </Modal>
  );
}
