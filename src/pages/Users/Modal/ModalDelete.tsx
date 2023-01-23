import {Dispatch, SetStateAction} from 'react';
import {Button} from '@/components/Button';
import {Modal, ModalBody, ModalFooter} from '@/components/Modal';
import useCustomToast from '@/hooks/useCustomToast';
import {UserData} from '..';
import {ButtonContainer, ModalContent} from './styles';
import useUser from '@/hooks/useUser';

interface ModalDeleteProps {
  isOpen: boolean;
  toggle: () => void;
  user: UserData;
  setUsers: Dispatch<SetStateAction<UserData[]>>;
}

export function ModalDelete({
  isOpen,
  toggle,
  user,
  setUsers,
}: ModalDeleteProps) {
  const toast = useCustomToast();
  const {removeUserInLocalStorage} = useUser();

  async function handleDeleteUser() {
    try {
      setUsers((prevState) =>
        prevState.filter((state) => state.id !== user.id),
      );
      removeUserInLocalStorage(user.id);
      toast({
        data: {
          color: 'success',
          message: '<strong>Usuário</strong> foi deletado com sucesso!',
        },
      });
      toggle();
    } catch {
      toast({
        data: {
          color: 'error',
          message: 'Servidor fora do ar!',
        },
      });
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="sm">
      <ModalBody>
        <ModalContent>
          <header>
            <span>
              Deseja deletar usuário <strong>{user.nome}</strong>?
            </span>
          </header>
        </ModalContent>
      </ModalBody>
      <ModalFooter>
        <ButtonContainer>
          <Button text="Cancelar" variant="outlined" onClick={toggle} />
          <Button text="Deletar" onClick={handleDeleteUser} />
        </ButtonContainer>
      </ModalFooter>
    </Modal>
  );
}
