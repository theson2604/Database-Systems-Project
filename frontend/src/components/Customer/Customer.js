import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Customer.scss";

function createData(Customer_id, Customer_type, Fullname, Email, Phone, Username, Password, Ssn, Score) {
    return { Customer_id, Customer_type, Fullname, Email, Phone, Username, Password, Ssn, Score };
  }
  
  const rows = [
    createData("Lasania Chiken Fri", 18908424, "Nguyen van a", "Approved", 'dsfjadsf', 'hehe', 'hihi', 'hoho', 100),
    createData("Big Baza Bang ", 18908424, "Nguyen van b", "Pending", 'dsfjadsf', 'hehe', 'hihi', 'hoho', 100),
    createData("Mouth Freshner", 18908424, "Nguyen van c", "Approved", 'dsfjadsf', 'hehe', 'hihi', 'hoho', 100),
    createData("Cupcake", 18908421, "Nguyen van d", "Delivered", 'dsfjadsf', 'hehe', 'hihi', 'hoho', 100),
  ];

  const setTitle = (type) => {
    if (type === 'customer') return ['Customer_id', 'Customer_type', 'Fullname', 'Email', 'Phone', 'Username', 'Ssn', 'Score']
    else return ['Month', 'Total_customers']
  }

  const makeStyle=(status)=>{
    if(status === 'Approved')
    {
      return {
        background: 'rgb(145 254 159 / 47%)',
        color: 'green',
      }
    }
    else if(status === 'Pending')
    {
      return{
        background: '#ffadad8f',
        color: 'red',
      }
    }
    else{
      return{
        background: '#59bfff',
        color: 'white',
      }
    }
  }

function InfoTable({data}) {
    const [type, info] = data

    // if (info === '' || info === undefined || info === null) return 
    
    const titles = setTitle(type)
    // const rows = info

    return ( 
    <div className="table">
        <h3>{(type==='customer')? 'Information of customers' : 'Statistic information of branch'}</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius: '1rem'}}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {titles.map((title, index) => {
                  if (index===0) return (<TableCell key={index}>{title}</TableCell>) 
                  else return (<TableCell key={index} align='left'>{title}</TableCell>)
                  })}
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white", overflowY: 'scroll' }}>
              {rows.map((row) => {if (type==='customer') 
              return (
                <TableRow
                  key={row.Customer_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.Customer_id}
                  </TableCell>
                  <TableCell align="left">{row.Customer_type}</TableCell>
                  <TableCell align="left">{row.Fullname}</TableCell>
                  <TableCell align="left">{row.Email}</TableCell>
                  <TableCell align="left">{row.Phone}</TableCell>
                  <TableCell align="left">{row.Username}</TableCell>
                  {/* <TableCell align="left">{row.Password}</TableCell> */}
                  <TableCell align="left">{row.Ssn}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.Score)}>{row.Score}</span>
                  </TableCell>
                </TableRow>
              )
              else
              return (
                <TableRow
                  key={row.Customer_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.Customer_id}
                  </TableCell>
                  <TableCell align="left">{row.Customer_type}</TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </TableContainer>
    </div> 
    );
}

export default InfoTable;