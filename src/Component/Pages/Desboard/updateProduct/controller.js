const updateProduct = (
  newData,
  prevData,
  userToken,
  alert,
  oneProductUpdate,
  setOneProductUpdate,
  reset,
  navigate
) => {
  const formData = new FormData();
  formData.append("id", prevData._id);
  formData.append("name", newData.name || prevData.name);
  formData.append("category", newData.category || prevData.category);
  formData.append("subCategory", newData.subCategory || prevData.subCategory);
  formData.append("price", newData.price || prevData.price);
  formData.append("stock", newData.stock || prevData.stock);
  formData.append("description", newData.description || prevData.description);

  formData.append("img", newData.img[0]);
  const gallery = Array.from(newData.gallery);
  gallery?.forEach((img) => {
    formData.append("gallery", img);
  });

  if (gallery.length > 3) {
    return alert.show("Gallery image should not be more than 3");
  }

  if (!prevData.imgGallery?.length && !newData.gallery?.length) {
    return alert.show("Gallery image is recommanded");
  }

  //existing images
  if (prevData.productImg && newData.img[0]) {
    formData.append("productImgId", prevData.productImg.imgId);
  }
  if (prevData.imgGallery?.length && newData.gallery?.length) {
    formData.append("Gallery", prevData.imgGallery);
  }

  fetch("https://iqbal.diaryofmind.com/cyclemart/products", {
    method: "PUT",
    headers: {
      authorization: userToken(),
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.modifiedCount > 0) {
        alert.show("This Product was updated");
        if (oneProductUpdate) {
          setOneProductUpdate(false);
        } else {
          setOneProductUpdate(true);
        }
        reset();
        navigate("/desboard/manage-product");
      } else {
        alert.show("You didn't update any field");
      }
    })
    .catch((err) => alert.show(err.message));
};

export default updateProduct;
