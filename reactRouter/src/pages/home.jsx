import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const nav = useNavigate()
    return (
        <div>
            <h1>Welcome to the Home page!</h1>
            {/* Add your content here */}
            <button onClick={()=>{nav('/profile')}}>Test</button>
        </div>
    );
};

export default Home;