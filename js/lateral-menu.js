let lateralMenuButton = document.querySelector(".lateral-menu-button");
let optionsMenu = document.querySelector(".interaction-menu");

lateralMenuButton.addEventListener("click", () => {
  optionsMenu.classList.toggle('active');
})