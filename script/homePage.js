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
      id.innerHTML = `
      <a href="albumPage.html?query=${query}" class="text-decoration-none text-white h5">${query}</a>
      <p class='text-white'>Ascolta il nuovo album di ${query}</p>
      `;
      const img = document.querySelector(`img.${query}`);
      img.setAttribute("src", data.data[2].album.cover);
      console.log(img);
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
getSong("Salmo");
getSong("Inna");
getSong("Madonna");
getSong("Alpha");
getSong("Shiva");
getSong("Sia");
