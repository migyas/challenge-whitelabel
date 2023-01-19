import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/v1/user-service";
import { Container, UsersList } from "./styles";

interface User {
  nivel: string;
  nome: string;
  telefone: string;
  corDeFundo: string;
  email: string;
  senha: string;
}

interface VariantRole {
  [key: string]: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const VARIANTS_ROLES: VariantRole = {
    operator: "Lojista",
    admin: "Admin",
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
        <button>Adicionar Usuário</button>
      </div>
      <UsersList>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Nível</th>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </UsersList>
    </Container>
  );
}
