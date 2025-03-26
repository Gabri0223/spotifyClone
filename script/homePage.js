const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const hideSpinner = function () {
  const div = document.getElementById("spinner-container");
  div.classList.add("d-none");
  const divContent = document.getElementById("content");
  divContent.classList.remove("d-none");
  const divContent2 = document.getElementById("content2");
  divContent2.classList.remove("d-none");
};

const h1 = document.querySelector("h1");
const getTime = new Date().getHours();
if (getTime <= 12 && getTime > 6) {
  h1.innerText = "Buongiorno!";
} else if (getTime < 18 && getTime > 12) {
  h1.innerText = "Buon pomeriggio!";
} else {
  h1.innerText = "Buonasera!";
}

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
      hideSpinner();
      const indexRandom = Math.ceil(Math.random() * 25);
      const id = document.getElementById(query);
      id.innerHTML = `
      <a href="albumPage.html?id=${data.data[0].artist.id}" class="text-decoration-none text-white h5">${query}</a>
      <a href="artistPage.html?id=${data.data[indexRandom].album.id}" class='text-white text-decoration-none'>Ascolta il nuovo album di ${query}</p>
      `;

      const img = document.querySelector(`img.${query}`);
      img.setAttribute("src", data.data[indexRandom].album.cover);
      console.log(img);
    })
    .catch((error) => {
      console.log("ERRORE NELLA FETCH", error);
    });
};

const getAlbano = function (query) {
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
      const divA = document.getElementById("Albano");
      const indexRandom = Math.ceil(Math.random() * 25);
      divA.innerHTML = `
      <div class="col-3">
                <img
                  class="w-100"
                  src="${data.data[indexRandom].album.cover_medium}"
                  alt="cover"
                />
              </div>
              <div class="col-6">
                <div class="col-12">
                  <p>ALBUM</p>
                </div>
                <div class="col-12">
                  <h2>${data.data[indexRandom].album.title}</h2>
                </div>
                <div class="col-12">
                  <p class="mt-2">${data.data[indexRandom].artist.name}</p>
                </div>
                <div class="col-12">
                  <p>Stefano, ascoltati tutto l'album!</p>
                </div>
                <div class="col-12">
                  <button
                    type="button"
                    class="btn btn-success px-4 rounded-pill mt-3"
                  >
                    Play
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-light px-4 rounded-pill mt-3"
                  >
                    Salva
                  </button>
                  <button
                    type="button"
                    class="btn btn-link fs-4 text-white text-decoration-none mt-2"
                  >
                    ...
                  </button>
                </div>
              </div>
              <div class="col-2">
                <button
                  type="button"
                  class="btn btn-secondary rounded-pill mt-3"
                  style="white-space: nowrap"
                >
                  Nascondi annunci
                </button>
              </div>
      `;
    })
    .catch((error) => {
      console.log("ERRORE NELLA FETCH", error);
    });
};
getAlbano("Albano");
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
const searchInputWrapperMobile = document.getElementById(
  "searchInputWrapperMobile"
);
searchIconMobile.addEventListener("click", function () {
  searchInputWrapperMobile.classList.toggle("d-none");
  spanCercaMobile.classList.toggle("d-none");
});

const getSearchedArtist = function (query) {
  const inputSearch = document.getElementById("inputSearch").value;
  const inputSearchMobile = document.getElementById("inputSearchMobile").value;

  query = inputSearch || inputSearchMobile;

  fetch(url + query, {})
    .then((response) => {
      console.log("RESPONSE", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella chiamata");
      }
    })
    .then((data3) => {
      console.log("DATA3", data3);

      window.location.assign(`albumPage.html?id=${data3.data[0].artist.id}`);
    })
    .catch((error) => {
      console.log("ERRORE nella ricerca", error);
    });
};
