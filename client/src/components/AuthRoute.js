import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute (props) {
    
    const { isAuthenticated, 
        component: Component,
        ...restProps  } = props
        console.log(isAuthenticated)
    return (
        <Route {...restProps} render={ props => isAuthenticated ? 
            <Component {...props} />
            :
            <Redirect to="sign_in" />
        }
        />
    )
}

export default AuthRoute;