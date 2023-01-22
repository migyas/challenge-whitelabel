import styled from 'styled-components';

export const ModalContent = styled.div`
  padding: 1rem 2.5rem;

  header {
    strong {
      color: #222;
    }

    span {
      color: ${(props) => props.theme['gray-600']};
    }
  }
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const InputWrapper = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 765px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 545px) {
    grid-template-columns: 1fr;
  }
`;

export const ButtonContainer = styled.div`
  padding: 2rem 2.5rem;
  gap: 1rem 2.5rem;
  display: flex;
`;
