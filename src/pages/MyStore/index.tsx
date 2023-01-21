import animatePresence from '@/components/AnimatePresence';
import {Container} from './styles';

function MyStore() {
  return (
    <Container>
      <h1>Minha loja</h1>
    </Container>
  );
}

export default animatePresence(MyStore, {
  animationType: 'onlyFadeIn',
});
