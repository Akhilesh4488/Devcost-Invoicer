import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {Table,styled,TableRow,TableContainer,IconButton,TextField,Divider,TableHead,TableBody} from "@mui/material"
import { AddCircle } from '@mui/icons-material';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function DashboardChart() {
  const theme = useTheme();

  const [quote,setQuote] = React.useState([])

  React.useEffect(()=>{
   fetch("http://api.quotable.io/random").then(res=>res.json()).then(res => setQuote(res ? res : []))
  },[])


  return (
    <React.Fragment>
      <Title>Quotes</Title>
    {quote.author}{quote.content}
    </React.Fragment>
  );
}