import React, {Component} from 'react';
import { Token } from '../../lib/requests';

class SigninPage extends Component {

    constructor (props) {
        super(props);
        this.signin = this.signin.bind(this);
        this.state = {
            errors: []
        }
    }

    signin(event) {
        event.preventDefault();
        const { currentTarget } = event
        const formData = new FormData(currentTarget)
        const email = formData.get('e-mail')
        const password = formData.get('password')
        Token.create({ email: email, password: password })
        .then( data => {
            
            if(!data.errors){
                localStorage.setItem('jwt', data.jwt);
                this.props.onSignIn();
                this.props.history.push('/');
            }else{
                this.setState({
                    errors: data.errors
                })
            }
        })
    }
    render(){
        const { errors } = this.state;
        return (
            <div style={{textAlign:'center'}} className="SigninPage">
            <div className='errorContainer'>
                {    
                    errors.map( (e, i) => <h4 key={i}>{e.type}</h4> )
                }   
            </div>
                <div className="flexContainer">
                    <form onSubmit={this.signin}>
                        <div>
                        <label htmlFor="email">email</label>
                        <input id="email" name="e-mail" type="email"/>
                        </div>
                        <div>
                        <label htmlFor="password">password</label>
                        <input id="password" name="password" type="password"/>
                        </div>
                        <input type="submit" value="Sign In"/>
                    </form>
                </div>
            </div>
        )
    }
} 

export default SigninPage;