import React from 'react'
import register from '../../assets/register.jpg'
import SignupForm from '../../components/signup';

function SignupPage() {
    return (
        <div>
            <div className='grid pt-14 grid-cols-1 lg:grid-cols-2'>
                <div className='hidden md:hidden lg:flex'>
                    <img src={register} className='w-full h-auto object-cover' />
                </div>
                <div className='h-screen -pt-20 sm:pt-24 flex flex-col items-center justify-center mx-10 md:mx-20'>
                    <h2>Sign Up</h2>
                    <SignupForm />
                </div>
            </div>
        </div>
    )
}

export default SignupPage