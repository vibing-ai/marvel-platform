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
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { useSelector } from "react-redux";

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
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: '#ffffff',
          fontWeight: 'bold',
          paddingBottom: 1,
        }}
      >
        📜 Course Content
      </Typography>
      <Divider sx={{ marginBottom: 2, backgroundColor: '#444' }} />
      <TableContainer
        component={Paper}
        sx={{ background: 'none', boxShadow: 'none' }}
      >
        <Table sx={{ background: 'none', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#444' }}>
              <TableCell sx={{ fontWeight: 'bold', padding: '12px', fontSize: '16px', color: '#ffffff' }}>Week</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '12px', fontSize: '16px', color: '#ffffff' }}>Topic</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {response.course_content.map((content, idx) => (
              <TableRow
                key={idx}
                sx={{
                  backgroundColor: idx % 2 === 0 ? '#333' : '#3c3c3c',
                  borderBottom: '1px solid #555',
                }}
              >
                <TableCell sx={{ padding: '12px', fontSize: '14px', color: '#ffffff', fontWeight: 'bold' }}>
                  Week {content.unit_time_value}
                </TableCell>
                <TableCell sx={{ padding: '12px', fontSize: '14px', color: '#dcdcdc' }}>
                  <Typography variant="body1" sx={{ marginBottom: 1, fontWeight: 'bold', color: '#ffffff' }}>
                    {content.topic.split("\n")[0]}
                  </Typography>
                  <List>
                    {content.topic.split("\n").slice(1).map((item, index) => (
                      <ListItem key={index} sx={{ padding: 0 }}>
                        <ListItemText primary={`• ${formatContent(item.trim())}`} sx={{ color: '#c9c9c9' }} />
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: '#ffffff',
          fontWeight: 'bold',
          paddingBottom: 1,
        }}
      >
        📈 Assessment and Grading
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#ffffff' }}>
        Assessment Methods
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ background: 'none', boxShadow: 'none' }}
      >
        <Table sx={{ background: 'none', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#444' }}>
              <TableCell sx={{ fontWeight: 'bold', padding: '12px', fontSize: '16px', color: '#ffffff' }}>📊 Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '12px', fontSize: '16px', color: '#ffffff' }}>Weight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {response.assessment_grading_criteria.assessment_methods.map((method, idx) => (
              <TableRow
                key={idx}
                sx={{
                  backgroundColor: idx % 2 === 0 ? '#333' : '#3c3c3c',
                  borderBottom: '1px solid #555',
                }}
              >
                <TableCell sx={{ padding: '12px', fontSize: '14px', color: '#ffffff' }}>
                  {method.type_assessment}
                </TableCell>
                <TableCell sx={{ padding: '12px', fontSize: '14px', color: '#c9c9c9' }}>
                  {method.weight}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1" sx={{ marginTop: 4, marginBottom: 2, fontWeight: 'bold', color: '#ffffff' }}>
        Grading Scale
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ background: 'none', boxShadow: 'none' }}
      >
        <Table sx={{ background: 'none', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#444' }}>
              <TableCell sx={{ fontWeight: 'bold', padding: '12px', fontSize: '16px', color: '#ffffff' }}>📝 Range</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '12px', fontSize: '16px', color: '#ffffff' }}>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(response.assessment_grading_criteria.grading_scale).map(([range, grade], idx) => (
              <TableRow
                key={idx}
                sx={{
                  backgroundColor: idx % 2 === 0 ? '#333' : '#3c3c3c',
                  borderBottom: '1px solid #555',
                }}
              >
                <TableCell sx={{ padding: '12px', fontSize: '14px', color: '#ffffff' }}>{range}</TableCell>
                <TableCell sx={{ padding: '12px', fontSize: '14px', color: '#c9c9c9' }}>{grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <TableContainer
        component={Paper}
        sx={{ background: 'none', boxShadow: 'none' }}
      >
        <Table sx={{ background: 'none' }}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Week</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Topic</strong></TableCell>
              <TableCell><strong>Activity</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {response.course_schedule.map((schedule, idx) => (
              <TableRow key={idx}>
                <TableCell>Week {schedule.unit_time_value}</TableCell>
                <TableCell>{schedule.date}</TableCell>
                <TableCell>{schedule.topic}</TableCell>
                <TableCell>{schedule.activity_desc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
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
        </Box>
      </Grid>
    </Fade>
  );
};

export default SyllabusGeneratorResponse;
