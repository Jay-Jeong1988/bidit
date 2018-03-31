import React, { Component } from 'react';
import { BrowserRouter as Router,
        Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import SigninPage from './components/pages/SigninPage';
import jwtDecode from 'jwt-decode';

class App extends Component {
  constructor(props) {
    super(props);

    this.saveUser = this.saveUser.bind(this);
    this.state = {
      user: null
    }
  }

  componentDidMount(){
      this.saveUser();
  }

  saveUser(){
    const jwt = localStorage.getItem('jwt');
    if(jwt){
      const payload = jwtDecode(jwt);
      this.setState({
        user: payload
      })
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path='/sign_in' 
            render={ props => <SigninPage {...props} onSignIn={this.saveUser}/> }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
