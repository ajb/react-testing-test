import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import $ from 'jquery'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

class Async extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ipAddress: false
    }

    $.getJSON('https://jsonip.com/', (data) => {
      this.setState({ipAddress: data.ip})
    })
  }

  render() {
    return (
      <div>
        {this.state.ipAddress ? `Your IP address is: ${this.state.ipAddress}` : 'Loading...'}
      </div>
    )
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Adam',
      submitted: false
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value, submitted: false});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({submitted: true});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.name} type="text" onChange={this.handleNameChange} />
          <button>Submit</button>
        </form>

        {
          this.state.submitted &&
          <h2>Hello, {this.state.name}!</h2>
        }
      </div>
    )
  }
}

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/async">Async</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/form">Form</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/async" component={Async}/>
      <Route path="/about" component={About}/>
      <Route path="/form" component={Form}/>
    </div>
  </Router>
)

export default App
