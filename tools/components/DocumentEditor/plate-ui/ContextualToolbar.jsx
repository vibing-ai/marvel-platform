import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cn, withCn } from '@udecode/cn';
import { useEditorRef, useEditorSelector } from '@udecode/plate/react';

import useToolbarFunctionsHook from '../../../libs/hooks/useToolbarFunctions';

import styles from '../editor/PlateEditor.module.css';

import AlignDropdownMenu from './AlignDropdownMenu';
import CodeBlockButton from './CodeBlockButton';
import FontSize from './FontSizeDropdown';
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
  const toolbarRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 44 });

  const {
    checkMarkActive,
    checkBlockActive,
    handleToggleMark,
    handleToggleBlock,
    getCurrentFontSize,
  } = useToolbarFunctionsHook(editor);

  const TOOLBAR_GAP = 10;

  // Measure toolbar dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (toolbarRef.current) {
        const rect = toolbarRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDimensions({
            width: rect.width,
            height: rect.height,
          });
        }
      }
    };

    if (isVisible) {
      setTimeout(updateDimensions, 5);
    }
  }, [isVisible]);

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

          if (rect && rect.width > 0) {
            const editorElement = document.querySelector('.slate-editor');
            if (!editorElement) {
              setIsVisible(false);
              return;
            }
            const viewportHeight = window.innerHeight;

            // Calculate center of selection
            const selectionHCenter = rect.left + rect.width / 2;

            // Place toolbar directly below the selection (in viewport coordinates)
            let top = rect.bottom + TOOLBAR_GAP;
            let left = selectionHCenter - dimensions.width / 2;

            // Check if enough space below selection, otherwise position above
            const spaceBelow = viewportHeight - rect.bottom;
            if (spaceBelow < dimensions.height + TOOLBAR_GAP + 10) {
              top = rect.top - dimensions.height - TOOLBAR_GAP;
            }

            // Convert viewport coordinates to position within the editor's parent
            const bodyRect = document.body.getBoundingClientRect();
            top -= bodyRect.top;
            left -= bodyRect.left;

            // Constrain horizontally to prevent overflow
            const maxLeft = document.body.clientWidth - dimensions.width - 10;
            left = Math.max(10, Math.min(left, maxLeft));

            setPosition({ top, left });
            setIsVisible(true);
            return;
          }
        }

        setIsVisible(false);
      };

      // Small delay to ensure accurate positioning
      const timerId = setTimeout(positionToolbar, 10);
      return () => clearTimeout(timerId);
    }
    setIsVisible(false);
  }, [editor, selection, dimensions]);

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

  // Handle window resize and scroll events
  useEffect(() => {
    if (!isVisible) return undefined;

    const handleResize = () => {
      // Trigger recalculation of toolbar position on resize
      const domSelection = window.getSelection();
      if (domSelection && !domSelection.isCollapsed) {
        // Force position update
        setIsVisible(false);
        setTimeout(() => setIsVisible(true), 10);
      } else {
        setIsVisible(false);
      }
    };

    const editorElement = document.querySelector('.slate-editor');

    window.addEventListener('resize', handleResize);
    if (editorElement) {
      editorElement.addEventListener('scroll', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (editorElement) {
        editorElement.removeEventListener('scroll', handleResize);
      }
    };
  }, [isVisible]);

  const toolbarStyle = {
    position: 'absolute',
    top: `${position.top}px`,
    left: `${position.left}px`,
    zIndex: 1000,
    transition: 'opacity 0.2s ease',
  };

  return createPortal(
    <div
      ref={toolbarRef}
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
          />
          <FontSize
            editor={editor}
            getCurrentFontSize={getCurrentFontSize}
            checkMarkActive={checkMarkActive}
            compact
          />
          <TextStyle
            editor={editor}
            isMarkActive={checkMarkActive}
            toggleMark={handleToggleMark}
          />
          <ListDropdownMenu
            editor={editor}
            isBlockActive={checkBlockActive}
            toggleBlock={handleToggleBlock}
          />
          <AlignDropdownMenu />
          <LinkToolbarButton />
          <CodeBlockButton editor={editor} />
        </div>
      </ContextualToolbar>
    </div>,
    document.body
  );
};

export default FloatingContextualToolbar;
