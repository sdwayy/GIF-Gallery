import React from 'react';
import './Header.scss';
import InnerForm from '../InnerForm';
import ControlBar from '../ControlBar';

const Header: React.FC = () => (
  <header className="header">
    <InnerForm additionalClasses="header__inner-form" />
    <ControlBar />
  </header>
);

export default Header;
