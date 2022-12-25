import {useContext, useState,useEffect} from "react"
import './App.css';
import { Card, createTheme, ThemeProvider,Typography } from '@mui/material';
import Invoicepage from './pages/invoicepage';
import DashboardHome from './sections/dashboard/DashboardHome';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes,Route,Navigate } from "react-router-dom";
import Register from "./pages/register";
import { AuthContext } from './Context/AuthContext';
import Header from "./components/layout/Header";
import Login from "./pages/login";
import { UserContext } from "./Context/UserContext";
import { Helmet } from "react-helmet";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Urbanist"
    ]
  }
})


function App() {

  const {CurrentUser} = useContext(AuthContext)
  const {UserData,productsList} = useContext(UserContext)


  const ProtectedRoute = ({children})=>{
    if(!CurrentUser){
      return <Navigate to={"/login"}/>
    }
    else if(!UserData.isVerified || productsList.length < 0){
      return (
        <>
        <Helmet>Verify - Devcost Tools</Helmet>
        <Box  sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt:5,
        mb: 3,
        justifyContent:"center",
      }}><Card sx={{background: "#fff", maxWidth: "40%", p: 2 }}><Typography variant="h6">Hi, {CurrentUser.displayName} Call @ 9044558703 or Mail @ adityaj02810@gmail.com in Order to Verify Yourself (In case). </Typography></Card></Box>
        </>
      )
    }
    return children
  }


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <BrowserRouter>
          <Routes>
           <Route index element={<ProtectedRoute><Header/><DashboardHome/></ProtectedRoute>}/>
            <Route path = "invoice-editor" element={<ProtectedRoute><Header/><Invoicepage/></ProtectedRoute>}/>
            <Route path = "register" element={<Register/>}/>
            <Route path = "login" element={<Login/>}/>
          </Routes>
          </BrowserRouter>
        </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}




export default App;
