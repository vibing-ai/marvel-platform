import { useState, useEffect } from 'react';
import { Grid, TextField, ClickAwayListener, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

import AIChatIcon from '@/assets/svg/AIChatIcon.svg';
import HistoryIcon from '@/assets/svg/HistoryIcon.svg';
import KAIAvatar from '@/assets/svg/KAIAvatar.svg';
import EditIconOutline from '@/assets/svg/EditIconOutline.svg';

import EditPromptPopout from './EditPromptPopout/EditPromptPopout';
import LastSaved from './LastSaved/LastSaved';

import styles from './styles';

import ROUTES from '@/libs/constants/routes';
import EditorExport from '@/tools/components/EditorExport/EditorExport';
import { actions as toolActions } from '@/tools/data';
import { firestore } from '@/libs/redux/store';

const ToolNav = (props) => {
  const { toolDoc, popoutOpen } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const topicName = useSelector((state) => state.tools.topic);
  const sessionId = useSelector((state) => state.tools.sessionId);
  const userId = useSelector((state) => state.user?.data?.id);
  
  // Add state to track editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedTopicName, setEditedTopicName] = useState(topicName || toolDoc?.name || '');

  // Handle editing the topic name
  const handleEditClick = () => {
    setEditedTopicName(topicName || toolDoc?.name || '');
    setIsEditing(true);
  };

  // Update the topic in Firestore
  const updateTopicInFirestore = async (topic) => {
    try {
      if (sessionId) {
        // Update the existing document with the session ID
        const docRef = doc(firestore, 'toolSessions', sessionId);
        await updateDoc(docRef, {
          topic: topic
        });
        console.log('Topic updated in Firestore');
      } else if (userId && toolDoc?.id) {
        // Find the most recent session for this tool and user
        const toolSessionsCollection = collection(firestore, 'toolSessions');
        const q = query(
          toolSessionsCollection,
          where('userId', '==', userId),
          where('toolId', '==', toolDoc.id),
          orderBy('createdAt', 'desc'),
          limit(1)
        );
        
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docRef = doc(firestore, 'toolSessions', querySnapshot.docs[0].id);
          await updateDoc(docRef, {
            topic: topic
          });
          console.log('Topic updated in the most recent session');
        }
      }
    } catch (error) {
      console.error('Error updating topic in Firestore:', error);
    }
  };

  // Handle saving the edited topic name
  const handleSaveTopic = () => {
    if (editedTopicName.trim()) {
      const newTopic = editedTopicName.trim();
      dispatch(toolActions.setTopic(newTopic));
      
      // Update in Firestore
      updateTopicInFirestore(newTopic);
    }
    setIsEditing(false);
  };

  // Handle click away to save
  const handleClickAway = () => {
    handleSaveTopic();
  };

  // Handle key press in the text field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSaveTopic();
    }
  };

  // Fetch the topic from Firestore when the component mounts or sessionId changes
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        if (sessionId) {
          const docRef = doc(firestore, 'toolSessions', sessionId);
          const docSnap = await getDocs(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.topic && data.topic !== topicName) {
              dispatch(toolActions.setTopic(data.topic));
              setEditedTopicName(data.topic);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching topic from Firestore:', error);
      }
    };

    if (sessionId) {
      fetchTopic();
    }
  }, [sessionId, dispatch]);

  return (
    <Grid
      container
      alignItems="center"
      spacing={0}
      sx={{
        position: 'fixed',
        top: 20,
        left: 0,
        right: 0,
        px: '40px',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
      }}
    >
      <Grid onClick={() => router.push(ROUTES.HOME)} {...styles.logoGridProps}>
        <KAIAvatar {...styles.logoProps} />
      </Grid>
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        sx={{ paddingBottom: '10px' }}
      >
        <Grid
          item
          container
          alignItems="center"
          spacing={0}
          sx={{ gap: '15px', fontFamily: 'Satoshi Bold' }}
        >
          <Grid item>
            {isEditing ? (
              <ClickAwayListener onClickAway={handleClickAway}>
                <TextField
                  value={editedTopicName}
                  onChange={(e) => setEditedTopicName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoFocus
                  variant="standard"
                  InputProps={{
                    sx: {
                      fontSize: '1.5rem',
                      fontFamily: 'Satoshi Bold',
                      color: 'white',
                      '&:before': { borderBottom: '1px solid #9D7BFF' },
                      '&:after': { borderBottom: '2px solid #9D7BFF' },
                    }
                  }}
                  sx={{ minWidth: '200px' }}
                />
              </ClickAwayListener>
            ) : (
              <h2>{topicName || toolDoc?.name} </h2>
            )}
          </Grid>
          <Grid>
            <IconButton 
              onClick={handleEditClick}
              sx={{ 
                padding: '4px', 
                '&:hover': { backgroundColor: 'rgba(157, 123, 255, 0.08)' } 
              }}
            >
              <EditIconOutline />
            </IconButton>
          </Grid>
        </Grid>

        <Grid
          item
          container
          alignItems="center"
          spacing={0}
          sx={{ gap: '7px', fontFamily: 'Satoshi', color: ' #DECDFF' }}
        >
          <Grid item>{toolDoc?.name}</Grid>
          <Grid item>
            <LastSaved />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justifyContent="right"
        spacing={0}
        sx={{ gap: '7px' }}
      >
        <Grid item sx={{ paddingRight: '25px', display: 'flex', alignItems: 'center' }}>
          <EditPromptPopout 
            toolDoc={toolDoc} 
            popoutOpen={popoutOpen} 
            setTopic={(topic) => {
              dispatch(toolActions.setTopic(topic));
              updateTopicInFirestore(topic);
            }}
          />
        </Grid>
        <Grid item>
          <HistoryIcon />
        </Grid>
        <Grid item>
          <EditorExport />
        </Grid>
        <Grid item>
          <AIChatIcon />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ToolNav;