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
    const origin = evt.target.origin.value;

    if (document.querySelectorAll('ul').length === 0) {
      const deleteButton = document.createElement("button");
      const deleteText = document.createTextNode("Delete All");
      deleteButton.appendChild(deleteText);
      deleteButton.addEventListener("click", handleDeleteButton);
      deleteButton.classList.add("delete");
      deleteButton.classList.add("btn");
      dinosaurList.appendChild(deleteButton);
    }

    let checkedValue = null;
    const inputElements = document.querySelectorAll("#origin");
    for(let i = 0; inputElements[i]; i++){
      if(inputElements[i].checked){
        checkedValue = inputElements[i].value;
        break;
      }
    }

    const newList = document.createElement("ul");
    addListItem(`Species: ${species}`, "species", newList);
    addListItem(`Period: ${period}`, "period", newList);
    addListItem(`Diet: ${diet}`, "diet", newList);
    addListItem(`Place of origin: ${origin}`, "origin", newList);
    dinosaurList.appendChild(newList);

    form.reset();
  };

  const form = document.querySelector("#new-item-form");
  form.addEventListener("submit", handleFormSubmit);
})

const addListItem = (text, htmlClass, elementAppendedOn) => {
  const newListItem = document.createElement("li");
  newListItem.textContent = text;
  newListItem.classList.add(htmlClass);
  elementAppendedOn.appendChild(newListItem);
}
