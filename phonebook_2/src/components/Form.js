import React from 'react'

const Form = ({addPerson,handleNameChange,handlePhoneChange,newName,newPhone}) => {

    return (
    <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} /> <br></br>
      number: <input value={newPhone} onChange={handlePhoneChange}  />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form> )
  }
  
  export default Form;