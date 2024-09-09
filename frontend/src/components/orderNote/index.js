import { TextareaAutosize } from '@mui/material'
import React from 'react'

function OrderNote() {
    return (
        <div>
            <label className='text-white block mt-4'>Additional Delivery Instructions</label>
            <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" className='w-full mt-2' />
        </div>
    )
}

export default OrderNote