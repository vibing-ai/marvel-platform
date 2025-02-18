import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Popover } from '@mui/material';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import CarrotDown from '@/assets/svg/CarrotDown.svg';
import CarrotUp from '@/assets/svg/CarrotUp.svg';

import styles from './styles';

import ToolRequestForm from '@/tools/components/ToolRequestForm';

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
 * @returns {JSX.Element} The rendered component.
 */
const EditPromptPopout = (props) => {
  const { toolDoc, popoutOpen } = props;
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

  /**
   * Renders the button to toggle the popout.
   *
   * @returns {JSX.Element} The button component.
   */
  const renderPromptButton = () => {
    return (
      <GradientOutlinedButton
        text="Prompt"
        bgcolor={popoutOpen ? '#DECDFF !important' : 'black !important'}
        textColor="white !important"
        iconPlacement="right"
        active={!!popoutOpen}
        icon={popoutOpen ? <CarrotUp /> : <CarrotDown />}
        onClick={handleClick}
        extraButtonProps={{
          sx: {
            ...styles.promptButton,
            borderColor: popoutOpen ? '#9D7BFF' : '#9D7BFF',
          },
        }}
      />
    );
  };

  return (
    <>
      {renderPromptButton()}
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
          sx: styles.popoutStyles
        }}
      >
        <ToolRequestForm isPopout={true} inputs={toolDoc?.inputs} id={toolDoc?.id} />
      </Popover>
    </>
  );
};

export default EditPromptPopout;
