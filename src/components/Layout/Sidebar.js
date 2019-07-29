import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import React from 'react';
import { MdAccountCircle, MdDashboard } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navItems = [
  { to: '/', name: 'audit', exact: true, Icon: MdDashboard },
  { to: '/playbook', name: 'playbook', exact: true, Icon: MdDashboard },
  { to: '/inventory', name: 'host inventory', exact: true, Icon: MdDashboard },
  {
    to: '/administrator',
    name: 'administrator',
    exact: true,
    Icon: MdDashboard,
  },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <BSNavLink
              className="text-uppercase"
              tag={NavLink}
              to="/"
              activeClassName="active"
              exact={true}
            >
              <h5 className="text-white">Tien-Duy-Tan</h5>
            </BSNavLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
