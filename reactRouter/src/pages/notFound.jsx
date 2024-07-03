import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>This is not the page you are looking for</p>
            <NavLink to="/">I'm afraid take me back!</NavLink>
        </div>
    );
};

export default NotFound;