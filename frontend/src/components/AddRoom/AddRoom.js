import { useState } from "react";
import "./AddRoom.scss";

// import Select from "react-select";
import Paper from '@mui/material/Paper';
import Supply from "../Supply/Supply";
import Bed from "../Bed/Bed";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { saveRoomTypeRecord } from "../../service";

function AddRoom() {
  const [values, setValues] = useState({
      Roomtype_name: "",
      Area: "",
      Max_guests: "",
      Other_description: "",
    });
  const [beds, setBeds] = useState([])
  const [selectSupply, setSelectSupply] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault();
    let type_room = Object.assign({}, values);
    console.log(type_room)
    type_room.Area = parseFloat(type_room.Area)
    type_room.Max_guests = parseInt(type_room.Max_guests) 
    const msg = await saveRoomTypeRecord({"room_type": type_room, "supply": selectSupply, "bed": beds})
    if (msg && msg.Message === "done")
      alert("Lưu thành công")
    else
      alert("Không thể lưu vào database")
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
    return (
      // <div className="addWrapper">
      //   <Paper elevation={3} className="add">
      //     <form onSubmit={handleSubmit}>
      //       <h2>Add Room</h2>
      //       {inputs.map((input) => (
      //         <Form
      //           key={input.id}
      //           {...input}
      //           value={values[input.name]}
      //           onChange={onChange}
      //         />
      //       ))}
      //       <Bed/>
      //       <Supply/>
      //       <button>Submit</button>
      //     </form>
      //   </Paper >
      // </div>
      <>
      <h3>Create A New Room Type</h3>
      <Paper sx={{p:2, m:2, borderRadius: 5}} >
      <Box component="form" sx={{p:2, display: 'flex', flexWrap: 'wrap'}} justifyContent='center' onSubmit={handleSubmit}>
      <div>
      <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
        <TextField
          label="Room type"
          name="Roomtype_name"
          placeholder="Room type"
          required
          onChange={onChange}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <TextField
          type="number"
          inputProps={{step: "0.01", lang:"en-US"}}
          label="Area (m2)"
          placeholder="Area"
          name="Area"
          required
          onChange={onChange}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <TextField
          type="number"
          label="Max guests"
          placeholder="Max guests"
          name="Max_guests"
          required
          onChange={onChange}
        />
      </FormControl>  
      <Supply selectSupply={selectSupply} setSelectSupply={setSelectSupply}/>
      <FormControl fullWidth sx={{ m: 1}} variant="outlined">
        <TextField
          label="Description"
          name="Other_description"
          placeholder="Description"
          onChange={onChange}
        />
      </FormControl>   
      <Bed beds={beds} setBeds={setBeds}/>
      </div>
      <FormControl fullWidth sx={{ m: 1}}></FormControl>
        <Button type="submit" variant="contained" >Create</Button>
      
    </Box>
    </Paper>
    </>
    );
}

export default AddRoom;