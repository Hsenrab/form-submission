// ./src/App.tsx


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import Path from 'path';
import uploadFileToBlob, { isStorageConfigured } from './azure-storage-blob';

import FormUpload from './pages/FormUpload'
import Layout from './components/Layout';



// const storageConfigured = isStorageConfigured();

 const App = (): JSX.Element => {
//   // all blobs in container
//   const [blobList, setBlobList] = useState<string[]>([]);

//   // current file to upload into container
//   const [fileSelected, setFileSelected] = useState(null);
//   const [name, setName] = useState(null);

//   // UI/form management
//   const [uploading, setUploading] = useState(false);
//   const [inputKey, setInputKey] = useState(Math.random().toString(36));

//   const onFileChange = (event: any) => {
//     // capture file into state
//     setFileSelected(event.target.files[0]);
//   };

//   const onNameChange = (event: any) => {
//     // capture name
//     setName(event.target.value);
//   };

//   const onFileUpload = async () => {
//     // prepare UI
//     setUploading(true);

//     // Prep file
//     const filename = name ?? "unknown"
//     const cleanFileName = filename.replace(/\s/g, "");



//     var file = fileSelected ?? new File([""], "filename");

//     const fileExtension = file.name.split(".").pop()

//     var blob = file.slice(0, file.size, file.type); 
//     var newFile = new File([blob], cleanFileName.concat(".", fileExtension!), {type: file.type});

//     // *** UPLOAD TO AZURE STORAGE ***
//     const blobsInContainer: string[] = await uploadFileToBlob(newFile);

//     // prepare UI for results
//     setBlobList(blobsInContainer);

//     // reset state/form
//     setFileSelected(null);
//     setUploading(false);
//     setInputKey(Math.random().toString(36));
//   };

//   // display form
//   const DisplayForm = () => (
//     <div>
//       <input type="text" id="Guide" onChange={onNameChange}/>
//       <input type="file" onChange={onFileChange} key={inputKey || ''} />
//       <button type="submit" onClick={onFileUpload}>
//         Upload!
//           </button>
//     </div>
//   )

//   // display file name and image
//   const DisplayImagesFromContainer = () => (
//     <div>
//       <h2>Container items</h2>
//       <ul>
//         {blobList.map((item) => {
//           return (
//             <li key={item}>
//               <div>
//                 {Path.basename(item)}
//                 <br />
//                 <img src={item} alt={item} height="200" />
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );

   return (
       <Layout>
          <FormUpload name="Painswick Beacon 2022"/>
       </Layout>
       
//     <div>
//       <h1>Painswick Beacon</h1>
//       {storageConfigured && !uploading && DisplayForm()}
//       {storageConfigured && uploading && <div>Uploading</div>}
//       <hr />
//       {storageConfigured && blobList.length > 0 && DisplayImagesFromContainer()}
//       {!storageConfigured && <div>Storage is not configured.</div>}
//     </div>
   );
 };

 export default App;


