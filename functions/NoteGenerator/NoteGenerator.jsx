// get the imports

import { ArrowDropDown, AutoAwesome, Grid4x4, Grid4x4Sharp } from '@mui/icons-material';
import { Backdrop, Card, Chip, Container, Grid, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/router'; 

import styles from './styles';

import axios from 'axios';
import { json, request, response } from 'express'; 
import ROUTES from '@/libs/constants/routes';
import { Link } from 'next/link';
import { post } from 'request';
import path from 'path';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

const KAIAvatar = require('/home/zero/Documents/marvel-platform/marvel-platform/assets/svg/KAIAvatar.svg');

// consts 

const fs = require('fs');
const pdf = require('pdf-parse');


// we gotta style this stuff
// STYLE CHECKLIST
/*
  LargeNote done (generatedNotes)
  Generate N/A (large note is what comes outta this)
  Navbar done
  FForms done
  Uyw done 
  ArrowD done
  NotesPage done
  backButton done
  NoteGen < backgroundstufff done
*/
 

// needed functions

// read the file with FileReader, done 
// unzip it somehow done 
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
 
// I need help with:

//  the routes: 
// TOOLS, ASSISTS, HISTORY

// making the figma css? or find the tools?
// where are all the styles?  
 
// fix the aesthetics // not quite
// fix the routing // omw
// fix the links?  // Use Link from the library in Next.js
// add the parsing // omw
// add the data from parsing  // ok

// somehow make a function that puts 
//  all the requested data 
//  into a buttnugget 

// and allows for it to 
// be used as inputable info? // not sure yet
// ask about the data


const router = useRouter();

let gen = '';
let renderUyw = false;

const PdfParserN = (pathFromBrowse) => {
  let dataBuffer = fs.readFileSync(pathFromBrowse);
 
  let eduPdf = pdf(dataBuffer).then(function(data) {
  
      // number of pages
      console.log(data.numpages);
      // number of rendered pages
      console.log(data.numrender);
      // PDF info
      console.log(data.info);
      // PDF metadata
      console.log(data.metadata); 
      // PDF.js version
      // check https://mozilla.github.io/pdf.js/getting_started/
      console.log(data.version);
      // PDF text
      console.log(data.text);  
  });
  return eduPdf;
}

// for parsing the files WIP
function PrintFile(file) {
  const reader = new FileReader();
  reader.onload = (evt) => {
    console.log(evt.target.result);
  };
  reader.readAsText(file);
} 
 
const LargeNote = (arr = []) => {
  return (
    <>
      {
        arr.forEach((e) => {
          e.title,
          e.bulletPoint
        })
      }
    </>
  )
} 

const dataAdd = () => { 


}
 
const Post = (data) =>
{ 
  let res; 
  // the routes are ?
  axios.post('/chat', data).then(res = response.json()).then(Generate); 
  res = response.data.notes; // notes or responce?
  return res;
} 

// style
const Generate = (prompt) => {
   // call the generation from a route
  gen = Post(prompt) // this is what is then returned
  return (
    <p>
      {
        gen
      }
    </p>
  )
}

// style
const AiIcon = () => {
  return (
    <Grid {...styles.AiIcon}>
      <svg href={KAIAvatar}/> 
    </Grid>
  )
}

// still working on this then style
const Navbar = () => {
  return(
    // the style to use the background bar seen in figma
    // goes here 
    <nav>
      <span>
        <svg><Link href='/submit-tool'/></svg>
        <svg><Link href='/assistant-chat'/></svg>
        <svg><Link href='/history'/></svg>
      </span>
    </nav> 
  )
}

// need an svg for this one too
const EditButton = () => {
  return ( 
    <Grid {...styles.editButton}>
       <Skeleton
        variant='rectangular'
        height={40}
        width={150}
        sx={{
          borderRadius: '1px',
          bgcolor: (theme) => theme.palette.common.cyan['5p'],
        }}
      />
      <a><svg></svg> Edit Prompt</a>
    </Grid> 
  )
}

// style
const Back = () => { 
  return (
    <Grid {...styles.backButton}>
      <Skeleton
        variant='rectangular'
        height={40}
        width={150}
        sx={{
          borderRadius: '1px',
          bgcolor: (theme) => theme.palette.common.purple['5p'],
        }}
      />
      <button onSubmit={router.back()}/> 
    </Grid> 
  );
}

const ArrowD = () =>{
  // stylize 
  return ( 
      <ArrowDropDown>
        <ul class="dropdown-menu">
          <li><a href="#">Portrait</a></li>
          <li><a href="#">Landscape</a></li> 
        </ul>
      </ArrowDropDown> 
    )
}
 
// style
const FForms = () => {
  return (
    <>
      {(gen != '') ? <NotesPage/> : 
      <Container {...styles.FForms}>
          Notes Generator
          <form action='submit'> 
            <h3>Extract concise, structured, summarized notes from various types of inputs!</h3>
            <label style={'italics = true'}>Topic:
              <input type="text" defaultValue={'Enter Topic'}/>
            </label>
            Page Layout:  
            <label>  
              <input defaultValue={'Choose Page Layout'}/> <ArrowD {...styles.ArrowD}/>
            </label>
            <label>
              Text or File Upload: 
              {(renderUyw != false)?<Uyw {...styles.Uyw}/>: null}
              <input type="text" style={'italics = true'} defaultValue={'Enter Text or Choose Files to Upload'}> 
                {/* find where to parse and send upload data  */}
              </input>
              {/* upload icon thing upload*/} 
                <a id={'fileup'} onClick={renderUyw = true}/>
            </label> 
          </form>
        </Container>
      }
    </>
  )
}

// Upload, YouTube Video, Website style this thing too
const Uyw = () => {
  return ( 
    <ul>
      <li><svg><input type='file'/></svg>Upload</li>
      <li><svg><input type='url'/></svg>YouTube</li> 
      <li><svg><input type='url'/></svg>Website</li> 
    </ul> 
  )
} 

// above the notes page is a notes generator title container
const NotesGenTitle2 = () => { 
  return (
    <Container {...styles.NotesTitle}>
      <h2>Notes Generator</h2>
    </Container>
  )
}

const NotesPage = () => { 
  return (
    <> 
      <NotesGenTitle2/> <EditButton/>
      <Container {...styles.NotesPage}>
        <Generate {...styles.generatedNotes}/> 
      </Container>
    </> 
  )
}

// dont touch
const NoteGen = () => {  
    return (
      <Backdrop>
        <Grid4x4Sharp>
        <Back/><AiIcon/><Navbar/>
        <br/>
        { gen ==! null ? <NotesPage/> : <FForms/> }
        </Grid4x4Sharp>
      </Backdrop>
    );
}; 

export {NoteGen}