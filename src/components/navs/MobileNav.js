import React from 'react';
 
// Components
import CustomLink from '../links/CustomLink';

const MobileNav = () => {
  return (
    <>
      <div className="Nav Nav--Mobile">
        <CustomLink to="/" bsIcon="bi-square-fill" />
        <CustomLink to="/tags" bsIcon="bi-square-fill" />
      </div>
    </>
  );
};

export default MobileNav;
