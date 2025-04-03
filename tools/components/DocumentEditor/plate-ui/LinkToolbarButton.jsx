'use client';

import React from 'react';

import { Link as LinkIcon } from '@mui/icons-material';

import { ToolbarButton } from './ToolbarButton';

const LinkToolbarButton = (props) => {
  // Simple function to dispatch custom event
  const handleLinkButtonClick = () => {
    // Create and dispatch custom event
    const event = new CustomEvent('linkButtonClick');
    document.dispatchEvent(event);
  };

  return (
    <ToolbarButton
      tooltip="Link"
      onClick={handleLinkButtonClick}
      {...props}
      className="slate-btn"
    >
      <LinkIcon className="h-5 w-5" />
    </ToolbarButton>
  );
};

export default LinkToolbarButton;
