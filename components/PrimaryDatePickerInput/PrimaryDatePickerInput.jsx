import { forwardRef } from 'react';

import { Help } from '@mui/icons-material';
import { Grid, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePickerElement } from 'react-hook-form-mui';

import styles from './styles';

// Extend dayjs with the necessary plugins
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

/**
 * Generates a reusable date picker input field component.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.id - The id of the input field.
 * @param {string} props.error - The error state of this component.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.title - The title of the input field.
 * @param {Object} props.control - The control of the Input Text Field.
 * @param {Function} props.setValue - The function to set the value in the form state.
 * @param {Object} props.extraInputProps - The extraInputProps of the Input Text Field.
 *
 * @return {JSX.Element} - The rendered date picker input field component.
 */
const PrimaryDatePickerInput = forwardRef((props, ref) => {
  const {
    id,
    error,
    placeholder,
    title,
    helperText,
    control,
    setValue,
    extraInputProps,
    tooltip,
    ...otherProps
  } = props;

  const renderLabel = () => (
    <Grid {...styles.textFieldLabelGridProps}>
      <Typography {...styles.labelProps(error)}>{title}</Typography>
      {tooltip && (
        <Tooltip placement="top" title={tooltip} sx={{ ml: 1 }}>
          <Help />
        </Tooltip>
      )}
    </Grid>
  );

  return (
    <DatePickerElement
      name={id}
      ref={ref}
      label={renderLabel()}
      placeholder={placeholder}
      error={!!error}
      helperText={helperText}
      fullWidth
      control={control}
      InputLabelProps={styles.inputLabelProps(error)}
      InputProps={styles.inputProps(error, extraInputProps)}
      FormHelperTextProps={styles.helperTextProps(false, error)}
      {...otherProps}
      onChange={(date) => {
        const formattedDate = dayjs(date).format('MMMM, Do, YYYY');
        setValue(id, formattedDate);
      }}
    />
  );
});

export default PrimaryDatePickerInput;
