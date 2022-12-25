import React, { useState } from 'react'
import { Typography,Divider,Toolbar, Box,Grid,Button,Menu,MenuItem,AppBar } from '@mui/material';
import logo from "../../logo.png"


const Header = () => {

  const [open,setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="absolute" open={false} color="transparent" >
    <Toolbar
      sx={{
        pr: '24px', // keep right padding when drawer closed
        background:"#fff",
        display:"flex",
        alignItems:"center"
      }}
    >
     <Grid container sx={{alignItems:"center",justifyContent:"space-between"}}>
      <Grid item sx={{display:"flex",alignItems:"center"}}>
      <Box component="img" src={logo} width="50px"/>
      <Typography
        component="h1"
        variant="h5"
        color="inherit"
        noWrap
        sx={{ fontWeight:"900"}}
      >
        DEVCOST
      </Typography>
      </Grid>
      <Grid item sx={{pr:5,display:"flex"}}>
      <Button
        id="basic-button"
        onClick={handleClick}
      >
        Contact Us
      </Button>
      <Menu
        id="basic-menu"
        open={open}
        onClose={handleClose}
        anchorOrigin= {{
          vertical: "top",
          horizontal: "right"
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Button href="mailto:adityaj02810@gmail.com" variant='standard'>Email</Button></MenuItem>
        <Divider/>
        <MenuItem onClick={handleClose} ><Button href="tel:9044558703" variant='standard'>Phone</Button></MenuItem>
      </Menu>
        </Grid>
     </Grid>
    </Toolbar>
  </AppBar>
  )
}

export default Header