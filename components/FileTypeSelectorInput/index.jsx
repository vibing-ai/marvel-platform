import { Help } from '@mui/icons-material';
import { Grid, Tooltip, Typography } from '@mui/material';
import { useWatch } from 'react-hook-form-mui';

import PrimaryFileUpload from '@/components/PrimaryFileUpload';
import PrimarySelectorInput from '@/components/PrimarySelectorInput';
import PrimaryTextFieldInput from '@/components/PrimaryTextFieldInput';

import styles from './styles';

const FileTypeSelectorInput = ({
  name,
  label,
  fileTypes,
  tooltip,
  error,
  helperText,
  setValue,
  getValues,
  ref,
  control,
}) => {
  const selectedFileType = useWatch({ control });

  const renderLabel = (text) => (
    <Grid {...styles.labelGridProps}>
      <Typography {...styles.labelProps(error)}>{text}</Typography>
      {tooltip && (
        <Tooltip placement="top" title={tooltip} sx={{ ml: 1 }}>
          <Help />
        </Tooltip>
      )}
    </Grid>
  );

  const renderInputField = () => {
    const urlOnlyTypes = [
      'GOOGLE_DOCS',
      'GOOGLE_SHEETS',
      'GOOGLE_SLIDES',
      'GOOGLE_DRIVE',
      'URL',
      'youtube_url',
    ];

    if (urlOnlyTypes.includes(selectedFileType[name])) {
      return (
        <Grid item {...styles.inputGridProps}>
          <PrimaryTextFieldInput
            name={`${name}_url`}
            id={`${name}_url`}
            title={renderLabel('Type URL')}
            placeholder="Enter URL e.g http://..."
            control={control}
            error={error}
            helperText={helperText}
          />
        </Grid>
      );
    }

    return (
      <>
        <Grid item {...styles.inputGridProps} sx={{ marginTop: '-30px' }}>
          <PrimaryFileUpload
            name={`${name}_file`}
            id={`${name}_file`}
            title={renderLabel('Upload File')}
            control={control}
            setValue={setValue}
            error={error}
            helperText={helperText}
            multiple
            placeholder="Choose Files to Upload"
            showChips
            showCheckbox
            displayEmpty
            ref={ref}
            getValues={() => getValues()}
            color="purple"
            bgColor="#23252A"
          />
        </Grid>
      </>
    );
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item {...styles.inputGridProps}>
        <PrimarySelectorInput
          name={`${name}`}
          label={renderLabel(`Select ${label} Type`)}
          control={control}
          menuList={fileTypes.map((type) => ({
            id: type.key,
            label: type.label,
          }))}
        />
      </Grid>
      {renderInputField()}
    </Grid>
  );
};

export default FileTypeSelectorInput;
