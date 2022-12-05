import SliderCustomize from "./sliderCustomize/SliderCustomize";
import AddOffer from "./offerCustomize/AddOffer";
import Category from "./categoryCutomize/Category";
import React from "react";

const Customize = () => {
  return (
    <div className='bg-white m-5 p-5 rounded-md md:grid grid-cols-3 gap-5 h-full'>
      <Category />
      <SliderCustomize />
      <AddOffer />
    </div>
  );
};

export default Customize;
