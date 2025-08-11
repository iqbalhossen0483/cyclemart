import React from "react";

const TypeFilter = ({ handleType, setType }) => {
  return (
    <div className='lg:text-xl leading-8 mt-5'>
      <h2 className='side-menu'>Products type</h2>
      <form>
        <div className='flex items-center'>
          <input
            onClick={(e) => {
              handleType(e);
            }}
            type='checkbox'
            name='Geared'
          />
          <p className='ml-2'>Geared</p>
        </div>
        <div className='flex items-center'>
          <input
            onClick={(e) => {
              handleType(e);
            }}
            type='checkbox'
            name='Non-Geared'
          />
          <p className='ml-2'>Non-Geared</p>
        </div>
        <input
          type='reset'
          onClick={() => {
            setType("");
          }}
          className='button'
        />
      </form>
    </div>
  );
};

export default TypeFilter;
