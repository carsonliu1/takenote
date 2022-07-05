import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.searchHandler = this.searchHandler.bind(this)
  }

  changeHandler(e) {
    this.setState({query: e.target.value})
  }

  searchHandler(e) {
    e.preventDefault()
    this.props.searchQuery(this.state.query)
    this.setState({query: ''})
  }

  render() {
    return (
      <div>
        <input type='text' name='query' value={this.state.query} onChange={this.changeHandler} placeholder='Search by category...'></input>
        <button onClick={this.searchHandler}>Submit</button>
      </div>
    )
  }
}

export default Search