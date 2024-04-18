import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...routeProps }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    if (!loading && isAuthenticated === false) {
        console.log("Auto", isAuthenticated);
        return <Navigate to="/login" />;
    }
    return (
        <Fragment>
            {loading === false ? (
                <Component {...routeProps} />
            ) : null}
        </Fragment>
    );
};

export default ProtectedRoute;
