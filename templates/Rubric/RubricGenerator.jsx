import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const RubricGenerator = ({ onGenerateRubric }) => {
    const user = useSelector((state) => state.user.data);
    const [gradeLevel, setGradeLevel] = useState("");
    const [pointScale, setPointScale] = useState("");
    const [standards, setStandards] = useState("");
    const [assignmentDescription, setAssignmentDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const headers = {
      "API-Key": "dev",
      "Content-Type": "application/json",
    };
  
    const handleGenerateRubric = async () => {
      if (!gradeLevel || !pointScale || !assignmentDescription) {
        setError("All fields are required.");
        return;
      }
  
      const payload = {
        user: user,
        type: "chat",
        tool_data: {
          tool_id: "rubric-generator",
          inputs: [
            { name: "grade_level", value: gradeLevel },
            { name: "point_scale", value: parseInt(pointScale) },
            { name: "objectives", value: standards },
            { name: "assignment_description", value: assignmentDescription },
            {
              name: "objectives_file_url",
              value:
                "https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/uploads%2F510f946e-823f-42d7-b95d-d16925293946-Linear%20Regression%20Stat%20Yale.pdf?alt=media&token=caea86aa-c06b-4cde-9fd0-42962eb72ddd",
            },
            { name: "objectives_file_type", value: "pdf" },
            {
              name: "assignment_description_file_url",
              value:
                "https://docs.google.com/document/d/1IsTPJSgWMdD20tXMm1sXJSCc0xz9Kxmn/edit?usp=drive_link&ouid=107052763106493355624&rtpof=true&sd=true",
            },
            { name: "assignment_description_file_type", value: "gdoc" },
            { name: "lang", value: "en" },
          ],
        },
      };
  
      try {
        setError("");
        setLoading(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_MARVEL_ENDPOINT}submit-tool`,
          payload,
          { headers }
        );
        onGenerateRubric(response.data);
      } catch (err) {
        console.error("Error response:", err.response || err.message);
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to generate rubric. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: "#0F0E14",
          borderRadius: "16px",
          boxShadow: 3,
          padding: "24px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: "16px", fontWeight: "bold" }}
        >
          Rubric Generator
        </Typography>
        <TextField
          fullWidth
          select
          label="Select Grade Level"
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
          sx={{ marginBottom: "24px" }}
        >
          <MenuItem value="pre-k">Pre-K</MenuItem>
          <MenuItem value="kindergarten">Kindergarten</MenuItem>
          <MenuItem value="elementary">Elementary</MenuItem>
          <MenuItem value="middle">Middle</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="university">University</MenuItem>
          <MenuItem value="professional">Professional</MenuItem>
        </TextField>
        <TextField
          label="Point Scale"
          select
          fullWidth
          value={pointScale}
          onChange={(e) => setPointScale(e.target.value)}
          sx={{ marginBottom: "16px" }}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
        </TextField>
        <TextField
          label="Standards / Objectives"
          fullWidth
          multiline
          rows={3}
          value={standards}
          onChange={(e) => setStandards(e.target.value)}
          sx={{ marginBottom: "16px" }}
        />
        <TextField
          label="Assignment Description"
          fullWidth
          multiline
          rows={3}
          value={assignmentDescription}
          onChange={(e) => setAssignmentDescription(e.target.value)}
          sx={{ marginBottom: "24px" }}
        />
        {error && (
          <Typography color="error" sx={{ marginBottom: "16px" }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          onClick={handleGenerateRubric}
          sx={{
            backgroundColor: "#6200ea",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Generate
        </Button>
        {loading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CircularProgress disableShrink size={75} color="primary" />
            <Typography>Generating rubric...</Typography>
          </Box>
        )}
      </Grid>
    );
  };

export default RubricGenerator;