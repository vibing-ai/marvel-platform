const styles = {
  mainGridProps: {
    sx: {
      width: '100%',
    },
  },
  inputProps: (error, extraInputProps) => ({
    notched: false,
    error,
    autoComplete: 'off',
    sx: (theme) => ({
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '14px', desktopMedium: '16px' },
      background: '#23252A',
      borderRadius: '15px',
      color: '#AC92FF',
      height: '50px',
      ...extraInputProps,
      transition: theme.transitions.create('all'),
      px: 1.5,
      fieldset: {
        transition: theme.transitions.create('all'),
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& input::placeholder': {
        fontStyle: 'italic',
        color: theme.palette.Background.gray,
      },
      '& input::-webkit-input-placeholder': {
        fontStyle: 'italic',
        color: theme.palette.Background.gray,
      },
      'label + &': {
        marginTop: '10px',
      },
    }),
  }),
  textAreaInputProps: (error, extraInputProps) => ({
    notched: false,
    error,
    autoComplete: 'off',
    sx: (theme) => ({
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '14px', desktopMedium: '16px' },
      background: '#23252A',
      borderRadius: '15px',
      color: '#AC92FF',
      ...extraInputProps,
      transition: theme.transitions.create('all'),
      px: 1.5,
      py: 1, // Add padding for better text area appearance
      fieldset: {
        transition: theme.transitions.create('all'),
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& textarea::placeholder': {
        fontStyle: 'italic',
        color: theme.palette.Background.gray,
      },
      '& textarea::-webkit-input-placeholder': {
        fontStyle: 'italic',
        color: theme.palette.Background.gray,
      },
      'label + &': {
        marginTop: '10px',
      },
    }),
  }),
  inputLabelProps: (error, extraInputLabelProps) => ({
    error,
    shrink: true,
    sx: {
      top: '-14px',
      color: 'white !important',
      fontFamily: 'Satoshi Bold',
      overflow: 'visible',
      '.MuiTypography-root': {
        fontSize: { laptop: '18px', desktop: '20px' },
      },
      ...extraInputLabelProps,
    },
  }),
  textAreaLabelProps: (error, extraInputLabelProps) => ({
    error,
    shrink: true,
    sx: {
      top: '-14px',
      color: 'white !important',
      fontFamily: 'Satoshi Bold',
      overflow: 'visible',
      '.MuiTypography-root': {
        fontSize: { laptop: '18px', desktop: '20px' },
      },
      ...extraInputLabelProps,
    },
  }),
  helperTextProps: (isDescription, error) => ({
    error,
    sx: {
      hidden: !isDescription,
      fontFamily: 'Satoshi Regular',
      fontSize: { laptop: '12px', desktop: '14px' },
      ...(isDescription && {
        position: 'absolute',
        top: '-60px',
        left: '-10px',
        color: (theme) => theme.palette.Common.Black['100p'],
      }),
    },
  }),
};

export default styles;
