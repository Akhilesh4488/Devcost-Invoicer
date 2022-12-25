import React,{useContext} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField, Grid, Checkbox, FormControlLabel, Divider, Button, InputAdornment, } from '@mui/material';
import InvoiceEditTable from '../../components/InvoiceEditTable';
import { CostmerContext } from '../../Context/CostmerContext';
import { UserContext } from '../../Context/UserContext';


export default function InvoiceEditor() {

  const {state,dispatch} = React.useContext(CostmerContext)
  const {UserData} = useContext(UserContext)

  const [costmerName, setCostmerName] = React.useState('')
  const [costmerPhone, setPhone] = React.useState(null)
  const [costmerAddress,setCostmerAdd] = React.useState(null)
  const [costmerEmail,setCostmerEmail] = React.useState(null)
  const [tax,setTax] = React.useState(0)
  const [balance,setBalance] = React.useState(0)

  const costmerData = {
    costmerName:costmerName,
    costmerPhone:costmerPhone,
    costmerAddress:costmerAddress,
    costmerEmail:costmerEmail
  }

  const billno = new Date().getMilliseconds()+Math.floor(Math.random()*332133*new Date().getSeconds())
  const billdate = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`

  const handleClick = ()=>{
    dispatch({type:"Edit_costmer",payload:costmerData,billno:billno,date:billdate})
  }

  return (
    
    <Box sx={{ width: "100%", }}>
      <Box variant="outlined" sx={{ p: 3 }}>
        <>  <React.Fragment>
          <Typography variant="h6" gutterBottom sx={{ fontSize: "1.7.rem", fontWeight: "600" }}>
            Welcome, {UserData.displayName} - Create An Invoice
          </Typography>
          <Divider sx={{ mb: 2, borderBottomWidth: "medium" }} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                label="Costmer's name"
                fullWidth
                autoComplete="name"
                variant="filled"
                onChange={(e)=>{setCostmerName(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Costm. Phone"
                fullWidth
                autoComplete="phone"
                variant="filled"
                onChange={(e)=>{setPhone(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Costm. Email"
                fullWidth
                autoComplete="email"
                variant="filled"
                onChange={(e)=>{setCostmerEmail(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Costm. Address"
                fullWidth
                autoComplete="shipping address-line1"
                variant="filled"
                onChange={(e)=>setCostmerAdd(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12}>
            <Button color="success" variant="contained"  onClick={()=>{handleClick()}}>Update costmer</Button>
            </Grid> */}
            <Grid item xs={12}>
            <Divider/>

        </Grid>
            <React.Fragment>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Tax Rate"
                  fullWidth
                  autoComplete="tax-rate"
                  variant="filled"
                  onChange={(e)=>setTax(e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <TextField
                  label="Balance"
                  fullWidth
                  value={balance}
                  autoComplete="balance"
                  onChange={(e)=>{if (e.target.value !== "") { setBalance(parseInt(e.target.value)) } else { setBalance("") } }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">INR</InputAdornment>,
                  }}
                /> */}
              </Grid>
         </React.Fragment>
          </Grid>
        </React.Fragment>
          <InvoiceEditTable tax={tax} costmer_fun = {handleClick} balance={balance}/>
        </>
      </Box>
    </Box>
  );
}