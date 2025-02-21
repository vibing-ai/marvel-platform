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
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { IndentPlugin } from '@udecode/plate-indent/react';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { ListPlugin } from '@udecode/plate-list/react';
import { MarkdownPlugin } from '@udecode/plate-markdown';
import Prism from 'prismjs';
import { useDispatch, useSelector } from 'react-redux';

import { CodeBlockElement } from '../plate-ui/code-block-element';
import { CodeLineElement } from '../plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '../plate-ui/code-syntax-leaf';
import { Editor, EditorContainer } from '../plate-ui/editor';
import { LinkElement } from '../plate-ui/link-element';
import { EditorToolbar } from '../plate-ui/toolbar';

import styles from './PlateEditor.module.css';
import 'prismjs/themes/prism.css';

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

  // Plugins for editor instance & useplateeditor
  const plugins = [
    BlockquotePlugin,
    ListPlugin,
    ParagraphPlugin,
    HeadingPlugin,
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    LinkPlugin.configure({
      options: {
        forceProtocol: true,
        defaultProtocol: 'https://',
        keepSelectedTextOnPaste: true,
        handleClick: false, // Let our custom handler work
      },
    }),
    TablePlugin.configure({
      options: {},
    }),
    CodePlugin,
    CodeBlockPlugin.configure({ options: { prism: Prism } }),
    CodeLinePlugin.configure({}),
    CodeSyntaxPlugin.configure({
      syntax: {
        languages: {
          js: 'javascript',
        },
        defaultLanguage: 'javascript',
      },
    }),
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
  ];

  // const editorInstance = createPlateEditor({ plugins });

  // // Deserialize raw Markdown content into editor value
  // const parsedMarkdownContent = markdownContent
  //   ? editorInstance.api.markdown.deserialize(markdownContent)
  //   : [];

  const editor = usePlateEditor({
    override: {
      components: {
        blockquote: withProps(PlateElement, {
          as: 'blockquote',
          className: 'my-2 border-l-4 pl-4 text-muted-foreground italic',
        }),
        ul: withProps(PlateElement, {
          as: 'ul',
        }),
        ol: withProps(PlateElement, {
          as: 'ol',
        }),
        li: withProps(PlateElement, {
          as: 'li',
        }),
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
        p: withProps(PlateElement, {
          as: 'p',
        }),
        table: withProps(PlateElement, {
          as: 'table',
        }),
        tr: withProps(PlateElement, {
          as: 'tr',
        }),
        th: withProps(PlateElement, {
          as: 'th',
        }),
        td: withProps(PlateElement, { as: 'td' }),
        [CodePlugin.key]: withProps(PlateLeaf, { as: 'code' }),
        [CodeBlockPlugin.key]: CodeBlockElement,
        [CodeLinePlugin.key]: CodeLineElement,
        [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
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
  }, [markdownContent]);

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
    const editorMarkdown = editor.api.markdown.serialize(editorContent);
    const newHistoryEntry = {
      timestamp: Date.now(),
      content: editorMarkdown,
      type: EDIT_HISTORY_TYPES.AUTO_SAVE,
    };

    dispatch(addStateToEditHistory(newHistoryEntry)); // Save to state
    dispatch(syncHistoryEntry(newHistoryEntry)); // Save to Firestore
  }, 2000);

  return (
    <Plate editor={editor} onChange={({ value }) => handleAutosave(value)}>
      <div className="mb-4">
        <EditorToolbar editor={editor} />
      </div>
      <EditorContainer className="p-6 bg-background text-foreground rounded-lg shadow-editor">
        <Editor
          placeholder="Start typing here..."
          autoFocus={false}
          spellCheck
          className={`text-foreground ${styles['slate-editor']}`}
        />
      </EditorContainer>
    </Plate>
  );
}
