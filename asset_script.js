//javascript of second page to only give access if it is signed in
if (localStorage.getItem("name")) {
  //show welcome container
  //   const parsed = JSON.parse(localStorage.getItem("name"));
  //   document.body.innerHTML = `Welcome back ${parsed[0]} ${parsed[1]}!`;
} else {
  window.location = "index.html";
}
