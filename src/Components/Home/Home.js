import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'
const Home = () => {
    return (
        <div className='bgImg flex flex-col justify-center items-center'>
            <h1 className='text-5xl font-semibold text-center text-[#fcfafa]'>Welcome to our <br /><span className='text-[#c026d3]'>Sugar stock market</span></h1>
            <Link to='/dashboard' className="btn btn-warning my-5 text-md">Dashboard</Link>
        </div>
    );
};

export default Home;