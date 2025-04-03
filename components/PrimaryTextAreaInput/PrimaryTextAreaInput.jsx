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
 * @param {string} props.title - The title of the input field.
 * @param {string} props.helperText - The helper text for the input field.
 * @param {number} props.rows - The number of rows for the text area.
 * @param {Object} props.control - The control of the Input Text Field.
 * @param {Object} props.extraInputProps - Extra properties for the input field.
 * @param {Object} props.extraInputLabelProps - Extra properties for the input label.
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
    rows = 4,
    extraInputProps,
    extraInputLabelProps,
    ...otherProps
  } = props;

  const TextAreaElementConfig = {
    id,
    label: title,
    fullWidth: true,
    helperText,
    InputLabelProps: styles.inputLabelProps(error, extraInputLabelProps),
    InputProps: {
      ...styles.inputProps(error, extraInputProps),
      multiline: true,
      rows,
    },
    FormHelperTextProps: styles.helperTextProps(false, error),
    autoComplete: 'off',
    placeholder,
  };

  return (
    <TextFieldElement
      inputRef={ref}
      {...TextAreaElementConfig}
      {...otherProps}
    />
  );
});

export default PrimaryTextAreaInput;
