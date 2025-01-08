// get the imports

import { ArrowDropDown, AutoAwesome, Grid4x4 } from '@mui/icons-material';
import { Card, Chip, Container, Grid, Skeleton, Typography } from '@mui/material';
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
 
// I need help with:

//  the routes: 
// TOOLS, ASSISTS, HISTORY

// making the figma css? or find the tools?
// where are all the styles?  

// fix the navigation // done kinda
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
// we gotta style this stuff

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

} 
 
const Post = (data) =>
{ 
  let res;
  // The routes don't exist. 
  axios.post('/notesHistory', data).then(res = response.json()).then(Generate); 
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
    <Grid>
      <svg>
        {KAIAvatar}
      </svg>
    </Grid>
  )
}

// still working on this then style
const Navbar = () => {
  let toolL = <Link href='/tools'/>;
  let assiL = <Link href='/assistants'/>;
  let histL = <Link href='/history'/>;  
  return(
    // the style to use the background bar seen in figma
    // goes here 
    <Card>
        <span>
        <button onSubmit={toolL}/>
        <button onSubmit={assiL}/>
        <button onSubmit={histL}/>
      </span>
    </Card> 
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
          bgcolor: (theme) => theme.palette.common.black['5p'],
        }}
      />
      <button onSubmit={router.back()}/> 
    </Grid> 
  );
}

// style
const FForms = () => {
  return (
    <>
      <Container>
        Notes Generator
        <form action='submit'> 
          <h3>Extract concise, structured, summarized notes from various types of inputs!</h3>
          <label style={'italics = true'}>Topic:
            <input type="text" defaultValue={'Enter Topic'}/>
          </label>
          Page Layout:  
          <label>  
            <input defaultValue={'Choose Page Layout'}/> <ArrowDst><ArrowD/></ArrowDst>
          </label>
          <label>
            Text or File Upload: 
            {(renderUyw != false)?<Uyw/>: null}
            <input type="text" style={'italics = true'} defaultValue={'Enter Text or Choose Files to Upload'}> 
              {/* find where to parse and send upload data  */}
            </input>
             {/* upload icon thing upload*/} 
              <a id={'fileup'} onClick={renderUyw = true}/>
            {/*upload icon */}
            <></>
          </label>
            <Generate/> 
        </form>
      </Container> 
    </>
  )
}

// Upload, YouTube Video, Website style this thing too
const Uyw = () =>{
  return (
    <ul class="uyw-blockbox">
      <li><a><svg></svg>Upload</a></li>
      <li><a><svg></svg>YouTube</a></li> 
      <li><a><svg></svg>Website</a></li> 
    </ul> 
  )
}
// the styler for the arrow dropdown
const ArrowDst = () =>{
  return(
    <></>
  )
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

const NotesPage = () =>{

  return (
    <>
    
    </>
  )
}

const NoteGen = () => {  
    return (
      <>
        <Back/><AiIcon/><Navbar/>
        <br/>
        {gen ==! null ? <NotesPage/> : <FForms/> }
      </>
    );
}; 
export {NoteGen}