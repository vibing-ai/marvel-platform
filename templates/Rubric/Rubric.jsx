import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import RubricGenerator from "./RubricGenerator";
import RubricDisplay from "./RubricDisplay";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { styles } from "./styles";

const Rubric = () => {
  const [rubric, setRubric] = useState(null);
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };
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
          <Button
            startIcon={<ArrowBackIcon />}
            sx={styles.backButton}
            onClick={handleBackClick}
          >
            Back
          </Button>
          <RubricGenerator onGenerateRubric={setRubric} />
        </>
      )}
    </Box>
  );
};

export default Rubric;
