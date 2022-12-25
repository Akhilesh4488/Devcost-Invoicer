import React, { useContext, useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { doc, updateDoc, arrayRemove, } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../Context/AuthContext';
import { getPopoverUtilityClass, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { UserContext } from '../Context/UserContext';



export default function DashboardProductList() {


  const { CurrentUser } = useContext(AuthContext)
  const { productsList,currency } = useContext(UserContext)

  const deleteHandle = async (u) => {
    await updateDoc(doc(db, "UserProducts", CurrentUser.uid), {
      products: arrayRemove(u)
    })

  }

  return (
    <React.Fragment>
      <Title>All Products / Services</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsList && productsList?.map((product) => (
            <TableRow key={product?.id}>
              <TableCell>{product?.productName}</TableCell>
              <TableCell>{currency.symbol}{product?.productPrice}</TableCell>
              <TableCell><IconButton><Delete onClick={() => deleteHandle(product)} /></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}