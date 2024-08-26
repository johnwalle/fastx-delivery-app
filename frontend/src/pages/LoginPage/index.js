import React from 'react'
import login from '../../assets/login.png'

function LoginPage() {
    return (
        <div>
            <div className='grid pt-14 grid-cols-1 lg:grid-cols-2'>
                <div className='hidden md:hidden lg:flex'>
                    <img src={login} width={100} className='w-full h-screen object-cover' />
                </div>
                {/* Login form */}
                <div className='h-screen flex flex-col items-center justify-center mx-10 md:mx-20'>
                    <h2>Log In</h2>
                    <form>
                        <label className='text-white'>Email</label>
                        <input type='email' className='w-full mb-5' />

                        <label className='text-white'>Password</label>
                        <input type='password' className='w-full mb-10' />

                        <button className='primary w-1/2 md:mx-36 mx-16'>Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage