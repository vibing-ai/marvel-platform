import React from 'react';

import { PlateEditor } from './editor/PlateEditor';

const DocumentEditor = (props) => {
  const { markdownContent } = props;
  return (
    <div
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
        }}
      >
        <PlateEditor markdownContent={markdownContent} />
      </div>
    </div>
  );
};

export default DocumentEditor;
