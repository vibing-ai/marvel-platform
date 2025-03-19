import React from 'react';
import { ToolbarButton } from './ToolbarButton';
import { Undo as UndoIcon, Redo as RedoIcon } from '@mui/icons-material';

 const UndoRedo = (props) => {
    const { handleUndo, handleRedo } = props;
  return (
    <div className="slate-toolbar-group">
      <ToolbarButton
        tooltip="Undo"
        onClick={handleUndo}
        className="slate-btn"
      >
        <UndoIcon className="h-5 w-5" />
      </ToolbarButton>
      <ToolbarButton
        tooltip="Redo"
        onClick={handleRedo}
        className="slate-btn"
      >
        <RedoIcon className="h-5 w-5" />
      </ToolbarButton>
    </div>
  );
};
export default UndoRedo;