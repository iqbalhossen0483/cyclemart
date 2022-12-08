import SliderCustomize from "./sliderCustomize/SliderCustomize";
import AddOffer from "./offerCustomize/AddOffer";
import Category from "./categoryCutomize/Category";
import React from "react";

const Customize = () => {
  return (
    <div className='customise-container'>
      <Category />
      <AddOffer />
      <SliderCustomize />
    </div>
  );
};

export default Customize;
