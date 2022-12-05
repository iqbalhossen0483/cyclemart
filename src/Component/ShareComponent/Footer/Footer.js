import React from 'react';

const Footer = () => {
    return (
        <div className="bg-green-400 py-5 px-3 md:grid grid-cols-3">
            <div className="text-px">
                <h2 className="text-2xl font-semibold md:ml-3 mb-5">Contact Info</h2>
                <div>
                    <p><span className="font-bold text-px">PHONE:</span> Toll Free (123) 456-7890</p>
                    <p><span className="font-bold text-px">EMAIL:</span> mail@cycle-mart.com</p>
                    <p><span className="font-bold text-px">ADDRESS:</span> 123 Street, Dhaka, Bangladesh</p>
                    <p><span className="font-bold text-px">WORKING DAYS / HOURS:</span> Mon - Sun / 9.00 AM - 8.00 PM</p>
                </div>
            </div>
            <div className="font-semibold my-5 md:my-0">
                <h2 className="text-2xl font-semibold md:ml-3 mb-5">My Account</h2>
                <p>About Us</p>
                <p>Order History</p>
                <p>Returns</p>
                <p>Customer Services</p>
                <p>Terms & Conditions</p>
            </div>
            <div className="text-3xl leading-10">
                <h2 className="text-2xl font-semibold md:ml-3 mb-5">Get in touch</h2>
                <a href="https://web.facebook.com/profile.php?id=100009923686402">
                    <i className="fab mx-3 hover:text-blue-500 fa-facebook-square"></i>
                </a>
                <i className="fab mx-3 hover:text-blue-500 fa-instagram"></i>
                <i className="fab mx-3 hover:text-blue-500 fa-youtube"></i>
                <i className="fas mx-3 hover:text-blue-500 fa-link"></i>
            </div>
        </div>
    );
};

export default Footer;