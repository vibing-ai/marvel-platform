import { forwardRef } from 'react';

import { TextFieldElement } from 'react-hook-form-mui';

import styles from './styles';

/**
 * Generates a reusable text area input component with a required title and an optional description.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.id - The id of the input field.
 * @param {string} props.error - The error state of this component.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.error - The error message for the input field.
 * @param {string} props.title - The title of the input field.
 * @param {Object} props.control - The control of the Input Text Field.
 * @param {Object} props.extraInputProps - The extraInputProps of the Input Text Field.
 * @param {Object} props.extraInputLabelProps - The extraInputLabelProps of the Input Text Field.
 * @param {number} props.rows - The number of rows to display for the text area.
 *
 * @return {JSX.Element} - The rendered text area input component.
 */
const PrimaryTextAreaInput = forwardRef((props, ref) => {
  const {
    id,
    error,
    placeholder,
    title,
    helperText,
    isDescription,
    description,
    extraInputProps,
    extraInputLabelProps,
    rows = 4, // Default rows for the text area
    ...otherProps
  } = props;

  const TextFieldElementConfig = {
    id,
    label: title,
    fullWidth: true,
    helperText,
    InputLabelProps: styles.textAreaLabelProps(error, extraInputLabelProps),
    InputProps: styles.textAreaInputProps(error, extraInputProps),
    FormHelperTextProps: styles.helperTextProps(isDescription, error),
    autoComplete: 'off',
    placeholder,
    multiline: true, // Enable multiline for text area
    rows, // Set the number of rows for the text area
  };

  return (
    <TextFieldElement
      inputRef={ref}
      {...TextFieldElementConfig}
      {...otherProps}
    />
  );
});

export default PrimaryTextAreaInput;
