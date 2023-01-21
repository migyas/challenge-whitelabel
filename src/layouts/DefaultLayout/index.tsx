import {Outlet} from 'react-router-dom';
import {Profile} from '@/components/Profile';
import {Sidebar} from '@/components/Sidebar';
import {Container, MainContent} from './styles';

export function DefaultLayout() {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Profile />
        <Outlet />
      </MainContent>
    </Container>
  );
}
