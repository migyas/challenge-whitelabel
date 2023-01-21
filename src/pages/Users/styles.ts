import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  gap: 2rem;

  @media (max-width: 450px) {
    margin-left: 4rem;
  }
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

const STATUS_COLORS = {
  gray: 'bg-sidebar-default',
  blue: 'blue-500',
} as const;

interface StatusProps {
  color: keyof typeof STATUS_COLORS;
}

export const BackgroundColorDot = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: ${(props) => props.theme[STATUS_COLORS[props.color]]};
  }
`;

export const UsersList = styled.div`
  display: block;
  white-space: nowrap;
  overflow: auto;
  max-width: 100%;
  width: 100%;

  table {
    width: 100%;
    border-collapse: collapse;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;
      text-align: start;
      padding-inline-start: 1.5rem;
      padding-inline-end: 1.5rem;

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
      padding-inline-start: 1.5rem;
      padding-inline-end: 1.5rem;
      padding-top: 1rem;
      padding-bottom: 1rem;

      &:first-child {
        width: 40%;
        padding-left: 1.5rem;
      }

      &:nth-last-child(2),
      &:nth-last-child(3) {
        div {
          display: flex;
          gap: 0.5rem;
        }
      }

      &:last-child,
      &:nth-last-child(2) {
        button {
          display: flex;
          cursor: pointer;
          border: 1px solid ${(props) => props.theme['white']};
          background: transparent;
          padding: 0.25rem;
          border-radius: 5px;
          font-size: 0.875rem;
          color: ${(props) => props.theme['white']};

          &:hover {
            border: 1px solid ${(props) => props.theme['green-300']};
            color: ${(props) => props.theme['green-300']};
          }
        }
      }
    }
  }
`;
