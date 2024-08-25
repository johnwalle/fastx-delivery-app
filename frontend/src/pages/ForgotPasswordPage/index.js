import React from 'react'

function ForgotPasswordPage() {
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='bg-[#252525] p-10 flex flex-col items-center gap-5'>
                <h3>Forgot  Password</h3>
                <div className='flex flex-col items-center'>
                    <p className='text-sm text-red-200'>Enter your email address and we'll </p>
                    <p className='text-sm text-red-200'>send you a link to reset your password.</p>
                </div>
                <form>
                    <label className='text-white'>Email</label>
                    <input type='email' className='w-full mb-5' />
                    <button className='primary w-full'>Send Email</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPasswordPage