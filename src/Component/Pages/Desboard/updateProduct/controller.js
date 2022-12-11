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
      if (key === "img" && value[0]) {
        console.log(value[0]);
        formData.append("img", value[0]);
        //existing images
        formData.append("productImgId", prevData.productImg.imgId);
      } else if (key === "gallery" && value.length) {
        Array.from(value).forEach((img) => {
          formData.append("gallery", img);
          formData.append("Gallery", prevData.imgGallery);
        });
      } else formData.append(key, value);
    }
  });

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
