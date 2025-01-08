import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import RubricGenerator from "./RubricGenerator";
import RubricDisplay from "./RubricDisplay";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styles } from "./styles";

const Rubric = () => {
  const [rubric, setRubric] = useState(null);

  return (
    <Box
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {rubric ? (
        <RubricDisplay rubric={rubric} setRubric={setRubric} />
      ) : (
        <>
          <Button startIcon={<ArrowBackIcon />} sx={styles.backButton}>
            Back
          </Button>
          <RubricGenerator onGenerateRubric={setRubric} />
        </>
      )}
    </Box>
  );
};

export default Rubric;
