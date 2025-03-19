import React, { useEffect, useState } from 'react';

import { withProps } from '@udecode/cn';
import {
  createPlateEditor,
  ParagraphPlugin,
  Plate,
  PlateElement,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate/react';
import { AlignPlugin } from '@udecode/plate-alignment/react';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from '@udecode/plate-code-block/react';

import { FontSizePlugin } from '@udecode/plate-font/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { IndentPlugin } from '@udecode/plate-indent/react';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { ListPlugin, TodoListPlugin } from '@udecode/plate-list/react';
import { MarkdownPlugin } from '@udecode/plate-markdown';
import { all, createLowlight } from 'lowlight';
import { useDispatch, useSelector } from 'react-redux';

import { CodeBlockElement } from '../plate-ui/code-block-element';
import { CodeLineElement } from '../plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '../plate-ui/code-syntax-leaf';
import { FloatingContextualToolbar } from '../plate-ui/ContextualToolbar';
import { Editor, EditorContainer } from '../plate-ui/editor';
import { LinkElement } from '../plate-ui/link-element';
import { LinkPopup } from '../plate-ui/LinkPopup';
import { TableElement } from '../plate-ui/table-element';
import { TodoListElement } from '../plate-ui/todo-list-element';
import { EditorToolbar } from '../plate-ui/toolbar';

import 'highlight.js/styles/github-dark.css';
import styles from './PlateEditor.module.css';

import { actions as toolActions } from '@/tools/data';
import { syncHistoryEntry } from '@/tools/data/thunks/editHistory';
import { EDIT_HISTORY_TYPES } from '@/tools/libs/constants/editor';

import { TablePlugin } from '@udecode/plate-table/react';

const { addStateToEditHistory } = toolActions;

/**
 * Creates a debounced function that delays invoking the callback
 * until after the specified wait time has elapsed since the last
 * time the debounced function was called.
 *
 * @param {Function} callback - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {Function} - A debounced function that delays execution of the callback.
 */
const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), wait);
  };
};

/**
 * Removes extra <br> tags from markdown content.
 * @param {string} markdown - The markdown content to clean.
 * @returns {string} - The cleaned markdown without extra <br> tags.
 */
const removeExtraBreaks = (markdown) => {
  // Then, replace consecutive <br> tags with a single <br>
  let result = markdown.replace(/(<br\s*\/?>)+/g, '<br />');

  // First, replace <br> tags followed by | with just |
  result = result.replace(/<br\s*\/?>\s*\|/g, '|');

  return result;
};

/**
 * PlateEditor Component
 *
 * A rich-text editor component built with Plate.js that supports Markdown parsing,
 * autosaving, and various text formatting plugins.
 *
 * @param {Object} props - The component props.
 * @param {string} props.markdownContent - The initial Markdown content to load into the editor.
 * @returns {JSX.Element} The PlateEditor component.
 */
export function PlateEditor(props) {
  const { markdownContent } = props;
  const dispatch = useDispatch();
  const { editorState } = useSelector((state) => state.tools);
  const [debugValue, setDebugValue] = useState([]);
  const lowlight = createLowlight(all);

  // Plugins for editor instance & useplateeditor
  const plugins = [
    BlockquotePlugin,
    TodoListPlugin.configure({
      key: 'action_item',
      options: {
        validTypes: ['action_item'],
        enableMarks: true,
      },
    }),
    ListPlugin.configure({
      options: {
        validTypes: ['ul', 'ol', 'action_item'],
        validLiElements: ['ul', 'ol', 'action_item'],
        enableMarks: true,
        enableRestart: true,
        listStyleType: true,
        initialListStyleType: {
          ul: 'disc',
          ol: 'decimal',
        },
        listLevelsStyleType: {
          ol: ['decimal', 'lower-alpha', 'lower-roman'],
          ul: ['disc', 'circle', 'square'],
        },
      },
    }),
    ParagraphPlugin,
    HeadingPlugin,
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    FontSizePlugin.configure({
      inject: {
        props: {
          defaultNodeValue: 14,
          validNodeValues: [8, 10, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
        },
      },
    }),
    LinkPlugin.configure({
      options: {
        forceProtocol: true,
        defaultProtocol: 'https://',
        keepSelectedTextOnPaste: true,
        handleClick: false, // Let our custom handler work
      },
    }),
    TablePlugin,
    CodePlugin,
    CodeBlockPlugin.configure({
      options: {
        lowlight,
        defaultLanguage: 'auto',
      },
    }),
    CodeLinePlugin,
    CodeSyntaxPlugin,
    StrikethroughPlugin,
    MarkdownPlugin,
    HeadingPlugin,
    IndentPlugin.configure({
      inject: {
        targetPlugins: [ParagraphPlugin.key, HEADING_KEYS.h1],
      },
    }),
    IndentListPlugin.configure({
      inject: {
        targetPlugins: [ParagraphPlugin.key, HEADING_KEYS.h1],
      },
    }),
    AlignPlugin.configure({
      defaultAlign: 'left',
      validAlignments: ['left', 'center', 'right', 'justify'],
    }),
  ];

  const editor = usePlateEditor({
    override: {
      components: {
        blockquote: withProps(PlateElement, {
          as: 'blockquote',
          className: 'my-2 border-l-4 pl-4 text-muted-foreground italic',
        }),
        ul: withProps(PlateElement, {
          as: 'ul',
          className: 'list-disc pl-10 my-2',
        }),
        ol: withProps(PlateElement, {
          as: 'ol',
          className: 'list-decimal pl-10 my-2',
        }),
        li: withProps(PlateElement, {
          as: 'li',
          className: 'my-1',
        }),
        action_item: TodoListElement,
        bold: withProps(PlateLeaf, { as: 'strong' }),
        italic: withProps(PlateLeaf, { as: 'em' }),
        underline: withProps(PlateLeaf, { as: 'u' }),
        [LinkPlugin.key]: LinkElement,
        ...[1, 2, 3, 4, 5, 6].reduce((acc, level) => {
          acc[`h${level}`] = withProps(PlateElement, {
            as: `h${level}`,
          });
          return acc;
        }, {}),
        p: withProps(PlateElement, { as: 'p', className: 'text-base mb-4' }),
        table: TableElement,
        tr: withProps(PlateElement, {
          as: 'tr',
          className: 'border-b border-gray-200',
        }),
        th: withProps(PlateElement, {
          as: 'th',
          className: 'px-4 py-2 text-left bg-gray-100',
        }),
        td: withProps(PlateElement, { as: 'td', className: 'px-4 py-2' }),
        [CodePlugin.key]: withProps(PlateLeaf, { as: 'code' }),
        [CodeBlockPlugin.key]: CodeBlockElement,
        [CodeLinePlugin.key]: CodeLineElement,
        [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
        [FontSizePlugin.key]: withProps(
          PlateLeaf,
          ({ children, nodeProps }) => {
            const { fontSize = 14 } = nodeProps || {};
            return (
              <span style={{ fontSize: `${fontSize}px` }}>{children}</span>
            );
          }
        ),
      },
    },
    plugins,
  });

  useEffect(() => {
    if (markdownContent) {
      // const content = editorInstance.api.markdown.deserialize(markdownContent);
      const content = editor.api.markdown.deserialize(markdownContent);
      setDebugValue(content);
      // Update editor's internal state
      editor.children = content;
      editor.onChange();
    }
  }, []);

  /**
   * Handles autosaving of the editor content with a debounce mechanism.
   * Converts Plate.js editor content to Markdown and saves it to the state
   * if the content has changed since the last autosave.
   *
   * @constant
   * @type {Function}
   * @param {string} editorContent - The current content of the Plate.js editor.
   */
  const handleAutosave = debounce((editorContent) => {
    let editorMarkdown = editor.api.markdown.serialize(editorContent);
    editorMarkdown = removeExtraBreaks(editorMarkdown);
    const newHistoryEntry = {
      timestamp: Date.now(),
      content: editorMarkdown,
      type: EDIT_HISTORY_TYPES.AUTO_SAVE,
    };

    dispatch(addStateToEditHistory(newHistoryEntry)); // Save to state
    dispatch(syncHistoryEntry(newHistoryEntry)); // Save to Firestore
  }, 2000);

  return (
    <Plate
      editor={editor}
      onChange={({ value }) => handleAutosave(value)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          position: 'relative', // Ensure relative positioning for proper floating toolbar positioning
        }}
      >
        <EditorToolbar editor={editor} />
        <EditorContainer
          style={{
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            height: '100%',
          }}
        >
          <Editor
            placeholder="Start typing here..."
            autoFocus={false}
            spellCheck
            className={`slate-editor ${styles['slate-editor']}`}
            style={{
              flex: '1 1 auto',
              height: 'auto',
              minHeight: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '16px',
            }}
          />
        </EditorContainer>
        <LinkPopup editor={editor} />
        <FloatingContextualToolbar />
      </div>
    </Plate>
  );
}
