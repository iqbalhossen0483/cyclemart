const addProduct = (product, userToken, alert, reset, setLoading) => {
  setLoading(true);
  const formData = new FormData();

  formData.append("name", product.name);
  formData.append("category", product.category);
  formData.append("subCategory", product.subCategory);
  formData.append("price", product.price);
  formData.append("stock", product.stock);
  formData.append("description", product.description);
  formData.append("img", product.img[0]);

  const gallery = Array.from(product.gallery);
  gallery?.forEach((img) => {
    formData.append("gallery", img);
  });

  if (!product.img.length) {
    return alert.show("Product image is required");
  }
  if (gallery.length > 3) {
    return alert.show("Gallery image should be less than 4");
  }

  fetch("https://iqbal.diaryofmind.com/cyclemart/products", {
    method: "POST",
    headers: {
      authorization: userToken(),
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.insertedId) {
        alert.show("A product was successfully added");
        reset();
        setLoading(false);
      }
    })
    .catch((err) => {
      setLoading(false);
      alert.show(err.message);
    });
};

export default addProduct;
