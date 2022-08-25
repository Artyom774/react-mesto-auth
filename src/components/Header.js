import React from 'react';
import logo from '../images/mesto-logo.svg';

function Header() {
  return (
    <header className="header">
      <a href="#"><img className="header__logo" src={logo} alt="Место" /></a>
    </header>
  );
}

export default Header; 