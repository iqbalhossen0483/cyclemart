import React, { useState } from "react";
import BodyPart from "./BodyPart";
import HeaderPart from "./HeaderPart";

function Category() {
  const [categoryForm, setCategoryForm] = useState(false);
  const [update, setUpdate] = useState(true);

  return (
    <div
      onClick={() => {
        setCategoryForm(false);
      }}
      className='border rounded-md pb-10 text-center relative'
    >
      <HeaderPart
        categoryForm={categoryForm}
        setCategoryForm={setCategoryForm}
        update={update}
        setUpdate={setUpdate}
      />
      <BodyPart update={update} setUpdate={setUpdate} />
    </div>
  );
}

export default Category;
