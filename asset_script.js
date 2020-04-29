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
