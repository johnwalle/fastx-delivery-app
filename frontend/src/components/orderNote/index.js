import { TextareaAutosize } from '@mui/material';
import React from 'react';

function OrderNote({ note, onNoteChange }) {
    // Handler for changes in the text area
    const handleChange = (e) => {
        onNoteChange(e.target.value);
    };

    return (
        <div>
            <label className="text-white block mt-4">Additional Delivery Instructions</label>
            <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Minimum 3 rows"
                className="w-full mt-2"
                value={note} // Set the value to the note prop
                onChange={handleChange} // Set the handler to update the note state
            />
        </div>
    );
}

export default OrderNote;
