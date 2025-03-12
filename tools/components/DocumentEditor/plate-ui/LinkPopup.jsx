import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { LinkPlugin } from '@udecode/plate-link/react';
import { Transforms } from 'slate';

export const LinkPopup = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('https://');
  const [text, setText] = useState('');
  const [selectionCache, setSelectionCache] = useState(null);

  // Custom event listener for link button click
  useEffect(() => {
    const handleLinkButtonClick = (e) => {
      if (!editor) return;

      // Get selected text
      if (editor.selection) {
        // Deep clone the selection to avoid reference issues
        setSelectionCache(JSON.parse(JSON.stringify(editor.selection)));

        // Get selected text content
        const selectedText = window.getSelection().toString();
        setText(selectedText || '');
        setUrl('https://');
        setOpen(true);
      }
    };

    // Add event listener for custom link button event
    document.addEventListener('linkButtonClick', handleLinkButtonClick);

    return () => {
      document.removeEventListener('linkButtonClick', handleLinkButtonClick);
    };
  }, [editor]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleInsertLink = () => {
    if (!editor || !selectionCache) {
      handleClose();
      return;
    }

    // If no URL is provided, just close
    if (!url.trim() || url === 'https://') {
      handleClose();
      return;
    }
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = `https://${url}`;
    }

    try {
      // Check if the selection is collapsed (just a cursor)
      const isCollapsed =
        selectionCache.anchor.offset === selectionCache.focus.offset &&
        selectionCache.anchor.path.every(
          (v, i) => v === selectionCache.focus.path[i]
        );
      const linkType = LinkPlugin.key;

      editor.withoutNormalizing(() => {
        // Explicitly restore the selection
        Transforms.select(editor, selectionCache);

        if (!isCollapsed) {
          // For selected text, use wrapNodes which is safer for links
          Transforms.wrapNodes(
            editor,
            { type: linkType, url: formattedUrl, children: [] },
            { split: true }
          );
        } else {
          // For cursor position, insert a new link node
          Transforms.insertNodes(editor, {
            type: linkType,
            url: formattedUrl,
            children: [{ text: text || formattedUrl }],
          });
        }
      });

      // Move selection after the inserted link
      Transforms.move(editor);
    } catch (error) {
      console.error('Error inserting link:', error);
    }

    handleClose();
  };

  if (!open) return null;

  return createPortal(
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: '#2d2d2d',
          color: 'white',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '100%',
        },
      }}
    >
      <DialogTitle style={{ borderBottom: '1px solid #444' }}>
        Insert Link
      </DialogTitle>
      <DialogContent style={{ paddingTop: '16px' }}>
        <TextField
          autoFocus
          margin="dense"
          label="Text to display"
          type="text"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          style={{ marginBottom: '16px' }}
          InputLabelProps={{ style: { color: '#aaa' } }}
          InputProps={{ style: { color: 'white' } }}
        />
        <TextField
          margin="dense"
          label="URL"
          type="url"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          variant="outlined"
          placeholder="https://example.com"
          InputLabelProps={{ style: { color: '#aaa' } }}
          InputProps={{ style: { color: 'white' } }}
        />
      </DialogContent>
      <DialogActions style={{ padding: '16px', borderTop: '1px solid #444' }}>
        <Button onClick={handleClose} style={{ color: '#aaa' }}>
          Cancel
        </Button>
        <Button onClick={handleInsertLink} style={{ color: '#4dabf7' }}>
          Insert Link
        </Button>
      </DialogActions>
    </Dialog>,
    document.body
  );
};
