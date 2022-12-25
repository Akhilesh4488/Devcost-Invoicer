import * as React from 'react';
import { Grid,Paper,Typography,CardContent,Box,Divider} from '@mui/material';
import logo from "../logo.png"


export default function InvoiceFooter({user}) {
  return (
    <Box sx={{ width: "100%",mt:10 }}>
          <React.Fragment>
    <CardContent>
    <Grid container sx={{alignItems:"center"}}>
  
  
      <Grid item  sx={{width:"60%",textAlign:"left"}}>
        <Typography variant="h5" sx={{fontSize:"22px",fontWeight:"600",my:1}}>
        Thanks For Visiting
        </Typography>
        <Typography variant="h5" sx={{fontSize:"16px",fontWeight:"500"}}>
        Phone : {user.phone}
        </Typography>
        <Typography variant="h5" sx={{fontSize:"16px",fontWeight:"500"}}>
        Email : {user.email}
        </Typography>
       {user.address && 
        <Typography variant="h5" sx={{fontSize:"16px",fontWeight:"500"}}>
          Address : {user.address}
        </Typography>}
        {user.website && 
        <Typography variant="h5" sx={{fontSize:"16px",fontWeight:"500"}}>
          Website : {user.website}
        </Typography>}
      </Grid>
  
  
      <Grid item  sx={{width:"35%",textAlign:"center"}}>
        <Typography variant="h5" sx={{fontSize:"22px",fontWeight:"600",mb:1}}>
          {user.displayName}
        </Typography>
  
        <Divider/>
  
        <Typography variant="h5" sx={{fontSize:"16px",fontWeight:"500",mt:1}}>
        Authoriser
        </Typography>

      </Grid>
  
  
      </Grid>
      </CardContent>
    </React.Fragment>
    </Box>
  );
}