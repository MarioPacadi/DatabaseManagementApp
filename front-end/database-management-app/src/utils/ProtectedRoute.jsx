import React from "react";
import {Navigate, Route} from "react-router-dom";
import {getToken} from "./utils";

class ProtectedRoute extends Route {
    render() {
        const { element: Component, ...rest } = this.props;
        const isAuthenticated = getToken();

        return (
            <Route
                {...rest}
                element={
                    isAuthenticated ? (
                        <Component />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
        );
    }
}

export default ProtectedRoute;