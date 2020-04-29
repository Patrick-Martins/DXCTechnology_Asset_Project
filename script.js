"use strict";

const APIKey = "5e9580ac436377171a0c234c";
const url = "https://databaseelite-b1b7.restdb.io/rest/dxc-subscriptions";
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
let emailSubmitted;
let emailApproved = false;

function init() {
  checkLocalStorage();
  sliderFunctionality();
  setupSubmitForm();
  //   getSubmissions();
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
  const size = 100;

  slideContainer.style.transform = "translateX(" + -size * counter + "vw)";
  dots[counter - 1].style.backgroundColor = "yellow";

  //next button
  nextBtn.addEventListener("click", () => {
    if (counter >= sliderImages.length - 1) return;
    slideContainer.style.transition = "transform 1s ease-in-out";
    counter++;
    slideContainer.style.transform = "translateX(" + -size * counter + "vw)";
    dots.forEach((dot) => {
      dot.style.backgroundColor = "gray";
    });
    if (sliderImages[counter].id === "lastClone") {
      dots[0].style.backgroundColor = "yellow";
    } else if (sliderImages[counter].id === "firstClone") {
      dots[dots.length - 1].style.backgroundColor = "yellow";
    } else {
      dots[counter - 1].style.backgroundColor = "yellow";
    }
  });

  //previous buuton
  prevBtn.addEventListener("click", () => {
    if (counter <= 0) return;
    slideContainer.style.transition = "transform 1s ease-in-out";
    counter--;
    slideContainer.style.transform = "translateX(" + -size * counter + "vw)";
    dots.forEach((dot) => {
      dot.style.backgroundColor = "gray";
    });
    if (sliderImages[counter].id === "lastClone") {
      dots[0].style.backgroundColor = "yellow";
    } else if (sliderImages[counter].id === "firstClone") {
      dots[dots.length - 1].style.backgroundColor = "yellow";
    } else {
      dots[counter - 1].style.backgroundColor = "yellow";
    }
  });

  // when the slide is on the first or the last
  slideContainer.addEventListener("transitionend", () => {
    if (sliderImages[counter].id === "lastClone") {
      slideContainer.style.transition = "none";
      counter = 1;
      slideContainer.style.transform = "translateX(" + -size * counter + "vw)";
    }
    if (sliderImages[counter].id === "firstClone") {
      slideContainer.style.transition = "none";
      counter = sliderImages.length - 2;
      slideContainer.style.transform = "translateX(" + -size * counter + "vw)";
    }
  });
}

function checkLocalStorage() {
  if (localStorage.getItem("name")) {
    console.log("USER IS REGISTERED!");

    //show welcome container
    //remove hidden fromwelcome section
    document.querySelector(".welcome-message").classList.remove("hidden");

    const welcomeText = document.querySelector(".welcome-message h1");
    const userName = localStorage.getItem("name");
    welcomeText.innerHTML = `Welcome back ${userName}!`;

    //change nav button
    document.querySelector(".subscribe-button").innerHTML = "GO TO ASSET";
    document.querySelector(".subscribe-button").href = "asset.html";
  }
}
async function getSubmissions() {
  //get

  fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": APIKey,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((subscriptions) => {
      console.log(subscriptions);
    });
}
async function postSubmission(dataToPost) {
  //POST
  const postData = JSON.stringify(dataToPost);

  fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": APIKey,
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //redirect to asset page
      window.location = "asset.html";
    });
}

// FORM ----------------------------
function setupSubmitForm() {
  //event listener on submit
  form.addEventListener("submit", (e) => {
    //update the email submitted

    //remove invalid class from all
    formInputs.forEach((input) => {
      input.classList.remove("invalid");
    });
    //first check if the email exists and after check if all inputs are valid as well
    checkEmail(form.elements.workEmail.value);
    // console.log(emailApproved);
  });
}
function checkValidity_Email() {
  console.log("checkValidity_Email CALLED");
  console.log("emailApproved " + emailApproved);

  if (form.checkValidity() && emailApproved) {
    console.log("submit ready");
    //local storage, set name and email values to grab the right subscription and add up to the accesses number
    localStorage.setItem("name", `${form.elements.firstName.value} ${form.elements.lastName.value}`);
    localStorage.setItem("email", `${form.elements.workEmail.value}`);

    const dataAdded = {
      name: `${form.elements.firstName.value} ${form.elements.lastName.value}`,
      email: `${form.elements.workEmail.value}`,
      company: `${form.elements.companyName.value}`,
      job: `${form.elements.jobTitle.value}`,
      country: `${form.elements.country.value}`,
      entries_asset1: 0,
    };
    //postTheData
    postSubmission(dataAdded);

    // TO DO: check if it exists already
    // TO DO: if it doesnt call a function that posts else show message that asks the user if he/she wants to go to it
  } else {
    console.log("not valid");
    //add invalid class if it is invalid
    formInputs.forEach((input) => {
      if (!input.checkValidity()) {
        //   console.log(el.type);
        input.classList.add("invalid");
      }
    });
  }
}
async function checkEmail(email_input) {
  //get
  fetch(`${url}?q={"email":"${email_input}"}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": APIKey,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((subscription) => {
      console.log("check email");
      console.log(subscription);
      if (subscription[0]) {
        //show container stating the email already exists
        console.log("email exists");
        emailApproved = false;
      } else {
        emailApproved = true;
      }
      checkValidity_Email();
    });
}
// -------------------------------------------
