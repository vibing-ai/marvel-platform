'use client';

import React from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, SvgIcon } from '@mui/material';
import { cn, withRef } from '@udecode/cn';
import { SlateElement } from '@udecode/plate';
import { useCodeBlockElementState } from '@udecode/plate-code-block/react';

import { CodeBlockCombobox } from './code-block-combobox';

export const CodeBlockElement = withRef(
  ({ children, className, ...props }, ref) => {
    const { element } = props;
    const state = useCodeBlockElementState({ element });

    const handleCopy = () => {
      const codeContent = element.children
        .map((child) =>
          child.children.map((textNode) => textNode.text).join('')
        )
        .join('\n');
      navigator.clipboard.writeText(codeContent);
    };

    return (
      <SlateElement
        ref={ref}
        className={cn('relative py-1', state.className, className)}
        {...props}
      >
        <pre className="overflow-x-auto rounded-md bg-muted px-6 py-8 font-mono text-sm leading-[normal] [tab-size:2] relative">
          {state.syntax && (
            <div
              className="absolute top-2 w-full"
              contentEditable={false}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <CodeBlockCombobox />
              <IconButton size="small" onClick={handleCopy} disableRipple>
                <SvgIcon
                  component={ContentCopyIcon}
                  inheritViewBox
                  sx={{ fontSize: 16, opacity: 0.5 }}
                />
              </IconButton>
            </div>
          )}
          <code>{children}</code>
        </pre>
      </SlateElement>
    );
  }
);
