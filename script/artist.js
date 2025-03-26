const URLparameters = new URLSearchParams(location.search);

const artistId = URLparameters.get("id");

const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const getArtistDetails = function () {
  fetch(artistUrl + artistId)
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nel recupero dei dettagli");
      }
    })
    .then((data) => {
      console.log("DATA", data);

      const divName = document.getElementById("name");
      divName.setAttribute(
        "style",
        `background-image: url(${data.picture_big});background-size: 100% auto;
  background-position: 50% 30%;
  background-repeat: no-repeat;
  width: auto;`
      );

      const rowInfo = document.getElementById("info-artist");
      rowInfo.innerHTML = `
<div class="col-12 mt-5">
<p> <i class="bi bi-patch-check-fill text-primary"></i> Artista verificato</p>
</div>
<div class="col-12">
<h1>${data.name}</h1>
</div>
<div class="col-12">
<p> ${data.nb_fan} ascoltatori mensili</p>
</div>
`;

      const indexRandom = Math.ceil(Math.random() * 25);

      const likedTracks = document.getElementById("liked-tracks");
      likedTracks.innerHTML = `
      <div class="col-3 px-1">
      <img class="w-100 rounded-circle" src="${data.picture_small}" alt="artist-pic">
      </div>
      <div class="col-9 px-2">
      <h6>Ti sono piaciuti ${indexRandom} brani </h6>
      <p>Di ${data.name}</p>
      </div>
      `;

      const likedMobile = document.getElementById("liked-mobile");
      likedMobile.innerHTML = `
      <div class="col-3 px-1">
      <img class="w-100 rounded-circle" src="${data.picture_small}" alt="artist-pic">
      </div>
      <div class="col-9 px-2">
      <h6>Ti sono piaciuti ${indexRandom} brani </h6>
      <p>Di ${data.name}</p>
      </div>
      `;

      const getAlbums = function () {
        fetch(albumUrl + data.name)
          .then((response2) => {
            console.log("RESPONSE2", response2);
            if (response2.ok) {
              return response2.json();
            } else {
              throw new Error("errore 2");
            }
          })
          .then((data2) => {
            console.log("DATA2", data2);
            const trackList = document.getElementById("track-list");

            data2.data.splice(0, 5).forEach((element, i) => {
              trackList.innerHTML += `
              <div class="col-1">
              <p>${i + 1}</p>
              </div>
              <div class="col-2">
              <img class="w-100" src="${
                element.album.cover_small
              }" alt="cover-pic">
              </div>
              <div class="col-4">
              <h6 id="${element.title}">${element.title}</h6>
              </div>
              <div class="col-3">
              <p>${element.rank}</p>
              </div>
              <div class="col-2">
              <p>${Math.floor(element.duration / 60)}:${(element.duration % 60)
                .toString()
                .padStart(2, "0")}</p>
              </div>
              `;
            });
          })
          .catch((error2) => {
            console.log("errore2!!", error2);
          });
      };
      getAlbums();
    })
    .catch((error) => {
      console.log("ERRORE NEL RECUPERO DEI DATI", error);
    });
};

getArtistDetails();

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

  query = inputSearch;

  fetch(albumUrl + query, {})
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
