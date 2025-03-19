import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cn, withCn } from '@udecode/cn';
import { useEditorRef, useEditorSelector } from '@udecode/plate/react';

import useToolbarFunctionsHook from '../../../libs/hooks/useToolbarFunctions';

import styles from '../editor/PlateEditor.module.css';

import AlignDropdownMenu from './AlignDropdownMenu';
import CodeBlockButton from './CodeBlockButton';
import FontStyle from './FontStyle';
import LinkToolbarButton from './LinkToolbarButton';
import ListDropdownMenu from './ListDropdownMenu';
import TextStyle from './TextStyle';

const ContextualToolbar = withCn(
  ToolbarPrimitive.Root,
  cn(
    'contextual-toolbar flex items-center bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-full border border-purple-500 shadow-md',
    styles.purpleToolbar
  )
);

export const FloatingContextualToolbar = () => {
  const editor = useEditorRef();
  const selection = useEditorSelector((state) => state.selection);
  const [position, setPosition] = useState({ top: -9999, left: -9999 });
  const [isVisible, setIsVisible] = useState(false);

  const {
    checkMarkActive,
    checkBlockActive,
    handleToggleMark,
    handleToggleBlock,
  } = useToolbarFunctionsHook(editor);

  useEffect(() => {
    if (!editor || !selection) {
      setIsVisible(false);
      return;
    }

    const isSelectionCollapsed = () => {
      return (
        selection.anchor.offset === selection.focus.offset &&
        selection.anchor.path.toString() === selection.focus.path.toString()
      );
    };

    if (!isSelectionCollapsed()) {
      const positionToolbar = () => {
        // Get the DOM selection object
        const domSelection = window.getSelection();

        if (domSelection && domSelection.rangeCount > 0) {
          const range = domSelection.getRangeAt(0);
          const rect = range.getBoundingClientRect();

          // Only show if there's an actual selection with width
          if (rect && rect.width > 0) {
            const editorElement = document.querySelector('.slate-editor');
            if (!editorElement) {
              setIsVisible(false);
              return;
            }

            const viewportOffset = editorElement.getBoundingClientRect();
            const top = rect.bottom - viewportOffset.top + 30;
            const left = rect.left - viewportOffset.left;

            setPosition({ top, left });
            setIsVisible(true);
            return;
          }
        }

        setIsVisible(false);
      };
      const timerId = setTimeout(positionToolbar, 5);
      return () => clearTimeout(timerId);
    }
    setIsVisible(false);
  }, [editor, selection]);

  useEffect(() => {
    if (!isVisible) return undefined;

    const handleClickOutside = (e) => {
      if (e.target.closest('.contextual-toolbar')) return;
      const domSelection = window.getSelection();
      if (!domSelection || domSelection.isCollapsed) {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const ensureInViewport = (positionToCheck) => {
    if (!document.querySelector('.slate-editor')) return positionToCheck;

    const editorElement = document.querySelector('.slate-editor');
    const editorRect = editorElement.getBoundingClientRect();
    const toolbarWidth = 450;

    let newLeft = positionToCheck.left;
    if (newLeft + toolbarWidth > editorRect.width) {
      newLeft = editorRect.width - toolbarWidth - 20;
    }

    return {
      ...positionToCheck,
      left: Math.max(10, newLeft),
    };
  };

  const adjustedPosition = ensureInViewport(position);

  const toolbarStyle = {
    position: 'absolute',
    top: `${adjustedPosition.top}px`,
    left: `${adjustedPosition.left}px`,
    zIndex: 1000,
  };

  return createPortal(
    <div
      style={toolbarStyle}
      className={`${styles.toolbarContainer} ${
        isVisible ? styles.toolbarVisible : ''
      }`}
    >
      <ContextualToolbar>
        <div className={`${styles.toolbarContent}`}>
          <FontStyle
            editor={editor}
            isBlockActive={checkBlockActive}
            toggleBlock={handleToggleBlock}
            compact
          />

          <TextStyle
            editor={editor}
            isMarkActive={checkMarkActive}
            toggleMark={handleToggleMark}
            compact
          />

          <ListDropdownMenu
            editor={editor}
            isBlockActive={checkBlockActive}
            toggleBlock={handleToggleBlock}
            compact
          />

          <AlignDropdownMenu compact />

          <LinkToolbarButton compact />

          <CodeBlockButton editor={editor} compact />
        </div>
      </ContextualToolbar>
    </div>,
    document.body
  );
};

export default FloatingContextualToolbar;
