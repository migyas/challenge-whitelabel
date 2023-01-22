import animatePresence from '@/components/AnimatePresence';
import {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';
import {Container} from './styles';

interface OperationProps extends PropsWithChildren {
  getUserLoggedPermission: string;
}

function Operation({getUserLoggedPermission}: OperationProps) {
  if (getUserLoggedPermission === 'operator') {
    return <Navigate to="/users" replace />;
  }

  return (
    <Container>
      <h1>Operação</h1>
    </Container>
  );
}

export default animatePresence(Operation, {
  animationType: 'onlyFadeIn',
});
