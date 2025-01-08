import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";


const RubricDisplay = ({ rubric }) => {
  if (!rubric || !rubric.data) {
    return <Typography>No rubric data available</Typography>;
  }
  const { title, criterias, feedback } = rubric.data;

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
        maxWidth: "70%",
        margin: "0 auto",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: "16px" }}
      >
        {title}
      </Typography>
      <Table
        sx={{ backgroundColor: "#0F0E14", borderRadius: "8px" }}
        border={2}
        borderColor="#FFFFFF"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
              Criteria
            </TableCell>
            <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
              4 Points
            </TableCell>
            <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
              3 Points
            </TableCell>
            <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
              2 Points
            </TableCell>
            <TableCell sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
              1 Point
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {criterias.map((criteria, index) => (
            <TableRow key={index}>
              <TableCell sx={{ verticalAlign: "top", fontWeight: "bold" }}>
                {criteria.criteria}
              </TableCell>
              {criteria.criteria_description.map((description, idx) => (
                <TableCell key={idx}>
                  {description.description.map((desc, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      sx={{ marginBottom: "8px" }}
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

      <Typography variant="body1" sx={{ marginTop: "9px", fontWeight: "bold" }}>
        Total Possible Points:
      </Typography>
      <Typography
        variant="body1"
        sx={{ marginTop: "14px", fontWeight: "bold" }}
      >
        Note to Teacher: {feedback}
      </Typography>
    </Box>
  );
};

export default RubricDisplay;