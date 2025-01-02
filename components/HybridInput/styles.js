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
        multiline: true,
        rows: 6,
        sx: (theme) => ({
            fontFamily: 'Satoshi Bold',
            fontSize: { laptop: '14px', desktopMedium: '16px' },
            background: '#23252A',
            borderRadius: '15px',
            color: '#AC92FF',
            height: '150px',
            ...extraInputProps?.sx,
            transition: theme.transitions.create('all'),
            px: 1.5,
            fieldset: {
                transition: theme.transitions.create('all'),
            },
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
            },
            '& textarea': {
                padding: '12px 14px',
                minHeight: '150px !important',
                height: '150px !important',
                display: 'flex',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: 1,
                overflowY: 'auto',
                marginTop: '20px',
            },
            '& textarea::placeholder': {
                fontStyle: 'italic',
                color: theme.palette.Background.gray,
            },
            '& textarea::-webkit-input-placeholder': {
                fontStyle: 'italic',
                color: theme.palette.Background.gray,
            },
            marginTop: '10px',
            '& .MuiInputBase-input': {
                padding: '12px 14px',
                minHeight: '150px !important',
                height: '150px !important',
                display: 'flex',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: 1,
                overflowY: 'auto',
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
    // Keeping HybridInput specific styles
    chipProps: {
        fontFamily: 'Satoshi Regular',
        fontSize: '16px',
        sx: {
            color: 'black',
            background: 'grey',
            margin: '0 4px',
        },
    },
    fileIconProps: {
        sx: {
            color: '#AC92FF',
            cursor: 'pointer',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'auto',
            height: 'auto',
            '& svg': {
                fontSize: '24px',
            }
        }
    },
    fileButtonProps: {
        sx: {
            ':hover': {
                bgcolor: theme => theme.palette.Common.Black['30p'],
            },
            position: 'absolute',
            top: '12px',
            right: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            '& label': {
                display: 'flex',
                position: 'static'
            }
        }
    },
    fileLabelProps: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    menuListProps: {
        sx: {
            backgroundColor: '#0F0E14',
            border: '1px solid #8D74FF',
            borderRadius: '15px',
            padding: '8px 0',
        }
    },
    menuPaperProps: {
        sx: {
            width: '250px',
            maxHeight: 'calc(100vh - 96px)',
            overflowY: 'auto',
            '& .MuiList-root': {
                padding: '12px 0',
            }
        }
    },
    menuItemProps: {
        fontFamily: 'Satoshi Regular',
        fontSize: '12px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
        textAlign: 'center',
    },
    menuIconProps: {
        sx: {
            color: '#AC92FF',
            fontSize: '20px',
        }
    },
};

export default styles;