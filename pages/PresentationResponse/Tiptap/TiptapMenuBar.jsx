'use client';

import React, { useCallback, useRef } from 'react';

import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
  Quote,
  Image,
  Link,
} from 'lucide-react';

export const TiptapMenuBar = ({ editor }) => {
  const fileInputRef = useRef();

  const addImageViaUpload = (event) => {
    const file = event.target.files[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        editor.chain().focus().setImage({ src: imageUrl }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const addImageViaURL = useCallback(() => {
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const Options = [
    {
      extension: 'bold',
      icon: <Bold className="size-4" />,
      on_click: () => editor.chain().focus().toggleBold().run(),
      class_name: editor.isActive('bold') ? 'is-active' : '',
    },
    {
      extension: 'italic',
      icon: <Italic className="size-4" />,
      on_click: () => editor.chain().focus().toggleItalic().run(),
      class_name: editor.isActive('italic') ? 'is-active' : '',
    },
    {
      extension: 'underline',
      icon: <Underline className="size-4" />,
      on_click: () => editor.chain().focus().toggleUnderline().run(),
      class_name: editor.isActive('underline') ? 'is-active' : '',
    },
    {
      extension: 'strike',
      icon: <Strikethrough className="size-4" />,
      on_click: () => editor.chain().focus().toggleStrike().run(),
      class_name: editor.isActive('strike') ? 'is-active' : '',
    },
    {
      extension: 'bulletList',
      icon: <List className="size-4" />,
      on_click: () => editor.chain().focus().toggleBulletList().run(),
      class_name: editor.isActive('bulletList') ? 'is-active' : '',
    },
    {
      extension: 'orderedList',
      icon: <ListOrdered className="size-4" />,
      on_click: () => editor.chain().focus().toggleOrderedList().run(),
      class_name: editor.isActive('orderedList') ? 'is-active' : '',
    },
    {
      extension: 'blockquote',
      icon: <Quote className="size-4" />,
      on_click: () => editor.chain().focus().toggleBlockquote().run(),
      class_name: editor.isActive('blockquote') ? 'is-active' : '',
    },
    {
      extension: 'heading',
      icon: <Heading1 className="size-4" />,
      on_click: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      class_name: editor.isActive('heading', { level: 1 }) ? 'is-active' : '',
    },
    {
      extension: 'heading',
      icon: <Heading2 className="size-4" />,
      on_click: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      class_name: editor.isActive('heading', { level: 2 }) ? 'is-active' : '',
    },
    {
      extension: 'heading',
      icon: <Heading3 className="size-4" />,
      on_click: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      class_name: editor.isActive('heading', { level: 3 }) ? 'is-active' : '',
    },
  ];
  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50">
      <div className="control-group">
        {Options.map((option, index) => (
          <button
            key={index}
            onClick={option.on_click}
            className={option.class_name}
          >
            {option.icon}
          </button>
        ))}
        <button onClick={addImageViaURL}>
          <Image className="size-4" />
          <Link className="size-4" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={addImageViaUpload}
        />
      </div>
    </div>
  );
};
