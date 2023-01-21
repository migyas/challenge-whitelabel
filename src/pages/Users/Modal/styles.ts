import styled from 'styled-components';

export const ModalContent = styled.div`
  padding: 1rem 2.5rem;

  header {
    strong {
      color: #222;
    }
  }
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;

  div {
    display: flex;
    gap: 1rem;
  }
`;
