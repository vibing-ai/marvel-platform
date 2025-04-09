'use client';

import React from 'react';

import { cn, withRef } from '@udecode/cn';
import {
  useTodoListElement,
  useTodoListElementState,
} from '@udecode/plate-list/react';

import { Checkbox } from './checkbox';
import { PlateElement } from './plate-element';

export const TodoListElement = withRef(
  ({ children, className, ...props }, ref) => {
    const { element } = props;
    const state = useTodoListElementState({ element });
    const { checkboxProps } = useTodoListElement(state);

    return (
      <PlateElement
        ref={ref}
        className={cn('flex min-h-[18px]', className)}
        {...props}
      >
        <Checkbox {...checkboxProps} className="mr-2 mt-[3px]" />
        {children}
      </PlateElement>
    );
  }
);
