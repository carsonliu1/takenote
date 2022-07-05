import React from 'react'

function Note({ note, clicker, curr, edit, status, reset }) {

  const clickHandler = (id) => {
    clicker(id)
  }

  const statusHandler = (e) => {
    status(e.target.name, note.id)
  }

  const editter = (e) => {
    const id = note.id
    const key = e.target.id
    let val = prompt(`Enter new ${key}`)
    if(val !== null) edit(id, key, val)
  }

  return (
    <div>
    {curr.length === 0 ? (
      <div>
        <div className="noteView">
          <div onClick={() => clickHandler(note.id)} className="noteViewTitle">
            <h1>{note.title}</h1>
          </div>
          <div className="noteViewCategory">
            <h3>{note.category}</h3>
          </div>
          <br></br>
          <button name='Starred' onClick={statusHandler}>Starred</button>
          <button name='Hidden' onClick={statusHandler}>Hidden</button>
        </div>
    </div>) : (
        <div className="note">
          <button style={{float:'right'}} onClick={reset}>Go Back</button>
        <div className="note-title"><h3 onClick={editter} id='title' >{note.title}</h3></div>
        <div className="note-category"><h4  onClick={editter} id='category'>{note.category}</h4></div>
        <div className="note-desc" id='tagline' onClick={editter} >{note.tagline}</div>
        <br></br>
        <div onClick={editter} id='note'>{note.note}</div>
      </div>
    )}
    </div>
  )
}

export default Note

// {curr.length !== 0 ? (
//   <div className="note">
//     <div className="note-title"><h3 onClick={editter} id='title' >{note.title}</h3></div>
//     <div className="note-category"><h4  onClick={editter} id='category'>{note.category}</h4></div>
//     <div className="note-desc" id='tagline' onClick={editter} >{note.tagline}</div>
//     <br></br>
//     <div onClick={editter} id='note'>{note.note}</div>
//   </div>
// ) :