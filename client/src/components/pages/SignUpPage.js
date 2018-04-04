import React, {Component} from 'react';
import { Token, User } from '../../lib/requests';

class SignUpPage extends Component {

    constructor(props) {
        super(props);

        this.createUser = this.createUser.bind(this);
        
    }

    createUser(event){
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const newUser = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            password: formData.get('password'),
            password_confirmation: formData.get('password_confirmation')
        }

        User.create(newUser).then( res => {
            if(!res.errors){
                Token.create({ email: res.email, password: newUser.password })
                .then( res => {
                    localStorage.setItem('jwt', res.jwt)
                    this.props.onSignUp()
                    this.props.history.push('/')
                })              
            }
        })
    }

    render() {

        return (

            <div className="SignUpPage">
                <form onSubmit={this.createUser}>
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <input id="first_name" name="first_name" />
                    </div>

                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <input id="last_name" name="last_name"/>
                    </div>

                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name="email" id="email"/>
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type='password' id='password' name='password'/>
                    </div>

                    <div>
                        <label htmlFor="password_confirmation">Password Confirmation</label>
                        <input type="password" id="password_confirmation" name="password_confirmation"/>
                    </div>

                    <input type='submit' value="Sign Up"/>
                </form>
            </div>

        )
    }
}

export default SignUpPage;