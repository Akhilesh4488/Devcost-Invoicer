import React,{useContext} from 'react';
import Box from '@mui/material/Box';
import {Paper,Divider,Typography} from '@mui/material';
import InvoiceHeader from '../../components/InvoiceHeader';
import InvoiceDetails from '../../components/InvoiceDetails';
import InvoiceTable from '../../components/InvoiceTable';
import InvoiceFooter from '../../components/InvoiceFooter';
import { CostmerContext } from '../../Context/CostmerContext';
import { UserContext } from '../../Context/UserContext';


export default function Invoice() {

  const {state} = useContext(CostmerContext)
  const {UserData,currency} = useContext(UserContext)

  return (
    <Box sx={{ width: "100%", }}>
      <Box sx={{p:2,background:"#fff"}}>
        <InvoiceHeader user={UserData}/>
        <Divider sx={{mb:2,borderBottomWidth: "medium"}}/>
        <InvoiceDetails costmerData = {state} currency={currency}/>
        <InvoiceTable currency={currency}/>
        <InvoiceFooter user = {UserData} currency={currency}/>
      </Box>
    </Box>
  );
}