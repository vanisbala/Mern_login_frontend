import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuth} from './helpers'


// This one is working tried from https://ui.dev/react-router-v5-protected-routes-authentication

function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          return isAuth() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location },
              }}
            />
          );
        }}
      />
    );
  }



export default PrivateRoute;



// ****** This doesn't work
// const PrivateRoute = ({component: Component, ...rest}) => (
//     <Route {...rest}
//      render={
//                 props => isAuth() ? (<Component {...props} /> 
//                 ) : (
//                     <Redirect to={{
//                         pathname: '/signin',
//                         state: {from: props.location}
//                     }} /> 
//                 )
//             }
//      > </Route>
// );

