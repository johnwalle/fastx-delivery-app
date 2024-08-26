import React from 'react'
import login from '../../assets/login.jpg'
import { Link } from 'react-router-dom';
import LoginForm from '../../components/login';

function LoginPage() {
    return (
        <div>
            <div className='grid pt-0 sm:pt-14 grid-cols-1 lg:grid-cols-2'>
                <div className='hidden md:hidden lg:flex'>
                    <img src={login} width={100} className='w-full h-screen object-cover' />
                </div>
                {/* Login form */}
                <div className='h-screen flex flex-col items-center justify-center mx-10 md:mx-20'>
                    <h2>Log In</h2>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default LoginPage