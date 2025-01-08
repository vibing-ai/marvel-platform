import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RubricGenerator from "./RubricGenerator";
import RubricDisplay from "./RubricDisplay";


const Rubric = () => {
  const [rubric, setRubric] = useState(null);

  return (
    <Box
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "#0F0E14",
        borderRadius: "16px",
        boxShadow: 3,
        padding: "24px",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#1A1B21",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "#FFFFFF",
            textTransform: "none",
            fontWeight: "bold",
          }}
          onClick={() => console.log("Back button clicked")}
        >
          Back
        </Button>
        <Typography
          sx={{
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          AI Resistant Assignments
        </Typography>
        <Button
          sx={{
            color: "#FFFFFF",
            backgroundColor: "#6200EA",
            borderRadius: "16px",
            padding: "6px 12px",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#5200C5",
            },
          }}
        >
          Edit Prompt
        </Button>
      </Box>
      {rubric ? (
        <RubricDisplay rubric={rubric} />
      ) : (
        <RubricGenerator onGenerateRubric={setRubric} />
      )}
    </Box>
  );
};

export default Rubric;