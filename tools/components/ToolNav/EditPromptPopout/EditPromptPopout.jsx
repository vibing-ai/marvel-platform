import { useState, useEffect } from 'react';
import { Popover, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

import CarrotDown from '@/assets/svg/CarrotDown.svg';
import CarrotUp from '@/assets/svg/CarrotUp.svg';

import ToolRequestForm from '@/tools/components/ToolRequestForm';

import styles from './styles';
import { actions as toolActions } from '@/tools/data';
import { firestore } from '@/libs/redux/store';

const { setPopoutOpen } = toolActions;

/**
 * EditPromptPopout Component
 * 
 * This component renders a button to toggle the prompt popout,
 * which contains a tool request form inside a popover.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.toolDoc - The tool document containing input data.
 * @param {boolean} props.popoutOpen - Boolean indicating if the popout is open.
 * @param {Function} props.setTopic - Function to set the topic.
 * @returns {JSX.Element} The rendered component.
 */
const EditPromptPopout = (props) => {
  const { toolDoc, popoutOpen, setTopic } = props;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [savedInputs, setSavedInputs] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const sessionId = useSelector((state) => state.tools.sessionId);
  const userId = useSelector((state) => state.user?.data?.id);

  // Function to fetch the latest tool session for this tool
  const fetchToolSession = async () => {
    try {
      setLoading(true);
      
      let docRef;
      let docSnap;
      
      // If we have a sessionId, use it directly
      if (sessionId) {
        docRef = doc(firestore, 'toolSessions', sessionId);
        docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.savedInputs) {
            setSavedInputs(data.savedInputs);
          }
        }
      } 
      // Otherwise, find the most recent session for this tool and user
      else if (userId && toolDoc?.id) {
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
          const data = querySnapshot.docs[0].data();
          if (data.savedInputs) {
            setSavedInputs(data.savedInputs);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching tool session:', error);
    } finally {
      setLoading(false);
    }
  };

  // When the popout opens, fetch the saved inputs
  useEffect(() => {
    if (popoutOpen) {
      fetchToolSession();
    }
  }, [popoutOpen, sessionId, userId, toolDoc?.id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(setPopoutOpen(!popoutOpen));
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(setPopoutOpen(false));
  };

  return (
    <>
      <Button
        onClick={handleClick}
        sx={styles.buttonStyles(popoutOpen)}
        endIcon={
          <div style={styles.iconStyles(popoutOpen)}>
            {popoutOpen ? <CarrotUp /> : <CarrotDown />}
          </div>
        }
      >
        Prompt
      </Button>
      <Popover
        open={popoutOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: styles.popoverStyles,
        }}
      >
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          <ToolRequestForm
            isPopout
            inputs={toolDoc?.inputs}
            id={toolDoc?.id}
            setTopic={setTopic}
            savedInputs={savedInputs}
          />
        )}
      </Popover>
    </>
  );
};

export default EditPromptPopout;