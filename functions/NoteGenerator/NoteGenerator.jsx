// get the imports

import { AutoAwesome, Grid4x4 } from '@mui/icons-material';
import { Card, Chip, Grid, Typography } from '@mui/material';

import { useRouter } from 'next/router';

import styles from './styles';

import { TOOLS_ID } from '@/tools/libs/constants/tools';

// needed functions

// read the file with FileReader,
// unzip it somehow
// parse it with DOMParser
// maybe transform it with XSLT
// translate the file data into note format

// render component list

/**
 * file types Uploadable: CSV, PDF, DOCX, 
 * PPT, Plain Text
URLs: YouTube Video, Website, Google Sheets

 * navbar (home, discovery, chat) //
 * backbar //
 * page layout
 * text or file upload
 * generate button
 * teaching assist
 * logout button
 * account name
 * config options 
 * (file config, generation layout,
 *  notesOutput page)
 */

// for parsing the files
function printFile(file) {
  const reader = new FileReader();
  reader.onload = (evt) => {
    console.log(evt.target.result);
  };
  reader.readAsText(file);
}

const Navbar = (params) => {
  const { id, notes, name } = props; 
 // some reqs here ?

  return(
    <navbar>
      { 
        [name,
        id,
        notes]
      }
    </navbar>
  )
}

const Back = () => { 
  return (
    <button>

    </button>
  )
}

const NoteGen = (props) => {
    
    /// pullling the text down

    return (
      <>
        <Navbar />
      </>
    );
}; 
export {NoteGen}