import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";



function MyApp() {

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
    }, [] 
  );

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index, id) {
    // Make the DELETE request to the backend
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          setCharacters((prevCharacters) =>
            prevCharacters.filter((character) => character.id !== id) // Filter out the deleted user by id
          );
        } else {
          console.log("Failed to delete user:", response.status);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });

  }
  

  return (
    <div className="container">
      <Table 
	      characterData={characters} 
        removeCharacter={(index, id) => removeOneCharacter(index, id)}
        />
      <Form handleSubmit={updateList} />
    </div>

  );

  function updateList(person) { 
    postUser(person)
      .then((response) => response.json())
      .then((newUser) => {
        setCharacters([...characters, newUser]); // Add the new user
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  }

}

export default MyApp;
