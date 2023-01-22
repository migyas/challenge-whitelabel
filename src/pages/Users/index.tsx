import {Fragment, useEffect, useState} from 'react';
import {Pencil, Trash} from 'phosphor-react';
import useDisclosure from '@/hooks/useDisclosure';
import {BackgroundColorDot, ButtonAdd, Container, UsersList} from './styles';
import {ModalAdd} from './Modal/ModalAdd';
import animatePresence from '@/components/AnimatePresence';
import {ModalEdit} from './Modal/ModalEdit';
import {ModalDelete} from './Modal/ModalDelete';

export interface UserData {
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
  const [users, setUsers] = useState<UserData[]>([
    {
      nome: 'Yan Dias',
      telefone: '(61)9 9386-8323',
      email: 'admin@whitelabel.com',
      senha: '12345678',
      nivel: 'admin',
      corDeFundo: 'gray',
      id: 1,
    },
  ]);
  const [user, setUser] = useState<UserData>({} as UserData);
  const {isOpen: isOpenModalAdd, toggle: toggleModalAdd} = useDisclosure();
  const {isOpen: isOpenModalEdit, toggle: toggleModalEdit} = useDisclosure();
  const {isOpen: isOpenModalDelete, toggle: toggleModalDelete} =
    useDisclosure();

  const VARIANTS_ROLES: VariantsType = {
    operator: 'Lojista',
    admin: 'Admin',
  };

  const VARIANTS_BACKGROUNDS_COLOURS: VariantsType = {
    gray: 'Cinza (Padrão)',
    blue: 'Azul',
  };

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
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => {
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
                      <td>
                        <button
                          title="Deletar"
                          onClick={() => {
                            toggleModalDelete();
                            setUser(user);
                          }}
                        >
                          <Trash size={20} />
                        </button>
                      </td>
                    </tr>
                  </Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={100}>Nenhum usuário cadastrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </UsersList>
      <ModalAdd
        isOpen={isOpenModalAdd}
        toggle={toggleModalAdd}
        setUsers={setUsers}
      />
      <ModalEdit
        isOpen={isOpenModalEdit}
        toggle={toggleModalEdit}
        user={user}
        setUsers={setUsers}
      />
      <ModalDelete
        isOpen={isOpenModalDelete}
        toggle={toggleModalDelete}
        user={user}
        setUsers={setUsers}
      />
    </Container>
  );
}

export default animatePresence(Users, {
  animationType: 'onlyFadeIn',
});
