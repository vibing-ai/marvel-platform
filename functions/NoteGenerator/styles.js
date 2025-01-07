import { getRandomBackgroundColor } from '@/libs/utils/MiscellaneousUtils';
import { alignProperty } from '@mui/material/styles/cssUtils';
import zIndex from '@mui/material/styles/zIndex'; 

const styles = {
    mainNotesGeneratorLayout: {
        container: true, 
        item: true, 
        lineHeight: 25.6,
        position: 'static',
        zIndex: auto, 
        desktopLarge: 3,
        laptop: 3,
        margin: 0,
    },
    generatedNotes: (returnedNotes) => 
    ({ 
        padding: 39.0667 + 'x' + 17,
        border: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        boxSizing: 'content-box',
        display: 'inline',
        float: 'none', 
        cursor: returnedNotes ? 'pointer' 
        : 'default !important',
        p: 800,
    }),
    backButton: () => ({
        boxSizing: borderBox,
        display: block,
        float: left,
        lineHeight: 17.3333,
        position: 'static',
        zIndex :auto,
        padding: 202 + 'x' + 402
    })
}