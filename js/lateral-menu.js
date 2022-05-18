let lateralMenuButton = document.querySelector(".lateral-menu-button");
let optionsMenu = document.querySelector(".options-menu");

lateralMenuButton.addEventListener("click", () => {
    optionsMenu.classList.toggle('active');
    lateralMenuButton.classList.toggle('active');

    console.log(lateralMenuButton);
    console.log(optionsMenu.style);
})