// get the imports

import { ArrowDropDown, Grid4x4Sharp } from '@mui/icons-material';
import { Backdrop, Container, Grid, Skeleton } from '@mui/material';
import { useRouter } from 'next/router'; 

import styles from './styles';

import axios from 'axios';
import { response } from 'express'; 
import { Link } from 'next/link';
import Options from '@/templates/Chat/Options';
import { useEffect, useState } from 'react'; 

// imports from consts
const {upload} = require('/home/zero/Documents/marvel-platform/marvel-platform/assets/svg/upload.svg');
const {website} = require('/home/zero/Documents/marvel-platform/marvel-platform/assets/svg/website.svg');
const {youtube} = require('/home/zero/Documents/marvel-platform/marvel-platform/assets/svg/youtube.svg');
const KAIAvatar = require('/home/zero/Documents/marvel-platform/marvel-platform/assets/svg/KAIAvatar.svg');
const {pencil} = require('/home/zero/Documents/marvel-platform/marvel-platform/assets/svg/Pencil.svg');
const {logout} = require('/home/zero/Documents/marvel-platform/marvel-platform/assets/svg/LogoutIcon.svg');
const { default: pdf } = require('pdf-parse');
var docxParser = require('docx-parser'); 
// consts 

const fs = require('fs');
const pdf = require('pdf-parse');
const loggedIn = false; // default logged in status

// TODO:
/*
maybe fix the styles
maybe fix the routes
  */

const router = useRouter(); 

let accountName = ''; // default account name

useEffect(() => {
  fetch('/signon/user/logonStatus').then(res = response.json()).then((res != false) ? (accountName = res, loggedIn == true) : (loggedIn = false)); // default account name
}, []);

let renderUyw = false;

let layout = 'portrait'; // default layout

let gen = []; // this is the buttnugget

let [values, savedGen] = useState(gen); // this is data pulled from the form

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

// default this delimiter to comma if there is no value
function CSVToArray( strData, strDelimiter ){
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = (strDelimiter || ",");

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
      (
          // Delimiters.
          "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

          // Quoted fields.
          "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

          // Standard fields.
          "([^\"\\" + strDelimiter + "\\r\\n]*))"
      ),
      "gi"
      );


  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;


  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while (arrMatches = objPattern.exec( strData )){

      // Get the delimiter that was found.
      var strMatchedDelimiter = arrMatches[ 1 ];

      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (
          strMatchedDelimiter.length &&
          strMatchedDelimiter !== strDelimiter
          ){

          // Since we have reached a new row of data,
          // add an empty row to our data array.
          arrData.push( [] );

      }

      var strMatchedValue;

      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[ 2 ]){

          // We found a quoted value. When we capture
          // this value, unescape any double quotes.
          strMatchedValue = arrMatches[ 2 ].replace(
              new RegExp( "\"\"", "g" ),
              "\""
              );

      } else {

          // We found a non-quoted value.
          strMatchedValue = arrMatches[ 3 ];

      }


      // Now that we have our value string, let's add
      // it to the data array.
      arrData[ arrData.length - 1 ].push( strMatchedValue );
  }

  // Return the parsed data.
  return( arrData );
}

const DocxParserN = (pathFromBrowse) => {
  // read the file
    let dataBuffered;
    docxParser.parseDocx(pathFromBrowse, function(data){
      dataBuffered = data;
    });
  return dataBuffered;
}

const PptParserN = (pathFromBrowse) => {
  let pptData = fs.readFileSync(pathFromBrowse);
  return pptData;
}

const Account = () => {
  return (
    <Grid {...styles.Account}>
      <Skeleton 
      fontSize={20}
        sx={{
          borderRadius: '1px',
          bgcolor: (theme) => theme.palette.common.purple['5p'],
        }}
      />
      {(accountName != null) ? <a>{accountName}'s Account</a> : <a>Not Logged In</a>}
    </Grid>
  )
}

// for parsing the files
function PrintFile(file) {
  const reader = new FileReader();
  reader.onload = (evt) => {
    console.log(evt.target.result);
  };
  let fileData = reader.readAsText(file);
  return fileData;
} 
 
const Generate = (arr = []) => {
  return (
    <div {...(layout == "portrait") ? {...styles.Portrait} : {...styles.LandScape}}> 
      {
          arr.map((note) => {
            return (
              <p>
                {note}
              </p>
            )
          }
        )
      }
    </div>
  )
} 
 
const dataAdd = (dataIn, type) => { 
  switch (type) {
    case 'pdf':
      return gen.push(PdfParserN(dataIn)); 
    case 'csv':
      // csv parser
      return gen.push(CSVToArray(dataIn , ',')); 
    case 'docx':
      // docx parser
      return gen.push(DocxParserN(dataIn)); 
    case 'ppt':
      // ppt parser
      return gen.push(PptParserN(dataIn)); 
    case 'txt':
      // txt parser
      return gen.push(PrintFile(dataIn)); 
    case 'url':
      // url parser
      return gen.push(dataIn); 
    default:
      return gen.push(PrintFile(dataIn)); 
  }  
}
 
const Post = (data) =>
{ 
  let res; 
  // the routes are ?
  axios.post('/chat', data).then(res = response.json()).then(Generate(res)); 
  res = response.data.notes; // notes or responce?
  return res;
} 
 
const AiIcon = () => {
  return (
    <Grid {...styles.AiIcon}>
      <svg href={KAIAvatar}/> 
    </Grid>
  )
}
 
const Navbar = () => {
  return(
    // the style to use the background bar seen in figma
    // goes here 
    <nav>
      <span>
        <svg><Link href='/tools'/></svg>
        <svg><Link href='/assistant-chat'/></svg>
        <svg><Link href='/history'/></svg>
      </span>
    </nav> 
  )
}
 
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
      <a><svg href={pencil}></svg> Edit Prompt</a>
    </Grid> 
  )
}

const GenerateButton = () => {
  return (
    <Grid {...styles.generateButton}>
       <Skeleton
        variant='rectangular'
        height={40}
        width={150}
        sx={{
          borderRadius: '1px',
          bgcolor: (theme) => theme.palette.common.purple['5p'],
        }}
      />
      <a><svg href={pencil} onClick={Post(gen)}></svg> Generate Notes</a>
    </Grid>  
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
        <Options {...styles.ArrowD}>
          <select class="dropdown-menu">
            <option><a href="#" onClick={layout = 'portrait'}>Portrait</a></option>
            <option><a href="#" onClick={layout = 'landscape'}>Landscape</a></option> 
          </select>
        </Options>
      </ArrowDropDown> 
    )
}

const LogoutButton = () => {
  return (
    <Grid {...styles.logoutButton}>
      <Skeleton
        variant='rectangular'
        height={40}
        width={150}
        sx={{
          borderRadius: '1px',
          bgcolor: (theme) => theme.palette.common.red['5p'],
        }}
      />
      <a><svg href={logout}></svg> Logout</a>
    </Grid>
  )
}
  
const FForms = () => {
  return (
    <>
    <LogoutButton><button onClick={Link('/logout')}></button></LogoutButton>
    <Account/>
      {(gen != '') ? <NotesPage/> : 
      <Container {...styles.FForms}>
          Notes Generator
          <form action='/chat' method={'POST'}> 
            <h3>Extract concise, structured, summarized notes from various types of inputs!</h3>
            <label style={'italics = true'}>Topic:
              <input type="text" defaultValue={'Enter Topic'} value={values[0]} onChange={(e) => savedGen[0] = dataAdd((e.target.value))}/>
            </label>
            Page Layout:  
            <label>  
              <input value={values[1]} onChange={(e) => savedGen[1] = dataAdd((e.target.value))} defaultValue={'Choose Page Layout'}/> <ArrowD {...styles.ArrowD}/>
            </label>
            <label>
              Text or File Upload: 
              {(renderUyw != false)? null : <Uyw {...styles.Uyw}/>}
              <input type="text" value={values[2]} onChange={(e) => savedGen[2] = dataAdd((e.target.value))} style={'italics = true'} defaultValue={'Enter Text or Choose Files to Upload'}>
              </input>
                <a id={'fileup'} onClick={renderUyw = true}/>
            </label> 
            {(values[0] == null || values[1] == null || values[2] == null) ?
             <h3>Fill all blanks in please.</h3> : <GenerateButton {...styles.ButtonsStyu}/>}
          </form>
        </Container>
      }
    </>
  )
}

const Uyw = () => {
  let x = false;
  let y = false;
  let z = false; 

  return ( 
    <Options {...styles.Uyw}>
      <option>{(x == true)? <input type='file'/> : <a onClick={x == true}><svg href={upload}></svg> Upload</a>}</option>
      <option>{(y == true)? <input type='url'/> : <a onClick={y == true}><svg href={website}></svg> Website</a>}</option>
      <option>{(z == true)? <input type='url'/> : <a onClick={z == true}><svg href={youtube}></svg> Youtube</a>}</option>
    </Options> 
  )
}

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