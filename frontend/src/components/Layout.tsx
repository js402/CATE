import { Button, Container, Panel, Scrollable, SidebarToggle, UserMenu } from '@cate/ui';
import { ConstructionIcon } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { AuthContext } from '../lib/authContext';
import { cn } from '../lib/utils';
import { DropdownMenu } from './DropdownMenu';
import { Sidebar } from './sidebar/Sidebar';

type MenuItem = {
  path: string;
  label: string;
  icon?: React.ReactNode;
};

type Routes = {
  menu: MenuItem[];
  nav: MenuItem[];
};

type LayoutProps = {
  routes: Routes;
  defaultOpen?: boolean;
  mainContent: React.ReactNode;
  className?: string;
  mainContentClassName?: string;
};

export function Layout({
  routes: { menu, nav },
  defaultOpen = true,
  mainContent,
  className,
  mainContentClassName,
}: LayoutProps) {
  const [isSidebarOpen, setSidebarIsOpen] = useState(defaultOpen);
  const [isNavOpen, setNavIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { mutate: logout } = useLogout();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const isOnLoginPage = location.pathname === '/login';
  const { t } = useTranslation();
  const sidebarDisabled = !user;

  return (
    <div className={cn('bg-background flex h-screen flex-col text-inherit', className)}>
      {/* Top Bar */}
      <Panel
        variant="bordered"
        className="flex h-16 shrink-0 items-center justify-between gap-4 bg-inherit px-4 text-inherit">
        {!sidebarDisabled ? (
          <SidebarToggle isOpen={isSidebarOpen} onToggle={() => setSidebarIsOpen(!isSidebarOpen)} />
        ) : (
          <div className="flex items-center gap-2"></div>
        )}
        <ConstructionIcon />

        <div className="flex flex-row">
          {user ? (
            <UserMenu
              isOpen={isUserMenuOpen}
              friendlyName={user.friendlyName}
              mail={user.email}
              logout={logout}
              onToggle={setIsUserMenuOpen}
            />
          ) : (
            !isOnLoginPage && (
              <Button onClick={() => navigate('/login')}>{t('common.login')}</Button>
            )
          )}
          <DropdownMenu isOpen={isNavOpen} setIsOpen={setNavIsOpen} items={menu} />
        </div>
      </Panel>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          disabled={sidebarDisabled}
          isOpen={isSidebarOpen}
          setIsOpen={setSidebarIsOpen}
          items={nav}
        />

        {/* Main Content */}
        <Panel
          variant="flat"
          className={cn('min-h-full flex-1 bg-inherit text-inherit', mainContentClassName)}>
          <Scrollable orientation="vertical" className="h-full">
            <Container>{mainContent}</Container>
          </Scrollable>
        </Panel>
      </div>
    </div>
  );
}
