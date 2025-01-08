import React from "react";
import { Typography } from "@mui/material";

const calculateTotalPoints = (criterias) => {
  if (!criterias) {
    return 0;
  }
  let totalPoints = 0;

  criterias?.forEach((criteria) => {
    criteria.criteria_description.forEach((description) => {
      const pointsMatch = description.points.match(/\((\d+) points\)/); 
      if (pointsMatch) {
        totalPoints += parseInt(pointsMatch[1], 10);
      }
    });
  });

  return totalPoints;
};

const TotalPoints = ({ criterias }) => {
  const totalPoints = calculateTotalPoints(criterias);

  return (
    <>
      <Typography variant="body1" sx={{ marginTop: "9px", fontWeight: "bold" }}>
        Total Possible Points: {totalPoints}
      </Typography>
    </>
  );
};

export default TotalPoints;
