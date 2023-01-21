import animatePresence from '@/components/AnimatePresence';
import {Container} from './styles';

function Dashboard() {
  return (
    <Container>
      <h1>Geral</h1>
    </Container>
  );
}

export default animatePresence(Dashboard, {
  animationType: 'onlyFadeIn',
});
