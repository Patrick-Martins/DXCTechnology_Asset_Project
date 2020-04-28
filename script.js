"use strict";

//TASK 1 (Liat):   function to be able to post data
//TASK 2 (Andy):   show invalid messages to inputs that are invalid
//TASK 3 (Vicky):   if it is valid save the correct data in the json object inside setupSubmitForm()
//TASK 4 (Patrick):   password protection
//TASK 5 (Patrick):   local storage check and if it exists show welcome text in landing page

window.addEventListener("DOMContentLoaded", init);

//form variables
const form = document.querySelector("form");
const formInputs = form.querySelectorAll("input");
const elements = form.elements;

function init() {
  //password protection
  //local Storage check
  //post
  sliderFunctionality();
  setupSubmitForm();
}

function sliderFunctionality() {
  // Image slider
  const slideContainer = document.querySelector(".slides");
  const sliderImages = document.querySelectorAll(".slides .slide");
  const dots = document.querySelectorAll(".dot");

  //buttons
  const prevBtn = document.querySelector(".previous");
  const nextBtn = document.querySelector(".next");

  //slide counter
  let counter = 1;
  //width od screen
  const size = sliderImages[0].clientWidth;

  slideContainer.style.transform = "translateX(" + -size * counter + "px)";
  dots[counter - 1].style.backgroundColor = "yellow";

  //next button
  nextBtn.addEventListener("click", () => {
    if (counter >= sliderImages.length - 1) return;
    slideContainer.style.transition = "transform 1s ease-in-out";
    counter++;
    slideContainer.style.transform = "translateX(" + -size * counter + "px)";
    dots.forEach((dot) => {
      dot.style.backgroundColor = "gray";
    });
    dots[counter - 1].style.backgroundColor = "yellow";
  });

  //previous buuton
  prevBtn.addEventListener("click", () => {
    if (counter <= 0) return;
    slideContainer.style.transition = "transform 1s ease-in-out";
    counter--;
    slideContainer.style.transform = "translateX(" + -size * counter + "px)";
    dots.forEach((dot) => {
      dot.style.backgroundColor = "gray";
    });
    dots[counter - 1].style.backgroundColor = "yellow";
  });

  // when the slide is on the first or the last
  slideContainer.addEventListener("transitionend", () => {
    if (sliderImages[counter].id === "lastClone") {
      slideContainer.style.transition = "none";
      counter = 1;
      slideContainer.style.transform = "translateX(" + -size * counter + "px)";
      dots[counter - 1].style.backgroundColor = "yellow";
    }
    if (sliderImages[counter].id === "firstClone") {
      slideContainer.style.transition = "none";
      counter = sliderImages.length - 2;
      slideContainer.style.transform = "translateX(" + -size * counter + "px)";
      dots[counter - 1].style.backgroundColor = "yellow";
    }
  });
}

// FORM ----------------------------
function setupSubmitForm() {
  //event listener on submit
  form.addEventListener("submit", (e) => {
    //remove invalid class from all
    formInputs.forEach((input) => {
      input.classList.remove("invalid");
    });
    //if it is valid
    if (form.checkValidity()) {
      console.log("submit ready");

      dataAdded = {
        name: `${form.elements.firstName} ${form.elements.lastName} "TO DO"`,
        email: "TO DO",
        company: "TO DO",
        job: "TO DO",
        country: "TO DO",
      };

      // TO DO: check if it exists already
      // TO DO: if it doesnt call a function that posts else show message that asks the user if he/she wants to go to it
    } else {
      //add invalid class if it is invalid
      formInputs.forEach((input) => {
        if (!input.checkValidity()) {
          //   console.log(el.type);
          input.classList.add("invalid");
        }
      });
    }
  });
}
// -------------------------------------------
