import { useState } from 'react';
import MyOrder from '../../components/myOrder';
import OrderNote from '../../components/orderNote';
import Location from '../../components/location';
import useCheckout from '../../hooks/useCheckout';

function CheckoutPage() {
    // State to hold the value of the text area in OrderNote
    const [note, setNote] = useState('');
    const [location, setLocation] = useState('');
    const [specifics, setSpecifics] = useState('');

    // Handler function to update the note value
    const handleNoteChange = (value) => {
        setNote(value);
    };

    // Custom hook to manage checkout process
    const { checkout, isLoading, error } = useCheckout();

    // Function to handle checkout button click
    const handleCheckout = () => {
        console.log('note:', note);
        checkout(note, location, specifics); // Pass the note to the checkout function if needed
    };

    return (
        <div className="pl-4 pr-4 pt-14 pb-5 lg:pl-80 lg:pr-60 lg:pt-24 lg:pb-5">
            <div className="py-14">
                <Location 
                location={location} 
                setLocation={setLocation}
                specifics={specifics} 
                setSpecifics={setSpecifics}
                />
            </div>
            <div className="grid md:grid-cols-4 items-end gap-4 grid-cols-1">
                <div className="col-span-3">
                    <MyOrder />
                </div>
                <div className="col-span-1">
                    <OrderNote note={note} onNoteChange={handleNoteChange} />
                </div>
            </div>

            <hr className="mt-7" />
            <div className="quick-tips p-5 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-3">Quick Tips</h2>
                <ul className="list-disc pl-5 text-white">
                    <li className="mb-2">
                        <strong>Double-check your delivery address</strong> — Make sure your address is correct to avoid any delays in delivery.
                    </li>
                    <li className="mb-2">
                        <strong>Review your cart items</strong> — Ensure all items are correct before placing your order, including quantities and special instructions.
                    </li>
                    <li className="mb-2">
                        <strong>Watch out for delivery fees</strong> — Take note of the delivery fee, especially for long distances, and confirm before placing your order.
                    </li>
                    <li className="mb-2">
                        <strong>Review the grand total</strong> — Review the grand total, including taxes and delivery charges, to avoid any surprises.
                    </li>
                </ul>
            </div>

            {/* Error Display */}
            {error && (
                <div className="error-message text-red-500 mt-4">
                    <p>Error: {error}</p>
                </div>
            )}

            <div className="w-full mt-5">
                <button
                    className={`primary w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    onClick={handleCheckout}
                    disabled={isLoading} // Disable button when loading
                >
                    {isLoading ? 'Checking...' : 'Checkout and confirm your order'}
                </button>
            </div>
        </div>
    );
}

export default CheckoutPage;
