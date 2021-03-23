import React from 'react'

const Entry = ({ person}) => {
  console.log('this is person', person)

  return (
    <li>
      {person.name} : {person.number}
    </li>
  )
}

export default Entry