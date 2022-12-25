import React,{useState} from 'react';
import { Avatar, Button, CssBaseline,Alert,IconButton, TextField, Grid, Box, Typography, Container } from "@mui/material"
import { Clear} from '@mui/icons-material';
import { signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../firebase"
import { useNavigate,Link } from 'react-router-dom';
import logo from "../logo.png"
import { Helmet } from 'react-helmet';


export default function Login() {
    const [err, setErr] = useState(false)
    const [errmsg, setErrmsg] = useState("")
    const [success,setSuccess] = useState(false)
    const [successmsg,setSuccessMsg] = useState("")

    const navigate = useNavigate()

    const changepass = async()=>{

        const sendemail = window.prompt("Please Enter a Email to Get Password")
        if(sendemail != null){
            await sendPasswordResetEmail(auth,sendemail).then(()=>{
                setSuccess(true)
                setSuccessMsg(`Reset Link Send to ${sendemail} (Also Check Spam)`)
            }).catch((err)=>{
                setErr(true); setErrmsg(err)
            })
        }
        else{
            setErr(true)
            setErrmsg("Please Enter A Valid Email")
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email")
        const password = data.get("password")

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        }
        catch (err) {
            console.log(err)
            setErr(true)
            if (err.code === "auth/user-not-found") {
                setErrmsg("User does Not Found")
            }
            if (err.code === "auth/wrong-password") {
                setErrmsg("Password is Wrong")
            }
        };
    }

        return (
            <>            <Helmet>
                <title>Login - Devcost</title>
            </Helmet>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 7,
                        mb:3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar src={logo} sx={{ m: 1, bgcolor: 'whitemoke', height: "70px", width: "70px", }} />
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            sx={{ mt: 3, mb: 2 ,y:1}}
                        >
                            Sign In
                        </Button>
                        <Grid container sx={{justifyContent:"space-between"}}>
                            <Grid item>
                                <Link onClick={changepass} variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {err === true && <Alert action = { <IconButton onClick={()=>{setErr(false)}}><Clear /></IconButton> } severity="error" sx={{ display:"flex",alignItems:"center",transition: "all 0.2s ease-in-out", position: "fixed", bottom: "20px", left: "20px",}}>{errmsg}</Alert>}
                {success === true && <Alert action = { <IconButton onClick={()=>{setSuccess(false)}}><Clear /></IconButton> } severity="success" sx={{ display:"flex",alignItems:"center",transition: "all 0.2s ease-in-out", position: "fixed", bottom: "20px", left: "20px",}}>{successmsg}</Alert>}
            </Container>
            </>
        );
    }