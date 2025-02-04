import { forwardRef } from 'react';

import { TextFieldElement } from 'react-hook-form-mui';

import styles from './styles';

/**
 * Generates a reusable input text field component with a required title and an optional description.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.id - The id of the input field.
 * @param {string} props.error - The error state of this component.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.error - The error message for the input field.
 * @param {string} props.title - The title of the input field.
 * @param {string} props.borderColor - The color of the border of the input field.
 * @param {Object} props.control - The control of the Input Text Field.
 * @param {Object} props.extraInputProps - The extraInputProps of the Input Text Field.
 * @param {Object} props.extraInputLabelProps - The extraInputLabelProps of the Input Text Field.
 *
 * @return {JSX.Element} - The rendered profile input field component.
 */
const PrimaryTextFieldInput = forwardRef((props, ref) => {
  const {
    id,
    error,
    placeholder,
    title,
    helperText,
    isDescription,
    description,
    borderColor,
    extraInputProps,
    extraInputLabelProps,
    multiline = true, // Enable multiline by default
    minRows = 1, // Set minimum rows
    maxRows = 5, // Allow expansion up to 5 rows
    disabled, // Disable the element
    ...otherProps
  } = props;

  const TextFieldElementConfig = {
    id,
    label: title,
    fullWidth: true,
    helperText,
    InputLabelProps: styles.inputLabelProps(error, extraInputLabelProps),
    InputProps: styles.inputProps(error, extraInputProps),
    FormHelperTextProps: styles.helperTextProps(isDescription, error),
    autoComplete: 'off',
    disabled : disabled, // Disable the element
    placeholder,
    multiline,
    minRows, // Allow it to start with 1 row and expand
    maxRows, // Prevent excessive expansion
  };

  return (
    <TextFieldElement
      inputRef={ref}
      {...TextFieldElementConfig}
      {...otherProps}
    />
  );
});

export default PrimaryTextFieldInput;
