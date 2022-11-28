import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import '../Table/Table.scss'
import './Booking.scss'

function Booking({modal, setModal, bookings}) {
    const titles = ['Booking_id', 'Booking_date', 'Num_of_guests', 'Checkin_date',  'Checkout_date', 'State', 'Total_cost']

    return ( 
        <div className='modal' style={{display: modal}}>
            <div className="table">
                <h3>Booking information</h3>
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
                        {bookings.map((booking) => (
                            <TableRow
                            key={booking.Booking_id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                            <TableCell component="th" scope="booking">
                                {booking.Booking_id}
                            </TableCell>
                            <TableCell align="left">{booking.Booking_date}</TableCell>
                            <TableCell align="left">{booking.Num_of_guests}</TableCell>
                            <TableCell align="left">{booking.Checkin_date}</TableCell>
                            <TableCell align="left">{booking.Checkout_date}</TableCell>
                            <TableCell align="left">{booking.State}</TableCell>
                            {/* <TableCell align="left">{booking.Password}</TableCell> */}
                            <TableCell align="left">{booking.Total_cost}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            <button className='modalButton' onClick={() => setModal('none')}>Đóng</button>
            </div> 
        </div>
    );
}

export default Booking;