import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem 1rem;

  @media (max-width: 450px) {
    margin-left: 4rem;
  }
`;

export const FormContainer = styled.form`
  margin-top: 5rem;
  width: 100%;
  height: 80%;
  background: ${(props) => props.theme['white']};
  padding: 1rem 2.5rem 2rem 1rem;
  border-radius: 5px;

  div {
    width: 12rem;
  }
`;
