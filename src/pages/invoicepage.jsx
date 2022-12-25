import React, { useContext, useRef, useState } from 'react';
import Invoice from '../sections/invoicepage/Invoice';
import InvoiceEditor from "../sections/invoicepage/InvoiceEditor"
import { CostmerContext } from '../Context/CostmerContext';
import { Button, Grid,Box, Modal } from "@mui/material"
import ReactToPrint from 'react-to-print';
import { Download, Print, Share } from '@mui/icons-material';
import { Helmet } from 'react-helmet';
import { UserContext } from '../Context/UserContext';

const Invoicepage = () => {
    const componentRef = useRef();
    const {state} = useContext(CostmerContext)

  return (
   <>
   <Helmet>
    <title>Create A Invoice - Devcost Tools</title>
   </Helmet>
<Grid container sx={{ width: "100%",background:"white",pt:10,pb:3}}>
          <Grid item sx={{ width: {md:"49%",xs:"100%"}}}>
            <InvoiceEditor />
            <ReactToPrint
              trigger={() => {
                return <Button variant="contained" startIcon={<Print/>}>Print</Button>
              }}
              content={() => componentRef.current} 
              
              documentTitle = {state.billno}/>
          </Grid>
          <Box sx={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', minWidth: "49%",m:1,background:"#fff"}}>
          <Grid item sx={{ minWidth: "100%",my:1 ,overflow:"auto" }}  ref={componentRef}>
            <Invoice/>
          </Grid>
          </Box>
        </Grid>
   </>
  )
}

export default Invoicepage