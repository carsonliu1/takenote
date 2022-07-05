import React from 'react';

class AddNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      category: '',
      tagline: '',
      note: ''
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  changeHandler(e) {
    let key = e.target.name
    let val = e.target.value
    let copy = {...this.state}
    copy[key] = val
    this.setState(copy)
  }

  submitHandler(e) {
    e.preventDefault()
    this.props.post(this.state)
    this.setState({
      title: '',
      category: '',
      tagline: '',
      note: ''
    })
  }

  render() {
    return (
      <div>
        <h1>New Note</h1>
        <form onSubmit={this.submitHandler}>
          Title:
          <br/>
          <input className="note-label" type="text" placeholder="Title" name='title' value={this.state.title} onChange={this.changeHandler}/>
          <br/>
          Category:
          <br/>
          <input className="note-label" type="text" placeholder="Category" name='category' value={this.state.category} onChange={this.changeHandler}/>
          <br/>
          Tagline:
          <br/>
          <input className="note-label" type="text" placeholder="Tagline" name='tagline' value={this.state.tagline} onChange={this.changeHandler}/>
          <br/>
          <input className="note-input" height="700px" type="text" placeholder="Write your note here!" name='note' value={this.state.note} onChange={this.changeHandler}/>
          <br/>
          <button type='submit' className="button">Save</button>
        </form>
      </div>
    )
  }
};

export default AddNote;
