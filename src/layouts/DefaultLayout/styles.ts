import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  background: ${(props) => props.theme["gray-100"]};
  display: flex;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    color: ${(props) => props.theme["gray-600"]};
  }
`;
