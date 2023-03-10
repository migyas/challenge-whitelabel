import animatePresence from '@/components/AnimatePresence';
import {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';
import {Container} from './styles';

interface MyStoreProps extends PropsWithChildren {
  getUserLoggedPermission: string;
}

function MyStore({getUserLoggedPermission}: MyStoreProps) {
  if (getUserLoggedPermission === 'admin') {
    return <Navigate to="/" replace />;
  }
  return (
    <Container>
      <h1>Minha loja</h1>
    </Container>
  );
}

export default animatePresence(MyStore, {
  animationType: 'onlyFadeIn',
});
