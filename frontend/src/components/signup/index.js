import React from 'react'
import { Link } from 'react-router-dom';

function SignupForm() {
    return (
        <div>
            <form>
                <label className='text-white'>Full Name:</label>
                <input type='text' className='w-full mb-5 mt-2' required />

                <label className='text-white'>Email:</label>
                <input type='email' className='w-full mb-5 mt-2' required />

                {/* <label className='text-white'>Phone</label>
                        <input type='tel' className='w-full mb-5' /> */}

                <label for="phone" className="block mb-2 text-white">Phone Number:</label>
                <div className="flex items-center mb-7">
                    <div className="border border-gray-300 rounded-l-md bg-gray-200 text-center w-20 py-2">+251</div>
                    <input type="tel" id="phone" name="phone" className="border border-gray-300 rounded-l-[0px] rounded-r-md py-2 px-3 flex-1" placeholder="Enter your phone number" required />
                </div>

                <label className='text-white'>Password:</label>
                <input type='password' className='w-full mb-5 mt-2' required />

                <label className='text-white'>Confirm Password:</label>
                <input type='password' className='w-full mb-7 mt-2' required />

                <button className='primary w-full'>Sign Up</button>
                <div className='text-white flex gap-2 items-center mt-5 justify-end'>Already member?<Link to='/login'><button className='secondary'>SignIn</button></Link></div>
            </form>
        </div>
    )
}

export default SignupForm