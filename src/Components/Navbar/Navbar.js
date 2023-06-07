import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-slate-100	lg:px-10">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost normal-case text-xl">Sugar stock</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to='/' className='font-semibold'>Home</Link></li>
                    <li><Link to='/dashboard' className='font-semibold'>Dashboard</Link></li>
                    <li><Link className='font-semibold'>Logout</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;