import React, { useState, useEffect } from "react";
// import { uuid } from "uuidv4";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import EditContact from "./EditContact";
import axios from "axios";
import { Route, Routes,} from "react-router-dom";

function App() {
  const [contacts, setContacts] = useState([]);     //contacts array

 const baseURL = "http://127.0.0.1:8000/";

  const addContactHandler = (contact) => {          //function for adding contact
    console.log(contact);       
    axios
    .post(baseURL, {
      name: contact.name,
      email: contact.email
    })
    .then((response) => {
      setContacts([...contacts, { id: response.data.id, ...response.data }]);
    });                              
  };

  const updateContactHandler = (contact) => {          //function for adding contact
    const id = contact.id;
    axios
    .put(`${baseURL}${contact.id}`, {
      name: contact.name,
      email: contact.email
    })
    .then((response) => {
      setContacts( contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      }));
    });      
                             
  };

  const removeContactHandler = (id) => {
    console.log(id);
    axios
    .delete(`${baseURL}${id}`)
    .then(() => {
      alert("Post deleted!");
      // setPost(null)
    });
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setContacts(response.data);
      console.log(response.data)
    })
    }, []);


  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
      <Routes>
        <Route
            exact path="/edit"
            element={
              <EditContact
              // {...props}
              updateContactHandler = {updateContactHandler} exact
              />
            }            
          />
      </Routes>
    </div>
  );
}

export default App;
