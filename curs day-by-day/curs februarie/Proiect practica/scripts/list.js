let AddButton = document.getElementById("add__list__button")
AddButton.addEventListener("click", Button)
function Button(){
  let list__title__button = document.getElementById("list__title__button").value;
  let list__title = document.createElement("h3");
  list__title.textContent = list__title__button;
  let new__list = document.createElement("ul");
  let items = ["Row1", "Row2", "Row3"];
  items.forEach(function (itemText) {
    let list__item = document.createElement("li");
    list__item.textContent = itemText;
    new__list.appendChild(list__item);
  });
  document.getElementById("list__container")
  list__container.appendChild(list__title);
  list__container.appendChild(new__list);
};