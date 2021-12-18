import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Route, Redirect } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';

const EditorRoute = ({ children, ...rest }) => {
    const { user, editor, isLoading } = useAuth();
    if (isLoading) { return <Spinner animation="border" variant="danger" /> }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email && editor ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/dashboard",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default EditorRoute;