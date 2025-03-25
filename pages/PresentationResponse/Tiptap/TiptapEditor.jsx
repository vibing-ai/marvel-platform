'use client';

import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import Heading from '@tiptap/extension-heading';
import OrderedList from '@tiptap/extension-ordered-list';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { TiptapMenuBar } from './TiptapMenuBar';

const TiptapEditor = ({ editorContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      BulletList,
      ListItem,
      Blockquote,
      OrderedList,
      Image,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: editorContent,
  });

  return (
    <div>
      <TiptapMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
