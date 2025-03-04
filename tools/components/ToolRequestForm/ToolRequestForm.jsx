import { useContext } from 'react';

import { Help } from '@mui/icons-material';
import { Grid, Tooltip, Typography, useTheme } from '@mui/material';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { FormContainer, useForm, useWatch } from 'react-hook-form-mui';
import { useDispatch, useSelector } from 'react-redux';

import FileTypeSelectorInput from '@/components/FileTypeSelectorInput';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import PrimaryDatePickerInput from '@/components/PrimaryDatePickerInput';
import PrimaryFileUpload from '@/components/PrimaryFileUpload';
import PrimarySelectorInput from '@/components/PrimarySelectorInput';
import PrimaryTextFieldInput from '@/components/PrimaryTextFieldInput';

import styles from './styles';

import ALERT_COLORS from '@/libs/constants/notification';
import { AuthContext } from '@/libs/providers/GlobalProvider';
import { firestore } from '@/libs/redux/store';

import { fetchToolHistory, actions as toolActions } from '@/tools/data';
import { INPUT_TYPES } from '@/tools/libs/constants/inputs';
import submitPrompt from '@/tools/libs/services/submitPrompt';
import evaluateCondition from '@/tools/libs/utils/evaluateCondition';

const { setCommunicatorLoading, setFormOpen, setResponse } = toolActions;

const ToolRequestForm = (props) => {
  const { id, inputs } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const { handleOpenSnackBar } = useContext(AuthContext);
  const { communicatorLoading } = useSelector((state) => state.tools);
  const { data: userData } = useSelector((state) => state.user);

  // Extract default values from inputs
  const defaultValues = inputs.reduce((acc, input) => {
    if (input.defaultValue !== undefined) {
      acc[input.name] = input.defaultValue;
    }
    return acc;
  }, {});

  const { register, control, handleSubmit, setValue, errors } = useForm({
    defaultValues,
  });
  const watchedValues = useWatch({ control });

  const handleSubmitMultiForm = async (values) => {
    try {
      // eslint-disable-next-line no-console
      console.log('Form submission started with values:', values);
      dispatch(setResponse(null));
      dispatch(setCommunicatorLoading(true));

      let updateData = Object.entries(values).map(([name, originalValue]) => {
        // Convert numeric strings to integers using Number.isNaN instead of isNaN
        let value = originalValue;
        if (
          typeof originalValue === 'string' &&
          !Number.isNaN(Number(originalValue.trim())) &&
          originalValue.trim() !== ''
        ) {
          value = parseInt(originalValue.trim(), 10);
        }
        return { name, value };
      });

      const fileUrls = [];
      const fileInputs = inputs.filter(
        (input) =>
          input.type === INPUT_TYPES.FILE ||
          input.type === INPUT_TYPES.FILE_TYPE_SELECTOR
      );

      // Replace for...of loop with Promise.all and map
      const fileUploadPromises = fileInputs.map(async (input) => {
        // omit previous values
        updateData = updateData.filter(
          (item) =>
            item.name !== `${input.name}_file` &&
            item.name !== `${input.name}_url` &&
            item.name !== input.name
        );
        updateData.push({
          name: `${input.name}_type`,
          value: values[`${input.name}`].toLowerCase(),
        });

        const fileKey =
          input.type === INPUT_TYPES.FILE_TYPE_SELECTOR
            ? `${input.name}_file`
            : input.name;
        const files = watchedValues[fileKey];
        if (files && files.length > 0) {
          const storage = getStorage();
          const uploadPromises = files.map(async (file) => {
            const storageRef = ref(storage, `uploads/${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            return url;
          });
          const urls = await Promise.all(uploadPromises);

          if (input.type === INPUT_TYPES.FILE_TYPE_SELECTOR) {
            fileUrls.push({ name: `${input.name}_url`, value: urls[0] });
          } else {
            fileUrls.push({ name: input.name, value: urls[0] });
          }
        }
      });

      await Promise.all(fileUploadPromises);

      // Remove any existing file inputs from updateData to avoid duplicates
      const finalData = [...updateData, ...fileUrls];

      // eslint-disable-next-line no-console
      console.log('Files uploaded, sending request to endpoint with data:', {
        toolData: { toolId: id, inputs: finalData },
      });

      const response = await submitPrompt(
        {
          tool_data: { tool_id: id, inputs: finalData },
          type: 'tool',
          user: {
            id: userData?.id,
            fullName: userData?.fullName,
            email: userData?.email,
          },
        },
        dispatch
      );

      dispatch(setResponse(response));
      dispatch(setFormOpen(false));
      dispatch(setCommunicatorLoading(false));
      dispatch(fetchToolHistory({ firestore }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error during form submission:', error);

      dispatch(setCommunicatorLoading(false));
      handleOpenSnackBar(
        ALERT_COLORS.ERROR,
        error?.message || 'Couldn\u0027t send prompt'
      );
    }
  };

  const renderTextInput = (inputProps) => {
    const { name: inputName, placeholder, tooltip, label } = inputProps;
    const renderLabel = () => (
      <Grid {...styles.textFieldLabelGridProps}>
        <Typography {...styles.labelProps(errors?.[inputName])}>
          {label}
        </Typography>
        {tooltip && (
          <Tooltip placement="top" title={tooltip} sx={{ ml: 1 }}>
            <Help />
          </Tooltip>
        )}
      </Grid>
    );

    return (
      <Grid key={inputName} {...styles.inputGridProps}>
        <PrimaryTextFieldInput
          id={inputName}
          name={inputName}
          title={renderLabel()}
          error={errors?.[inputName]}
          control={control}
          placeholder={placeholder}
          helperText={errors?.[inputName]?.message}
          validation={{
            required: 'Field is required',
          }}
          ref={register}
        />
      </Grid>
    );
  };

  const renderNumberInput = (inputProps) => {
    const { name: inputName, placeholder, tooltip, label } = inputProps;
    const renderLabel = () => (
      <Grid {...styles.textFieldLabelGridProps}>
        <Typography {...styles.labelProps(errors?.[inputName])}>
          {label}
        </Typography>
        {tooltip && (
          <Tooltip placement="top" title={tooltip} sx={{ ml: 1 }}>
            <Help />
          </Tooltip>
        )}
      </Grid>
    );

    return (
      <Grid key={inputName} {...styles.inputGridProps}>
        <PrimaryTextFieldInput
          id={inputName}
          name={inputName}
          title={renderLabel()}
          error={errors?.[inputName]}
          control={control}
          placeholder={placeholder}
          helperText={errors?.[inputName]?.message}
          extraInputProps={{
            type: 'number',
          }}
          validation={{
            required: 'Field is required',
          }}
          ref={register}
        />
      </Grid>
    );
  };

  const renderSelectorInput = (inputProps) => {
    const { name: inputName, label, placeholder, values } = inputProps;

    const renderLabel = () => (
      <Grid {...styles.labelGridProps}>
        <Typography {...styles.labelProps(errors?.[inputName])}>
          {label}
        </Typography>
      </Grid>
    );

    return (
      <Grid key={inputName} {...styles.inputGridProps}>
        <PrimarySelectorInput
          id={inputName}
          name={inputName}
          label={renderLabel()}
          displayEmpty
          placeholder={placeholder}
          error={errors?.[inputName]}
          menuList={values.map((item) => ({
            id: item.key,
            label: item.label,
          }))}
          helperText={errors?.[inputName]?.message}
          control={control}
          ref={register}
          validation={{
            required: 'Please select an option.',
          }}
        />
      </Grid>
    );
  };

  const renderFileUpload = (inputProps) => {
    const { name: inputName, label } = inputProps;

    return (
      <Grid key={inputName} {...styles.inputGridProps}>
        <PrimaryFileUpload
          id={inputName}
          name={inputName}
          multiple
          placeholder="Choose Files to Upload"
          label={label}
          error={errors?.[inputName]}
          helperText={errors?.[inputName]?.message}
          color="purple"
          bgColor="#23252A"
          control={control}
          getValues={() => watchedValues}
          ref={register}
          showChips
          showCheckbox
          displayEmpty
          setValue={setValue}
          validation={{
            required: 'Please upload a file.',
            validate: {
              lessThanThree: (v) =>
                parseInt(v?.length, 10) < 10 || 'Should be less than 3 files',
            },
          }}
        />
      </Grid>
    );
  };

  const renderTextContent = (inputProps) => {
    const { content } = inputProps;
    return (
      <Grid
        key={content}
        {...styles.textContentGridProps}
        container
        justifyContent="center"
      >
        <Typography {...styles.textContentProps} align="center">
          {content}
        </Typography>
      </Grid>
    );
  };

  const renderFileTypeSelectorInput = (inputProps) => {
    const { name, label, values } = inputProps;

    return (
      <Grid key={name} {...styles.inputGridProps}>
        <FileTypeSelectorInput
          key={name}
          name={name}
          label={label}
          fileTypes={values}
          control={control}
          setValue={setValue}
          getValues={() => watchedValues}
          ref={register}
        />
      </Grid>
    );
  };

  const renderDateInput = (inputProps) => {
    const { name: inputName, label, placeholder } = inputProps;

    return (
      <Grid
        key={inputName}
        {...styles.inputGridProps}
        style={{ paddingTop: '0px', marginBottom: '20px' }}
      >
        <PrimaryDatePickerInput
          id={inputName}
          name={inputName}
          title={label}
          placeholder={placeholder}
          error={errors?.[inputName]}
          helperText={errors?.[inputName]?.message}
          control={control}
          setValue={setValue}
          validation={{
            required: 'Please select a date.',
          }}
        />
      </Grid>
    );
  };

  const renderActionButtons = () => (
    <Grid mt={4} {...styles.actionButtonGridProps}>
      <GradientOutlinedButton
        id="submitButton"
        bgcolor={theme.palette.Common.White['100p']}
        text="Generate"
        textColor={theme.palette.Common.White['100p']}
        loading={communicatorLoading}
        onHoverTextColor={theme.palette.Background.purple}
        type="submit"
        inverted
        {...styles.submitButtonProps}
      />
    </Grid>
  );

  const renderInput = (inputProps) => {
    const { condition, type } = inputProps;

    if (!evaluateCondition(condition, watchedValues)) {
      return null;
    }

    switch (type) {
      case INPUT_TYPES.TEXT:
        return renderTextInput(inputProps);
      case INPUT_TYPES.NUMBER:
        return renderNumberInput(inputProps);
      case INPUT_TYPES.FILE:
        return renderFileUpload(inputProps);
      case INPUT_TYPES.SELECT:
        return renderSelectorInput(inputProps);
      case INPUT_TYPES.TEXT_CONTENT:
        return renderTextContent(inputProps);
      case INPUT_TYPES.FILE_TYPE_SELECTOR:
        return renderFileTypeSelectorInput(inputProps);
      case INPUT_TYPES.DATE:
        return renderDateInput(inputProps);
      default:
        return null;
    }
  };

  return (
    <FormContainer
      FormProps={{
        id: 'tool-form',
      }}
      onSuccess={handleSubmit(handleSubmitMultiForm)}
    >
      <Grid {...styles.formProps}>
        <Grid {...styles.mainContentGridProps}>
          {inputs?.map((input) => renderInput(input))}
        </Grid>
        {renderActionButtons()}
      </Grid>
    </FormContainer>
  );
};

export default ToolRequestForm;
