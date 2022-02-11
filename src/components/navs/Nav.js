import React from 'react';

// Components
import CustomLink from '../links/CustomLink';

const Nav = () => {
  return (
    <>
      <div className="Nav">
        <CustomLink to="/" page="Home" bsIcon="bi-square-fill" />
        <CustomLink to="/tags" page="Tags" bsIcon="bi-square-fill" />
      </div>
    </>
  );
};

export default Nav;
