import {
  ChartPieSlice,
  Users,
  Storefront,
  GearSix,
  CaretDoubleRight,
  Calculator,
} from 'phosphor-react';
import {classNames} from '@/utils/classNames';
import whiteLabelLogo from '@/assets/logo.svg';
import {
  ButtonContainer,
  SidebarContainer,
  SidebarContent,
  SidebarNavItem,
  SidebarOverlay,
} from './styles';
import useDisclosure from '@/hooks/useDisclosure';
import {getUserLogged} from '@/utils/authUtils';

export function Sidebar() {
  const {isOpen, toggle} = useDisclosure();

  return (
    <SidebarContainer>
      <SidebarOverlay
        className={classNames('', {
          '--expand': !isOpen,
        })}
      />
      <SidebarContent
        backgroundColor={getUserLogged.corDeFundo}
        className={classNames('', {
          '--expand': isOpen,
        })}
      >
        <header>
          <img src={whiteLabelLogo} alt="Logomarca da empresa" />
          <strong>Nome Empresa</strong>
        </header>
        <nav>
          <SidebarNavItem backgroundColor={getUserLogged.corDeFundo} to="/">
            <Users size={18} />
            <strong>Usuários</strong>
          </SidebarNavItem>
          {getUserLogged.nivel === 'admin' ? (
            <SidebarNavItem
              backgroundColor={getUserLogged.corDeFundo}
              to="/operation"
            >
              <Calculator size={18} />
              <strong>Operação</strong>
            </SidebarNavItem>
          ) : (
            <SidebarNavItem
              backgroundColor={getUserLogged.corDeFundo}
              to="/my-store"
            >
              <Storefront size={18} />
              <strong>Minha loja</strong>
            </SidebarNavItem>
          )}
        </nav>
        <footer>
          <SidebarNavItem
            backgroundColor={getUserLogged.corDeFundo}
            to="/settings"
          >
            <GearSix size={18} />
            <strong>Configurações</strong>
          </SidebarNavItem>
        </footer>
        <ButtonContainer
          className={classNames('button', {
            '--rotate': isOpen,
          })}
          onClick={toggle}
        >
          <CaretDoubleRight size={18} />
        </ButtonContainer>
      </SidebarContent>
    </SidebarContainer>
  );
}
