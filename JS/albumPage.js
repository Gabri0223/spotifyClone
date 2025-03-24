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
