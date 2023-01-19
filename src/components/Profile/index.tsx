import { ProfileContainer } from "./styles";

export function Profile() {
  return (
    <ProfileContainer>
      <button>Sair</button>
      <header>
        <div>
          <strong>Yan Dias</strong>
          <span>Front-end</span>
        </div>
        <img src="https://github.com/migyas.png" alt="" />
      </header>
    </ProfileContainer>
  );
}
