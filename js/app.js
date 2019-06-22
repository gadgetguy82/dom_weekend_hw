document.addEventListener("DOMContentLoaded", () => {

  const formItems = document.querySelector("#form-wrapper");
  const dinosaurList = document.querySelector("#dinosaur-list");

  const handleDeleteButton = () => {
    while (dinosaurList.firstChild) {
      dinosaurList.removeChild(dinosaurList.firstChild);
    }
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    const species = evt.target.species.value;
    const period = evt.target.period.value;
    // const diet = evt.target.diet.value;
    // const origin = evt.target.origin.value;

    if (document.querySelector('.delete') === null) {
      dinosaurList.appendChild(addButton("Delete All", handleDeleteButton, "delete"));
    }

    const originElements = Array.from(document.querySelectorAll("#origin"));
    const checkedOrigins = originElements.filter(element => element.checked)
    .map(element => element.value);

    const newList = document.createElement("ul");
    addListItem(`Species: ${species}`, newList, "species");
    addListItem(`Period: ${period}`, newList, "period");
    // addListItem(`Diet: ${diet}`, newList, "diet");
    // addListItem(`Places of origin: ${checkedOrigins.join(', ')}`, newList, "origin");
    dinosaurList.appendChild(newList);

    formItems.removeChild(formItems.lastChild);

    form.reset();
  };

  const form = document.querySelector("#new-item-form");
  form.addEventListener("submit", handleFormSubmit);


  const handleSpeciesInput = () => {
    if (document.querySelector(".reset") === null) {
      const reset = addButton("Reset", () => {}, "reset");
      reset.setAttribute("type", "reset");
      form.appendChild(reset);
    }
    if (document.querySelectorAll(".form-item").length === 1) {
      const periods = ["Triassic", "Jurassic", "Cretaceous"];
      const newdropdown = addLabel("period", addSelect, periods);
      formItems.appendChild(newdropdown);
    }
  }

  const speciesInput = document.querySelector("#species");
  speciesInput.addEventListener("input", handleSpeciesInput);
})

// Function to create a list item and add to the given list
const addListItem = (text, listToAppend, htmlClass = "") => {
  const newListItem = document.createElement("li");
  newListItem.textContent = text;
  newListItem.classList.add(htmlClass);
  listToAppend.appendChild(newListItem);
}

// Function to create a button and add functionality handler
const addButton = (text, handleFunction, htmlClass = "") => {
  const button = document.createElement("button");
  const textDisplayed = document.createTextNode(text);
  button.appendChild(textDisplayed);
  button.addEventListener("click", handleFunction);
  button.classList.add(htmlClass);
  button.classList.add("btn");
  return button;
}

const addLabel = (field, addInputType, options) => {
  const div = document.createElement("div");
  div.classList.add("form-item");
  const label = document.createElement("label");
  label.setAttribute("for", field);
  label.textContent = `${capitalize(field)}:`
  div.appendChild(label);
  addInputType(field, options, div);
  return div;
}

const addSelect = (field, values, div) => {
  const select = document.createElement("select");
  select.id = field;
  select.required = true;
  div.appendChild(select);
  const option = document.createElement("option");
  option.disabled = true;
  option.selected = true;
  option.value = "";
  select.appendChild(option);
  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
  return select;
}

const addRadio = (field, options) => {
  const div = document.createElement("div");
  div.classList.add(field);
  
}

const capitalize = word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
