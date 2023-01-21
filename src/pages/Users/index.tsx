import {useEffect, useState} from 'react';
import {Pencil} from 'phosphor-react';
import Modal from '@/components/Modal/Modal';
import {ModalBody, ModalFooterBlank} from '@/components/Modal';
import useDisclosure from '@/hooks/useDisclosure';
import {getAllUsers} from '@/services/v1/user-service';
import {BackgroundColorDot, ButtonAdd, Container, UsersList} from './styles';
import {ModalAdd} from './ModalAdd';
import animatePresence from '@/components/AnimatePresence';

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

function Users() {
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
              <th>Editar</th>
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
                  <td>
                    <button title="Editar">
                      <Pencil size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </UsersList>
      <ModalAdd isOpen={isOpen} toggle={toggle} getUsers={getUsers} />
    </Container>
  );
}

export default animatePresence(Users, {
  animationType: 'onlyFadeIn',
});
