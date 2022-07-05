import React from 'react';
import Note from './Note.jsx'

const Notes = ({ notes, clicker, curr, edit, status, reset }) => {
  const display = () => {
    if(curr === '') {
      return notes.map(note => <Note key={note.id} note={note} clicker={clicker} curr={curr} edit={edit} status={status} reset={reset} />)
    } else {
      let filtered = notes.filter(note => note.id === curr)
      return filtered.map(note => <Note key={note.id} note={note} clicker={clicker} curr={curr} edit={edit} status={status} reset={reset} />)
    }
  }

  return (
    <div>
      <h1>My Notes</h1>
      <br></br>
      {display()}
    </div>
  )
}

export default Notes;