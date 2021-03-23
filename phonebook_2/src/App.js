import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Entry from './components/Entry'
import Form from './components/Form'
import Filter from './components/Filter'
import serverService from './services/notes'

const App = () => {


  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ searchCriterion, setSearchCriterion] = useState('')


  useEffect(() => {
    serverService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('id calculation', persons.length)
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newPhone,
    }

    serverService
      .create(personObject)
      .then(response => {
        console.log('this is response', response)
        setPersons(persons.concat(response))
        setNewName('')
        setNewPhone('') 
      })
    }



  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

   
  const handleSearchCriterion = (event) => {
    setSearchCriterion(event.target.value)
  }


  const personsToShow = persons.filter((p) => p.name.includes(searchCriterion))


  return (
    <div>
      <h1>Phonebook</h1>

      <h2>Add New Number</h2>
      <Form addPerson={addPerson} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} 
        newName={newName} newPhone={newPhone} />

      <h2>Filter for Names in Phonebook</h2> 
      <Filter searchCriterion={searchCriterion} handleSearchCriterion={handleSearchCriterion} />
      
      <ul>
        {personsToShow.map((person, i) => 
          <Entry
            key={i}
            person={person}
          />
        )}
      </ul>

      <h2>All Names in Phonebook</h2>  
      <ul>
        {persons.map((person, i) => 
          <Entry
            key={i}
            person={person}
          />
        )}
      </ul>
    </div>
  )
}

export default App 
