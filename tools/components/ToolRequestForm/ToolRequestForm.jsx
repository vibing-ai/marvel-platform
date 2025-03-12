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
import { EDIT_HISTORY_TYPES } from '@/tools/libs/constants/editor';
import { INPUT_TYPES } from '@/tools/libs/constants/inputs';
import submitPrompt from '@/tools/libs/services/submitPrompt';
import evaluateCondition from '@/tools/libs/utils/evaluateCondition';
import { convertResponseToMarkdown } from '@/tools/libs/utils/markdownConverter';
import { usePlateEditor } from '@udecode/plate/react';
import { MarkdownPlugin } from '@udecode/plate-markdown';
import { syncHistoryEntry } from '@/tools/data/thunks/editHistory';

const {
  setCommunicatorLoading,
  setFormOpen,
  setResponse,
  setSessionId,
  setTopic,
  setCurrentState,
} = toolActions;

const ToolRequestForm = (props) => {
  const { id, inputs, isPopout } = props;
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

  const markdownEditor = usePlateEditor({
    plugins: [MarkdownPlugin],
  });

  const handleSubmitMultiForm = async (values) => {
    try {
      // eslint-disable-next-line no-console
      console.log('Form submission started with values:', values);
      dispatch(setResponse(null));
      dispatch(setTopic(null));
      dispatch(setCommunicatorLoading(true));

      // Handle file uploads first using original values
      const fileUrls = [];
      const fileInputs = inputs.filter(
        (input) =>
          input.type === INPUT_TYPES.FILE ||
          input.type === INPUT_TYPES.FILE_TYPE_SELECTOR
      );

      // Replace for...of loop with Promise.all and map
      const fileUploadPromises = fileInputs.map(async (input) => {
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

      // Create a base object with all input names initialized to empty string
      const baseInputs = inputs.reduce((acc, input) => {
        // Skip file type inputs as they're handled separately
        if (input.type !== INPUT_TYPES.FILE && input.type !== INPUT_TYPES.FILE_TYPE_SELECTOR) {
          acc[input.name] = '';
        }
        return acc;
      }, {});

      // Merge the form values with base inputs to ensure all keys exist
      const mergedValues = { ...baseInputs, ...values };

      // Convert values and create updateData
      let updateData = Object.entries(mergedValues).map(([name, originalValue]) => {
        // Skip file-related fields as they're handled separately
        if (name.endsWith('_file') || name.endsWith('_url')) {
          return null;
        }

        // Skip the original file input names for FILE_TYPE_SELECTOR
        const fileInput = fileInputs.find(input => input.name === name);
        if (fileInput) {
          return null;
        }

        // Convert numeric strings to integers using Number.isNaN instead of isNaN
        let value = originalValue;
        if (
          typeof originalValue === 'string' &&
          !Number.isNaN(Number(originalValue.trim())) &&
          originalValue.trim() !== ''
        ) {
          value = parseInt(originalValue.trim(), 10);
        }
        // Ensure value key exists even if it's an empty string
        return {
          name,
          value: value === null || value === undefined ? '' : value
        };
      }).filter(Boolean); // Remove null entries

      // Add file type information for FILE_TYPE_SELECTOR
      fileInputs
        .filter(input => input.type === INPUT_TYPES.FILE_TYPE_SELECTOR)
        .forEach(input => {
          if (values[input.name]) {
            updateData.push({
              name: `${input.name}_type`,
              value: values[input.name].toLowerCase(),
            });
          }
        });

      // Combine all data
      const finalData = [...updateData, ...fileUrls];

      // eslint-disable-next-line no-console
      console.log('Files uploaded, sending request to endpoint with data:', {
        toolData: { toolId: id, inputs: finalData },
      });

      const { response, sessionId, topic } = await submitPrompt(
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

      const markdown = convertResponseToMarkdown(response, id);

      dispatch(setResponse(response));
      dispatch(setSessionId(sessionId));
      dispatch(setTopic(topic));
      const historyEntry = {
        content: markdown,
        timestamp: Date.now(),
        type: EDIT_HISTORY_TYPES.INITIAL,
      };
      dispatch(setCurrentState(historyEntry));
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
    const { name: inputName, placeholder, tooltip, label, isRequired = true } = inputProps;
    const renderLabel = () => (
      <Grid {...styles.textFieldLabelGridProps}>
        <Typography {...styles.labelProps(errors?.[inputName])}>
          {label}{isRequired && ' *'}
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
          validation={
            isRequired
              ? { required: 'Field is required' }
              : {}
          }
          ref={register}
        />
      </Grid>
    );
  };

  const renderNumberInput = (inputProps) => {
    const { name: inputName, placeholder, tooltip, label, isRequired = true } = inputProps;
    const renderLabel = () => (
      <Grid {...styles.textFieldLabelGridProps}>
        <Typography {...styles.labelProps(errors?.[inputName])}>
          {label}{isRequired && ' *'}
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
          validation={
            isRequired
              ? { required: 'Field is required' }
              : {}
          }
          ref={register}
        />
      </Grid>
    );
  };

  const renderSelectorInput = (inputProps) => {
    const { name: inputName, label, placeholder, values, isRequired = true } = inputProps;

    const renderLabel = () => (
      <Grid {...styles.labelGridProps}>
        <Typography {...styles.labelProps(errors?.[inputName])}>
          {label}{isRequired && ' *'}
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
          validation={
            isRequired
              ? { required: 'Please select an option.' }
              : {}
          }
        />
      </Grid>
    );
  };

  const renderFileUpload = (inputProps) => {
    const { name: inputName, label, isRequired = true } = inputProps;

    return (
      <Grid key={inputName} {...styles.inputGridProps}>
        <PrimaryFileUpload
          id={inputName}
          name={inputName}
          multiple
          placeholder="Choose Files to Upload"
          label={`${label}${isRequired ? ' *' : ''}`}
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
          validation={
            isRequired
              ? {
                  required: 'Please upload a file.',
                  validate: {
                    lessThanThree: (v) =>
                      parseInt(v?.length, 10) < 10 || 'Should be less than 3 files',
                  },
                }
              : {
                  validate: {
                    lessThanThree: (v) =>
                      !v?.length || parseInt(v?.length, 10) < 10 || 'Should be less than 3 files',
                  },
                }
          }
        />
      </Grid>
    );
  };

  const renderFileTypeSelectorInput = (inputProps) => {
    const { name, label, values, isRequired = true } = inputProps;

    return (
      <Grid key={name} {...styles.inputGridProps}>
        <FileTypeSelectorInput
          key={name}
          name={name}
          label={`${label}${isRequired ? ' *' : ''}`}
          fileTypes={values}
          control={control}
          setValue={setValue}
          getValues={() => watchedValues}
          ref={register}
          validation={
            isRequired
              ? { required: 'Please select a file type.' }
              : {}
          }
        />
      </Grid>
    );
  };

  const renderDateInput = (inputProps) => {
    const { name: inputName, label, placeholder, isRequired = true } = inputProps;

    return (
      <Grid
        key={inputName}
        {...styles.inputGridProps}
        style={{ paddingTop: '0px', marginBottom: '20px' }}
      >
        <PrimaryDatePickerInput
          id={inputName}
          name={inputName}
          title={`${label}${isRequired ? ' *' : ''}`}
          placeholder={placeholder}
          error={errors?.[inputName]}
          helperText={errors?.[inputName]?.message}
          control={control}
          setValue={setValue}
          validation={
            isRequired
              ? { required: 'Please select a date.' }
              : {}
          }
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

  const renderGenerateButton = () => (
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

  const renderRegenerateButton = () => (
    <Grid {...styles.regenerateButtonGridProps}>
      <GradientOutlinedButton
        id="submitButton"
        bgcolor={theme.palette.Common.White['100p']}
        text="Regenerate"
        textColor={theme.palette.Common.White['100p']}
        loading={communicatorLoading}
        onHoverTextColor={theme.palette.Background.purple}
        type="submit"
        inverted
        {...styles.submitButtonProps}
      />
    </Grid>
  );

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
        {isPopout ? renderRegenerateButton() : renderGenerateButton()}
      </Grid>
    </FormContainer>
  );
};

export default ToolRequestForm;
