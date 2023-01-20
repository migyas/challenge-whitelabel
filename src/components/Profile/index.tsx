import useAuth from '@/hooks/useAuth';
import {ProfileContainer} from './styles';

export function Profile() {
  const {handleLogout} = useAuth();

  return (
    <ProfileContainer>
      <button onClick={() => handleLogout()}>Sair</button>
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
