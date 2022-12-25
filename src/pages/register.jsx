import React, { useState } from 'react'
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, InputAdornment, Alert, IconButton } from "@mui/material"
import { Clear } from '@mui/icons-material/';
import { useNavigate,Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db, firebaseConfig } from '../firebase'
import { doc, setDoc } from "firebase/firestore"
import logo from "../logo.png"
import { Helmet } from 'react-helmet';

const Register = () => {


  const [err, setErr] = useState(false)
  const [errmsg, setErrmsg] = useState("")
  const navigate = useNavigate()
  const storageBucket = firebaseConfig.storageBucket

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')
    const company_name = data.get('company-name')
    const tagline = data.get("tagline");
    const phone = data.get("phone");
    const file = document.getElementById("company-logo").files[0]
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const storageRef = ref(storage, company_name)
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (error) => {
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

          });

        }
      );
      setDoc(doc(db, "users", res.user.uid), {
        displayName: company_name,
        tagline: tagline,
        photoURL: `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${company_name}?alt=media`,
        phone: `+91 ${phone}`,
        email: email,
        uid: res.user.uid,
        isVerified:false
      })
      
      setDoc(doc(db,"UserProducts",res.user.uid),{products:[]})

      updateProfile(res.user, {
        displayName: company_name,
        photoURL: `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${company_name}?alt=media`
      })


      navigate("/")
    }
    catch (err) {
      setErr(true)
      const errorCode = err.code;
      if (errorCode === "auth/weak-password") {
        setErrmsg("Password should Contain Atleast 6 Letters")
      }

      else if (errorCode === "auth/missing-email") {
        setErrmsg("Email is not Provided")
      }

      else if (errorCode === "auth/email-already-in-use") {
        setErrmsg("Email is Already Registered")
      }

      else if (errorCode === "auth/invalid-email") {
        setErrmsg("Email is not Valid")
      }

      else {
        // let text = errorCode;
        // const myArray = text.split("/");
        // const error = myArray[1][0].toUpperCase() + myArray[1].substring(1)
        // setErrmsg(error)
        setErrmsg("Went Wrong")
      }
    };
  }


  return (
 <>
 <Helmet>
  <title>Register - Devcost</title>
 </Helmet>
 <Box>
      <Container component="main" maxWidth="sm" sx={{background:"whitesmoke"}}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt:5,
          mb: 3,
          justifyContent:"center"
        }}
      >
        <Avatar src={logo} sx={{ m: 1, bgcolor: 'whitemoke', height: "70px", width: "70px", }} />
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="company-name"
                name="company-name"
                required
                label="Company Name"
                autoFocus
                id="company-name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Company Tagline"
                name="tagline"
                autoComplete="tageline"
                id="tagline"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Phone No."
                name="phone"
                autoComplete="Phone"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      +91
                    </InputAdornment>
                  ),
                }}
                id="phone"
                type="tel"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", my: "8px", p: "15px 10px", border: "1px solid #c1c1c1", borderRadius: "5px" }}><Typography >Select a Company Logo :&nbsp; </Typography> <input type="file" id="company-logo" accept='image/*' /></Box>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2,py:1 }}
          >
            Register
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {err === true && <Alert action={<IconButton onClick={() => { setErr(false) }}><Clear /></IconButton>} severity="error" sx={{ display: "flex", alignItems: "center", transition: "all 0.2s ease-in-out", position: "fixed", bottom: "20px", left: "20px", }}>{errmsg}</Alert>}
    </Container>
  </Box>
 </>
  )
}

export default Register