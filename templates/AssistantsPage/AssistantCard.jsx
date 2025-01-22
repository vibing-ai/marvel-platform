import { Box, Grid, Typography, IconButton, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatIcon from '@mui/icons-material/Chat';
import styles from './styles';

const AssistantCard = ({ id, name, tag, description, rating, imageUrl, isNew, isPopular }) => {
  return (
    <Grid item {...styles.cardItemProps}>
      <Grid {...styles.cardGridProps}>
        <Grid container alignItems="flex-start" justifyContent="space-between">
          <Grid container alignItems="center" gap={2}>
            <Box {...styles.iconContainer}>
              <Image
                src={imageUrl || `/assistants/default.png`}
                alt={name}
                width={40}
                height={40}
              />
            </Box>
            <Typography {...styles.nameProps}>{name}</Typography>
          </Grid>
          <IconButton size="small" sx={{ color: 'primary.light' }}>
            <BookmarkBorderIcon />
          </IconButton>
        </Grid>

        {(isNew || isPopular) && (
          <Box {...styles.tagContainer}>
            <Typography {...styles.tagProps}>
              {isNew ? 'New' : 'Popular'}
            </Typography>
          </Box>
        )}

        <Typography {...styles.descriptionProps}>
          "{description}"
        </Typography>

        <Grid container justifyContent="space-between" alignItems="center">
          <Grid container alignItems="center" gap={0.5}>
            <Typography {...styles.ratingProps}>
              {rating}
            </Typography>
            <Typography {...styles.ratingMaxProps}>
              / 5
            </Typography>
          </Grid>
          <Link href={`/chat?assistant=${id}`} style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              startIcon={<ChatIcon />}
              {...styles.chatButtonProps}
            >
              Chat
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AssistantCard;
