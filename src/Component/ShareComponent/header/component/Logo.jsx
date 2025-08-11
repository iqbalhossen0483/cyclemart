import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className='logo-wapper'>
      <img
        className='w-10 h-10'
        src='https://i.ibb.co/ZYgSW6L/IMG-20220218-WA0000-removebg-preview.png'
        alt=''
      />
      <Link to='/'>
        <span>CYCLE MART</span>
      </Link>
    </div>
  );
};

export default Logo;
