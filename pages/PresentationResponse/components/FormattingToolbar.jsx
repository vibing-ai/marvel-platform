import React from 'react';
import { styles } from '../styles';

const FormattingToolbar = ({ editor, handleToolbarAction }) => {
  if (!editor) {
    return null;
  }

  return (
    <div 
      style={styles.editor.toolbarContainer}
      data-tiptap-toolbar="true"
      onMouseDown={(e) => {
        // Prevent editor from losing focus when clicking toolbar
        e.preventDefault();
      }}
    >
      <div style={styles.editor.toolbar}>
        <button
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent editor from losing focus
            handleToolbarAction('bold');
          }}
          style={{
            ...styles.editor.toolbarButton,
            fontWeight: 'bold',
            backgroundColor: editor.isActive('bold') ? '#EBE5FF' : 'transparent',
          }}
        >
          B
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleToolbarAction('italic');
          }}
          style={{
            ...styles.editor.toolbarButton,
            fontStyle: 'italic',
            backgroundColor: editor.isActive('italic') ? '#EBE5FF' : 'transparent',
          }}
        >
          I
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleToolbarAction('strike');
          }}
          style={{
            ...styles.editor.toolbarButton,
            textDecoration: 'line-through',
            backgroundColor: editor.isActive('strike') ? '#EBE5FF' : 'transparent',
          }}
        >
          S
        </button>
        <div style={styles.editor.separator}></div>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleToolbarAction('h1');
          }}
          style={{
            ...styles.editor.toolbarButton,
            backgroundColor: editor.isActive('heading', { level: 1 }) ? '#EBE5FF' : 'transparent',
          }}
        >
          H1
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleToolbarAction('h2');
          }}
          style={{
            ...styles.editor.toolbarButton,
            backgroundColor: editor.isActive('heading', { level: 2 }) ? '#EBE5FF' : 'transparent',
          }}
        >
          H2
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleToolbarAction('h3');
          }}
          style={{
            ...styles.editor.toolbarButton,
            backgroundColor: editor.isActive('heading', { level: 3 }) ? '#EBE5FF' : 'transparent',
          }}
        >
          H3
        </button>
        <div style={styles.editor.separator}></div>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleToolbarAction('bulletList');
          }}
          style={{
            ...styles.editor.toolbarButton,
            backgroundColor: editor.isActive('bulletList') ? '#EBE5FF' : 'transparent',
          }}
        >
          Bullet
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleToolbarAction('orderedList');
          }}
          style={{
            ...styles.editor.toolbarButton,
            backgroundColor: editor.isActive('orderedList') ? '#EBE5FF' : 'transparent',
          }}
        >
          Number
        </button>
        <div style={styles.editor.separator}></div>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleToolbarAction('blockquote');
          }}
          style={{
            ...styles.editor.toolbarButton,
            backgroundColor: editor.isActive('blockquote') ? '#EBE5FF' : 'transparent',
          }}
        >
          Quote
        </button>
        <div style={styles.editor.separator}></div>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleToolbarAction('undo');
          }}
          style={{
            ...styles.editor.toolbarButton,
            opacity: editor.can().undo() ? 1 : 0.5,
          }}
          disabled={!editor.can().undo()}
        >
          Undo
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleToolbarAction('redo');
          }}
          style={{
            ...styles.editor.toolbarButton,
            opacity: editor.can().redo() ? 1 : 0.5,
          }}
          disabled={!editor.can().redo()}
        >
          Redo
        </button>
      </div>
    </div>
  );
};

export default FormattingToolbar; 