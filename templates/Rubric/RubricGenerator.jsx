import React  from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styles } from "./styles";
import { ArrowDropDown, UploadFile } from "@mui/icons-material";
import FileUploadDialog from "./FileUploadDialog";
import useRubricGenerator from '@/libs/hooks/useRubricGenerator';


const RubricGenerator = ({ onGenerateRubric }) => {
  const {
    gradeLevel,
    setGradeLevel,
    pointScale,
    setPointScale,
    standards,
    setStandards,
    assignmentDescription,
    setAssignmentDescription,
    loading,
    error,
    openFileUploadDialog,
    setOpenFileUploadDialog,
    handleFileUploadClick,
    handleFileUpload,
    handleGenerateRubric,
  } = useRubricGenerator();

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={styles.generatorContainer}
      >
        <Typography sx={styles.generatorTitle}>Rubric Generator</Typography>
        <Typography sx={styles.generatorSubtitle}>
          Create a table rubric based on assignment-specific information or
          uploaded documents!
        </Typography>
        <InputLabel sx={styles.inputLabel}>Grade Level</InputLabel>
        <TextField
          fullWidth
          select
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
          sx={styles.inputFieldCustom}
          displayEmpty
          InputProps={{
            style: styles.inputField,
            endAdornment: (
              <InputAdornment position="end">
                <ArrowDropDown />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="">Enter Grade Level</MenuItem>
          <MenuItem value="pre-k">Pre-K</MenuItem>
          <MenuItem value="kindergarten">Kindergarten</MenuItem>
          <MenuItem value="elementary">Elementary</MenuItem>
          <MenuItem value="middle">Middle</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="university">University</MenuItem>
          <MenuItem value="professional">Professional</MenuItem>
        </TextField>
        <InputLabel sx={styles.inputLabel}>Point Scale</InputLabel>
        <TextField
          fullWidth
          select
          value={pointScale}
          onChange={(e) => setPointScale(e.target.value)}
          sx={styles.inputFieldCustom}
          InputProps={{
            style: styles.inputField,
            endAdornment: (
              <InputAdornment position="end">
                <ArrowDropDown />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="">Choose Point Scale</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
        </TextField>
        <InputLabel sx={styles.inputLabel}> Standards/Objectives</InputLabel>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={standards}
          onChange={(e) => setStandards(e.target.value)}
          placeholder="Enter Standards or Choose Files to Upload"
          sx={styles.inputFieldCustom}
          InputProps={{
            style: styles.inputField,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleFileUploadClick}>
                  <UploadFile sx={styles.uploadFile} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <InputLabel sx={styles.inputLabel}> Assignment Description</InputLabel>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={assignmentDescription}
          onChange={(e) => setAssignmentDescription(e.target.value)}
          placeholder="Enter Description or Choose Files to Upload"
          sx={styles.inputField}
          InputProps={{
            style: styles.inputField,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleFileUploadClick}>
                  <UploadFile sx={styles.uploadFile} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && (
          <Typography color="error" sx={{ marginBottom: "16px" }}>
            {error}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            width: "100%",
            marginTop: "16px",
          }}
        >
          <Button
            disabled={loading}
            onClick={() => handleGenerateRubric(onGenerateRubric)}
            sx={styles.generateButton}
          >
            Generate
          </Button>
        </Box>
        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CircularProgress disableShrink size={75} color="primary" />
            <Typography>Generating rubric...</Typography>
          </Box>
        )}
      </Grid>
      <FileUploadDialog
        open={openFileUploadDialog}
        onClose={() => setOpenFileUploadDialog(false)}
        onFileUpload={handleFileUpload}
      />
    </>
  );
};

export default RubricGenerator;
