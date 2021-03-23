import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Entry from './components/Entry'
import Form from './components/Form'
import Filter from './components/Filter'
import serverService from './services/server'

const App = () => {


  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ searchCriterion, setSearchCriterion] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)


  useEffect(() => {
    serverService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.some(person => person.name == newName)) {
      if( window.confirm(`${newName} already exists in phonebook, replace old number with new number?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newPhone}
        serverService.update(person.id, changedPerson)
        .then(returnedData => {
          setPersons(persons.map(person => person.name !== newName ? person : returnedData))
              setErrorMessage(`For '${returnedData.name}' number was updated in backend`)
              setTimeout(() => { setErrorMessage(null)}, 5000)
                })

      }
      
    }

    else {
      const personObject = {
        id: persons[persons.length -1 ]["id"] + 1,
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
          setErrorMessage(`${response.name} was added to phone book`)
          setTimeout(() => { setErrorMessage(null)}, 5000)
            

        })

    }
    }

    const Notification = ({ message }) => {
      if (message === null) {
        return null
      }
    
      return (
        <div className="error">
          {message}
        </div>
      )
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

  const deletePerson = (name,id) =>{

    if (window.confirm(`Delete ${name} from Phonebook?`)){
      serverService.deleteEntry(id)
        
        setPersons(persons.filter(n => n.id !== id)) }
  }

  const personsToShow = persons.filter((p) => p.name.includes(searchCriterion))


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage}/>
      <h2>Add New Number</h2>
      <Form addPerson={addPerson} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} 
        newName={newName} newPhone={newPhone} />

      <h2>Filtered Names in Phonebook</h2> 
      <Filter searchCriterion={searchCriterion} handleSearchCriterion={handleSearchCriterion} />
      
      <ul>
        {personsToShow.map((person, i) => 
          <Entry
            key={i}
            person={person}
            deletePerson={() => deletePerson(person.name, person.id)}
          />
        )}
      </ul>

      <h2>All Names in Phonebook</h2>  
      <ul>
        {persons.map((person, i) => 
          <Entry
            key={i}
            person={person}
            deletePerson={() => deletePerson(person.name, person.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default App 
