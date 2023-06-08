import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';
import google from '../../image/google.ico';

const Signup = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, error1] = useUpdateProfile(auth);

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        const name = data.name;
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
    };

    useEffect(() => {
        if (user||gUser) {
            navigate('/');
        }
    }, [user,gUser, reset, navigate]);

    if (loading || updating || gLoading) {
        return <Loading></Loading>
    }

    return (
        <form className='flex flex-col gap-9 items-center justify-center w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-8/12 md:w-4/12 mt-14'>
                <h1 className='text-2xl text-blue-400'>Sugar stock</h1>
                <p className='text-lg'>Welcome to! Signup first</p>
            </div>
            <div className='w-8/12 md:w-4/12'>
                <input className='input input-bordered w-full'
                    type='text'
                    placeholder='Enter your name'
                    {...register("name", { required: true })}
                    aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name?.type === 'required' && <p role="alert"> Name is required</p>}
            </div>

            <div className='w-8/12 md:w-4/12'>
                <input className='input input-bordered w-full'
                    type='email'
                    placeholder='Enter your email'
                    {...register("email", { required: "Email Address is required" })}
                    aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p role="alert">{errors.email?.message}</p>}
            </div>

            <div className='w-8/12 md:w-4/12'>
                <input className='input input-bordered w-full'
                    type='password'
                    placeholder='Enter your password'
                    {...register("password", { required: "Password must be required" })}
                    aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && <p role="alert">{errors.password?.message}</p>}
            </div>

            <div className='w-8/12 md:w-4/12'>
                <input type="submit" value='Signup' className='btn btn-outline w-full' />
                <p><Link to='/login'>Already have a account?</Link></p>
            </div>

            <div className="divider w-8/12 md:w-4/12 mx-auto">OR</div>

            <button className='w-8/12 md:w-4/12 flex items-center justify-center bg-cyan-100 px-2 py-1 rounded-lg gap-4' onClick={async() => await signInWithGoogle()}>
                <img className='w-7' src={google} alt="" srcset="" />
                <p className='text-center text-sm'>Sign in <br /> with google</p>
            </button>
        </form>
    );
};

export default Signup;