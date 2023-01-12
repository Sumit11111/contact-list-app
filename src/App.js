import { Component, useEffect, useState } from "react";
import Navbar from "./components/navBar";

function App() {
  //initialized states users t store data from api and user to set phone book data
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    phone: "",
  });

  //useeffect will be called once as we passed empty array
  useEffect(() => {
    initialFetch();
  }, []);

  //fetching data from provided API and seting users state
  const initialFetch = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        setUsers(json);
      });
  };

  //handles adding contacts into users array by updated user object
  const addContactHandler = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: user.name,
        body: user.phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    setUsers([...users, user]);
    setUser({ name: "", phone: "" });
  };

  //deleting contact on click of delete contact button provided in every list item
  const deleteContactHandler = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    });
    //console.log("id:", id);
    //getting new array by filtering and then setting users state again
    const newArray = users.filter((u) => u.id !== id);
    setUsers(newArray);
  };

  //on click of list item details like name and phone number inside list this function will be called
  const updateDetails = async (id) => {
    const selectedUser = users.filter((u) => u.id === id);
    //console.log(selectedUser[0].name);
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: `${id}`,
        name: selectedUser[0].name,
        phone: selectedUser[0].phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    setUser({ name: selectedUser[0].name, phone: selectedUser[0].phone });
    deleteContactHandler(id);
  };

  return (
    <div className="App">
      <Navbar />
      <div style={{ display: "flex" }}>
        <div id="contactList">
          {/* iterating over users state and displaying data in list form over a card element */}
          {users.map((user, index) => {
            return (
              <div style={styles.cardContainer} key={index}>
                <div style={{ width: "20%" }}>
                  <img
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      marginTop: "10px",
                    }}
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    alt="dp"
                  ></img>
                </div>
                {/* this div will display the details of different users */}
                <div
                  style={styles.contactDetails}
                  onClick={() => {
                    updateDetails(user.id);
                  }}
                >
                  <h3>{user.phone}</h3>
                  <h4 style={{ marginTop: "-25px", marginLeft: "15px" }}>
                    {user.name}
                  </h4>
                </div>
                {/* this div will display the delete contact button on click of that deleteContacthandler will be called */}
                <div style={styles.deleteButton}>
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => {
                      deleteContactHandler(user.id);
                    }}
                  >
                    Delete Contact
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* this div is the right hand side form component on click f addContactHandlerit will add form data int users state */}
        <div style={{ width: "40%", marginLeft: "40px" }}>
          <div style={styles.formContainer}>
            <h2>Add Contact in your Phone Book</h2>
            {/* name field */}
            <input
              type="text"
              id="name"
              required={true}
              placeholder="Enter contact name..."
              value={user.name || ""}
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
            />
            <br />
            {/* phone field */}
            <input
              type="text"
              required={true}
              id="phone"
              placeholder="Enter phone number..."
              value={user.phone || ""}
              onChange={(e) => {
                setUser({ ...user, phone: e.target.value });
              }}
            />
            <br />
            <button className="btn" onClick={addContactHandler}>
              Add Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// css for styling the app Component
const styles = {
  formContainer: {
    width: "80%",
    height: "300px",
    marginTop: "80px",
    backgroundColor: "grey",
    cardGradient: "#5e9ad9",
    cardBlendMode: "overlay",
    borderRadius: "0.5rem",
    boxShadow: "0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)",
    padding: "10px",
    overflow: "hidden",
  },
  form: {
    margin: "30px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItem: "center",
    backgroundColor: "grey",
    color: "black",
    width: "450px",
    height: "80px",
    padding: "5px",
    marginTop: "10px",
    borderRadius: "10px",
  },
  deleteButton: { marginTop: "25px", Color: "red", width: "20%" },
  contactDetails: { width: "60%" },
};
