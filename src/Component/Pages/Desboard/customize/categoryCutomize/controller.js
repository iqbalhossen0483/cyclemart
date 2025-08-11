import { toast } from "react-toastify";

const controller = () => {
  // add sub menus
  const addSubMenus = (
    categoryName,
    menuId,
    setSubCategoryForm,
    update,
    setUpdate
  ) => {
    const text = {
      name: categoryName.current.value,
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/cyclemart/menus/${menuId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(text),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Sub-menu added");
          categoryName.current.value = "";
          setSubCategoryForm(false);
          if (update) setUpdate(false);
          else setUpdate(true);
        }
      });
  };

  //delete menus
  const deletCategoryMenu = (id, userToken, _alart, update, setUpdate) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/cyclemart/menus/${id}`, {
      method: "DELETE",
      headers: {
        authorization: userToken(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("menu deleted");
          if (update) setUpdate(false);
          else setUpdate(true);
        }
      });
  };

  //delete sub category menu
  function deleteSubCategoryMenu(menus, update, setUpdate) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/cyclemart/menus`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(menus),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Delete successful");
          if (update) setUpdate(false);
          else setUpdate(true);
        }
      });
  }

  return {
    addSubMenus,
    deletCategoryMenu,
    deleteSubCategoryMenu,
  };
};

export default controller;
