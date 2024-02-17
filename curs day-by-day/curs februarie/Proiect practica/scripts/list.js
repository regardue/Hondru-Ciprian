let AddButton = document.getElementById("add__list__button");
AddButton.addEventListener("click", Button);
function Button() {
  let list__title__value = document.getElementById("list__title__input").value;
  let list__title = document.createElement("h3"); //list title
  list__title.textContent = list__title__value;
  list__title.style.color = "Red";
  list__title.style.fontSize = "40px"
  let new__list = document.createElement("ul"); //list itself
  let items = ["Item 1", "Item 2", "Item 3"]; //list items
  items.forEach(function (itemText) {
    let list__item = document.createElement("li");
    let input__field = document.createElement("input");
    input__field.type = "text";
    input__field.placeholder = itemText;
    list__item.appendChild(input__field);
    new__list.appendChild(list__item);
  });
  let list__div = document.createElement("div"); //create div
  list__div.classList.add("list__container__item"); //give the new div a class
  // list__div.style.border = "1px solid white";
  list__div.appendChild(list__title); //attach items to div
  list__div.appendChild(new__list);
  document.getElementById("list__container").appendChild(list__div); //attach div to container
}
