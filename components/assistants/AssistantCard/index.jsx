import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const AssistantCard = ({ assistant }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLaunchChat = async () => {
    setLoading(true);
    try {
      // TODO: Create chat session and redirect to chat page
      router.push(`/chat?assistant=${assistant.id}`);
    } catch (error) {
      console.error('Failed to launch chat:', error);
    }
    setLoading(false);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        borderRadius: 2,
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)',
          transition: 'all 0.2s ease-in-out'
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box 
            sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2
            }}
          >
            <ChatIcon sx={{ color: 'white' }} />
          </Box>
          <Typography 
            variant="h6" 
            component="h2"
            sx={{ 
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            {assistant.name}
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            minHeight: 60,
            mb: 2
          }}
        >
          {assistant.description}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'text.disabled',
            display: 'block',
            mb: 1
          }}
        >
          {assistant.group}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<ChatIcon />}
          onClick={handleLaunchChat}
          disabled={loading}
          sx={{
            borderRadius: 2,
            py: 1,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Chat
        </Button>
      </CardActions>
    </Card>
  );
};

export default AssistantCard;
