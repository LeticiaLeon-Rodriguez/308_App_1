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

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index; 
    }); 
    setCharacters(updated);
    console.log('MyApp 1/1');
  }

  return (
    <div className="container">
      <Table 
	      characterData={characters} 
	      removeCharacter={removeOneCharacter}
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
