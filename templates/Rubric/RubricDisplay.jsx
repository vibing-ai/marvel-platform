import React from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import TotalPoints from "./TotalPoints";
import { styles } from "./styles";
import {useRubricDisplay} from '@/libs/hooks/useRubricDisplay';


const RubricDisplay = ({ rubric, setRubric }) => {
  const { handleBackClick, handleEditClick, exportAsPDF, exportAsDOCX } =
  useRubricDisplay(rubric, setRubric);

  if (!rubric || !rubric.data) {
    return <Typography>No rubric data available</Typography>;
  }
  const { title, criterias, feedback } = rubric.data;

  return (
    <Box sx={styles.rubricContainer}>
      <Button
        startIcon={<ArrowBackIcon />}
        sx={styles.backButton}
        onClick={handleBackClick}
      >
        Back
      </Button>
      <Box sx={styles.headerBox}>
        <Box></Box>
        <Typography sx={styles.headerTitle}>
          AI Resistant Assignments
        </Typography>
        <Button
          startIcon={<EditIcon />}
          sx={styles.editButton}
          onClick={handleEditClick}
        >
          Edit Prompt
        </Button>
      </Box>
      <Box sx={styles.resultContainer}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "16px" }}
        >
          {title}
        </Typography>
        <Table sx={styles.table} border="1px">
          <TableHead>
            <TableRow>
              <TableCell sx={styles.tableCell}>Criteria</TableCell>
              <TableCell sx={styles.tableCell}>4 Points</TableCell>
              <TableCell sx={styles.tableCell}>3 Points</TableCell>
              <TableCell sx={styles.tableCell}>2 Points</TableCell>
              <TableCell sx={styles.tableCell}>1 Point</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {criterias.map((criteria, index) => (
              <TableRow key={index}>
                <TableCell sx={styles.tableCell}>{criteria.criteria}</TableCell>
                {criteria.criteria_description.map((description, idx) => (
                  <TableCell key={idx} sx={styles.tableCell}>
                    {description.description.map((desc, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{
                          marginBottom: "8px",
                        }}
                      >
                        {desc}
                      </Typography>
                    ))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TotalPoints criterias={criterias} />
      <Typography variant="body1" sx={styles.totalPoints}>
        Note to Teacher:: {feedback}
      </Typography>
      <Box sx={{ display: "flex", gap: "12px", marginTop: "16px" }}>
        <Button onClick={exportAsPDF} sx={styles.exportButton}>
          Export as PDF
        </Button>
        <Button onClick={exportAsDOCX} sx={styles.exportButton}>
          Export as DOCX
        </Button>
      </Box>
    </Box>
  );
};

export default RubricDisplay;
