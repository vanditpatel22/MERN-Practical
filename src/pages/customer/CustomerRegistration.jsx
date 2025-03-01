import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";

import * as Common from '../../common/common';
import { registrationUser } from "../../store/slice/auth_slice";

const CustomerRegistration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required('Please enter your first name'),
        last_name: Yup.string().required('Please enter your last name'),
        email: Yup.string()
            .email('Please write proper email address')
            .required('Please enter your email'),
        password: Yup.string()
            .required('Please enter your password')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = (data) => {

        try {

            const params = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
                role:'Customer'
            }

            dispatch(registrationUser(params)).then((res) => {
                const response = res.payload;
                if (response?.code === 1) {

                    Common.SuccessAlert(response.message);
                    navigate("/customer-login");

                } else {

                    Common.ErrorAlert(response?.message ?? 'Oops! Something went wrong');
                }
            });
        } catch (error) {
            Common.ErrorAlert(error);
            console.error('Error in login:', error);
        }
    }

    return (

        <div className='loading authentication-bg authentication-bg-pattern'>
            <div className="account-pages mb-5">
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col-md-8 col-lg-6 col-xl-4 mt-7">
                            <div className="card bg-pattern">

                                <div className="card-body p-4">

                                    <div className="text-center w-100 m-auto">
                                        <div className="auth-logo">
                                            <Link className="logo logo-dark text-center">
                                                <h2 className='m-0'>Customer Registration</h2>
                                            </Link>
                                        </div>
                                        <p className="text-muted mb-4 mt-3">Enter your details for customer registration.</p>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className="mb-3">
                                            <label htmlFor="first_name" className="form-label">First Name</label>
                                            <input className="form-control" type="text" id="first_name" required="" placeholder="Enter your first name" {...register('first_name')} />
                                            <span className="validation_error">{errors.first_name?.message}</span>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="last_name" className="form-label">Last Name</label>
                                            <input className="form-control" type="text" id="last_name" required="" placeholder="Enter your last name" {...register('last_name')} />
                                            <span className="validation_error">{errors.last_name?.message}</span>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="emailaddress" className="form-label">Email address</label>
                                            <input className="form-control" type="email" id="emailaddress" required="" placeholder="Enter your email" {...register('email')} />
                                            <span className="validation_error">{errors.email?.message}</span>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <div className="input-group input-group-merge">
                                                <input type={showPassword ? 'text' : 'password'} id="password" className="form-control" placeholder="Enter your password" {...register('password')} />
                                                <button type='button' className={`input-group-text ${showPassword ? 'show-password' : ''}`} data-password={showPassword} onClick={() => setShowPassword(!showPassword)}>
                                                    <span className="password-eye"></span>
                                                </button>
                                            </div>
                                            <span className="validation_error">{errors.password?.message}</span>
                                        </div>

                                        <div className="text-center d-grid">
                                            <button className="btn btn-custom waves-effect waves-light" type="submit">Submit</button>
                                        </div>

                                    </form>
                                </div>
                                {/* <!-- end card-body --> */}
                            </div>
                            {/* <!-- end card --> */}
                        </div>
                        {/* <!-- end col --> */}
                    </div>
                    {/* <!-- end row --> */}
                </div>
                {/* <!-- end container --> */}
            </div>
            {/* <!-- end page --> */}
        </div>

    )
}

export default CustomerRegistration
