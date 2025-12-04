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
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

const Person = (props) => {
  return (
    <div>
      {props.person.name} {props.person.number}
    </div>
  )
}

export { Filter, PersonForm, Persons, Person }