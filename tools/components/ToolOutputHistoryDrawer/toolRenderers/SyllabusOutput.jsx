import { Grid, List, ListItem, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ListItemText } from '@mui/material';

const formatContent = (content) =>
    content.split("\n").map((item) => item.trim().replace(/^[-*]+\s*/, ""));

const renderSection = (title, content) => (
    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        {content}
    </Paper>
);

const renderList = (title, items, icon) => (
    <>
        <Typography variant="subtitle1" gutterBottom><strong>{title}:</strong></Typography>
        <List>
            {items.map((item, idx) => (
                <ListItem key={idx}>
                    <ListItemText primary={`${icon} ${item}`} />
                </ListItem>
            ))}
        </List>
    </>
);

const renderTable = (headers, rows, rowRenderer) => (
    <TableContainer component={Paper} sx={{ background: 'none', boxShadow: 'none' }}>
        <Table sx={{ background: 'none', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
            <TableHead>
                <TableRow>
                    {headers.map((header, idx) => (
                        <TableCell key={idx} sx={{ fontWeight: 'bold', padding: '12px', fontSize: '16px', color: '#ffffff' }}>
                            {header}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, idx) => rowRenderer(row, idx))}
            </TableBody>
        </Table>
    </TableContainer>
);

const SyllabusOutput = ({ data }) => {

    const response = data?.response || {};

    return (
        <Grid container direction="column">
            {renderSection(
                '📘 Course Information',
                <>
                    <Typography variant="subtitle1"><strong>Title:</strong> {response.course_information.course_title}</Typography>
                    <Typography variant="subtitle1"><strong>Grade Level:</strong> {response.course_information.grade_level}</Typography>
                    <Typography variant="body1" sx={{ marginTop: 2 }}>{response.course_information.description}</Typography>
                </>
            )}

            {renderSection(
                '🎯 Objectives and Learning Outcomes',
                <>
                    {renderList('Objectives', response.course_description_objectives.objectives, '✔️')}
                    {renderList('Intended Learning Outcomes', response.course_description_objectives.intended_learning_outcomes, '🎓')}
                </>
            )}

            {renderSection(
                '📜 Course Content',
                renderTable(
                    ['Week', 'Topic'],
                    response.course_content,
                    (content, idx) => (
                        <TableRow
                            key={idx}
                            sx={{ backgroundColor: idx % 2 === 0 ? '#333' : '#3c3c3c', borderBottom: '1px solid #555' }}
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
                    )
                )
            )}

            {renderSection(
                '⚖️ Policies and Procedures',
                <>
                    <Typography variant="body1"><strong>Attendance Policy:</strong> {response.policies_procedures.attendance_policy}</Typography>
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        <strong>Late Submission Policy:</strong> {response.policies_procedures.late_submission_policy}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        <strong>Academic Honesty:</strong> {response.policies_procedures.academic_honesty}
                    </Typography>
                </>
            )}

            {renderSection(
                '📈 Assessment and Grading',
                <>
                    {renderTable(
                        ['📊 Type', 'Weight'],
                        response.assessment_grading_criteria.assessment_methods,
                        (method, idx) => (
                            <TableRow
                                key={idx}
                                sx={{ backgroundColor: idx % 2 === 0 ? '#333' : '#3c3c3c', borderBottom: '1px solid #555' }}
                            >
                                <TableCell sx={{ padding: '12px', fontSize: '14px', color: '#ffffff' }}>{method.type_assessment}</TableCell>
                                <TableCell sx={{ padding: '12px', fontSize: '14px', color: '#c9c9c9' }}>{method.weight}%</TableCell>
                            </TableRow>
                        )
                    )}
                    {renderTable(
                        ['📝 Range', 'Grade'],
                        Object.entries(response.assessment_grading_criteria.grading_scale),
                        ([range, grade], idx) => (
                            <TableRow
                                key={idx}
                                sx={{ backgroundColor: idx % 2 === 0 ? '#333' : '#3c3c3c', borderBottom: '1px solid #555' }}
                            >
                                <TableCell sx={{ padding: '12px', fontSize: '14px', color: '#ffffff' }}>{range}</TableCell>
                                <TableCell sx={{ padding: '12px', fontSize: '14px', color: '#c9c9c9' }}>{grade}</TableCell>
                            </TableRow>
                        )
                    )}
                </>
            )}

            {renderSection(
                '📚 Learning Resources',
                renderList('Resources', response.learning_resources.map(resource => `${resource.title} by ${resource.author} (${resource.year})`), '📖')
            )}

            {renderSection(
                '🗓️ Course Schedule',
                renderTable(
                    ['Week', 'Date', 'Topic', 'Activity'],
                    response.course_schedule,
                    (schedule, idx) => (
                        <TableRow key={idx}>
                            <TableCell>Week {schedule.unit_time_value}</TableCell>
                            <TableCell>{schedule.date}</TableCell>
                            <TableCell>{schedule.topic}</TableCell>
                            <TableCell>{schedule.activity_desc}</TableCell>
                        </TableRow>
                    )
                )
            )}
        </Grid>
    )
};

export default SyllabusOutput;
