import { Box, Grid } from '@mui/material';

// tabs is an array of strings, activeTab is a string, setActiveTab is a function they are listing on the homepage
const Filters = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <Grid container spacing={2} sx={{ padding: '16px 0' }} wrap="nowrap">
      {tabs.map((tab) => (
        <Grid item key={tab} xs>
          <Box
            component="button"
            sx={{
              width: '100%',
              backgroundColor: activeTab === tab ? '#9d74ff' : 'transparent',
              color: activeTab === tab ? '#fff' : 'text.primary',
              padding: '8px 16px',
              borderRadius: '16px',
              border: '2px solid #9d74ff',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, border-color 0.3s ease',
              '&:hover': {
                backgroundColor:
                  activeTab === tab ? 'primary.dark' : 'action.hover',
                borderColor: '#9d74ff',
              },
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Filters;
