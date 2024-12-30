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
  Button
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { useSelector } from "react-redux";

import { createPdf } from "../../libs/utils/createPdf";

import styles from "./styles";

/**
* Renders the response from the Syllabus Generator tool in a structured format.
 *
 * The component displays course information in a table-like format using
 * Material-UI components. The layout includes two primary columns: "Section"
 * and "Details".
 *
 * Structure:
 * Each section is displayed within a `Paper` component for separation and clarity.
 * The data is organized as follows:
 *
 * - Course Information:
 *   - Course Title: Displays the title of the course.
 *   - Grade Level: Indicates the grade level for the course.
 *   - Description: A brief overview of the course content.
 * 
 * - Instructor Information:
 *   - Instructor Name: The name of the course instructor.
 *   - Instructor Title: The title or designation of the instructor.
 *
 * - Objectives and Learning Outcomes:
 *   - Objectives: Key objectives of the course displayed as a bullet list.
 *   - Learning Outcomes: The intended learning outcomes for students.
 * - Course Content:
 *   - Week-by-week breakdown of topics covered in the course, formatted as a list.
 * - Policies and Procedures:
 *   - Attendance Policy: Guidelines for attendance.
 *   - Late Submission Policy: Rules for late submissions.
 *   - Academic Honesty: Expectations for academic integrity.
 *
 * - Assessment and Grading:
 *   - Assessment Methods: Evaluation criteria and their respective weights.
 *   - Grading Scale: The grading scale used for the course.
 *
 * - Learning Resources:
 *   - A list of books, articles, or tools recommended for the course.
 *
 * - Course Schedule:
 *   - Detailed schedule of activities, including topics, assignments, and due dates.
 *
 * Usage:
 * Import this component and pass the syllabus data through a `response` object.
 * Ensure that the data follows the required structure to be displayed correctly.
*/

const SyllabusGeneratorResponse = () => {
  const { response } = useSelector((state) => state.tools);

  const formatContent = (content) =>
    content
      .split("\n")
      .map((item) => item.trim().replace(/^[-*]+\s*/, ""));

  const handleExportPdf = () => {
    const sections = [
      {
        header: "Course Information",
        content: [
          `Title: ${response.course_information.course_title}`,
          `Grade Level: ${response.course_information.grade_level}`,
          `Description: ${response.course_information.description}`,
        ],
      },
      {
        header: "Objectives and Learning Outcomes",
        content: response.course_description_objectives.objectives.map(
          (obj, idx) => `Objective ${idx + 1}: ${obj}`
        ),
      },
      {
        header: "Course Content",
        table: {
          head: [["Week", "Topic"]],
          body: response.course_content.map((content) => [
            `Week ${content.unit_time_value}`,
            content.topic,
          ]),
        },
      },
      {
        header: "Policies and Procedures",
        content: [
          `Attendance Policy: ${response.policies_procedures.attendance_policy}`,
          `Late Submission Policy: ${response.policies_procedures.late_submission_policy}`,
          `Academic Honesty: ${response.policies_procedures.academic_honesty}`,
        ],
      },
      {
        header: "Assessment and Grading",
        table: {
          head: [["Assessment Type", "Weight"]],
          body: response.assessment_grading_criteria.assessment_methods.map(
            (method) => [method.type_assessment, `${method.weight}%`]
          ),
        },
      },
      {
        header: "Learning Resources",
        content: response.learning_resources.map(
          (resource, idx) =>
            `Resource ${idx + 1}: ${resource.title} by ${resource.author} (${resource.year})`
        ),
      },
    ];

    createPdf(sections);
  };

  const renderCourseInfo = () => (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom>📘 Course Information</Typography>
      <Typography variant="subtitle1"><strong>Title:</strong> {response.course_information.course_title}</Typography>
      <Typography variant="subtitle1"><strong>Grade Level:</strong> {response.course_information.grade_level}</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>{response.course_information.description}</Typography>
    </Paper>
  );

  const renderObjectivesAndOutcomes = () => (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom>🎯 Objectives and Learning Outcomes</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="subtitle1"><strong>Objectives:</strong></Typography>
      <List>
        {response.course_description_objectives.objectives.map((obj, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={`✔️ ${obj}`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1"><strong>Intended Learning Outcomes:</strong></Typography>
      <List>
        {response.course_description_objectives.intended_learning_outcomes.map((outcome, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={`🎓 ${outcome}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  const renderCourseContent = () => (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom>📜 Course Content</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      {response.course_content.map((content, idx) => (
        <Paper
          key={idx}
          elevation={3}
          sx={{ padding: 3, marginBottom: 3 }}
        >
          <Typography variant="h6" gutterBottom>
            📅 Week {content.unit_time_value}: {content.topic.split("\n")[0]}
          </Typography>
          <Divider sx={{ marginBottom: 1 }} />
          <List>
            {content.topic.split("\n").map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={`• ${formatContent(item.trim())}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </Paper>
  );

  const renderPoliciesAndProcedures = () => (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom>⚖️ Policies and Procedures</Typography>
      <Typography variant="body1"><strong>Attendance Policy:</strong> {response.policies_procedures.attendance_policy}</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        <strong>Late Submission Policy:</strong> {response.policies_procedures.late_submission_policy}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        <strong>Academic Honesty:</strong> {response.policies_procedures.academic_honesty}
      </Typography>
    </Paper>
  );

  const renderAssessmentAndGrading = () => (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom>📈 Assessment and Grading</Typography>
      <Typography variant="subtitle1"><strong>Assessment Methods:</strong></Typography>
      <List>
        {response.assessment_grading_criteria.assessment_methods.map((method, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={`📊 ${method.type_assessment} - Weight: ${method.weight}%`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1" sx={{ marginTop: 2 }}><strong>Grading Scale:</strong></Typography>
      <List>
        {Object.entries(response.assessment_grading_criteria.grading_scale).map(([range, grade], idx) => (
          <ListItem key={idx}>
            <ListItemText primary={`📝 ${range}: ${grade}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  const renderLearningResources = () => (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom>📚 Learning Resources</Typography>
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
  );

  const renderCourseSchedule = () => (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h5" gutterBottom>🗓️ Course Schedule</Typography>
      {response.course_schedule.map((schedule, idx) => (
        <Box key={idx} sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1">
            Week {schedule.unit_time_value} ({schedule.date}): {schedule.topic}
          </Typography>
          <Typography variant="body2">{schedule.activity_desc}</Typography>
        </Box>
      ))}
    </Paper>
  );

  const renderExportPdfButton = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 4,
      }}
    >
      <Button
        variant="contained"
        color="error"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 28px",
          fontWeight: "bold",
          fontSize: "20px",
          textTransform: "none",
          borderRadius: "50px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#FF4C4C",
          "&:hover": {
            backgroundColor: "#e84343",
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.25)",
          },
        }}
        startIcon={<PictureAsPdfIcon style={{ fontSize: "28px" }} />}
        onClick={handleExportPdf}
      >
        Export PDF
      </Button>
    </Box>


  );

  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>
        <Box sx={{ padding: 4 }}>
          {renderCourseInfo()}
          {renderObjectivesAndOutcomes()}
          {renderCourseContent()}
          {renderPoliciesAndProcedures()}
          {renderAssessmentAndGrading()}
          {renderLearningResources()}
          {renderCourseSchedule()}
          {renderExportPdfButton()}
        </Box>
      </Grid>
    </Fade>
  );
};

export default SyllabusGeneratorResponse;
