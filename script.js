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
