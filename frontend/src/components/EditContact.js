import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditContact = (props) =>  {
  // console.log(props);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, email } = location.state.contact;   //passed from contact card
  const [newEmail, setNewEmail] = useState(email);
  const [newName, setNewName] = useState(name);
  
  const update = (e) => {
    e.preventDefault();
    if (newName === "" || newEmail === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    props.updateContactHandler({id, name: newName, email : newEmail});
    setNewName("");
    setNewEmail("")
    navigate("/");
  };

    return (
      <div className="ui main">
        <h2>Edit Contact</h2>
        <form className="ui form" onSubmit={update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newName}            //dynamic value (state)
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <button className="ui button blue">Update</button>
        </form>
      </div>
    );
}

export default EditContact;