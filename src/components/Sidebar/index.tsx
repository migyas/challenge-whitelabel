import {
  ChartPieSlice,
  Users,
  Storefront,
  GearSix,
  CaretDoubleRight,
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
        className={classNames('', {
          '--expand': isOpen,
        })}
      >
        <header>
          <img src={whiteLabelLogo} alt="Logomarca da empresa" />
          <strong>Nome Empresa</strong>
        </header>
        <nav>
          <SidebarNavItem to="/">
            <ChartPieSlice size={18} />
            <strong>Geral</strong>
          </SidebarNavItem>
          <SidebarNavItem to="/users">
            <Users size={18} />
            <strong>Usuários</strong>
          </SidebarNavItem>
          <SidebarNavItem to="/my-store">
            <Storefront size={18} />
            <strong>Minha loja</strong>
          </SidebarNavItem>
        </nav>
        <footer>
          <SidebarNavItem to="/settings">
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
