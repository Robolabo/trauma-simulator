import React from "react";
import { Redirect, Route } from "react-router";
import { getToken } from "./Common";


const PrivateRoute = ({component: Component, ...rest }) => {
    return(
        <Route
            {...rest}
            render={ props => {
               return getToken() ? <Component {...props}/>
                : <Redirect to={{ pathname: "/", state: { from: props.location}}} />
            }}
        />
    )
}

export default PrivateRoute;