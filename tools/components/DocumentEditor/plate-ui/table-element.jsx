'use client';

import React from 'react';

import { cn, withRef } from '@udecode/cn';
import { PlateElement } from '@udecode/plate/react';

export const TableElement = withRef(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateElement
        ref={ref}
        as="table"
        className={cn('border-collapse w-full', className)}
        {...props}
      >
        <tbody>{children}</tbody>
      </PlateElement>
    );
  }
);
