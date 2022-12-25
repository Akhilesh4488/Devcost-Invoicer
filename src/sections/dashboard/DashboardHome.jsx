import React,{useContext,useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import DashboardChart from '../../components/DashboardChart';
import DashboardProfile from '../../components/DashboardProfile';
import DashboardOrders from '../../components/DashboardOrders';
import { Helmet } from 'react-helmet';
import { UserContext } from '../../Context/UserContext';
import DashboardProductList from '../../components/DashboardProductList';
import DashboardAddProduct from '../../components/DashboardAddProduct';


function DashboardContent() {

  const {UserData} = useContext(UserContext)

  return (
    <>
      <Helmet>
        <title>Dashboard - Devcost Tools</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Grid container spacing={3}>
        <React.Fragment>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={7}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems:"center",
                justifyContent:"center",
                overflowY:"scroll",
                height: 217,
              }}
            >
                <DashboardOrders />
            </Paper>
                <Paper
                  sx={{
                    p: 2,
                    mt:2,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 280,
                    maxHeight:280,
                    overflowY:"scroll"
                  }}
                >
                    <DashboardProductList />
                </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={5} lg={5}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 240,
              }}
            >
              <DashboardProfile user={UserData}/>
            </Paper>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY:"scroll",
                    maxHeight: 210,
                    mt:2.5
                  }}
                >
                    <DashboardAddProduct />
                </Paper>
          </Grid>
        </React.Fragment>
        </Grid>
      </Container>
      </>
  );
}

export default function DashboardHome() {
  return <DashboardContent />;
}


