import styled from "styled-components";

export const SuspenseContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  border-bottom: 5px solid ${(props) => props.theme["yellow-500"]};

  display: flex;
  justify-content: center;
  color: ${(props) => props.theme["green-500"]};
`;
