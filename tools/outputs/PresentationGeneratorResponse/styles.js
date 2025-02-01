const styles = {
    mainGridProps: {
        container: true,
        item: true,
        mobileSmall: 12,
        rowGap: 4,
        px: 6,
        py: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20px',
        sx: {
            background: '#0F0E14',
            border: '2px solid #1C1233',
            color: 'white',
        },
    },
    slidesGridProps: {
        container: true,
        item: true,
        mobileSmall: 12,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        rowGap: 4,
    },
    slideGridProps: {
        container: true,
        item: true,
        mobileSmall: 12,
        flexDirection: 'column',
        sx: {
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
        },
    },
    slideHeaderProps: {
        container: true,
        item: true,
        gap: 2,
        mb: 2,
        pb: 2,
        sx: {
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
    },
    slideContentWrapperProps: {
        container: true,
        item: true,
        gap: 3,
    },
    slideLabelProps: {
        fontFamily: 'Satoshi Bold',
        fontSize: { laptop: '14px', desktop: '16px' },
        color: 'rgba(255, 255, 255, 0.6)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    titleProps: {
        fontFamily: 'Satoshi Bold',
        fontSize: { laptop: '20px', desktop: '24px' },
        color: '#fff',
    },
    contentProps: {
        fontFamily: 'Satoshi Regular',
        fontSize: { laptop: '16px', desktop: '18px' },
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: 1.6,
    },
    suggestionsProps: {
        fontFamily: 'Satoshi Regular',
        fontSize: { laptop: '14px', desktop: '16px' },
        color: 'rgba(255, 255, 255, 0.7)',
        lineHeight: 1.5,
        mt: 2,
        sx: {
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '16px',
            borderRadius: '8px',
        },
    },
    suggestionLabelStyle: {
        fontFamily: 'Satoshi Bold',
        color: 'rgba(255, 255, 255, 0.9)',
    },
    exportButtonGridProps: {
        container: true,
        item: true,
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
    },
    exportButtonProps: {
        sx: {
            fontFamily: 'Satoshi Bold',
            fontSize: '14px',
            padding: '12px 32px',
            borderRadius: '8px',
            textTransform: 'none',
            background: 'linear-gradient(90deg, #2563EB 0%, #1E40AF 100%)',
            '&:hover': {
                background: 'linear-gradient(90deg, #1E40AF 0%, #1E3A8A 100%)',
            },
        },
    },
};

export default styles;