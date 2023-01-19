import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SidebarNavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 1rem;
  text-decoration: none;
  color: #9fa2b4;
  transition: all 0.2s;
  gap: 0.5rem;

  &.active {
    background: ${(props) => props.theme["gray-700"]};
    border-left: 4px solid ${(props) => props.theme["yellow-500"]};
    padding: 1rem 1.75rem;
    color: ${(props) => props.theme["gray-100"]};
  }
`;

export const SidebarContainer = styled.div`
  background: #363740;
  width: 16rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s;

  &.--mobile {
    width: 3.75rem;

    header {
      display: flex;
      width: 100%;
      flex-wrap: nowrap;

      strong {
        transition: all 0.8s cubic-bezier(0.26, 0.54, 0.32, 1);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
    }

    nav,
    footer {
      a {
        padding: 1rem 1.3rem;

        svg {
          min-width: 18px;
          visibility: visible;
        }
      }

      strong {
        transition: all 0.8s cubic-bezier(0.26, 0.54, 0.32, 1);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
    }
  }

  header {
    padding: 2rem 1rem;
    color: ${(props) => props.theme["gray-100"]};
    gap: 0.5rem;
    display: flex;
    align-items: baseline;
    font-weight: bold;

    img {
      width: 1.75rem;
      height: 1.75rem;
    }

    strong {
      white-space: nowrap;
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: 1rem;
    margin-bottom: 8rem;
    gap: 0.5rem;

    strong {
      white-space: nowrap;
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }

    svg {
      min-width: 18px;
    }
  }

  footer {
    display: flex;
    flex-direction: column;
    border-top: 1px solid ${(props) => props.theme["gray-100"]};
    padding-top: 1rem;
    margin-bottom: 2rem;

    strong {
      white-space: nowrap;
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }

    svg {
      min-width: 18px;
    }
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 1rem;
    background-color: ${(props) => props.theme["gray-300"]};
    transition: all 0.3s;

    &:hover {
      background-color: ${(props) => props.theme["gray-700"]};

      svg {
        color: ${(props) => props.theme["gray-100"]};
      }
    }

    svg {
      color: ${(props) => props.theme["gray-900"]};
      transform: rotate(-180deg);
      transition: transform 0.3s;
    }

    &.--rotate {
      svg {
        transform: rotate(0deg);
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 2rem;
    margin-bottom: 1rem;
    padding: 1rem 1.5rem;
    width: 2rem;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme["gray-700"]};
    }

    img {
      transform: rotate(180deg);
    }

    &.--rotate {
      img {
        transform: rotate(-180deg);
      }
    }
  }
`;
