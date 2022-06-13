let logo = document.querySelector(".logo");
let navButtons = document.querySelectorAll(".nav-btn");

logo.addEventListener("click", () => {
    navButtons.forEach(item => {
        item.classList.toggle("btn-hidden")
    });
    
});
// const menueHid = () => {
//     navButtons[0].classList.toggle("btn-hidden");
//     alert("okkk!")
// }



