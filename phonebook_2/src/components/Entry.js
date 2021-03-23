import React from 'react'

const Entry = ({ person, deletePerson}) => {
  console.log('this is person', person)

  return (
    <li>
      {person.name} : {person.number} <button onClick={deletePerson} > delete </button>
    </li>
  )
}

export default Entry