import animatePresence from '@/components/AnimatePresence';
import {Container} from './styles';

function Settings() {
  return (
    <Container>
      <h1>Configurações</h1>
    </Container>
  );
}

export default animatePresence(Settings, {
  animationType: 'onlyFadeIn',
});
