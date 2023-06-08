import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { signOut } from "firebase/auth";

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/login');
    }

    const navbarOption = <>
        <li><Link to='/' className='font-semibold'>Home</Link></li>
        <li><Link to='/dashboard' className='font-semibold'>Dashboard</Link></li>
        <li>
            {user ?
                <Link className='font-semibold' onClick={handleSignOut}>Logout</Link>
                :
                <Link to='/login' className='font-semibold'>Login</Link>
            }
        </li>
    </>
    return (
        <div className="navbar bg-slate-100	lg:px-10 sticky top-0 z-10">
            <div className="flex-1">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navbarOption}
                    </ul>
                </div>

                <Link to='/' className="btn btn-ghost normal-case text-xl">Sugar stock</Link>
            </div>
            <div className="navbar-end hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                    {navbarOption}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;