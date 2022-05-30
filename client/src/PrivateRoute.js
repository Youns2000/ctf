import React, { useState, useEffect, Component } from 'react'
import { authCheck } from "./services/api.js"
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = authCheck()

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/Login', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default PrivateRoute