import { toast } from "react-toastify";

const addProduct = (product, userToken, reset, setLoading) => {
  setLoading(true);
  const formData = new FormData();

  Object.entries(product).forEach(([key, value]) => {
    if (key === "img") {
      formData.append("img", product.img[0]);
    } else if (key === "gallery") {
      Array.from(product.gallery).forEach((img) => {
        formData.append("gallery", img);
      });
    } else formData.append(key, value);
  });

  fetch(`${import.meta.env.VITE_BACKEND_URL}/cyclemart/products`, {
    method: "POST",
    headers: {
      authorization: userToken(),
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.insertedId) {
        toast.success("A product was successfully added");
        reset();
        setLoading(false);
      }
    })
    .catch((err) => {
      setLoading(false);
      toast.error(err.message);
    });
};

export default addProduct;
