import { TextField } from "@mui/material";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import '../Customer/Customer.scss'

function Search({data}) {
    const info = data[1]
    const titles = ['Customer_id', 'Customer_type', 'Fullname', 'Email', 'Phone', 'Username', 'Ssn', 'Score']
    let customers = []

    const [name, setName] = useState('')

    const handleName = (e) => {
        setName(e.target.value.toLowerCase())
        console.log(name)
    }

    const filterData = () => {
        return (info.filter(customer => {
            if (name.length !== 0) {
                return customer.Fullname.toLowerCase().includes(name)
            }
            else return null
        }))
    }

    customers = filterData()

    return (
        <div className="table">
            <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                label="Customer name"
                onChange={handleName}
                //onSubmit={() => filterData()}
            />
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius: '1rem'}}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        {titles.map((title, index) => {
                        if (index===0) return (<TableCell key={index}>{title}</TableCell>) 
                        else return (<TableCell key={index} align= 'left'>{title}</TableCell>)
                        })}
                    </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white", overflowY: 'scroll' }}>
                    {customers.map((customer) => (
                        <TableRow
                        key={customer.Customer_id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell component="th" scope="customer">
                            {customer.Customer_id}
                        </TableCell>
                        <TableCell align="left">{customer.Customer_type}</TableCell>
                        <TableCell align="left">{customer.Fullname}</TableCell>
                        <TableCell align="left">{customer.Email}</TableCell>
                        <TableCell align="left">{customer.Phone}</TableCell>
                        <TableCell align="left">{customer.Username}</TableCell>
                        {/* <TableCell align="left">{customer.Password}</TableCell> */}
                        <TableCell align="left">{customer.Ssn}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div> 
    );
}

export default Search;