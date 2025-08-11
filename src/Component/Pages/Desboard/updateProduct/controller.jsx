import { toast } from "react-toastify";

const updateProduct = (
  data,
  prevData,
  userToken,
  _alert,
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

  fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/products`, {
    method: "PUT",
    headers: {
      authorization: userToken(),
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.modifiedCount > 0) {
        toast.success("This Product was updated");
        if (oneProductUpdate) {
          setOneProductUpdate(false);
        } else {
          setOneProductUpdate(true);
        }
        reset();
        navigate("/desboard/manage-product");
      } else {
        toast.error("You didn't update any field");
      }
    })
    .catch((err) => toast.error(err.message))
    .finally(() => setLoading(false));
};

export default updateProduct;
