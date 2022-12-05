import useFirebase from "../../../Hook/useFirebase";
import Anchor from "../../../../utilitize/Anchor";
import useFunc from "../../../Hook/useFunc";
import React from "react";

const TopMenus = ({ setShowCart, toggleShow }) => {
  const { addedProduct } = useFunc();
  const { user } = useFirebase();

  return (
    <div className='menu-wrapper'>
      <div className='top-menu'>
        <i className='fa fa-home' aria-hidden='true'></i>
        <Anchor to='/'>Home</Anchor>
      </div>
      <div className='top-menu'>
        <i className='fa fa-shopping-bag' aria-hidden='true'></i>
        <Anchor to='/shop'>Shop</Anchor>
      </div>

      <div className='top-menu'>
        <i className='fa fa-user' aria-hidden='true'></i>
        <Anchor to={user.email ? "/my-account/profile" : "/log-in"}>
          Account
        </Anchor>
      </div>

      <div className='hidden md:flex justify-center items-center'>
        {user.email && (
          <div className='top-menu'>
            <div>
              <i
                onMouseEnter={() => {
                  setShowCart(true);
                }}
                className='fas fa-shopping-cart'
              ></i>
              <span className='text-purple-900 font-semibold ml-1'>
                {addedProduct?.length}
              </span>
            </div>
            <span>View Cart</span>
          </div>
        )}
        {user.email && (
          <img
            onClick={toggleShow}
            className='w-10 h-10 rounded-full ml-2'
            src={
              user.imgUrl
                ? user.imgUrl
                : user.photoURL
                ? user.photoURL
                : "https://res.cloudinary.com/dpphyosn4/image/upload/v1642742699/cycle-mart/users/nophoto_elhi6z.png"
            }
            alt=''
          />
        )}
      </div>
    </div>
  );
};

export default TopMenus;
