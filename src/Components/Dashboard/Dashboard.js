import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { useForm } from 'react-hook-form';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const [selected, setSelected] = React.useState();
    const [user, userLoading, userError] = useAuthState(auth);
    console.log(user.email)

    const { isLoading, error, data: stockData, refetch } = useQuery({
        queryKey: ['stockDetails'],
        queryFn: () =>
            fetch('https://sugar-server-site-mdtohid.vercel.app/stockDetails').then(
                (res) => res.json(),
            ),
    })

    const { register, formState: { errors }, handleSubmit } = useForm();

    if (isLoading) {
        return <Loading></Loading>
    }

    let dbDateP
    let dbDatePP
    let footer = <p className='text-error text-lg my-5'>Please pick a day.</p>;

    if (selected) {
        dbDateP = format(selected, 'P')
        dbDatePP = format(selected, 'PP')
        footer = <p>You picked {format(selected, 'PP')}.</p>;
    }

    const findData = stockData?.find(stock => stock.date == dbDateP);


    const onSubmit = async (data) => {
        const stock = {
            date: dbDateP,
            value: parseInt(data.stockPrice)
        }

        await fetch("https://sugar-server-site-mdtohid.vercel.app/stock", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stock),
        })
            .then(res => res.json())
            .then(data => console.log(data))

        refetch();
    };

    

    const handleMail = async (data) => {
        await fetch(`https://sugar-server-site-mdtohid.vercel.app/sendEmail/${user.email}`, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success("Send message successfully");
            })
    }

    return (
        <div className='flex flex-col items-center gap-y-5 my-5 lg:flex-row lg:justify-evenly lg:gap-0 lg:my-0 h-screen'>
            <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                footer={footer}
                className=''
            />

            {
                findData ?
                    <div className="card bg-base-100 shadow-xl lg:w-96">
                        <div className="card-body">
                            <h2 className="card-title">{dbDatePP}</h2>
                            <p className='text-xl mb-5'>Stock the price of sugar</p>
                            <p className=' text-xl font-semibold'> Price : <span className='text-3xl text-warning font-bold'>{findData?.value}$</span></p>
                            <button onClick={() => handleMail(findData)} className="btn btn-outline btn-accent my-5 font-semibold">Inform Boss</button>
                        </div>
                    </div>
                    :
                    <div className="card  bg-base-100 shadow-xl lg:w-96">
                        <div className="card-body">
                            <h2 className="card-title">
                                {
                                    selected ? format(selected, 'PP') : <span className='text-error'>Please pick day from the calender</span>
                                }
                            </h2>
                            <p className='text-xl mb-5'>Stock the price of sugar</p>

                            <form onSubmit={handleSubmit(onSubmit)} className='flex'>
                                <div>
                                    <input
                                        className='input input-sm input-bordered w-full max-w-xs'
                                        {...register("stockPrice", { required: true })}
                                        aria-invalid={errors.stockPrice ? "true" : "false"}
                                    />
                                    {errors.stockPrice?.type === 'required' && <p role="alert">Stock price is required</p>}
                                </div>

                                <input className={selected ? ' btn btn-sm' : 'btn-disabled btn btn-sm '} value='Stock price' type="submit" />
                            </form>
                        </div>
                    </div>
            }


        </div>
    );
};

export default Dashboard;

