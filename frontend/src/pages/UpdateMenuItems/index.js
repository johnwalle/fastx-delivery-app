import React from 'react'
import UpdateMenu from '../../components/updateMenu';
import { useParams } from 'react-router-dom';
function UpdateMenuItems() {

    const { menuItemId } = useParams();

    return (
        <div className='pt-24 pb-7'>
            <div className="max-w-3xl mx-auto p-6 py-10 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl text-[#A40C0C] tes font-bold mb-4">Update Menu Items</h1>
                <UpdateMenu menuItemId={menuItemId} />
            </div>
        </div>
    )
}

export default UpdateMenuItems