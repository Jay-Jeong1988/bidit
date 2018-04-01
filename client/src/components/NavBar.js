import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar (props) {
    
    const {signOut} = props
    const {user} = props
    return (
        
        <nav className="NavBar">
           { user ? (
                [
                    <NavLink key={1} exact to="/">Home</NavLink>,
                    <NavLink key={2} exact to='/auctions'>Auctions</NavLink>,
                    <NavLink key={3} exact to="/auctions/new">New Auction</NavLink>,
                    <NavLink key={4} exact to="/" onClick={signOut}>Sign Out</NavLink>
                ]
                ) : (
                [
                    <NavLink key={1} exact to="/sign_in">Sign In</NavLink>,
                    <NavLink key={2} exact to="/sign_up">Sign Up</NavLink>
                ] 
                )
            }
        </nav>
        
    )
 
}

export default NavBar;