import React from "react";

const Footer = () => {
  return (
    <div className='bg-primary text-darkWhite py-5 pl-5 md:grid gap-5 grid-cols-3'>
      <div className='text-px'>
        <h2 className='text-lg font-medium mb-5'>Contact Info</h2>
        <div className='text-sm space-y-1'>
          <p>
            <span className='font-medium'>PHONE:</span> Toll Free (123) 456-7890
          </p>
          <p>
            <span className='font-medium'>EMAIL:</span> mail@cycle-mart.com
          </p>
          <p>
            <span className='font-medium'>ADDRESS:</span> 123 Street, Dhaka,
            Bangladesh
          </p>
          <p>
            <span className='font-medium'>WORKING DAYS / HOURS:</span> Mon - Sun
            / 9.00 AM - 8.00 PM
          </p>
        </div>
      </div>
      <div className='my-5 md:my-0'>
        <h2 className='font-medium mb-5'>My Account</h2>
        <p className='cursor-pointer'>About Us</p>
        <p className='cursor-pointer'>Order History</p>
        <p className='cursor-pointer'>Returns</p>
        <p className='cursor-pointer'>Customer Services</p>
        <p className='cursor-pointer'>Terms & Conditions</p>
      </div>
      <div>
        <h2 className='text-lg font-medium mb-5'>Get in touch</h2>
        <div className='space-x-3 text-xl'>
          <a
            href='https://web.facebook.com/profile.php?id=100009923686402'
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-facebook-square text-[#1873eb]' />
          </a>
          <i className='fab fa-instagram text-[#f604a6]'></i>
          <i className='fab fa-youtube text-[#fe0000]'></i>
          <i className='fas fa-link text-yellow-700'></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
