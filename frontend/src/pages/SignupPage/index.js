import React from 'react'
import register from '../../assets/register.png'

function SignupPage() {
    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className='hidden md:hidden lg:flex'>
                    <img src={register} width={100} className='w-full h-screen object-cover' />
                </div>
                <div className='h-screen flex flex-col items-center justify-center mx-10 md:mx-20'>
                    <h2>Sign Up</h2>
                    <form>
                        <label className='text-white'>Full Name</label>
                        <input type='text' className='w-full mb-5' />

                        <label className='text-white'>Email</label>
                        <input type='email' className='w-full mb-5' />

                        <label className='text-white'>Phone</label>
                        <input type='number' className='w-full mb-5' />

                        <label className='text-white'>Password</label>
                        <input type='password' className='w-full mb-5' />

                        <label className='text-white'>Confirm Password</label>
                        <input type='password' className='w-full mb-7' />

                        <button className='primary w-1/2 mx-16 md:mx-36'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupPage