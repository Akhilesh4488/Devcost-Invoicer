import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';
import { CostmerContext } from '../Context/CostmerContext';

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



export default function InvoiceTable({currency}) {

  const {state} = React.useContext(CostmerContext)

  return (
    <>
    <TableContainer>
      <Table sx={{ minWidth: "100%" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ITEM</StyledTableCell>
            <StyledTableCell align="right">QTY</StyledTableCell>
            <StyledTableCell align="right">PRICE</StyledTableCell>
            <StyledTableCell align="right">TOTAL</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       {state.invoicetable?.map((y)=>(
         <StyledTableRow key={y.key}>
         <StyledTableCell component="th" scope="row">
           {y.item}
         </StyledTableCell>
         <StyledTableCell align="right">{y.quantity}</StyledTableCell>
         <StyledTableCell align="right">{y.price}/-</StyledTableCell>
         <StyledTableCell align="right">{currency.symbol+y.amount}/-</StyledTableCell>
       </StyledTableRow>
       ))}
        </TableBody>
      </Table>
    </TableContainer>
   <Grid container>
    <Grid item sx={{width:"50%",textAlign:"left",display:"flex",justifyContent:"center",flexDirection:"column"}}>
      <Typography variant="h5" sx={{fontSize:"22px",fontWeight:"600",my:1}}>
      PAYMENT METHOD
      </Typography>
      <Typography variant="h5" sx={{fontSize:"16px",fontWeight:"500"}}>
      {state.invoiceother?.isCash ? "E Banking" : "Cash"}
      </Typography>
    </Grid>
    <Grid item sx={{width:"50%"}}>
    <Table sx={{width:"100%"}}>
            <TableBody>
            <TableRow>
                <TableCell>SubTotal</TableCell>
                <TableCell>{currency.symbol} {state.invoiceother  ? state.invoiceother?.subtotal : "0"}/-</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell>{currency.symbol} {state.invoiceother  ? state.invoiceother?.total - state.invoiceother?.subtotal : "0"}/-</TableCell>
            </TableRow>
            <TableRow>
                <TableCell> <Typography variant="h5" sx={{fontSize:"18px",fontWeight:"500"}}>
        TOTAL :
      </Typography></TableCell>
                <TableCell>{currency.symbol} {state.invoiceother  ? state.invoiceother?.total : "0"}/-</TableCell>
            </TableRow>
            </TableBody>
        </Table>
    </Grid>
   </Grid>
    </>
  );
}