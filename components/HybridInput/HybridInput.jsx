import { forwardRef, useState, useRef } from 'react';
import { IconButton, Menu, MenuItem, Chip, Grid } from '@mui/material';
import { TextFieldElement } from 'react-hook-form-mui';
import { FileUploadOutlined } from '@mui/icons-material';
import styles from './styles';
import { FILE_TYPE_ICONS } from '@/tools/libs/constants/fileTypeIcons';

const HybridInput = forwardRef((props, ref) => {
    const {
        id,
        name,
        control,
        setValue,
        placeholder,
        error,
        helperText,
        title,
        description,
        extraInputProps,
        extraInputLabelProps,
        fileTypes,
        multiple,
        ...otherProps
    } = props;

    const [files, setFiles] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const fileInputRef = useRef();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTypeSelect = (type) => {
        console.log('Type selected:', type);
        setSelectedType(type);
        handleClose();
        if (type.key === 'youtube_url') {
            setFiles([]);
            setValue(`${name}_file`, null);
            setValue(`${name}_url`, '');
            setValue(`${name}_type`, 'youtube_url');
            console.log('YouTube URL mode:', {
                [name]: '',
                [`${name}_file`]: null,
                [`${name}_url`]: '',
                [`${name}_type`]: 'youtube_url'
            });
            return;
        }
        setValue(`${name}_type`, type.key.toLowerCase());
        setValue(`${name}_url`, '');
        console.log('File mode:', {
            [name]: '',
            [`${name}_type`]: type.key.toLowerCase(),
            [`${name}_url`]: ''
        });
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        console.log('Files selected:', selectedFiles);

        if (multiple) {
            setFiles((prevFiles) => {
                const arrayFiles = [...prevFiles, ...selectedFiles];
                setValue(`${name}_file`, arrayFiles);
                setValue(`${name}_url`, '');
                console.log('Multiple files set:', {
                    [name]: '',
                    [`${name}_file`]: arrayFiles,
                    [`${name}_url`]: ''
                });
                return arrayFiles;
            });
        } else {
            setFiles(selectedFiles);
            setValue(`${name}_file`, selectedFiles);
            setValue(`${name}_url`, '');
            console.log('Single file set:', {
                [name]: '',
                [`${name}_file`]: selectedFiles,
                [`${name}_url`]: ''
            });
        }
    };

    const handleOnDelete = (fileIndex) => {
        const newFiles = files.filter((file, index) => index !== fileIndex);
        setFiles(newFiles);
        setValue(`${name}_file`, newFiles);
        setValue(`${name}_url`, '');
        console.log('After file deletion:', {
            [name]: '',
            [`${name}_file`]: newFiles,
            [`${name}_url`]: ''
        });
    };

    const TextFieldElementConfig = {
        id,
        label: title,
        fullWidth: true,
        helperText,
        description,
        InputLabelProps: styles.inputLabelProps(error, extraInputLabelProps),
        InputProps: {
            ...styles.inputProps(error, extraInputProps),
            endAdornment: (
                <>
                    <IconButton
                        onClick={handleClick}
                        sx={styles.fileButtonProps.sx}
                    >
                        <FileUploadOutlined sx={styles.fileIconProps.sx} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        MenuListProps={{
                            sx: styles.menuListProps.sx
                        }}
                        PaperProps={{
                            sx: styles.menuPaperProps.sx
                        }}
                    >
                        {fileTypes?.map((type) => {
                            const IconComponent = FILE_TYPE_ICONS[type.key];
                            return (
                                <MenuItem
                                    key={type.key}
                                    onClick={() => handleTypeSelect(type)}
                                    sx={styles.menuItemProps}
                                >
                                    {IconComponent && <IconComponent sx={styles.menuIconProps.sx} />}
                                    {type.label}
                                </MenuItem>
                            );
                        })}
                    </Menu>
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id={`${id}-file-input`}
                        multiple={multiple}
                    />
                </>
            ),
        },
        FormHelperTextProps: styles.helperTextProps(description, error),
        autoComplete: 'off',
        placeholder,
    };

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <TextFieldElement
                    inputRef={ref}
                    name={name}
                    control={control}
                    {...TextFieldElementConfig}
                    {...otherProps}
                />
            </Grid>
            {files.length > 0 && (
                <Grid item container spacing={1}>
                    {files.map((file, i) => (
                        <Grid item key={i}>
                            <Chip
                                label={file.name}
                                onDelete={() => handleOnDelete(i)}
                                sx={{
                                    color: 'black',
                                    background: 'grey',
                                    fontFamily: 'Satoshi Regular',
                                    fontSize: '16px',
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Grid>
    );
});

export default HybridInput;