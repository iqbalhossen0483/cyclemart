import useFunc from "../Hook/useFunc";
import { Link } from "react-router-dom";
import React from "react";

const Profile = () => {
  const { customer } = useFunc();

  return (
    <div className='mb-5 md:mb-0'>
      <div className='profile-img'>
        {customer.email && (
          <img
            className='rounded-full'
            src={customer.imgUrl ? customer.imgUrl : "/no-photo.png"}
            alt=''
          />
        )}
      </div>

      {customer?.email && (
        <div className='profile-container relative'>
          {/* edit button */}
          <div
            style={{ position: "absolute" }}
            className='text-center top-5 right-2 z-0'
          >
            <Link to='/my-account/update-profile' className='button'>
              <i className='fas fa-edit'></i>
            </Link>
          </div>

          <span className='font-medium'>Name: </span>
          <p className='item'>{customer?.displayName}</p>

          <span className='font-semibold'>Email: </span>
          <p className='item'>{customer?.email}</p>

          <span className='font-semibold'>Phone Number: </span>
          <p className='item'>{customer?.phone || "N/A"}</p>

          <span className='font-semibold'>Division: </span>
          <p className='item'>{customer?.division || "N/A"}</p>
          <span className='font-semibold'>District: </span>
          <p className='item'>{customer?.district || "N/A"}</p>

          <span className='font-semibold'>Police Station: </span>
          <p className='item'>{customer?.policeStation || "N/A"}</p>

          <span className='font-semibold col-span-3 lg:col-span-1'>
            Rode No. / Village:{" "}
          </span>
          <p className='item'>{customer?.rodeOrVillage || "N/A"}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
