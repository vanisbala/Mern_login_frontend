import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuth} from './helpers'


// This one is working tried from https://ui.dev/react-router-v5-protected-routes-authentication

function AdminRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          return isAuth() && isAuth().role === "admin" ? (
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



export default AdminRoute;

