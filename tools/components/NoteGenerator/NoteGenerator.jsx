// get the imports

import { AutoAwesome } from '@mui/icons-material';
import { Card, Chip, Grid, Typography } from '@mui/material';

import { useRouter } from 'next/router';

import styles from './styles';

import { TOOLS_ID } from '@/tools/libs/constants/tools';

const NoteGenerator = (props) =>{
    const {id, masked, backgroundImgURL, name, description } = props; 
}

// for parsing the files
function printFile(file) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      console.log(evt.target.result);
    };
    reader.readAsText(file);
  }
  