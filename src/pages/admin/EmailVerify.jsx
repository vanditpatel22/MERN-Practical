import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { useDispatch } from "react-redux";

import * as Common from '../../common/common';
import { userEmailVerify } from "../../store/slice/auth_slice";

const EmailVerify = () => {

    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {

        if (id !== undefined) {

            try {

                dispatch(
                    userEmailVerify({ user_id: atob(id) })
                ).then((res) => {

                    const response = res.payload;

                    if (response?.code === 1) {

                        Common.SuccessAlert(response?.message);

                    } else {

                        Common.ErrorAlert(response?.message ?? 'Oops! Something went wrong');

                        console.error('Payload got undefined');
                    }
                });
            } catch (error) {
                Common.ErrorAlert(error);
            }
        }

    }, [id]);

    return (

        <div className='loading authentication-bg authentication-bg-pattern'>
            <div className="account-pages mb-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-4 mt-7">
                            <div className="card bg-pattern">

                                <div className="card-body p-4">

                                    <div className="text-center w-100 m-auto">
                                        <div className="auth-logo">
                                            <span className="logo logo-dark text-center">

                                                <h2 className='m-0'>Email Verified</h2>
                                                <p>Your email has been successfully verified.</p>
                                            </span>
                                        </div>

                                    </div>

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

export default EmailVerify;
