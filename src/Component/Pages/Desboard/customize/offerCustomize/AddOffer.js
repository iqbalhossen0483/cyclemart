import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";

import useFunc from "../../../../Hook/useFunc";

function AddOffer() {
  const { register, handleSubmit, reset } = useForm();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [form, setShowForm] = useState(false);
  const { userToken } = useFunc();
  const alart = useAlert();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/cyclemart/offers`)
      .then((res) => res.json())
      .then((data) => setOffers(data));
  }, [update]);

  const onSubmit = (offer) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/cyclemart/offers`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: userToken(),
      },
      body: JSON.stringify(offer),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          reset();
          alart.show("Offer added successfully");
          setShowForm(false);
          if (update) {
            setUpdate(false);
          } else {
            setUpdate(true);
          }
        }
      })
      .catch((err) => alart.error(err.message))
      .finally(() => setLoading(false));
  };

  //delete
  const deletOffer = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/cyclemart/offers/${id}`, {
      method: "DELETE",
      headers: {
        authorization: userToken(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alart.show("Offer deleted");
          const offer = offers.filter((item) => item._id !== id);
          setOffers(offer);
        }
      });
  };

  const showForm = (e) => {
    e.stopPropagation();
    setShowForm(true);
  };

  return (
    <div
      onClick={() => {
        setShowForm(false);
      }}
      className="border rounded-md pb-10 text-center relative"
    >
      <div className="bg-primary rounded-t text-gray-200 sticky top-0 z-10">
        <p className="font-medium py-2">Scecial Offers</p>
        <button className="slider-add-btn" onClick={(e) => showForm(e)}>
          Add+
        </button>

        <form
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`${form ? "block" : "hidden"}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="customize-form w-full">
            <input
              className="input w-full"
              {...register("name", { required: true })}
              placeholder="Enter tag name"
            />
            <input
              className="input w-full"
              {...register("url", { required: true })}
              placeholder="url"
            />
            <button disabled={loading} type="submit" className="button">
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {offers.map((menu, index) => (
        <div
          key={index}
          className="customize-category-menu text-left flex-col px-5"
        >
          <div className="flex justify-between">
            <p>{menu.name}</p>
            <i
              onClick={() => {
                deletOffer(menu._id);
              }}
              className="fas fa-trash-alt customize-delete-icon"
            ></i>
          </div>
          <p className="text-xs">{menu.url}</p>
        </div>
      ))}
    </div>
  );
}

export default AddOffer;
