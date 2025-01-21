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
    setCharacters([...characters, person]);
  }

}

export default MyApp;
