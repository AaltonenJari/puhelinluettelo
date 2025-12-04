const Filter = (props) => {
  return (
    <div>
      filter shown with: <input value={props.newFilter} onChange={props.handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map((person) => 
        <Person key={person.name} person={person} deletePerson={props.deletePerson} />
      )}
    </div>
  )
}

const Person = ({ person, deletePerson }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      deletePerson(person.id)
    }
  }

  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleDelete}>
        delete
      </button>
    </div>
  )
}

export { Filter, PersonForm, Persons, Person }