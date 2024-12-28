import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Fade,
  Grid,
} from "@mui/material";

import { useSelector } from "react-redux";

import styles from "./styles";

const SyllabusGeneratorResponse = () => {
  const { response } = useSelector((state) => state.tools);

  const formatContent = (content) =>
    content
      .split("\n") 
      .map((item) => item.trim().replace(/^[-*]+\s*/, "")); 
      
  const renderCourseContent = () =>
    response.course_content.map((content, idx) => (
      <Paper
        key={idx}
        elevation={3}
        sx={{
          padding: 3,
          marginBottom: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          📅 Week {content.unit_time_value}: {content.topic.split("\n")[0]}
        </Typography>
        <Divider sx={{ marginBottom: 1 }} />
        <List>
          {formatContent(content.topic).map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={`• ${item}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    ));

  const renderTable = () => {
    return (
      <Box sx={{ padding: 4 }}>
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            📘 Course Information
          </Typography>
          <Typography variant="subtitle1">
            <strong>Title:</strong> {response.course_information.course_title}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Grade Level:</strong> {response.course_information.grade_level}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {response.course_information.description}
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            🎯 Objectives and Learning Outcomes
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="subtitle1">
            <strong>Objectives:</strong>
          </Typography>
          <List>
            {response.course_description_objectives.objectives.map((obj, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={`✔️ ${obj}`} />
              </ListItem>
            ))}
          </List>
          <Typography variant="subtitle1">
            <strong>Intended Learning Outcomes:</strong>
          </Typography>
          <List>
            {response.course_description_objectives.intended_learning_outcomes.map(
              (outcome, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={`🎓 ${outcome}`} />
                </ListItem>
              )
            )}
          </List>
        </Paper>

        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            📜 Course Content
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          {renderCourseContent()}
        </Paper>

        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            ⚖️ Policies and Procedures
          </Typography>
          <Typography variant="body1">
            <strong>Attendance Policy:</strong> {response.policies_procedures.attendance_policy}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            <strong>Late Submission Policy:</strong> {response.policies_procedures.late_submission_policy}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            <strong>Academic Honesty:</strong> {response.policies_procedures.academic_honesty}
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            📈 Assessment and Grading
          </Typography>
          <Typography variant="subtitle1">
            <strong>Assessment Methods:</strong>
          </Typography>
          <List>
            {response.assessment_grading_criteria.assessment_methods.map(
              (method, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primary={`📊 ${method.type_assessment} - Weight: ${method.weight}%`}
                  />
                </ListItem>
              )
            )}
          </List>
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
            <strong>Grading Scale:</strong>
          </Typography>
          <List>
            {Object.entries(response.assessment_grading_criteria.grading_scale).map(
              ([range, grade], idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={`📝 ${range}: ${grade}`} />
                </ListItem>
              )
            )}
          </List>
        </Paper>

        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            📚 Learning Resources
          </Typography>
          <List>
            {response.learning_resources.map((resource, idx) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={`📖 ${resource.title} by ${resource.author} (${resource.year})`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            🗓️ Course Schedule
          </Typography>
          {response.course_schedule.map((schedule, idx) => (
            <Box key={idx} sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle1">
                Week {schedule.unit_time_value} ({schedule.date}): {schedule.topic}
              </Typography>
              <Typography variant="body2">{schedule.activity_desc}</Typography>
            </Box>
          ))}
        </Paper>
      </Box>
    );
  };

  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>{renderTable()}</Grid>
    </Fade>
  );
};

export default SyllabusGeneratorResponse;
