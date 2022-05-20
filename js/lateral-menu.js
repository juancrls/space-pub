let lateralMenuButton = document.querySelector(".lateral-menu-button");
let optionsMenu = document.querySelector(".interaction-menu-container");

lateralMenuButton.addEventListener("click", () => {
  optionsMenu.classList.toggle('active');
})