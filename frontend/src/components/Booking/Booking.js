import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import '../GlobalStyles/Table.scss'
import './Booking.scss'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { useState, useEffect } from "react";
import { getRoomBooking } from "../../service";
import Moment from 'moment'
// function createData(Booking_id, Booking_date, Num_of_guests, Checkin_date,  Checkout_date, State, Total_cost) {
//     return {Booking_id, Booking_date, Num_of_guests, Checkin_date,  Checkout_date, State, Total_cost};
//   }

// const rows = [createData(0, '2022-01-10 13:23:44', 2, '2022-01-12 13:23:44', '2022-01-14 11:23:44', 1, 100, 'KH258329'),
// createData(0, '2022-01-12 13:23:44', 3, '2022-01-13 13:23:44', '2022-01-18 11:23:44', 1, 650, 'KH258326'),
// createData(0, '2022-01-12 18:23:44', 3, '2022-01-14 13:23:44', '2022-01-18 12:23:44', 1, 450, 'KH258328')]
const state = ["Chưa thanh toán", "Đã thanh toán", "Đã hủy chưa hoàn tiền", "Đã hủy hoàn tiền"]
const makeStyle=(status)=>{
  if(parseInt(status) === 0)
  {
    return {
      color: 'red',
    }
  }
  else if(parseInt(status) === 1)
  {
    return{
      
      color: 'green',
    }
  }
  else if (parseInt(status) === 2)
  {
    return{
      
      color: '#ffda83',
    }
  }
 
  else{
    return{
     
      color: 'blue',
    }
  }
}

function Booking({modal, setModal, customer}) {
    const titles = ['Booking_id', 'Booking_date', 'Num_of_guests', 'Checkin_date',  'Checkout_date', 'State', 'Total_cost']
    const [rows, setRows] = useState()
    const handleClose = () => {
        setModal(false);
    }
    useEffect(() => {
      async function fetchBooking(id){        
        const data = await getRoomBooking(id)
        
        setRows(data)
      }
     fetchBooking(customer.id)
    }, [customer.id])
    
    return ( 
        <Dialog
        fullWidth
        maxWidth="lg"
        open={modal}
        onClose={handleClose}
      >
        <DialogTitle>Thông tin đặt phòng</DialogTitle>
        <DialogContent>
            {!rows && <b>Chưa có dữ liệu đặt phòng của khách hàng {customer.name}</b> }
        {rows && <>
          <DialogContentText>
            Dữ liệu đặt phòng hôm nay của khách hàng <b>{customer.name}</b>
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <TableContainer
                    component={Paper}
                    style={{ boxShadow: "0px 13px 20px 0px #80808029", borderRadius: '1rem', marginLeft: '9px'}}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            {titles.map((title, index) => {
                            if (index===0) return (<TableCell key={index} align='center'>{title} </TableCell>) 
                            else return (<TableCell key={index} align= 'center'>{title}</TableCell>)
                            })}
                        </TableRow>
                        </TableHead>
                        <TableBody style={{ color: "white", overflowY: 'scroll' }}>
                        {rows.map((booking) => (
                            <TableRow
                            key={booking.Booking_id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                            <TableCell component="th" scope="booking" align= 'center'>
                                DP{Moment(booking.Booking_date).format("DDMMYYYY")}{booking.Booking_id.toString().padStart(6, '0')}
                            </TableCell>
                            <TableCell align="center">{Moment(booking.Booking_date).format("DD/MM/YYYY")}</TableCell>
                            <TableCell align="center">{booking.Num_of_guests}</TableCell>
                            <TableCell align="center">{Moment(booking.Checkin_date).format("DD/MM/YYYY")}</TableCell>
                            <TableCell align="center">{Moment(booking.Checkout_date).format("DD/MM/YYYY")}</TableCell>
                            <TableCell align="center" style={makeStyle(booking.State)}>{state[booking.State]}</TableCell>
                            {/* <TableCell align="left">{booking.Password}</TableCell> */}
                            <TableCell align="center">{booking.Total_cost}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
          </Box>
          </>
        }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
}

export default Booking;