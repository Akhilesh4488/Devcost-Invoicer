import React, { useEffect } from 'react';
import { Grid, Paper, Typography, CardContent, Box } from '@mui/material';



export default function InvoiceHeader({ user }) {



  return (
    <Box sx={{ width: "100%" }}>
      <React.Fragment>
        <CardContent>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item sx={{ width: "50%", textAlign: "left" }}>
              <Typography variant="h5" sx={{ fontSize: "34px", fontWeight: "700" }}>
                INVOICE
              </Typography>
            </Grid>
            <Grid item container sx={{ width: "50%", textAlign: "right", alignItems: "center", justifyContent: "flex-end" }}>
              <Grid item sx={{ px: 2 }}>
                <Typography variant="body1" sx={{ fontSize: "22px", fontWeight: "700" }}>
                  {user.displayName}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "15px", fontWeight: "400" }}>
                  {user.tagline}
                </Typography>
              </Grid>
              {/* <Grid item>
                <Box component="img" sx={{ width: "60px" }} alt="Logo" src={user.photoURL} />
              </Grid> */}
            </Grid>
          </Grid>
        </CardContent>
      </React.Fragment>
    </Box>
  );
}