import {PlusCircle} from 'phosphor-react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Input from '@/components/Input';
import {Modal, ModalBody, ModalFooter} from '@/components/Modal';
import {Select} from '@/components/Select';
import {optionsBackgroundColor} from '@/utils/mocks/optionsBackgroundColor';
import {optionsLevel} from '@/utils/mocks/optionsLevel';
import {createUser} from '@/services/v1/user-service';
import {Button} from '@/components/Button';
import {InputWrapper, ModalContent, ModalForm} from './styles';
import useCustomToast from '@/hooks/useCustomToast';
import {NewUserFormData, newUserFormValidationSchema} from '../UserSchema';
import {Dispatch, SetStateAction} from 'react';
import {UserData} from '..';

interface ModalAddProps {
  isOpen: boolean;
  toggle: () => void;
  getUsers: () => Promise<void>;
  setUsers: Dispatch<SetStateAction<UserData[]>>;
}

export function ModalAdd({isOpen, toggle, getUsers, setUsers}: ModalAddProps) {
  const toast = useCustomToast();
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

  async function onSubmit({nivel, corDeFundo, ...rest}: NewUserFormData) {
    try {
      const user = await createUser({
        ...rest,
        nivel: nivel.value,
        corDeFundo: corDeFundo.value,
      });
      setUsers((prevState) => [...prevState, user]);
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
      // getUsers();
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
        <div style={{padding: '2rem 2.5rem', gap: '1rem', display: 'flex'}}>
          <Button
            text="Cancelar"
            variant="outlined"
            onClick={handleToggleReset}
          />
          <Button text="Criar" type="submit" onClick={handleSubmit(onSubmit)} />
        </div>
      </ModalFooter>
    </Modal>
  );
}
