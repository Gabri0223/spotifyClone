document.addEventListener("DOMContentLoaded", function () {
  const img = document.getElementById("img");
  const sfumatura = document.getElementById("sfumatura");
  const colorThief = new ColorThief();
  if (img.complete) {
    console.log("bo");
    setBackground();
  } else {
    img.addEventListener("load", setBackground);
  }
  function setBackground() {
    const dominantColor = colorThief.getColor(img);
    const gradient = `linear-gradient(to bottom, rgb(${dominantColor.join(
      ","
    )}), black)`;
    sfumatura.style.background = gradient;
  }
});

// bottone cerca desktop
const spanCerca = document.getElementById("spanCerca");
const searchIcon = document.getElementById("searchIcon");
const searchInputWrapper = document.getElementById("searchInputWrapper");
searchIcon.addEventListener("click", function () {
  searchInputWrapper.classList.toggle("d-none");
  spanCerca.classList.toggle("d-none");
});
// bottone cerca mobile
const spanCercaMobile = document.getElementById("spanCercaMobile");
const searchIconMobile = document.getElementById("searchIconMobile");
const searchInputWrapperMobile = document.getElementById("searchInputWrapperMobile");
searchIconMobile.addEventListener("click", function () {
  searchInputWrapperMobile.classList.toggle("d-none");
  spanCercaMobile.classList.toggle("d-none");
});