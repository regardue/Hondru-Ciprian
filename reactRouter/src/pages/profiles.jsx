import React from "react";
import { useParams } from "react-router-dom";


const Profiles = () => {

    let params = useParams();

    return(
        <div>
            <h1>Profile for User</h1>
            <p>My user Indentifier is : {params.userId}</p>
            {/* {add your content here} */}
        </div>
    );
};

export default Profiles;