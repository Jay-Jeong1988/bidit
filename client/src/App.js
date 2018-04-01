import React, { Component } from 'react';
import { BrowserRouter as Router,
        Switch, Route, Redirect } from 'react-router-dom';
import RootPage from './components/pages/RootPage';
import NavBar from './components/NavBar';
import SigninPage from './components/pages/SigninPage';
import jwtDecode from 'jwt-decode';
import AuthRoute from './components/AuthRoute';
// import AuthRoute from './components/AuthRoute';

class App extends Component {
  constructor(props) {
    super(props);

    this.saveUser = this.saveUser.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.isSignedIn = this.isSignedIn.bind(this);
    this.state = {
      user: null
    }
  }

  componentWillMount(){
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

  isSignedIn() {
    return !!this.state.user
  }

  onSignOut(event) {
    event.preventDefault();
    this.setState({
      user: null
    })
    localStorage.removeItem('jwt');
    
  }

  render() {
    const {user} = this.state;
    return (
      <Router>
        <div className="App">
          <NavBar user={user} signOut={this.onSignOut}/>
          <Switch>
            <AuthRoute exact path='/' component={RootPage} isAuthenticated={this.isSignedIn()} />
            <Route path='/sign_in' 
            render={ props => <SigninPage 
              {...props}
              onSignIn={this.saveUser}
              /> 
            }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
