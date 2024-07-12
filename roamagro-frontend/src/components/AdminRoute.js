// src/components/AdminRoute.js

import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                user && user.is_admin ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
};

export default AdminRoute;
