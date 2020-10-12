import React from 'react';
import { Link } from 'gatsby';
import scrollToElement from 'scroll-to-element';

function scroller(target, offset) {
  scrollToElement(target, {
    offset,
  });
}

export function handleMenuLinkClick(link, e) {
  if (typeof window !== 'undefined' && link.includes('#')) {
    const [anchorPath, anchor] = link.split('#');
    if (window.location.pathname === anchorPath) {
      if (!!e) e.preventDefault();
      const offset = !!e ? -20 : 0;
      scroller(`#${anchor}`, offset);
    }
  }
}

export default function CustomLink({ title = 'Broken Link', to = '/404/', className = 'gatsby-link', children }) {

  const anchor = to.split('#')[1];

  const forcedActiveState = () => {

    if (typeof window === `undefined`) return '';

    if (!anchor || window.location.hash !== `#${anchor}`) return '';

    return 'active';

  }

  return (
    <Link
      to={to}
      title={title}
      activeClassName='active'
      className={`${className} ${forcedActiveState()}`}
      onClick={e => handleMenuLinkClick(to, e)}
    >
      { !!children ? { ...children } : title }
    </Link>
  );
}
