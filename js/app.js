document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("#new-item-form");
  const formWrapper = document.querySelector("#form-wrapper");
  const speciesInput = document.querySelector("#species");
  const dinosaurList = document.querySelector("#dinosaur-list");

  const handleDeleteButton = () => {
    while (dinosaurList.firstChild) {
      dinosaurList.removeChild(dinosaurList.firstChild);
    }
  }

  const handleResetButton = () => {
    form.reset();
    while (document.querySelectorAll(".form-item").length > 1) {
      formWrapper.removeChild(formWrapper.lastChild);
    }
  }

  const handleFormSubmit = evt => {
    evt.preventDefault();
    const species = evt.target.species.value;
    const period = evt.target.period.value;
    const diet = evt.target.diet.value;
    const origin = evt.target.origin.value;

    if (document.querySelector('.delete') === null) {
      dinosaurList.appendChild(addButton("Delete All", handleDeleteButton, "delete"));
    }

    const originElements = Array.from(document.querySelectorAll("#origin"));
    const checkedOrigins = originElements.filter(element => element.checked)
    .map(element => element.value);

    const newList = document.createElement("ul");
    addListItem(`Species: ${species}`, newList, "species");
    addListItem(`Period: ${period}`, newList, "period");
    addListItem(`Diet: ${diet}`, newList, "diet");
    addListItem(`Places of origin: ${checkedOrigins.join(', ')}`, newList, "origin");
    dinosaurList.appendChild(newList);

    form.reset();
    while (document.querySelectorAll(".form-item").length > 1) {
      formWrapper.removeChild(formWrapper.lastChild);
    }
  };

  form.addEventListener("submit", handleFormSubmit);

  const handleOriginInput = () => {

  }

  const handleDietInput = () => {
    if (document.querySelectorAll(".form-item").length === 3) {
      const origins = ["Africa", "Asia", "Europe", "North America", "South America"];
      const newCheckboxes = addLabel("origin", addCheckboxes, origins, handleOriginInput);
      formWrapper.appendChild(newCheckboxes);
    }
  }

  const handlePeriodInput = () => {
    if (document.querySelectorAll(".form-item").length === 2) {
      const diets = ["Carnivore", "Herbivore", "Omnivore"];
      const newRadio = addLabel("diet", addRadio, diets, handleDietInput);
      formWrapper.appendChild(newRadio);
    }
  }

  const handleSpeciesInput = () => {
    if (document.querySelector(".reset") === null) {
      const reset = addButton("Reset", handleResetButton, "reset");
      reset.type = "reset";
      form.appendChild(reset);
    }
    if (document.querySelectorAll(".form-item").length === 1) {
      const periods = ["Triassic", "Jurassic", "Cretaceous"];
      const newSelect = addLabel("period", addSelect, periods, handlePeriodInput);
      formWrapper.appendChild(newSelect);
    }
  }

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

// Function to add label which will also be linked to an input
const addLabel = (field, addInputType, options, handleFunction) => {
  const div = document.createElement("div");
  div.classList.add("form-item");

  const label = document.createElement("label");
  label.setAttribute("for", field);
  label.textContent = `${capitalize(field)}:`
  div.appendChild(label);

  addInputType(field, options, div, handleFunction);
  return div;
}

// Function to add select input types with options
const addSelect = (field, values, div, handleFunction) => {
  const select = document.createElement("select");
  select.id = field;
  select.required = true;
  select.addEventListener("change", handleFunction);
  div.appendChild(select);

  // First option is always blank
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

// Funtion to add radio buttons input
const addRadio = (field, values, div, handleFunction) => {
  const radioDiv = document.createElement("div");
  radioDiv.classList.add(field);
  div.appendChild(radioDiv);

  values.forEach(value => {
    const optionDiv = document.createElement("div");
    radioDiv.appendChild(optionDiv);

    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = field;
    radioInput.id = field;
    radioInput.value = value;
    radioInput.addEventListener("click", handleFunction);
    optionDiv.appendChild(radioInput);

    const label = document.createElement("label");
    label.textContent = value;
    optionDiv.appendChild(label);
  });
  return div;
}

// Function to add checkbox input
const addCheckboxes = (field, values, div, handleFunction) => {
  const checkboxDiv = document.createElement("div");
  checkboxDiv.classList.add(field);
  div.appendChild(checkboxDiv);

  values.forEach(value => {
    const optionDiv = document.createElement("div");
    checkboxDiv.appendChild(optionDiv);

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.id = field;
    checkboxInput.value = value;
    optionDiv.appendChild(checkboxInput);

    const label = document.createElement("label");
    label.textContent = value;
    optionDiv.appendChild(label);
  });
}

const capitalize = word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
