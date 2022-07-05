import React from 'react';
import axios from 'axios'
import Notes from './components/Notes.jsx';
import AddNote from './components/AddNote.jsx'
import Search from './components/Search.jsx'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: 'list',
      notes: [],
      currNote: '',
      query: '',
      hidden: true
    };
    this.clickHandler = this.clickHandler.bind(this)
    this.editHandler = this.editHandler.bind(this)
    this.statusHandler = this.statusHandler.bind(this)
    this.postHandler = this.postHandler.bind(this)
    this.searchQuery = this.searchQuery.bind(this)
    this.resetQuery = this.resetQuery.bind(this)
    this.hiddenHandler = this.hiddenHandler.bind(this)
  }

  componentDidMount() {
    axios.get('/api/notes')
      .then(res => this.setState({notes: res.data}))
  }

  resetQuery() {
    this.setState({currNote: '', query: ''})
  }

  editHandler(id, key, value) {
    let copy = this.state.notes.map(note => {
      if(note.id === id) {
        note[key] = value
      }
      return note
    })
    this.setState({notes: copy})
  }

  postHandler(obj) {
    axios.post('/api/notes', obj)
      .then(res => this.setState({notes: res.data}))
      .catch(err => alert(err))
  }

  hiddenHandler(e) {
    if(e.target.checked) {
      this.setState({hidden: false})
    } else {
      this.setState({hidden: true})
    }
  }

  searchQuery(query) {
    this.setState({query})
  }

  changePage(page){
    this.setState({
      page: page
    })
  }

  pageRouter(results){
    if(this.state.page === 'list'){
      return <Notes notes={results} clicker={this.clickHandler} curr={this.state.currNote} edit={this.editHandler} status={this.statusHandler} reset={this.resetQuery}/>
    } else if (this.state.page === 'newNote'){
      return <AddNote post={this.postHandler}/>
    }
  }

  clickHandler(id) {
    this.setState({currNote: id})
  }

  statusHandler(type, id) {
    axios.patch('/api/notes/' + id, {
      status: type
    }).then(res => this.setState({notes: res.data}))
      .catch(err => alert(err))
  }

  render() {
    let results = []
    for(const note of this.state.notes) {
      if(note.category.toLowerCase().includes(this.state.query.toLowerCase())) {
        results.push(note)
      }
    }
    let hasStatus = []
    let none = []
    if(this.state.hidden) {
      for(const note of results) {
        if(note.status === 'Starred') {
          hasStatus.push(note)
        } else if(note.status === 'None') {
          none.push(note)
        }
      }
    } else {
      hasStatus = results
    }
    let renderResults = hasStatus.concat(none)

    return(
      <div>
        <div className="navbar">
          <div className="nav">
          <span className="title"
            onClick={() => {
              this.resetQuery()
              this.changePage('list')
              }}>
            Take Note!
          </span>
          <span className={this.state.page === 'list'
            ? 'nav-entry-selected button'
            : 'nav-entry-unselected button'}
            onClick={() => {this.changePage('list')}}>
            All Notes
          </span>
          <span className={this.state.page === 'newNote'
            ? 'nav-entry-selected button'
            : 'nav-entry-unselected button'}
            onClick={() => {this.changePage('newNote')}}>
            New Note
          </span>
          </div>
        </div>
        <div className="content">
          <Search searchQuery={this.searchQuery}/>
          <input type='checkbox' name='hidden' value={this.state.hidden} onChange={this.hiddenHandler}/><label>Show Hidden</label>
          {this.pageRouter(renderResults)}
        </div>

      </div>
    )
  }
}

export default App;
