import styled from 'styled-components';

export const SignContainer = styled.div`
  min-width: 360px;
  max-width: 410px;
  background: ${(props) => props.theme['white']};
  padding: 1rem 1.875rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  header {
    display: flex;
    flex-direction: column;
    justify-content: center;

    & img {
      width: 9rem;
      height: 8.75rem;
      margin: 0 auto;
    }

    & strong {
      font-size: 1.563rem;
      color: ${(props) => props.theme['gray-700']};
      line-height: 1.4;
    }

    & span {
      font-size: 2rem;
      color: ${(props) => props.theme['yellow-500']};
      font-weight: bold;
      line-height: 1.2;
    }
  }

  footer {
    margin-top: 1.2rem;

    span {
      font-size: 0.875rem;
      color: ${(props) => props.theme['gray-400']};
    }

    a {
      color: ${(props) => props.theme['blue-500']};
      font-weight: bolder;
      text-decoration: none;
    }
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 0.6rem;
`;
