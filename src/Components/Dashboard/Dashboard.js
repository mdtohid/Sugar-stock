import React from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { useForm } from 'react-hook-form';

const Dashboard = () => {
    const today = new Date();
    const [selected, setSelected] = React.useState();
    console.log(selected);
    // console.log(today);

    let footer = <p className='text-error text-lg my-5'>Please pick a day.</p>;
    let dbDate
    if (selected) {
        footer = <p>You picked {format(selected, 'PP')}.</p>;
        dbDate = format(selected, 'P')
    }
    console.log(dbDate)
    // const defaultMonth = new Date(2023, 6);

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);
    return (
        <div className='flex justify-evenly items-center h-screen'>
            <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                footer={footer}
                className=''
            />

            <div className="card  bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">
                    {
                        selected? format(selected, 'PP'):<span className='text-error'>Please pick day from the calender</span>
                    }
                    </h2>
                    <p className='text-xl mb-5'>Stock the price of sugar</p>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex'>
                        <div>
                            <input
                                className='input input-sm input-bordered w-full max-w-xs"'
                                {...register("stockPrice", { required: true })}
                                aria-invalid={errors.stockPrice ? "true" : "false"}
                            />
                            {errors.stockPrice?.type === 'required' && <p role="alert">Stock price is required</p>}
                        </div>

                        <input className={selected?' btn btn-sm': 'btn-disabled btn btn-sm '} value='Stock price' type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;