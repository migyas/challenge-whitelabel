import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 2rem;
`;

export const ButtonAdd = styled.button`
  margin-top: 3rem;
  background: ${(props) => props.theme['green-300']};
  border: 1px solid ${(props) => props.theme['gray-300']};
  padding: 1rem;
  border-radius: 5px;
  color: ${(props) => props.theme['white']};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${(props) => props.theme['green-500']};
  }
`;

export const UsersList = styled.div`
  flex: 1;
  overflow: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-100']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 40%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`;
