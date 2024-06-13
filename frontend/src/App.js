import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import crmImage from './cks4jrkww07r6n9g0m9u543em-11239-freshsales-illustration-01.one-half.png'; // Import the CRM background image

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/contacts");
      setContacts(response.data.contacts);
    } catch (error) {
      console.error("Error fetching contacts: ", error);
    }
  };

  const addContact = async () => {
    try {
      await axios.post("http://localhost:5000/contacts", {
        name,
        email,
        phone,
      });
      fetchContacts();
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error("Error adding contact: ", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact: ", error);
    }
  };

  const updateContact = async () => {
    try {
      await axios.put(`http://localhost:5000/contacts/${editId}`, {
        name,
        email,
        phone,
      });
      fetchContacts();
      setName("");
      setEmail("");
      setPhone("");
      setEditId(null);
    } catch (error) {
      console.error("Error updating contact: ", error);
    }
  };

  const handleEdit = (contact) => {
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
    setEditId(contact.id);
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginBottom: "40px",
    width: "250px",
    display: "inline-block",
    marginRight: "20px",
  };

  const buttonStyle = {
    cursor: "pointer",
    color: "black",
    border: "none",
    borderRadius: "3px",
    padding: "8px 12px",
    marginRight: "10px",
    backgroundColor: "pink",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "red",
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: "green",
  };

  const formStyle1 = {
    display: "flex",
    flexDirection: "column",
  };

  const backgroundStyle = {
    backgroundImage: `url(${crmImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <div style={backgroundStyle}>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => { setSearch(e.target.value) }}
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <h1>Contact Management System</h1>
      <div style={formStyle1}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          value={phone}
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        {editId ? (
          <button style={buttonStyle} onClick={updateContact}>
            Update
          </button>
        ) : (
          <button style={buttonStyle} onClick={addContact}>
            Add Contact
          </button>
        )}
      </div>
      <div className="cards-container">
        {contacts.map((contact) => (
          contact.name.toLowerCase().includes(search.toLowerCase()) ||
          contact.email.toLowerCase().includes(search.toLowerCase()) ||
          contact.phone.toLowerCase().includes(search.toLowerCase())
          ? (
            <div key={contact.id} style={cardStyle}>
              <h3>{contact.name}</h3>
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
              <div>
                <button style={deleteButtonStyle} onClick={() => deleteContact(contact.id)}>
                  Delete
                </button>
                <button style={editButtonStyle} onClick={() => handleEdit(contact)}>
                  Edit
                </button>
              </div>
            </div>
          ) : null
        ))}

      </div>
    </div>
  );
}

export default App;
