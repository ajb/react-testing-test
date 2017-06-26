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

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

class AsyncPage extends Component {
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

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/async">Async</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
        <li><Link to="/form">The greatest form</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/async" component={AsyncPage}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
      <Route path="/form" component={Form}/>
    </div>
  </Router>
)
export default BasicExample
