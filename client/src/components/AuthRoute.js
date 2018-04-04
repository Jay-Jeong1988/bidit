import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute (props) {
    
    const { isAuthenticated,
        component: Component, currentUser,
        ...restProps  } = props

    return (
        <Route {...restProps} render={ props => isAuthenticated ? 
            <Component {...props} currentUser={currentUser} />
            :
            <Redirect to="/sign_in" />
        }
        />
    )
}

export default AuthRoute;