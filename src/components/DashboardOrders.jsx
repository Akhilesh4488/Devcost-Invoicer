import * as React from 'react';
import Title from './Title';
import { Typography,Box } from '@mui/material';
import { FormatQuoteTwoTone } from '@mui/icons-material';


export default function DashboardOrders() {

  const [quote,setQuote] = React.useState([])

  React.useEffect(()=>{
   fetch("http://api.quotable.io/random").then(res=>res.json()).then(res => setQuote(res ? res : []))
  },[])

  return (
    <Box>
      <Title>Quote of the Day</Title>
      <Typography variant="h6"><FormatQuoteTwoTone sx={{transform:"rotate(180deg)"}}/>{quote.content}<FormatQuoteTwoTone/></Typography> <Typography sx={{fontStyle:"italic",textAlign:"right",mt:1}}> - By {quote.author}</Typography>
    </Box>
  );
}