import {PlusCircle} from 'phosphor-react';
import {Controller, useForm} from 'react-hook-form';
import * as zod from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import Input from '@/components/Input';
import {Modal, ModalBody, ModalFooter} from '@/components/Modal';
import {Select} from '@/components/Select';
import {optionsBackgroundColor} from '@/utils/mocks/optionsBackgroundColor';
import {optionsLevel} from '@/utils/mocks/optionsLevel';
import {createUser} from '@/services/v1/user-service';
import {Button} from '@/components/Button';
import {ModalContent, ModalForm} from './styles';
import useCustomToast from '@/hooks/useCustomToast';

interface ModalAddProps {
  isOpen: boolean;
  toggle: () => void;
  getUsers: () => Promise<void>;
}

const newUserFormValidationSchema = zod.object({
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
});

export type NewUserFormData = zod.infer<typeof newUserFormValidationSchema>;

export function ModalAdd({isOpen, toggle, getUsers}: ModalAddProps) {
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
      await createUser({
        ...rest,
        nivel: nivel.value,
        corDeFundo: corDeFundo.value,
      });
      toast({
        data: {
          color: 'success',
          message: 'O <strong>usuário</strong> foi criado com sucesso!',
        },
      });
      reset();
    } catch {
      console.log('deu erro');
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
      headerIcon={<PlusCircle />}
    >
      <ModalBody>
        <ModalContent>
          <header>
            <strong>Novo cadastro de usuário</strong>
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
          <Button text="Criar" type="submit" onClick={handleSubmit(onSubmit)} />
        </div>
      </ModalFooter>
    </Modal>
  );
}
