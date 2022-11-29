import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Button from '@mui/material/Button';  
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Bed() {
    const [size, setSize] = useState()
    const [quantity, setQuantity] = useState()
    const [beds, setBeds] = useState([])

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (type) => {
        setOpen(false)
        if (type === 'add') {
            const newBed = {
                size: size,
                quantity: quantity,
            }
            setBeds([...beds, newBed])
        }
    };

    const deleteBed = (index) => {
        if (beds.length === 1) setBeds([])
        else {
            let newBeds = [...beds]
            newBeds.splice(index, 1)
            setBeds(newBeds)
        }
    }

    console.log('bed', beds)

    return (
        <div style={{marginBottom: '0.5rem'}}>
            Bed
            <FontAwesomeIcon icon={faPlus} style={{marginLeft: '0.2rem'}} onClick={handleClickOpen}/>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Bed information</DialogTitle>
                <DialogContent>
                {/* <DialogContentText>
                    Bed information
                </DialogContentText> */}
                <TextField
                    autoFocus
                    margin="dense"
                    id="size"
                    label="Size"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(newValue) => setSize(newValue.target.value)}
                />
                <TextField
                    margin="dense"
                    id="quantiy"
                    label="Quantity"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(newValue) => setQuantity(newValue.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button onClick={() => handleClose('add')}>Add</Button>
                </DialogActions>
            </Dialog>
            {beds.map((bed, index) => {
                return (
                    <div key={index} style={{fontSize: '12px'}}>
                        <span>Size: {bed.size} </span>
                        <span>Quantity: {bed.quantity} </span>
                        <span style={{cursor: 'pointer'}} onClick={() => deleteBed(index)}>&times;</span>
                    </div>
                )
            })}
        </div>
    );
}

export default Bed;