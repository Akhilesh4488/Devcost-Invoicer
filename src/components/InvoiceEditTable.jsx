import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Button, TableRow, TableHead, TableContainer, TableBody, TextField,FormControl, MenuItem, Select, InputLabel, IconButton, Table, Divider, Hidden,InputAdornment } from '@mui/material';
import { AddCircle, CurrencyRupee, Delete, DoneAll } from '@mui/icons-material';
import { CostmerContext } from '../Context/CostmerContext';
import { UserContext } from '../Context/UserContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '&:nth-child(1)': {
    width:'30%'
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



export default function InvoiceEditTable(props) {


  const { state, dispatch } = useContext(CostmerContext)
  const { productsList,currency } = useContext(UserContext)


  const [item, setItem] = useState(null)
  const [quan, setQuan] = useState("")
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState(0)
  const [Itemarr, setItemarr] = useState([])
  const [subTotal, setTotal] = useState(0)
  const [method, setMethod] = useState(false)

  const finalAmount = Math.floor(subTotal + (subTotal * props.tax / 100))

  const ItemData = {
    key: `${item} + ${amount}`,
    item: item,
    quantity: quan,
    price: " ₹" + price,
    amount: amount
  }

  const invoiceother = {
    subtotal: subTotal,
    total: finalAmount,
    isCash: method,
    balance: props.balance
  }


  React.useEffect(() => {
    setAmount(price * quan)
  }, [amount, quan,price])



  const itemAdd = async (u) => {

    const ele = Itemarr.filter((Item) => {
      return Item.item === u.item
    })


    if (ele.length < 1 || u.amount !== 0) {
      Itemarr.push(u)
      setItem("")
      setPrice("")
      setQuan("")
      setTotal(subTotal + u.amount)
    }
    else {
      alert("Item already Exists!")
      setItem("")
      setPrice("")
      setQuan("")
    }

    dispatch({ type: "Edit_invoice", invoicetable: Itemarr, invoiceother })

  }
  const handleDel = async (d) => {
    const ele = Itemarr.filter((Item) => {
      return Item.key !== d.key
    })
    setItemarr(ele)
    setTotal(subTotal - d.amount)
    dispatch({ type: "Edit_invoice", invoicetable: ele, invoiceother })
  }

  const handleTable = (u) => {
    u()
    dispatch({ type: "Edit_invoice", invoicetable: Itemarr, invoiceother })
  }


  return (
    <>
      <TableContainer>
        <Table sx={{ my: 2, mb: 0 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ITEM</StyledTableCell>
              <StyledTableCell align="center">QTY</StyledTableCell>
              <StyledTableCell align="center">PRICE</StyledTableCell>
              <StyledTableCell align="center">TOTAL</StyledTableCell>
              <StyledTableCell align="center">ACTION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Itemarr.map((Item) => {
              return (
                <StyledTableRow key={Item.key}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {Item.item}
                  </StyledTableCell>
                  <StyledTableCell align="center">{Item.quantity}</StyledTableCell>
                  <StyledTableCell align="center">{Item.price}</StyledTableCell>
                  <StyledTableCell align="center">{"₹ " + Item.amount}</StyledTableCell>
                  <StyledTableCell align="center"><IconButton onClick={() => handleDel(Item)}><Delete /></IconButton></StyledTableCell>
                </StyledTableRow>
              )
            })}
            <StyledTableRow key="Edit">
              <StyledTableCell component="th" scope="row">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select Product</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Product"
                    variant="outlined"
                    onChange={(e)=>{setItem(e.target.value.productName); setPrice(e.target.value.productPrice)}}
                  >
                  {productsList?.map((p)=>(
                    <MenuItem value={p}>{p.productName}</MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </StyledTableCell>
              <StyledTableCell align="right"><TextField placeholder='Qty' onChange={(e) => { if (e.target.value !== "") { setQuan(parseInt(e.target.value)) } else { setQuan("") } }} value={quan} /></StyledTableCell>
              <StyledTableCell align="right"><TextField InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {currency.symbol}
                    </InputAdornment>
                  ),
                }} onChange={(e) => { if (e.target.value !== "") { setPrice(parseInt(e.target.value)) } else { setPrice("") } }} value={price} /></StyledTableCell>
              <StyledTableCell align="right"><TextField value={amount} InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {currency.symbol}
                    </InputAdornment>
                  ),
                }}/></StyledTableCell>
              <StyledTableCell align="center" sx={{ background: "#f2f2f2" }}><IconButton onClick={() => itemAdd(ItemData)} variant="contained" size="large"><AddCircle /></IconButton></StyledTableCell>
            </StyledTableRow>
          </TableBody>

        </Table>
      </TableContainer>
      <Divider />
      <Table sx={{ mb: 2 }}>
        <TableRow sx={{ background: "#f2f2f2" }} align="right"><TableCell sx={{ background: "#e9e9e9" }}><h3> SubTotal -  {currency.symbol}{subTotal}</h3></TableCell><TableCell><input type="checkbox" onChange={(e) => setMethod(e.target.value)} /> Is Payment Method Online?</TableCell><TableCell align="center"><Button color="success" variant="contained" startIcon={<DoneAll />} onClick={() => { handleTable(props.costmer_fun) }}>Update Invoice</Button></TableCell></TableRow>
      </Table>
    </>
  );
}