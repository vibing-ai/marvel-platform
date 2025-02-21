'use client';

import React from 'react';

import { withRef } from '@udecode/cn';
import { PlateElement } from '@udecode/plate/react';

export const LinkElement = withRef(({ children, ...props }, ref) => {
  const { element } = props;
  const { url } = element;

  const handleClick = (e) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <PlateElement ref={ref} asChild {...props}>
      <a href={url} onClick={handleClick} className="cursor-pointer">
        {children}
      </a>
    </PlateElement>
  );
});
