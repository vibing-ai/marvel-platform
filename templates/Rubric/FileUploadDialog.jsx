import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { styles } from "./styles";
import {
  Description as DescriptionIcon,
  TableChart as TableChartIcon,
  Language as LanguageIcon,
  ListAlt,
  YouTube,
} from "@mui/icons-material";

const FileUploadDialog = ({ open, onClose, onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [showYouTubeInput, setShowYouTubeInput] = useState(false);
  const [showWebsiteInput, setShowWebsiteInput] = useState(false);

  const handleFileSelect = (fileType) => {
    if (fileType === "upload" || fileType === "csv") {
      fileInputRef.current.click();
    } else if (fileType === "google_sheets") {
      const googleSheetLink = prompt("Enter Google Sheet URL:");
      if (googleSheetLink) {
        onFileUpload(fileType, googleSheetLink);
      }
    }
    onClose();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const uploadedFileUrl = URL.createObjectURL(file);
      onFileUpload("file", uploadedFileUrl);
    }
  };

  const handleYouTubeSubmit = () => {
    if (youtubeLink) {
      onFileUpload("youtube", youtubeLink);
      setYoutubeLink("");
      setShowYouTubeInput(false);
    }
  };

  const handleWebsiteSubmit = () => {
    if (websiteLink) {
      onFileUpload("website", websiteLink);
      setWebsiteLink("");
      setShowWebsiteInput(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { width: "350px", borderRadius: "12px" } }}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "26px",
          backgroundColor: "#0F0E14",
          border: "1px #6c63ff solid",
          borderRadius: "20px",
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Button
          fullWidth
          startIcon={<DescriptionIcon sx={styles.iconStyle} />}
          onClick={() => handleFileSelect("upload")}
          sx={styles.iconButton}
        >
          Upload (pdf, doc, docx, pptx)
        </Button>
        <Button
          fullWidth
          startIcon={<ListAlt sx={styles.iconStyle} />}
          onClick={() => handleFileSelect("csv")}
          sx={styles.iconButton}
        >
          CSV File
        </Button>
        <Button
          fullWidth
          startIcon={<TableChartIcon sx={styles.iconStyle} />}
          onClick={() => handleFileSelect("google_sheets")}
          sx={styles.iconButton}
        >
          Google Sheets
        </Button>
        <Button
          fullWidth
          startIcon={<YouTube sx={styles.iconStyle} />}
          onClick={() => setShowYouTubeInput((prev) => !prev)}
          sx={styles.iconButton}
        >
          {showYouTubeInput ? "Hide YouTube Input" : "YouTube Video"}
        </Button>
        {showYouTubeInput && (
          <>
            <TextField
              fullWidth
              placeholder="Paste YouTube Video URL"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              sx={styles.inputField}
              InputProps={{
                style: styles.inputField
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleYouTubeSubmit();
                }
              }}
            />
          </>
        )}
        <Button
          fullWidth
          startIcon={<LanguageIcon sx={styles.iconStyle} />}
          onClick={() => setShowWebsiteInput((prev) => !prev)}
          sx={styles.iconButton}
        >
          {showWebsiteInput ? "Hide Website Input" : "Website"}
        </Button>
        {showWebsiteInput && (
          <>
            <TextField
              fullWidth
              placeholder="Paste Website URL"
              value={websiteLink}
              onChange={(e) => setWebsiteLink(e.target.value)}
              sx={styles.inputField}
              InputProps={{
                style: styles.inputField
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleWebsiteSubmit();
                }
              }}
            />
          </>
        )}
        <DialogActions sx={{ display: "flex", justifyContent: "right" }}>
          <Button onClick={onClose} sx={styles.generateButton}>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;