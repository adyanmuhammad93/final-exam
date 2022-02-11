import React from 'react';
import {
  Link,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
 
export default function CustomLink({ to, page, bsIcon, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <>
      <Link
        className={match ? 'Nav__Link Nav__Link--Active' : 'Nav__Link'}
        to={to}
        {...props}
      >
        <div className="Nav__Link__Icon">
          <i className={bsIcon}></i>
        </div>
        <div className="Nav__Link__Title">
          &nbsp;
          {match && page }
          </div>
      </Link>
    </>
  );
}