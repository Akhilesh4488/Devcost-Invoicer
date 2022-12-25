import * as React from 'react';
import { Grid, Paper, Typography, CardContent, Box, Divider } from '@mui/material';

export default function InvoiceDetails({ costmerData,currency }) {

  return (

    <Box sx={{ width: "100%" }}>
      <React.Fragment>
        <CardContent>
          <Grid container sx={{ alignItems: "center" }}>


            <Grid item sx={{ width: "60%", textAlign: "left" }}>
              <Typography variant="h5" sx={{ fontSize: "18px", fontWeight: "500" }}>
                INVOICE TO :
              </Typography>
              <Typography variant="h5" sx={{ fontSize: "22px", fontWeight: "600", my: 1 }}>
                {costmerData?.Data ? costmerData.Data?.costmerName : "Costmer's Name"}
              </Typography>

                <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: "500" }}>
                  Phone :  {costmerData?.Data?.costmerPhone != null ? "+91 " + costmerData.Data?.costmerPhone : "NA"}
                </Typography>

              <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: "500" }}>
                Email : {costmerData?.Data?.costmerEmail != null ? costmerData.Data?.costmerEmail : "NA"}
              </Typography>

              <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: "500" }}>
                Address : {costmerData?.Data?.costmerAddress != null ? costmerData.Data?.costmerAddress : "NA"}
              </Typography>

            </Grid>


            <Grid item sx={{ width: "35%", textAlign: "right" }}>
              <Typography variant="h5" sx={{ fontSize: "18px", fontWeight: "500" }}>
                TOTAL PAID :
              </Typography>
              <Typography variant="h5" sx={{ fontSize: "22px", fontWeight: "600", my: 1 }}>
                {currency.name} : {currency.symbol} {costmerData.invoiceother ? costmerData.invoiceother?.total-costmerData.invoiceother?.balance : "0"}/-
              </Typography>

              <Divider sx={{ mb: 2, borderBottomWidth: "medium", ml: "70%", textAlign: "right", borderColor: "transparent" }} />

              <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: "500" }}>
                Bill No : {costmerData.billno ? costmerData.billno : "XXXXXX"}
              </Typography>
              <Typography variant="h5" sx={{ fontSize: "16px", fontWeight: "500" }}>
                Date : {costmerData.date ? costmerData.date : "dd/mm/yyyy"}
              </Typography>
            </Grid>


          </Grid>
        </CardContent>
      </React.Fragment>    </Box>
  );
}