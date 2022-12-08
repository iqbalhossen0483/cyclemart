import useFirebase from "../../../Hook/useFirebase";
import Anchor from "../../../../utilitize/Anchor";
import useFunc from "../../../Hook/useFunc";
import React from "react";

const TopMenus = ({ dispatch }) => {
  const { addedProduct } = useFunc();
  const { user } = useFirebase();

  return (
    <div className='menu-wrapper'>
      <i onClick={() => dispatch("")} className='closebtn fas fa-times' />
      <div className='top-menu'>
        <i className='fa fa-home' aria-hidden='true'></i>
        <Anchor to='/'>Home</Anchor>
      </div>
      <div className='top-menu'>
        <i className='fa fa-shopping-bag' aria-hidden='true'></i>
        <Anchor to='/shop'>Shop</Anchor>
      </div>

      {!user.email && (
        <div className='top-menu'>
          <i className='fa fa-user' aria-hidden='true'></i>
          <Anchor to='/log-in'>Account</Anchor>
        </div>
      )}

      <div className='hidden md:flex justify-center items-center'>
        {user.email && (
          <div
            onClick={() => dispatch("cart")}
            className='top-menu cursor-pointer'
          >
            <div>
              <i className='fas fa-shopping-cart'></i>
              <span className='text-purple-900 font-semibold ml-1'>
                {addedProduct?.length}
              </span>
            </div>
            <span>View Cart</span>
          </div>
        )}
        {user.email && (
          <img
            onClick={() => dispatch("user")}
            className='w-8 h-8 rounded-full ml-2 cursor-pointer'
            src={user.imgUrl ? user.imgUrl : "/no-photo.png"}
            alt=''
          />
        )}
      </div>
    </div>
  );
};

export default TopMenus;
