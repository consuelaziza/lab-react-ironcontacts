
import './App.css';
import contactList from './contacts.json'
import {useState} from 'react'

function App() {
  

  const [contacts, setContacts] = useState(contactList.slice(0,5))

  const randomContact = () =>{
    let randomIndex = Math.floor(Math.random()* contactList.length)
    let randomContact = contactList[randomIndex]

    setContacts([randomContact, ...contacts])
  }

  const sortName = () => {
    let clone = JSON.parse(JSON.stringify(contacts))

    clone.sort((a, b)=>{
      if (a.name > b.name){
        return 1
      }
      else if (a.name < b.name){
        return -1
      }
      else {
        return 0
      }

    })
    setContacts(clone)
  }

  const sortPop = () => {
    let clone = JSON.parse(JSON.stringify(contacts))

    clone.sort((a, b) => b.popularity - a.popularity )

    setContacts(clone)
  }

  function handleRemove(id){
    let filteredContacts = contacts.filter((elem) => {
        return elem.id !== id
    })
    // Updating the state 'allPeople' with the filtered list
    setContacts(filteredContacts)
}

  console.log(contactList)
  return (
    <div className="App">
    <h1>IronContacts</h1>
    <button onClick={randomContact}>Add Random Contact</button>
    <button onClick={sortName}>Sort by name</button>
    <button onClick={sortPop}>Sort by popularity</button>
    <table>
        <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
        </tr>
        </thead>
        <tbody>
    {
      contacts.map((elem) => {
        return(
          
          <tr key={elem.id}>
          <td><img style={{width: "56px"}} src={elem.pictureUrl} alt="pic" /></td>
          <td>{elem.name}</td>
          <td>{Math.round(elem.popularity * 100)/100}</td> 
          <td>{elem.wonOscar === 'true' ? '🏆' : '' }</td>
          <td>{elem.wonEmmy === 'true'? '🌟' : '' }</td> 
         <td> <button onClick={() => { handleRemove(elem.id) }}>Delete</button></td>
      </tr>
        )
      })
    }
      </tbody>
      </table>
    </div>
  );
}

export default App;
