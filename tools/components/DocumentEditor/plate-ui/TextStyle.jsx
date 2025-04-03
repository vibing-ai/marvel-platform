import React from 'react';

import {
  FormatBold as BoldIcon,
  FormatItalic as ItalicIcon,
  FormatUnderlined as UnderlineIcon,
} from '@mui/icons-material';

import { ToolbarButton } from './ToolbarButton';

const TextStyle = (props) => {
  const { editor, isMarkActive, toggleMark } = props;
  return (
    <div className="slate-toolbar-group">
      <ToolbarButton
        tooltip="Bold"
        isActive={isMarkActive('bold')}
        onClick={() => toggleMark('bold')}
        className={`slate-btn ${isMarkActive('bold') ? 'is-active' : ''}`}
      >
        <BoldIcon className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton
        tooltip="Italic"
        isActive={isMarkActive('italic')}
        onClick={() => toggleMark('italic')}
        className={`slate-btn ${isMarkActive('italic') ? 'is-active' : ''}`}
      >
        <ItalicIcon className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton
        tooltip="Underline"
        isActive={isMarkActive('underline')}
        onClick={() => toggleMark('underline')}
        className={`slate-btn ${isMarkActive('underline') ? 'is-active' : ''}`}
      >
        <UnderlineIcon className="h-5 w-5" />
      </ToolbarButton>
    </div>
  );
};
export default TextStyle;
