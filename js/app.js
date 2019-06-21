document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript Loaded");

  const dinosaurList = document.querySelector("#dinosaur-list")

  const handleDeleteButton = function () {
    while (dinosaurList.firstChild) {
      dinosaurList.removeChild(dinosaurList.firstChild);
    }
  };

  const handleFormSubmit = function (evt) {
    evt.preventDefault();
    console.log(evt);
    const species = evt.target.species.value;
    const period = evt.target.period.value;
    const diet = evt.target.diet.value;

    if (document.querySelectorAll('ul').length === 0) {
      const deleteButton = document.createElement("button");
      const deleteText = document.createTextNode("Delete All");
      deleteButton.appendChild(deleteText);
      deleteButton.addEventListener("click", handleDeleteButton);
      deleteButton.classList.add("delete");
      deleteButton.classList.add("btn");
      dinosaurList.appendChild(deleteButton);
    }

    const newList = document.createElement("ul");
    let newListItem = document.createElement("li");
    newListItem.textContent = `Species: ${species}`;
    newListItem.classList.add("species");
    newList.appendChild(newListItem);
    newListItem = document.createElement("li");
    newListItem.textContent = `Period: ${period}`;
    newListItem.classList.add("period");
    newList.appendChild(newListItem);
    newListItem = document.createElement("li");
    newListItem.textContent = `Diet: ${diet}`;
    newListItem.classList.add("diet");
    newList.appendChild(newListItem);
    dinosaurList.appendChild(newList);

    form.reset();
  };

  const form = document.querySelector("#new-item-form");
  form.addEventListener("submit", handleFormSubmit);
})
