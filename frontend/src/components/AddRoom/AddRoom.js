import { useState } from "react";
import "./AddRoom.scss";
import Form from '../Form/Form'

function AddRoom() {
    const [values, setValues] = useState({
        Roomtype_id: "",
        Type_name: "",
        Area: "",
        Max_guests: "",
        Bed: "",
        Other_description: "",
        Supply: "",
      });
    
      const inputs = [
        {
          id: 1,
          name: "Roomtype_id",
          type: "text",
          placeholder: "Roomtype_id",
          errorMessage:
            "Username should be 2-16 characters and shouldn't include any special character!",
          label: "Roomtype_id",
          pattern: "^[A-Za-z0-9]{1,16}$",
          required: true,
        },
        {
          id: 2,
          name: "Type_name",
          type: "text",
          placeholder: "Type_name",
          errorMessage: "It should be a valid email address!",
          label: "Type_name",
          required: true,
        },
        {
          id: 3,
          name: "Area",
          type: "date",
          placeholder: "Area",
          label: "Area",
        },
        {
          id: 4,
          name: "Max_guests",
          type: "text",
          placeholder: "Max_guests",
          errorMessage:
            "Max_guests should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
          label: "Max_guests",
          required: true,
        },
        {
          id: 5,
          name: "Bed",
          type: "text",
          placeholder: "Bed",
          errorMessage: "Passwords don't match!",
          label: "Bed",
          required: true,
        },
        {
            id: 6,
            name: "Other_description",
            type: "text",
            placeholder: "Other_description",
            errorMessage: "Passwords don't match!",
            label: "Other_description",
            required: true,
          },
          {
            id: 7,
            name: "Supply",
            type: "text",
            placeholder: "Supply",
            errorMessage: "Passwords don't match!",
            label: "Supply",
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
        <div className="add">
          <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {inputs.map((input) => (
              <Form
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button>Submit</button>
          </form>
        </div>
      );
}

export default AddRoom;