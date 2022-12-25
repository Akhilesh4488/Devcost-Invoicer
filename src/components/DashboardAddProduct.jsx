import  React,{useContext} from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TableRow,TableHead,TableContainer,TableBody, TextField, IconButton,Table, Divider,InputAdornment } from '@mui/material';
import { AddCircle, } from '@mui/icons-material';
import Title from "./Title"
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext';
import { v4 } from 'uuid';
import {db} from "../firebase"
import { UserContext } from '../Context/UserContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    borderRadius:1
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



export default function DashboardAddProduct(props) {

  const {CurrentUser} = useContext(AuthContext)
  const {currency} = useContext(UserContext)

  const handleSubmit = async()=>{
    const productName = document.getElementById("product-name").value
    const productPrice  = document.getElementById("product-price").value

    try{
      await updateDoc(doc(db,"UserProducts",CurrentUser.uid),{
        products : arrayUnion({
          id:v4(),
          productName:productName,
          productPrice:productPrice
        })
      })
    }
    catch(err){
    }
  }


  return (
    <>
         <Title>Add Products / Services</Title>
         <Divider/>
      <TableContainer>
        <Table sx={{ my: 2,mb:0}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ITEM</StyledTableCell>
              <StyledTableCell align="center">PRICE</StyledTableCell>
              <StyledTableCell align="center">ACTION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow key="Edit">
              <StyledTableCell component="th" scope="row">
                <TextField name="product-name" id="product-name"/>
              </StyledTableCell>
              <StyledTableCell align="right"><TextField  name="product-price" id="product-price"InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {currency.symbol}
                    </InputAdornment>
                  ),
                }}/></StyledTableCell>
              <StyledTableCell align="center" sx={{background:"#f2f2f2"}}><IconButton variant="contained"  size="large" onClick={()=>handleSubmit()}><AddCircle /></IconButton></StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Divider/>
    </>
  );
}