import { Grid } from '@mui/material';
import { styled } from '@mui/system';

const OrBlock = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <LineWrapper>
        <Line />
        <Text>Or</Text>
        <Line />
      </LineWrapper>
    </Grid>
  );
};

const LineWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
  justifyContent: 'center',
});

const Line = styled('div')({
  flexGrow: 1,
  height: '1px',
  backgroundColor: '#464953',
});

const Text = styled('span')({
  padding: '0 10px',
  fontSize: '18px', // Add some space between the text and the lines
});

export default OrBlock;