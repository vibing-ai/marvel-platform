import { buttonClasses, Grid, Skeleton } from '@mui/material';

import styles from './styles';
import { createElement } from 'react';

const NoteGenSkeleton = () => {

    const toolButton = createElement("button")

    toolButton.key = 0;
    
    return (
        <Grid {...styles.mainNotesGeneratorLayout}>
        </Grid>
    )
}