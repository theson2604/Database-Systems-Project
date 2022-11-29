import { useState } from "react";
import "./AddRoom.scss";
import Form from '../Form/Form'
// import Select from "react-select";
import Paper from '@mui/material/Paper';
import Supply from "../Supply/Supply";
import Bed from "../Bed/Bed";

function AddRoom() {
    const [values, setValues] = useState({
        Roomtype_id: "",
        Type_name: "",
        Area: "",
        Max_guests: "",
        Other_description: "",
      });
    
      const inputs = [
        {
          id: 1,
          name: "Roomtype_id",
          type: "text",
          placeholder: "Roomtype_id",
          label: "Roomtype ID",
          required: true,
        },
        {
          id: 2,
          name: "Type_name",
          type: "text",
          placeholder: "Type_name",
          label: "Type Name",
          required: true,
        },
        {
          id: 3,
          name: "Area",
          type: "text",
          placeholder: "Area",
          label: "Area",
          required: true,
        },
        {
          id: 4,
          name: "Max_guests",
          type: "text",
          placeholder: "Max_guests",
          label: "Max Guests",
          required: true,
        },
        {
          id: 5,
          name: "Other_description",
          type: "text",
          placeholder: "Other_description",
          label: "Other Description",
          required: true,
        },
      ];
    
      const handleSubmit = (e) => {
        e.preventDefault();
      };
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
      return (
        <div className="addWrapper">
          <Paper elevation={3} className="add">
            <form onSubmit={handleSubmit}>
              <h2>Add Room</h2>
              {inputs.map((input) => (
                <Form
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
              <Bed/>
              <Supply/>
              <button>Submit</button>
            </form>
          </Paper >
        </div>
      );
}

export default AddRoom;