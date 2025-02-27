import { useEffect, useState } from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import AssistantCard from '@/components/assistants/AssistantCard';
import { Loader } from '@/components/Loader';
import MainAppLayout from '@/layouts/MainAppLayout';

const AssistantsPage = () => {
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchAssistants = async () => {
      try {
        // Temporary mock data
        const mockAssistants = [
          {
            id: 'co_teacher',
            name: 'CoTeacher',
            description: 'I\'m here to assist with anything you need to enhance learning. How can I support you today?',
            group: 'Recently Used'
          }
        ];
        setAssistants(mockAssistants);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAssistants();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        AI Assistants
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Explore a suite of AI-powered assistants designed to simplify teaching, enhance learning, and save you time — customized for every classroom need.
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {assistants.map((assistant) => (
          <Grid item xs={12} sm={6} md={4} key={assistant.id}>
            <AssistantCard assistant={assistant} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Add the layout wrapper
AssistantsPage.getLayout = (page) => {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default AssistantsPage;
