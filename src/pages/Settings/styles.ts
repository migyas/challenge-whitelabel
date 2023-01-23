import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem 1rem;
  width: 100%;
  height: 100%;

  @media (max-width: 450px) {
    margin-left: 4rem;
  }
`;

export const FormContainer = styled.form`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  overflow: auto;
  background: ${(props) => props.theme['white']};
  padding: 2rem;
  border-radius: 5px;
`;

export const InputWrapper = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 1075px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 775px) {
    grid-template-columns: 1fr;
  }
`;
