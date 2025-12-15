import { useState, useEffect } from 'react'
import { Filter, PersonForm, Persons } from './component/phonebook'
import personService from './services/persons'
import Notification from './component/Notification'
import NotificationError from './component/NotificationError'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const found = persons.find(person => person.name === newName)
    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(found.id, { ...found, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Updated ${newName}'s number`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            const errorMessage = `Information of ${newName} has already been removed from server`
            console.log(errorMessage)
            setErrorMessage(errorMessage)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      setNewName('')
      setNewNumber('')
      return
    } 

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        const errorMessage = error.response.data.error
        console.log(errorMessage)
        setErrorMessage(errorMessage)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotificationMessage(`Deleted a person ${persons.find(p => p.id === id)?.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        const errorMessage = `Failed to delete person`
        console.log(errorMessage)
        setErrorMessage(errorMessage)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => {return person.name.toLowerCase().includes(newFilter.toLowerCase()) || person.number.includes(newFilter)}) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <NotificationError message={errorMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )

}

export default App