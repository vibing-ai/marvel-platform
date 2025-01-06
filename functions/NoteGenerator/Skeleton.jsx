import { buttonClasses, Grid, Skeleton } from '@mui/material';

import styles from './styles';
import { createElement } from 'react';

const NoteGenSkeleton = () => {

    const toolButton = createElement("button");
 
    return (
        <Grid {...styles.mainNotesGeneratorLayout}>
        </Grid>
    )
}