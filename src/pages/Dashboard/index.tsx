import { useState, useEffect } from "react";
import { getAllUsers } from "../../services/v1/user-service";
import { Container } from "./styles";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const data = await getAllUsers();
    setUsers(data);
  }

  // useEffect(() => {
  //   (async () => {
  //     await getUsers();
  //   })();
  // }, []);

  // console.log(users);

  return (
    <Container>
      <h1>Geral</h1>
    </Container>
  );
}
