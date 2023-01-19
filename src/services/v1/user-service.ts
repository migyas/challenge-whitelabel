import { api } from "../api";

async function getAllUsers() {
  const { data } = await api.get("/users");
  return data;
}

async function createUser(user: any) {
  const { data } = await api.post("/users", user);
  return data;
}

async function updateUser(user: any, id: string) {
  const { data } = await api.put(`/users/${id}`, user);
  return data;
}

async function deleteUser(id: string) {
  const { data } = await api.delete(`/users/${id}`);
  return data;
}

export { getAllUsers, createUser, updateUser, deleteUser };
