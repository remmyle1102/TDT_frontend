import React from 'react';
import { MdClearAll, MdExitToApp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button, Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import bn from 'utils/bemnames';
import { authenticationService } from 'services/authenticationService';
const bem = bn.create('header');
function Header() {
  const handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };
  const logout = () => {
    localStorage.removeItem('currentUser');
    authenticationService.currentUser = null;
  };

  return (
    <Navbar light expand className={bem.b('bg-white')}>
      <Nav navbar className="mr-2">
        <Button outline onClick={handleSidebarControlButton}>
          <MdClearAll size={25} />
        </Button>
      </Nav>

      <Nav navbar className={bem.e('nav-right')}>
        <NavItem>
          <Button tag={Link} to={'/login'} onClick={logout}>
            <MdExitToApp /> Log out
          </Button>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default Header;
