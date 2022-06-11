import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import AddIcon from '@mui/icons-material/Add';

import { nanoid } from 'nanoid';

import uploadFileToBlob, { isStorageConfigured } from '../azure-storage-blob';

import logo from '../images/2ndHucclecote.jpg';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        2nd Hucclecote Guides
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


interface TitleProps {
  name: string
}


export default function FormUpload(props: TitleProps) {

  const [firstName, setFirstName] = React.useState('');
  const [lastInitial, setLastInitial] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [fileSelected, setFileSelected] = React.useState<File>();
  const [uploading, setUploading] = React.useState(false);
  const [blobList, setBlobList] = React.useState<string[]>([]);
  const [inputKey, setInputKey] = React.useState(Math.random().toString(36));


  const onFileChange = (event: any) => {
    // capture file into state
    setFileSelected(event.target.files[0]);
  };

  const validateFileChosen = () => {
    return fileSelected != null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    console.log("test")

    console.log(validateFileChosen())

    if (!validateFileChosen())

      return

    console.log({
      firstName,
      lastInitial
    });

    // prepare UI
    setUploading(true);

    // Prep file
    const filename = firstName ? firstName.concat(lastInitial) : "unknown" + nanoid(5)
    const cleanFileName = filename.replace(/\s/g, "");

    console.log(fileSelected)

    var file = fileSelected ?? new File([""], "filename")

    const fileExtension = file.name.split(".").pop()

    var blob = file.slice(0, file.size, file.type);
    var newFile = new File([blob], cleanFileName.concat(".", fileExtension!), { type: file.type });

    // *** UPLOAD TO AZURE STORAGE ***
    const blobsInContainer: string[] = await uploadFileToBlob(newFile);

    // prepare UI for results
    setBlobList(blobsInContainer);

    // reset state/form
    setFileSelected(undefined);
    setUploading(false);
    setInputKey(Math.random().toString(36));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            sx={{
              height: 233,
              width: 400,
            }}
            alt="2nd Hucclecote Guides Logo"
            src={logo}
          />

        </Box>
        <Box m={3}>
          <Typography component="h1" variant="h4">
            {props.name}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Guide's First Name"
                  autoFocus
                  onChange={(event) => { setFirstName(event.target.value) }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastInitial"
                  label="Guide's Initial"
                  name="lastInitial"
                  onChange={(event) => { setLastInitial(event.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Guardian's Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => { setEmail(event.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="signedUpToEventBrite" required color="primary" />}
                  label="I have signed up to the Event on Eventbrite."
                />
              </Grid>
            </Grid>
          </Box>
          <Button variant="contained" component="label" color="primary">
            {" "}
            <AddIcon /> Choose file
            <input type="file" hidden onChange={onFileChange} />
          </Button>
          <Typography variant="body2">
            {fileSelected ? fileSelected.name : "Please choose a file"}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled = {fileSelected == null}
          >
            Submit
          </Button>
        </form>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}