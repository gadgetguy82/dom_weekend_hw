document.addEventListener("DOMContentLoaded", () => {
  const seeds = [
    ["Dilophosaurus", "Jurassic", "Carnivore", "North America", "193 million years ago", "193 million years ago"],
    ["Giganotosaurus", "Cretaceous", "Carnivore", "South America", "98 million years ago", "97 million years ago"]
  ];

  const facts = ["species", "period", "diet", "places of origin", "existed from", "existed to"];

  const hexcolours = ["FFA07A", "F08080", "FF7F50", "FFD700", "FFEFD5", "FFFF00", "00FF7F", "AFEEEE", "B0E0E6", "87CEEB", "E6E6FA", "FFFFF0", "F5DEB3", "D2B48C", "FFDD52", "C9C37D", "FFA500"];

  const randomColor = () => {
    return hexcolours[Math.floor(Math.random() * hexcolours.length)];
  }

  const form = document.querySelector("#new-item-form");
  const formWrapper = document.querySelector("#form-wrapper");
  const speciesInput = document.querySelector(`#${facts[0]}`);
  const dinosaurList = document.querySelector("#dinosaur-list");
  let minYear = -245;
  let maxYear = -66;

  const handleDeleteButton = thisElement => {
    deleteElement = thisElement.parentNode;
    if (dinosaurList.querySelectorAll("ul").length === 1) {
      dinosaurList.removeChild(dinosaurList.firstChild);
    }
    dinosaurList.removeChild(deleteElement);
  }

  const handleDeleteAllButton = () => {
    while (dinosaurList.firstChild) {
      dinosaurList.removeChild(dinosaurList.firstChild);
    }
  }

  const handleSaveButton = () => {

  }

  const handleResetButton = () => {
    form.reset();
    while (document.querySelectorAll(".form-item").length > 1) {
      formWrapper.removeChild(formWrapper.lastChild);
    }
    if (document.querySelector(".save") !== null) {
      const save = document.querySelector(".save");
      form.removeChild(save);
    }
    form.removeChild(form.lastChild);
  }

  const handleSeedButton = () => {
    if (document.querySelector('.delete') === null) {
      dinosaurList.appendChild(addButton("Delete All", handleDeleteAllButton, "delete"));
    }

    seeds.forEach((seed) => {
      const newList = document.createElement("ul");
      for (let i = 0; i < facts.length; i++) {
        addListItem(`${capitalize(facts[i])}: ${seed[i]}`, newList, rmWSpace(facts[i]));
      };
      newList.classList.add(randomColor());
      newList.addEventListener("dblclick", function () {handleDinoCard(this);});
      const del = addButton("Delete", function () {handleDeleteButton(this);}, "delete");
      del.style.display = "none";
      newList.appendChild(del);
      dinosaurList.appendChild(newList);
    });
  }

  const createSaveButton = () => {
    if (document.querySelector(".save") === null) {
      const save = addButton("Save", handleSaveButton, "save");
      save.type = "submit";
      form.appendChild(save)
    }
  }

  const createResetButton = elementToAppend => {
    if (document.querySelector(".reset") === null) {
      const reset = addButton("Reset", handleResetButton, "reset");
      reset.type = "reset";
      elementToAppend.appendChild(reset);
    }
  }

  const updateSlider = (from, to) => {
    if (document.querySelector(from) !== null){
      let labelFrom = document.querySelector(from);
      let rangeFrom = document.querySelector(`#${rmWSpace(facts[4])}`);
      rangeFrom.min = minYear;
      rangeFrom.max = maxYear;
      labelFrom.textContent = -rangeFrom.value + " million years ago";
      minYear = rangeFrom.value;
    }
    if (document.querySelector(to) !== null) {
      let labelTo = document.querySelector(to);
      let rangeFrom = document.querySelector(`#${rmWSpace(facts[4])}`);
      let rangeTo = document.querySelector(`#${rmWSpace(facts[5])}`);
      rangeTo.min = rangeFrom.value;
      rangeTo.max = maxYear;
      labelTo.textContent = -rangeTo.value + " million years ago";
    }
  }

  const handleDinoCard = thisElement => {
    if (thisElement.lastChild.style.display === "none") {
      thisElement.lastChild.style.display = "block";
    } else {
      thisElement.lastChild.style.display = "none";
    }
  }

  const handleFormSubmit = evt => {
    evt.preventDefault();
    const dinoFacts = facts.map(fact => evt.target[rmWSpace(fact)].value);

    if (document.querySelector('.delete') === null) {
      dinosaurList.appendChild(addButton("Delete All", handleDeleteAllButton, "delete"));
    }

    // Convert list of checked continents to a string
    const originElements = Array.from(document.querySelectorAll(`#${rmWSpace(facts[3])}`));
    dinoFacts[3] = originElements.filter(element => element.checked)
    .map(element => element.value).join(', ');

    dinoFacts[4] = -dinoFacts[4] + " million years ago";
    dinoFacts[5] = -dinoFacts[5] + " million years ago";

    const newList = document.createElement("ul");
    for (let i = 0; i < facts.length; i++) {
      addListItem(`${capitalize(facts[i])}: ${dinoFacts[i]}`, newList, rmWSpace(facts[i]));
    };
    newList.classList.add(randomColor());
    newList.addEventListener("dblclick", function () {handleDinoCard(this);});
    const del = addButton("Delete", function () {handleDeleteButton(this);}, "delete");
    del.style.display = "none";
    newList.appendChild(del);
    dinosaurList.appendChild(newList);

    form.reset();
    while (document.querySelectorAll(".form-item").length > 1) {
      formWrapper.removeChild(formWrapper.lastChild);
    }
    form.removeChild(form.lastChild)
    form.removeChild(form.lastChild)
  };

  form.addEventListener("submit", handleFormSubmit);
  const seed = addButton("Seed", handleSeedButton, "seed");
  form.appendChild(seed);

  const updateValue = () => {
    if (document.querySelector(`#${facts[1]}`).value === "Triassic") {
      minYear = -245;
      maxYear = -201;
    } else if (document.querySelector(`#${facts[1]}`).value === "Jurassic") {
      minYear = -201;
      maxYear = -145;
    } else if (document.querySelector(`#${facts[1]}`).value === "Cretaceous") {
      minYear = -145;
      maxYear = -66;
    }
    updateSlider(".existedfromvalue", ".existedtovalue");
  }

  const handleCreateExistTo = () => {
    if (document.querySelectorAll(".form-item").length === 5) {
      const years = [minYear, maxYear];
      const newRange = addLabel(facts[5], addRange, years, createSaveButton, updateValue);
      formWrapper.appendChild(newRange);
      createResetButton(form);
    }
  }

  const handleCreateExistFrom = () => {
    if (document.querySelectorAll(".form-item").length === 4) {
      const years = [minYear, maxYear];
      const newRange = addLabel(facts[4], addRange, years, handleCreateExistTo, updateValue);
      formWrapper.appendChild(newRange);
      createResetButton(form);
    }
  }

  const handleCreateOrigin = () => {
    if (document.querySelectorAll(".form-item").length === 3) {
      const origins = ["Africa", "Asia", "Europe", "North America", "South America"];
      const newCheckboxes = addLabel(facts[3], addCheckboxes, origins, handleCreateExistFrom);
      formWrapper.appendChild(newCheckboxes);
      createResetButton(form);
    }
  }

  const handleCreateDiet = () => {
    if (document.querySelectorAll(".form-item").length === 2) {
      const diets = ["Carnivore", "Herbivore", "Omnivore"];
      const newRadio = addLabel(facts[2], addRadio, diets, handleCreateOrigin);
      formWrapper.appendChild(newRadio);
      createResetButton(form);
    }
  }

  const handleCreatePeriod = () => {
    if (document.querySelectorAll(".form-item").length === 1) {
      const periods = ["Triassic", "Jurassic", "Cretaceous"];
      const newSelect = addLabel(facts[1], addSelect, periods, handleCreateDiet, updateValue);
      formWrapper.appendChild(newSelect);
      createResetButton(form);
    }
  }

  speciesInput.addEventListener("input", handleCreatePeriod);
  speciesInput.autofocus = true;
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
const addLabel = (field, addInputType, options, handleFunction, updateFunction) => {
  const div = document.createElement("div");
  div.classList.add("form-item");

  const label = document.createElement("label");
  label.setAttribute("for", field);
  label.textContent = `${capitalize(field)}:`
  div.appendChild(label);

  addInputType(rmWSpace(field), options, div, handleFunction, updateFunction);
  return div;
}

// Function to add select input types with options
const addSelect = (field, values, div, handleFunction, updateFunction) => {
  const select = document.createElement("select");
  select.id = field;
  select.required = true;
  select.addEventListener("change", handleFunction);
  select.addEventListener("input", updateFunction);
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
    checkboxInput.addEventListener("change", handleFunction);
    optionDiv.appendChild(checkboxInput);

    const label = document.createElement("label");
    label.textContent = value;
    optionDiv.appendChild(label);
  });
}

const addRange = (field, values, div, handleFunction, updateFunction) => {
  const range = document.createElement("input");
  range.type = "range";
  range.id = field;
  range.required = true;
  range.min = values[0];
  range.max = values[1];
  range.value = range.min;
  range.addEventListener("input", updateFunction);
  range.addEventListener("change", handleFunction);
  div.appendChild(range);

  const label = document.createElement("label");
  label.classList.add(`${field}value`);
  label.textContent = -range.value + " million years ago";
  div.appendChild(label);
}

const capitalize = word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const rmWSpace = string => {
  return string.replace(/\s/g, '');
}
