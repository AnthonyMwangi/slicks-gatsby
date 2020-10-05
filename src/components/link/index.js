import React from 'react';
import { Link } from 'gatsby';
import scrollToElement from 'scroll-to-element';

export function scroller(target, offset) {
  scrollToElement(target, {
    offset,
  });
}

export function handleMenuLinkClick(link, e) {
  if (typeof window !== 'undefined' && link.includes('#')) {
    const [anchorPath, anchor] = link.split('#');
    if (window.location.pathname === anchorPath) {
      e.preventDefault();
      scroller(`#${anchor}`, -20);
    }
  }
}

export default function CustomLink({ title = 'Broken Link', to = '/404/', className = 'gatsby-link', children }) {

  const anchor = to.split('#')[1];

  const forcedActiveState = () => {

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
