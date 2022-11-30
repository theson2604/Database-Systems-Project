import { Box, IconButton, InputBase } from "@mui/material";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import '../GlobalStyles/Table.scss'

import SearchIcon from '@mui/icons-material/Search';
import Booking from "../Booking/Booking";
import { getCustomer } from "../../service";



function Search() {
    const [info, setInfo] = useState()
    const titles = ['Customer_id', 'Customer_type', 'Fullname', 'Email', 'Phone', 'Username', 'Ssn', 'Score']
    
    const [customers, setCustomers] = useState()
    const [selectCustomer, setSelectCustomer] = useState({id: "", name: ""})
    const [name, setName] = useState('')
    const [modal, setModal] = useState(false)
   
    useEffect(() => {
        async function fetchCustomer() {
          setInfo(await getCustomer());     
        }
        if (!info)
            fetchCustomer()
    })

    const filterData = () => {
        return (info.filter(cus => {
            if (name.length !== 0) {
                return cus.Fullname.toLowerCase().includes(name)
            }
            else return null
        }))
    }

    const handleName = (e) => {
        setName(e.target.value.toLowerCase())
       
    }
    
    
    
    const handleClick = (id, name) => {
        setSelectCustomer({id, name})
        console.log(selectCustomer)
        setModal(true)
        
        // setBackground(true)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let dt = filterData()
        if (dt.length > 0)
            setCustomers(dt)
        // const cus = await getCustomerByName(name)
        
    }
    

    return (
        <>
        <Booking modal={modal} setModal={setModal} customer={selectCustomer}/>
        <Box sx={{ margin: 2 ,display: 'flex', alignItems: 'center', justifyContent:"center"}} maxWidth>
            <Paper elevation={3}
                component="form"
                sx={{borderRadius: 5, p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }} 
                onSubmit={handleSubmit}
                >
                    
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        name="fullname"
                        placeholder="Search customers on database"
                        inputProps={{ 'aria-label': 'search database' }}
                        onChange={handleName}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                
                    
                </Paper>
            </Box>
        <div className="table">
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius: '1rem', background: (modal==='block') && 'rgba(0,0,0,0.4)'}}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        {titles.map((title, index) => {
                        if (index===0) return (<TableCell key={index} align='center'>{title}</TableCell>) 
                        else return (<TableCell key={index} align= 'center'>{title}</TableCell>)
                        })}
                    </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white", overflowY: 'scroll' }}>
                    {!customers && <TableRow><TableCell colSpan={7}  align="center"><h2>Bắt đầu tìm kiếm</h2></TableCell></TableRow>}
                    { customers && customers.map((customer) => (
                        <TableRow
                        key={customer}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        hover={true}
                        onClick={() => handleClick(customer.Customer_id, customer.Fullname)}
                        >
                        <TableCell component="th" scope="customer" align="center">
                            {customer.Customer_id}
                        </TableCell>
                        <TableCell align="center">{customer.Customer_type}</TableCell>
                        <TableCell align="center">{customer.Fullname}</TableCell>
                        <TableCell align="center">{customer.Email}</TableCell>
                        <TableCell align="center">{customer.Phone}</TableCell>
                        <TableCell align="center">{customer.Username}</TableCell>
                        {/* <TableCell align="center">{customer.Password}</TableCell> */}
                        <TableCell align="center">{customer.Ssn}</TableCell>
                        <TableCell align="center">{customer.Score}</TableCell>
                       
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div> 
        </>
    );
}

export default Search;