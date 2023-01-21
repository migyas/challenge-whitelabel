import {Button} from '@/components/Button';
import {Modal, ModalBody, ModalFooter} from '@/components/Modal';
import useCustomToast from '@/hooks/useCustomToast';
import {deleteUser} from '@/services/v1/user-service';
import {UserData} from '..';
import {ModalContent} from './styles';

interface ModalDeleteProps {
  isOpen: boolean;
  toggle: () => void;
  getUsers: () => Promise<void>;
  user: UserData;
}

export function ModalDelete({
  isOpen,
  toggle,
  getUsers,
  user,
}: ModalDeleteProps) {
  const toast = useCustomToast();

  async function handleDeleteUser() {
    try {
      await deleteUser(user.id);
      toast({
        data: {
          color: 'success',
          message: 'O <strong>usuário</strong> foi deletado com sucesso!',
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
    } finally {
      getUsers();
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
        <div style={{padding: '2rem 2.5rem', gap: '1rem', display: 'flex'}}>
          <Button text="Cancelar" variant="outlined" onClick={toggle} />
          <Button text="Deletar" onClick={handleDeleteUser} />
        </div>
      </ModalFooter>
    </Modal>
  );
}
