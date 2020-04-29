"use strict";

//javascript of second page to only give access if it is signed in
if (localStorage.getItem("name") == null) {
  window.location = "index.html";
}

const APIKey = "5e9580ac436377171a0c234c";
const endpoint = "https://databaseelite-b1b7.restdb.io/rest/dxc-subscriptions";

const user_email = localStorage.getItem("email");
let userEntries;

window.addEventListener("DOMContentLoaded", init);

//each time an user accesses this page we get  the user that has the email in localStorage and grab the number of accesses to the asset and add 1
function init() {
  tableContentsFunctionality();
  //   console.log(user_email);
  getSubmission(user_email);
}

async function getSubmission(email) {
  //get

  fetch(`${endpoint}?q={"email":"${email}"}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": APIKey,
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .then((subscription) => {
      console.log(subscription[0]);
      //set value of userEntries variable
      userEntries = subscription[0].entries_asset1;
      console.log("user entries were: " + userEntries);
      //putAccessNumber(subscription._id)
      putAccessNumber(subscription[0]._id);
    });
}

async function putAccessNumber(subscription_ID) {
  const dataToUpdate = {
    entries_asset1: userEntries + 1,
  };
  const postData = JSON.stringify(dataToUpdate);
  //put
  fetch(`${endpoint}/${subscription_ID}`, {
    method: "put",
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
    });
}

function tableContentsFunctionality() {
  const arrowOpen = document.querySelector(".arrow-icon");
  const table_content = document.querySelector(".table-container");
  //add eventlistener
  arrowOpen.addEventListener("click", () => {
    //if status closed
    if (table_content.dataset.status === "closed") {
      //update data-status value
      table_content.dataset.status = "open";
      //show container
      console.log("clicked2");
      document.querySelector(".table-container").style.right = 0 + "px";

      //invert the arrow
      arrowOpen.style.transform = "scaleX(-1)";
    }

    //if status open
    else if (table_content.dataset.status === "open") {
      //update data-status value
      table_content.dataset.status = "closed";
      //hide container
      console.log("clicked");
      document.querySelector(".table-container").style.right = -305 + "px";

      //set arrow to normal the arrow
      arrowOpen.style.transform = "scaleX(1)";
    }
  });
}

/*--------------Marked slider table of content--------- */

let mainNavLinks = document.querySelectorAll(".table-of-contents a");
let mainSections = document.querySelectorAll("main .section-title");

let lastId;
let cur = [];

// This should probably be throttled.
// Especially because it triggers during smooth scrolling.
// https://lodash.com/docs/4.17.10#throttle
// You could do like...
// window.addEventListener("scroll", () => {
//    _.throttle(doThatStuff, 100);
// });
// Only not doing it here to keep this Pen dependency-free.

window.addEventListener("scroll", (event) => {
  let fromTop = window.scrollY;

  mainNavLinks.forEach((link) => {
    let section = document.querySelector(link.hash);

    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add("current");
    } else {
      link.classList.remove("current");
    }
  });
});
