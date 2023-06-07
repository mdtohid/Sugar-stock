import React from 'react';
import './Home.css'
const Home = () => {
    return (
        <div className='bgImg flex flex-col justify-center items-center'>
            <h1 className='text-5xl font-semibold text-center text-[#fcfafa]'>Welcome to our <br /><span className='text-[#c026d3]'>Sugar stock market</span></h1>
            <button className="btn btn-warning my-5 text-md">Dashboard</button>
        </div>
    );
};

export default Home;