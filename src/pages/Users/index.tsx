import {Fragment, useEffect, useState} from 'react';
import {Pencil} from 'phosphor-react';
import useDisclosure from '@/hooks/useDisclosure';
import {getAllUsers} from '@/services/v1/user-service';
import {BackgroundColorDot, ButtonAdd, Container, UsersList} from './styles';
import {ModalAdd} from './Modal/ModalAdd';
import animatePresence from '@/components/AnimatePresence';
import {ModalEdit} from './Modal/ModalEdit';

interface User {
  id: number;
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
  const [user, setUser] = useState<User>({} as User);
  const {isOpen: isOpenModalAdd, toggle: toggleModalAdd} = useDisclosure();
  const {isOpen: isOpenModalEdit, toggle: toggleModalEdit} = useDisclosure();

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
        <ButtonAdd onClick={toggleModalAdd}>Adicionar Usuário</ButtonAdd>
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
                <Fragment key={user.id}>
                  <tr>
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
                      <button
                        title="Editar"
                        onClick={() => {
                          toggleModalEdit();
                          setUser(user);
                        }}
                      >
                        <Pencil size={20} />
                      </button>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </UsersList>
      <ModalAdd
        isOpen={isOpenModalAdd}
        toggle={toggleModalAdd}
        getUsers={getUsers}
      />
      <ModalEdit
        isOpen={isOpenModalEdit}
        toggle={toggleModalEdit}
        getUsers={getUsers}
        user={user}
      />
    </Container>
  );
}

export default animatePresence(Users, {
  animationType: 'onlyFadeIn',
});
