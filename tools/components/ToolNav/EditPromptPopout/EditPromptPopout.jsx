import { useState } from 'react';
import { Popover, Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import CarrotDown from '@/assets/svg/CarrotDown.svg';
import CarrotUp from '@/assets/svg/CarrotUp.svg';

import ToolRequestForm from '@/tools/components/ToolRequestForm';

import styles from './styles';
import { actions as toolActions } from '@/tools/data';

const { setPopoutOpen } = toolActions;

/**
 * EditPromptPopout Component
 * 
 * This component renders a button to toggle the prompt popout,
 * which contains a tool request form inside a popover.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.toolDoc - The tool document containing input data.
 * @param {boolean} props.popoutOpen - Boolean indicating if the popout is open.
 * @param {Function} props.setTopic - Function to set the topic.
 * @returns {JSX.Element} The rendered component.
 */
const EditPromptPopout = (props) => {
  const { toolDoc, popoutOpen, setTopic } = props;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(setPopoutOpen(!popoutOpen));
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(setPopoutOpen(false));
  };

  return (
    <>
      <Button
        onClick={handleClick}
        sx={styles.buttonStyles(popoutOpen)}
        endIcon={
          <div style={styles.iconStyles(popoutOpen)}>
            {popoutOpen ? <CarrotUp /> : <CarrotDown />}
          </div>
        }
      >
        Prompt
      </Button>
      <Popover
        open={popoutOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: styles.popoverStyles,
        }}
      >
        <ToolRequestForm
          isPopout
          inputs={toolDoc?.inputs}
          id={toolDoc?.id}
          setTopic={setTopic}
        />
      </Popover>
    </>
  );
};

export default EditPromptPopout;