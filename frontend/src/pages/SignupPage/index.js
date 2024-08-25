import React from 'react'
import register from '../../assets/register.png'
import { Link } from 'react-router-dom';

function SignupPage() {
    return (
        <div>
            <div className='grid pt-14 grid-cols-1 lg:grid-cols-2'>
                <div className='hidden md:hidden lg:flex'>
                    <img src={register} width={100} className='w-full h-screen object-cover' />
                </div>
                <div className='h-screen flex flex-col items-center justify-center mx-10 md:mx-20'>
                    <h2>Sign Up</h2>
                    <form>
                        <label className='text-white'>Full Name:</label>
                        <input type='text' className='w-full mb-5 mt-2' />

                        <label className='text-white'>Email:</label>
                        <input type='email' className='w-full mb-5 mt-2' />

                        {/* <label className='text-white'>Phone</label>
                        <input type='tel' className='w-full mb-5' /> */}

                        <label for="phone" className="block mb-2 text-white">Phone Number:</label>
                        <div className="flex items-center mb-7">
                            <div className="border border-gray-300 rounded-l-md bg-gray-200 text-center w-20 py-2">+251</div>
                            <input type="tel" id="phone" name="phone" className="border border-gray-300 rounded-l-[0px] rounded-r-md py-2 px-3 flex-1" placeholder="Enter your phone number" required />
                        </div>

                        <label className='text-white'>Password:</label>
                        <input type='password' className='w-full mb-5 mt-2' />

                        <label className='text-white'>Confirm Password:</label>
                        <input type='password' className='w-full mb-7 mt-2' />

                        <button className='primary w-full'>Sign Up</button>
                        <div className='text-white flex gap-2 items-center mt-5 justify-end'>Already member?<Link to='/login'><button className='secondary'>SignIn</button></Link></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupPage