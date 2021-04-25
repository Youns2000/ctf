function PrivateRoute({ children, ...rest }) {
    return (
        <Route {...rest} render={({ location }) => {
            return auth.isAuthenticated === false
                ? children
                : <Redirect to={{
                    pathname: '/Log',
                    state: { from: location }
                }} />
        }} />
    )
}