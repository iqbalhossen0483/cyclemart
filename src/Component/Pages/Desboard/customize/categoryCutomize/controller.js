const controller = () => {
  // add sub menus
  const addSubMenus = (
    categoryName,
    menuId,
    setSubCategoryForm,
    update,
    setUpdate,
    alart
  ) => {
    const text = {
      name: categoryName.current.value,
    };

    fetch(`http://localhost:5000/cyclemart/menus/${menuId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(text),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alart.show("Sub-menu added");
          categoryName.current.value = "";
          setSubCategoryForm(false);
          if (update) setUpdate(false);
          else setUpdate(true);
        }
      });
  };

  //delete menus
  const deletCategoryMenu = (id, userToken, alart, update, setUpdate) => {
    fetch(`http://localhost:5000/cyclemart/menus/${id}`, {
      method: "DELETE",
      headers: {
        authorization: userToken(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alart.show("menu deleted");
          if (update) setUpdate(false);
          else setUpdate(true);
        }
      });
  };

  //delete sub category menu
  function deleteSubCategoryMenu(menus, alart, update, setUpdate) {
    fetch(`http://localhost:5000/cyclemart/menus`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(menus),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alart.show("Delete successful");
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
