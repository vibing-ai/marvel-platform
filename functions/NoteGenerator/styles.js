import NavBar from '@/layouts/MainAppLayout/NavBar';
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
        padding: 39.0667 + 'x' + '17px',
        border: '0px',
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
        boxSizing: 'borderBox',
        alignProperty: 'top',  
        display: 'block',
        float: 'left',
        lineHeight: 17.3333,
        position: 'static',
        zIndex :'auto',
        padding: 202 + 'x' + 402
    }),

    Uyw: () => ({
        display: 'flex', 
        alignProperty: 'right',
        borderColor: 'purple',
        alignProperty: 'top',  
        background: 'black'
    }),

    ArrowD: () => ({
        display: 'flex', 
        alignProperty: 'right',
        border: '1px', 
        borderColor: 'purple',
        background: 'black', 
    }),

    NavBar: () => ({
        display: 'flex',
        alignProperty: 'top',  
    }),

    FForms: () => ({  
        position: 'absolute',
        left: '0px',
        top: '0px',
        zIndex: -1
    }),

    NotesPage: () => ({
        boxSizing: 'inherit',
        alignItems: 'center', 
        position: 'flex',
        left: '0px',
        top: '0px',
        backgroundColor: 'dark-purple'
    }),
    NavBar: () => ({
        alignProperty: 'top',  
        alignItems: 'center',
    }),
    ButtonsStyu: () => ({
        alignProperty: 'top',
        boxSizing: '15px',
        borderColor: '#7551A0'
    })
}