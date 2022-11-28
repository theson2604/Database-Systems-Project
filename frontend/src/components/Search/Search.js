import { TextField } from "@mui/material";
import React, { useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
<<<<<<< HEAD
import '../Customer/Customer.scss'
=======
import '../Table/Table.scss'
import { BackgroundContext } from "../../pages/Dashboard/Dashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import Booking from "../Booking/Booking";

function createData(Booking_id, Booking_date, Num_of_guests, Checkin_date,  Checkout_date, State, Total_cost) {
    return {Booking_id, Booking_date, Num_of_guests, Checkin_date,  Checkout_date, State, Total_cost};
  }

const rows = [createData(0, '2022-01-10 13:23:44', 2, '2022-01-12 13:23:44', '2022-01-14 11:23:44', 1, 100, 'KH258329'),
createData(0, '2022-01-12 13:23:44', 3, '2022-01-13 13:23:44', '2022-01-18 11:23:44', 1, 650, 'KH258326'),
createData(0, '2022-01-12 18:23:44', 3, '2022-01-14 13:23:44', '2022-01-18 12:23:44', 1, 450, 'KH258328')]
>>>>>>> refs/remotes/origin/master

function Search({data}) {
    const info = data[1]
    const titles = ['Customer_id', 'Customer_type', 'Fullname', 'Email', 'Phone', 'Username', 'Ssn', 'Score', '']
    let customers = []

    const [name, setName] = useState('')
    const [modal, setModal] = useState('none')
    const [bookingData, setBookingData] = useState([])

    const setBackground = useContext(BackgroundContext)

    const handleName = (e) => {
        setName(e.target.value.toLowerCase())
    }

    const filterData = () => {
        return (info.filter(customer => {
            if (name.length !== 0) {
                return customer.Fullname.toLowerCase().includes(name)
            }
            else return null
        }))
    }

    const handleClick = () => {
        setModal('block')
        setBookingData(rows)
        setBackground(true)
    }

    customers = filterData()

    return (
        <>
        <Booking modal={modal} setModal={setModal} bookings={bookingData}/>
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
                style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius: '1rem', background: (modal==='block') && 'rgba(0,0,0,0.4)'}}
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
                        <TableCell align="left">{customer.Score}</TableCell>
                        <TableCell align="left" style={{display: 'flex', justifyContent: 'center'}}>
                            <FontAwesomeIcon 
                                className="icon" 
                                icon={faInfo} 
                                onClick={() => handleClick()}
                            />
                        </TableCell>
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