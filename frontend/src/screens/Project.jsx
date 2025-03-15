import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

const Project = ({navigate}) => {
    const location = useLocation();
    console.log(location.state);
    return (
        <div>
            <h1>Project Screen</h1>
        </div>
    );
};

export default Project;