const updateProduct = (
  data,
  prevData,
  userToken,
  alert,
  oneProductUpdate,
  setOneProductUpdate,
  reset,
  navigate,
  setLoading
) => {
  const formData = new FormData();
  formData.append("id", prevData._id);
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      if (key === "img") {
        formData.append("img", data.img[0]);
      } else if (key === "gallery") {
        Array.from(data.gallery).forEach((img) => {
          formData.append("gallery", img);
        });
      } else formData.append(key, value);
    }
  });

  //existing images
  if (data.img[0]) {
    formData.append("productImgId", prevData.productImg.imgId);
  }
  if (data.gallery?.length) {
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
    .catch((err) => alert.show(err.message))
    .finally(() => setLoading(false));
};

export default updateProduct;
