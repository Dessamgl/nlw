import { Stack } from '@chakra-ui/react';
import {
  RiLogoutCircleLine,
  RiUserAddLine,
  RiUserSettingsLine,
  RiBookLine,
  RiHealthBookLine,
  RiBookMarkFill,
  RiContactsBookUploadLine,
} from 'react-icons/ri';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="LIVROS">
        <NavLink href="/books" shouldMatchExactHref icon={RiBookLine}>
          Visão geral
        </NavLink>
        <NavLink href="/books/create" icon={RiHealthBookLine}>
          Adicionar
        </NavLink>
        <NavLink href="/books/rent" icon={RiContactsBookUploadLine}>
          Alugar
        </NavLink>
        <NavLink href="/books/reserve" icon={RiBookMarkFill}>
          Reservar
        </NavLink>
      </NavSection>
      <NavSection title="USUÁRIOS">
        <NavLink href="/users" icon={RiUserSettingsLine}>
          Visão geral
        </NavLink>
        <NavLink href="/users/create" icon={RiUserAddLine}>
          Cadastrar
        </NavLink>
      </NavSection>
      <NavSection title="CONFIGURAÇÃO">
        <NavLink href="/" shouldMatchExactHref icon={RiLogoutCircleLine}>
          Sair
        </NavLink>
      </NavSection>
    </Stack>
  );
}
