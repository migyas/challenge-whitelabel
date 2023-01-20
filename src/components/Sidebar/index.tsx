import {useState} from 'react';
import {
  ChartPieSlice,
  Users,
  Storefront,
  GearSix,
  CaretDoubleRight,
} from 'phosphor-react';

import {classNames} from '@/utils/classNames';
import whiteLabelLogo from '@/assets/logo.svg';

import {ButtonContainer, SidebarContainer, SidebarNavItem} from './styles';

export function Sidebar() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <SidebarContainer
      className={classNames('', {
        '--mobile': isOpenSidebar,
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
          '--rotate': isOpenSidebar,
        })}
        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
      >
        <CaretDoubleRight size={18} />
      </ButtonContainer>
    </SidebarContainer>
  );
}
