import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute (props) {
    
    const { isAuthenticated,
        component: Component, user,
        ...restProps  } = props

    return (
        <Route {...restProps} render={ props => isAuthenticated ? 
            <Component {...props} user={user} />
            :
            <Redirect to="/sign_in" />
        }
        />
    )
}

export default AuthRoute;