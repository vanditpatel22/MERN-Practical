import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { useCookies } from 'react-cookie';
import * as Common from '../../common/common'
import { userLogin } from "../../store/slice/auth_slice";

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Please write proper email address')
            .required('Please enter your email'),
        password: Yup.string()
            .required('Please enter your password')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [cookies, setCookie, removeCookie] = useCookies(['remember_email', 'remember_pwd', 'remember_me']);

    //For checked in remember me 
    useEffect(() => {

        if (cookies.remember_me !== undefined) {
            setIsChecked(true);
        }
    }, [cookies.remember_me]);

    const onSubmit = (data) => {

        try {

            const params = {
                email: data.email,
                password: data.password,
            }

            dispatch(
                userLogin(params)
            ).then((res) => {

                const response = res.payload;

                if (response?.code === 1) {

                    //for set or unset cookies
                    (data.rememberme || cookies?.remember_me) ? setRememberMeCookies(data) : removeRememberMeCookies();

                    // Show success alert
                    Common.SuccessAlert(response.message);

                    navigate("/dashboard");
                } else {
                    Common.ErrorAlert(response?.message ?? 'Oops! Something went wrong');
                }
            });
        } catch (error) {
            Common.ErrorAlert(error);
            console.error('Error in login:', error);
        }
    };

    //To handle set RememberMe Cookies
    function setRememberMeCookies(data) {
        setCookie('remember_email', data.email, { maxAge: 86400 });
        setCookie('remember_pwd', data.password, { maxAge: 86400 });
        setCookie('remember_me', data.rememberme, { maxAge: 86400 });
    }

    //To handle remove RememberMe Cookies
    function removeRememberMeCookies() {

        removeCookie('remember_email');
        removeCookie('remember_pwd');
        removeCookie('remember_me');
    }


    //To handle checkbox check and unchecked event
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

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
                                               
                                                <h2 className='m-0'>Admin Login</h2>
                                            </Link>
                                        </div>
                                        <p className="text-muted mb-4 mt-3">Enter your email address and password to access.</p>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className="mb-3">
                                            <label htmlFor="emailaddress" className="form-label">Email address</label>
                                            <input className="form-control" type="email" id="emailaddress" required="" defaultValue={cookies.remember_email} placeholder="Enter your email" {...register('email')} />
                                            <span className="validation_error">{errors.email?.message}</span>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <div className="input-group input-group-merge">
                                                <input type={showPassword ? 'text' : 'password'} id="password" className="form-control" defaultValue={cookies.remember_pwd} placeholder="Enter your password" {...register('password')} />
                                                <button type='button' className={`input-group-text ${showPassword ? 'show-password' : ''}`} data-password={showPassword} onClick={() => setShowPassword(!showPassword)}>
                                                    <span className="password-eye"></span>
                                                </button>
                                            </div>
                                            <span className="validation_error">{errors.password?.message}</span>
                                        </div>

                                        <div className="mb-3">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" name="rememberme" id="rememberme" checked={isChecked} onClick={handleCheckboxChange} {...register('rememberme')} />
                                                <label className="form-check-label" htmlFor="checkbox-signin">Remember me</label>
                                            </div>
                                        </div>

                                        <div className="text-center d-grid">
                                            <button className="btn btn-custom waves-effect waves-light" type="submit">Log In</button>
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

export default AdminLogin;
