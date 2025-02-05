import { forwardRef, useRef, useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { TextFieldElement } from "react-hook-form-mui";

import styles from "./styles";

/**
 * Renders a custom input text field component with configurable props.
 *
 * @param {object} props - The props object containing id, label, placeholderText, icon, isPasswordField, error, and otherProps.
 * @return {JSX.Element} - Returns a TextFieldElement wrapped with additional input configuration.
 */
const AuthTextField = forwardRef((props, ref) => {
  const {
    id,
    label,
    placeholderText,
    icon,
    isPasswordField,
    helperText,
    error,
    control,
    state,
    defaultValue,
    ...otherProps
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const setFieldType = () => {
    if (!isPasswordField) return "text";
    return showPassword ? "text" : "password";
  };

  const renderPrimaryIcon = () => {
    if (!icon) return null;
    return <InputAdornment {...styles.inputPrimaryIcon}>{icon}</InputAdornment>;
  };

  const renderVisibilityIcon = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    );
  };

  const TextFieldElementConfig = {
    id,
    control,
    name: id,
    color: state,
    InputProps: styles.inputProps(
      error,
      isPasswordField,
      setFieldType,
      renderPrimaryIcon,
      renderVisibilityIcon,
      state
    ),
    InputLabelProps: styles.inputLabelProps(error, state),
    fullWidth: true,
    label: helperText || label,
    autoComplete: "off",
    placeholder: placeholderText,
    FormHelperTextProps: { error },
  };

  return (
    <TextFieldElement
      inputRef={ref}
      defaultValue={defaultValue}
      {...TextFieldElementConfig}
      {...otherProps}
    />
  );
});

export default AuthTextField;
