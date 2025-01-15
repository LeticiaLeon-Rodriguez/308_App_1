import React from "react";

function TableHeader() {
  return (
    <thread>
      <tr>
          <th>Name</th>
          <th>Job</th>
          <th>Remove</th>
        </tr>
      </thread>
  );
  console.log('Table 1/3');

}

function TableBody(props) {
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
	<td>
	  <button onClick={()=> props.removeCharacter(index)}>
	    Delete
	  </button>
	</td> 
      </tr>
    );
   }
  );
  return (
      <tbody>
        {rows}
       </tbody>
   );
   console.log('Table 2/3');

}

function Table(props) {
    return (
      <table>
        <TableHeader />
        <TableBody 
	        characterData={props.characterData} 
	        removeCharacter={props.removeCharacter}
	      />
      </table>
    );
    console.log('Table 3/3');

}
export default Table;
