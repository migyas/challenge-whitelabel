import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const COLORS_TEXTS = {
  gray: 'gray-100',
  blue: 'gray-100',
} as const;

const COLORS_TEXTS__ACTIVE = {
  gray: 'white',
  blue: 'white',
} as const;

const BACKGROUND_COLORS__ACTIVE = {
  gray: 'gray-800',
  blue: 'blue-500',
} as const;

export const SidebarNavItem = styled(NavLink)<BackgroundColorProps>`
  display: flex;
  align-items: center;
  padding: 1rem;
  text-decoration: none;
  color: ${(props) =>
    props.theme[COLORS_TEXTS[props.variant]] ||
    props.theme['bg-sidebar-item-default']};
  transition: all 0.2s;
  gap: 0.5rem;

  &.active {
    background: ${(props) =>
      props.theme[BACKGROUND_COLORS__ACTIVE[props.variant]] ||
      props.theme['bg-sidebar-item-default']};
    border-left: 4px solid
      ${(props) =>
        props.theme['yellow-500'] || props.theme['bg-sidebar-item-default']};
    padding: 1rem 1.75rem;
    color: ${(props) =>
      props.theme[COLORS_TEXTS__ACTIVE[props.variant]] ||
      props.theme['bg-sidebar-item-default']};
  }
`;

export const SidebarContainer = styled.div``;

export const SidebarOverlay = styled.div`
  @media (max-width: 540px) {
    &.--expand {
      position: absolute;
      content: ' ';
      background: ${(props) => props.theme['gray-700']};
      transition: all 0.8s;
      opacity: 0.4;
      min-width: 100vw;
      height: 100%;
      top: 0;
      right: 0;
      z-index: 1000;
    }
  }
`;

const BACKGROUND_COLORS = {
  gray: 'bg-sidebar-default',
  blue: 'blue-700',
} as const;

interface BackgroundColorProps {
  variant: keyof typeof BACKGROUND_COLORS;
}

export const SidebarContent = styled.div<BackgroundColorProps>`
  background: ${(props) =>
    props.theme[BACKGROUND_COLORS[props.variant]] ||
    props.theme['bg-sidebar-default']};
  width: 16rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s;

  &.--expand {
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
    color: ${(props) => props.theme['gray-100']};
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
    border-top: 1px solid ${(props) => props.theme['gray-100']};
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
    background-color: ${(props) => props.theme['gray-300']};
    transition: all 0.3s;

    &:hover {
      background-color: ${(props) => props.theme['gray-700']};

      svg {
        color: ${(props) => props.theme['gray-100']};
      }
    }

    svg {
      color: ${(props) => props.theme['gray-900']};
      transform: rotate(-180deg);
      transition: transform 0.3s;
    }

    &.--rotate {
      svg {
        transform: rotate(0deg);
      }
    }
  }

  @media (max-width: 540px) {
    position: fixed;

    z-index: ${(props) => props.theme.zIndexes.sidebar};

    &.sidebar__overlay {
      content: '';
      background: red;
      width: 100vw;
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
      background-color: ${(props) => props.theme['gray-700']};
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
