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
      minHeight: '50px',
      maxHeight: '200px',
      overflowY: 'auto',
      px: 2,
      py: 1,
      transition: theme.transitions.create('all'),
      fieldset: {
        transition: theme.transitions.create('all'),
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&:focus': {
        outline: '2px solid #AC92FF',
      },
      '& input::placeholder': {
        fontStyle: 'italic',
        color: theme.palette.Background.gray,
      },
      '& textarea': {
        resize: 'vertical',
      },
      'label + &': {
        marginTop: '10px',
      },
      ...extraInputProps,
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
