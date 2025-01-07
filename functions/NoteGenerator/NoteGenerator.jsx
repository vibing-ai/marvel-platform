// get the imports

import { ArrowDropDown, AutoAwesome, Grid4x4 } from '@mui/icons-material';
import { Card, Chip, Container, Grid, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/router'; 

import styles from './styles';

import { useEffect } from 'react'; 
import axios from 'axios';
import { json, request, response } from 'express'; 
import ROUTES from '@/libs/constants/routes';
import Link from 'next/link';
import { post } from 'request';


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
// How do I navigate? <- use Router? learn router?
// Where is the ai Icon? do I make it?

// fix the navigation
// fix the aesthetics
// fix the routing
// fix the links?
// add the parsing
// add the data from parsing
// somehow make a function that puts 
//  all the requested data 
//  into a buttnugget
// and allows for it to 
// be used as inputable info?

const router = useRouter();

// I have not the single idea if this will work
setNotesMemory = useEffect(() => {
      axios.get('/NotesHistory').then(response.json());
    });

const Post = (pr) =>
{  
  // post('/notes', (json(pr)));
}

const GetNotes = (n) =>{
  axios.get()
}
  
// for parsing the files WIP
function PrintFile(file) {
  const reader = new FileReader();
  reader.onload = (evt) => {
    console.log(evt.target.result);
  };
  reader.readAsText(file);
} 

const NotesPage = () =>{

  return (
    <>
    
    </>
  )
}

const Generate = () =>{
  let toChat = '/notes' // use a route?
  return (
    <button onSubmit={Post(toChat)}>Generate</button> 
  )
}

const AiIcon = () => {
  return (
    <svg>
      {/* {teaching assist goes here } */}
    </svg>
  )
}

// still working on this
const Navbar = () => {
  let toolL = <a href=''/>;
  let assiL = <a href=''/>;
  let histL = <a href=''/>;  
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

const FForms = () =>{
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
          <label defaultValue={'Choose Page Layout'}>  
            <ArrowDropDown>
              <ul class="dropdown-menu">
                <li><a href="#">Portrait</a></li>
                <li><a href="#">Landscape</a></li> 
              </ul>
            </ArrowDropDown>  
          </label>
          <label>
            Text or File Upload:
            <textarea style={'italics = true'} defaultValue={'Enter Text or Choose Files to Upload'}> 
              <input type="text" />
              <input type='file'/>
              {/* upload icon thing */}
            </textarea> 
          </label>
            <Generate/> 
        </form>
      </Container> 
    </>
  )
}

const NoteGen = () => {  
    return (
      <>
        <AiIcon/>
        <Navbar/>
        <Back/>
        <FForms/> 
      </>
    );
}; 
export {NoteGen}