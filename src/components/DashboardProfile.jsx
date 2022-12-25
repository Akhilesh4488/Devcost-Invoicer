import React, { useContext, useState } from 'react';
import { Button, Box, Divider, Modal, Grid, TextField, InputAdornment, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Edit, List, Logout } from '@mui/icons-material';
import { signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, firebaseConfig } from "../firebase"
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';



export default function DashboardProfile(props) {

  const { CurrentUser } = React.useContext(AuthContext)
  const { UserData } = useContext(UserContext)

  const [err, setErr] = useState(false)
  const [errmsg, setErrmsg] = useState("")


  const storageBucket = firebaseConfig.storageBucket

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const address = data.get('address')
    const website = data.get('website')

    try {
      await updateDoc(doc(db, "users", CurrentUser.uid),
        {
        website: website,
        address: address,
      })

      setOpen(false)
    }
    catch (err) {
      setErr(true)
      const errorCode = err.code;
       setErrmsg("Went Wrong")

    };
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <React.Fragment >
      <Box component="img" src={props.user.photoURL} sx={{ height: "70px", margin: "2px auto", width: "70px", objectFit: "contain", borderRadius: "40%", p: 1, border: "1px solid #d3d3d3" }} />
      <Typography component="p" variant="h5" sx={{ fontWeight: "700" }}>
        Welcome, {props.user.displayName}
      </Typography>
      <Typography component="p" variant="body1">
        Lets Achieve "{props.user.tagline}" Together
      </Typography>
      <div>
        <Divider sx={{ my: 1.8 }} />
        <div>
          <Typography component="p" variant="body" sx={{ fontWeight: "500" }}>
            Email - {props.user.email}
          </Typography>
          <Typography component="p" variant="body1">
            Phone - {props.user.phone}
          </Typography>
        </div>
        <Divider sx={{ my: 1.8 }} />
        <Button variant="contained" sx={{ ml: 1 }} startIcon={<Edit />} onClick={handleOpen}>
          Add Info
        </Button>
        <Link to="/invoice-editor" target="_blank" style={{ textDecoration: "none" }}>
          <Button variant="contained" sx={{ mx: 1 }} color="success" startIcon={<List />}>
            Create Invoice</Button>
        </Link>
        <Button variant="contained" color="error" startIcon={<Logout />} onClick={() => { signOut(auth) }}>
          Log Out
        </Button></div>
      <ModalForm open={open} setOpen={setOpen} handleSubmit={handleSubmit} />
    </React.Fragment>
  );
}


function ModalForm({ open, setOpen, handleSubmit }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box component="form" validate onSubmit={handleSubmit} sx={{ background: "#fff", maxWidth: "40%", p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                type="address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="website"
                label="Website"
                type="url"
                id="website"
                autoComplete="website"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2, py: 1 }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
    </div>
  );
}