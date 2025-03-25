const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const getSong = function (query) {
  fetch(url + query, {})
    .then((response) => {
      console.log("RESPONSE", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella chiamata");
      }
    })
    .then((data) => {
      console.log("DATA", data);
      const id = document.getElementById(query);
      id.innerText = query;
      id.addEventListener("click", function () {});
    })
    .catch((error) => {
      console.log("ERRORE NELLA FETCH", error);
    });
};

getSong("Annalisa");
getSong("Lazza");
getSong("Eminem");
getSong("Olly");
getSong("Giorgia");
getSong("Rihanna");
getSong("Tony Effe");
getSong("Inna");
getSong("Madonna");
getSong("Post Malone");
getSong("David Guetta");
getSong("Sia");
