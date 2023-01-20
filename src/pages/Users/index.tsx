import {useEffect, useState} from 'react';
import {getAllUsers} from '@/services/v1/user-service';
import {BackgroundColorDot, ButtonAdd, Container, UsersList} from './styles';
import Modal from '@/components/Modal/Modal';
import useDisclosure from '@/hooks/useDisclosure';
import {ModalBody, ModalFooterBlank} from '@/components/Modal';

interface User {
  nivel: string;
  nome: string;
  telefone: string;
  corDeFundo: 'gray' | 'blue';
  email: string;
  senha: string;
}

interface VariantsType {
  [key: string]: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const {isOpen, toggle} = useDisclosure();

  const VARIANTS_ROLES: VariantsType = {
    operator: 'Lojista',
    admin: 'Admin',
  };

  const VARIANTS_BACKGROUNDS_COLOURS: VariantsType = {
    gray: 'Cinza (Padrão)',
    blue: 'Azul',
  };

  async function getUsers() {
    const data = await getAllUsers();
    setUsers(data);
  }

  useEffect(() => {
    (async () => {
      await getUsers();
    })();
  }, []);

  return (
    <Container>
      <h1>Usuários</h1>
      <div>
        <ButtonAdd onClick={toggle}>Adicionar Usuário</ButtonAdd>
      </div>
      <UsersList>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Nível</th>
              <th>Cor de Fundo</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.email}>
                  <td>{user.nome}</td>
                  <td>{user.telefone}</td>
                  <td>{user.email}</td>
                  <td>{VARIANTS_ROLES[user.nivel]}</td>
                  <td>
                    <div>
                      <BackgroundColorDot color={user.corDeFundo} />
                      {VARIANTS_BACKGROUNDS_COLOURS[user.corDeFundo]}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </UsersList>
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalBody>
          <form>
            <input type="text" />
          </form>
        </ModalBody>
        <ModalFooterBlank />
      </Modal>
    </Container>
  );
}
