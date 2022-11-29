import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Customer.scss";
import { getCustomer } from "../../service";



  const setTitle = () => {
    return ['Customer_id', 'Customer_type', 'Fullname', 'Email', 'Phone', 'Username', 'Ssn', 'Score']
    
  }

  const makeStyle=(status)=>{
    if(status === 'Approved')
    {
      return {
        background: 'rgb(145 254 159 / 47%)',
        color: 'green',
      }
    }
    else if(parseInt(status) <  50)
    {
      return{
        
        color: '#b78d78',
      }
    }
    else if (parseInt(status) < 100)
    {
      return{
        
        color: '#63b4ae',
      }
    }
    else if (parseInt(status) < 1000)
    {
      return{
       
        color: '#f08c78',
      }
    }
    else{
      return{
       
        color: '#ffda83',
      }
    }
  }

  function InfoTable() {
    
    const [customers, setCustomers] = useState()
    // if (info === '' || info === undefined || info === null) return 
    
    const titles = setTitle()
    // const rows = info
    
    useEffect(() => {
      async function fetchCustomer() {
        const cus = await getCustomer();
       
        setCustomers(cus)
      }
      if (!customers)
        fetchCustomer()
    })


    return ( 
    <div className="table">
        <h3>Information of customers</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius: '1rem'}}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {titles.map((title, index) => 
                   (<TableCell key={index} align='center'>{title}</TableCell>)
                  )}
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white", overflowY: 'scroll' }}>
              {customers && customers.map((row) => { 
              return (
                <TableRow
                  key={row.Customer_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.Customer_id}
                  </TableCell>
                  <TableCell align="center">{row.Customer_type}</TableCell>
                  <TableCell align="center">{row.Fullname}</TableCell>
                  <TableCell align="center">{row.Email}</TableCell>
                  <TableCell align="center">{row.Phone}</TableCell>
                  <TableCell align="center">{row.Username}</TableCell>
                  {/* <TableCell align="left">{row.Password}</TableCell> */}
                  <TableCell align="center">{row.Ssn}</TableCell>
                  <TableCell align="center">
                    <span className="status" style={makeStyle(row.Score)}>{row.Score}</span>
                  </TableCell>
                </TableRow>
              )
              })}
              {!customers && <TableRow ><TableCell align="center" colSpan={7}><b>Loading ...</b></TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
    </div> 
    );
}

export default InfoTable;