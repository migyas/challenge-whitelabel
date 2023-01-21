import {PencilCircle} from 'phosphor-react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Input from '@/components/Input';
import {Modal, ModalBody, ModalFooter} from '@/components/Modal';
import {Select} from '@/components/Select';
import {optionsBackgroundColor} from '@/utils/mocks/optionsBackgroundColor';
import {optionsLevel} from '@/utils/mocks/optionsLevel';
import {getUser, updateUser} from '@/services/v1/user-service';
import {Button} from '@/components/Button';
import {ModalContent, ModalForm} from './styles';
import {useEffect} from 'react';
import useCustomToast from '@/hooks/useCustomToast';
import {NewUserFormData, newUserFormValidationSchema} from '../UserSchema';
import {UserData} from '..';

interface ModalEditProps {
  isOpen: boolean;
  toggle: () => void;
  getUsers: () => Promise<void>;
  user: UserData;
}

export function ModalEdit({isOpen, toggle, getUsers, user}: ModalEditProps) {
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

  useEffect(() => {
    (async () => {
      const data = await getUser(user.id);
      const userData: NewUserFormData = {
        ...data,
        corDeFundo: getCorDeFundoOption(data.corDeFundo),
        nivel: getNivelOption(data.nivel),
      };
      reset(userData);
    })();
  }, [user]);

  async function onSubmit({nivel, corDeFundo, ...rest}: NewUserFormData) {
    try {
      await updateUser(
        {
          ...rest,
          nivel: nivel.value,
          corDeFundo: corDeFundo.value,
        },
        user.id,
      );
      toast({
        data: {
          color: 'success',
          message: 'O <strong>usuário</strong> foi alterado com sucesso!',
        },
      });
      reset();
    } catch {
      toast({
        data: {
          color: 'error',
          message: 'Servidor fora do ar',
        },
      });
    } finally {
      getUsers();
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
      headerIcon={<PencilCircle />}
    >
      <ModalBody>
        <ModalContent>
          <header>
            <strong>Edição/Visualização do usuário</strong>
          </header>
          <ModalForm>
            <div
              style={{
                gridTemplateColumns: '1fr 1fr 1fr',
              }}
            >
              <Input
                labelText="Nome"
                {...register('nome')}
                placeholder="Nome"
                helperText={errors.nome?.message?.toString()}
                error={!!errors.nome}
                defaultValue={user.nome}
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
            </div>
            <div
              style={{
                gridTemplateColumns: '2fr 1fr',
              }}
            >
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
            </div>
            <div
              style={{
                gridTemplateColumns: '1fr 1fr 1fr',
              }}
            >
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
            </div>
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
          <Button
            text="Salvar alterações"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </ModalFooter>
    </Modal>
  );
}
