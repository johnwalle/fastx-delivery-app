import React from 'react'
import { Link } from 'react-router-dom'

function LoginForm() {
    return (
        <div>
            <form>
                <label className='text-white'>Email</label>
                <input type='email' className='w-full mb-5' required />

                <label className='text-white'>Password</label>
                <input type='password' className='w-full mb-10' required />

                <button className='primary w-full'>Sign In</button>
                <div className='mt-5 flex flex-col sm:flex-row items-center justify-between'>
                    <Link to='/forgot'><button className='secondary my-4'>Forgot Password</button></Link>
                    <div className='text-white flex gap-2 items-center'>Not member?<Link to='/signup'><button className='secondary'>SignUp</button></Link></div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm