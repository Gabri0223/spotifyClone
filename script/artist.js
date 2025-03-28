const URLparameters = new URLSearchParams(location.search);

const artistId = URLparameters.get("id");

const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

const albumUrl = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const footerAudio = document.getElementById("footerAudio");
const playerButton = document.getElementById("playerButton");
const playMobile = document.getElementById("playMobile");

playerButton.addEventListener("click", function () {
  if (footerAudio.paused) {
    footerAudio.play(); // Riprendi la riproduzione
    playerButton.innerHTML = '<i class="bi bi-pause-circle-fill fs-1"></i>'; // Cambia l'icona in "pausa"
  } else {
    footerAudio.pause(); // Metti in pausa
    playerButton.innerHTML = '<i class="bi bi-play-circle-fill fs-1"></i>'; // Cambia l'icona in "play"
  }
});
playMobile.addEventListener("click", function () {
  if (footerAudio.paused) {
    footerAudio.play(); // Riprendi la riproduzione
    playMobile.innerHTML = '<i class="bi bi-pause-fill fs-1 text-success"></i>'; // Cambia l'icona in "pausa"
  } else {
    footerAudio.pause(); // Metti in pausa
    playMobile.innerHTML = '<i class="bi bi-play-fill fs-1 text-success"></i>'; // Cambia l'icona in "play"
  }
});

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
      <div class="fs-3 d-lg-none mb-5 pt-2">
      <span class="bg-secondary d-inline-flex align-items-center justify-content-center rounded-circle bg-opacity-50" id="buttonArrow">
      <i class="bi bi-arrow-left text-black"></i>
      </span>
      </div>
<div class="col-12 mt-5">
<p class="mb-0 d-none d-lg-inline fs-5"><i class="bi bi-patch-check-fill text-primary"></i> Artista verificato</p>
</div>
<div class="col-12 mb-lg-3 ">
<h1 class="fw-bolder titolo">${data.name}</h1>
</div>
<div class="col-12 d-flex d-none d-lg-inline mb-xl-5">
<p class="mb-xl-5"> ${data.nb_fan} ascoltatori mensili</p>
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
      <div class="col-2 px-1">
      <img class="w-100 rounded-circle" src="${data.picture_big}" alt="artist-pic">
      </div>
      <div class="col-10 px-2 d-flex flex-column justify-content-center">
      <h6 class="ms-3">Ti sono piaciuti ${indexRandom} brani </h6>
      <p class="ms-3">Di ${data.name}</p>
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
              <p class="my-auto">${i + 1}</p>
              </div>
              <div class="col-2">
              <img class="w-100 mb-xl-2" src="${
                element.album.cover_big
              }" alt="cover-pic">
              </div>
              <div class="col-8 col-lg-4 ">
              <h6 class="track-title h-75 mb-0 d-flex align-items-center" data-preview=${
                element.preview
              }
              data-album-cover="${element.album.cover_big}" 
                data-artist-name="${element.artist.name}" 
                data-duration="${Math.floor(element.duration / 60)}:${(
                element.duration % 60
              )
                .toString()
                .padStart(2, "0")}">${element.title}</h6>
              </div>
              <div class="col-3 d-none d-lg-inline">
              <small>${element.rank}</small>
              </div>
              <div class="col-2 d-none d-lg-inline">
              <small>${Math.floor(element.duration / 60)}:${(
                element.duration % 60
              )
                .toString()
                .padStart(2, "0")}</small>
              </div>
              <div class="col-1 d-inline d-lg-none"><a href="#" class="text-decoration-none text-white"><i class="bi bi-three-dots-vertical"></i></a></div>`;
            });

            // Aggiungi un event listener per ogni <h6> generato
            const trackTitles = document.querySelectorAll(".track-title");
            trackTitles.forEach((track) => {
              track.addEventListener("click", function () {
                const footerAudio = document.getElementById("footerAudio");
                const footerImg = document.getElementById("footerImg");
                const footerTitle = document.getElementById("footerTitle");
                const footerArtist = document.getElementById("footerArtist");
                const footerDurata = document.getElementById("footerDurata");
                const titoloScorrevole =
                  document.getElementById("titoloScorrevole");
                const mobilePic = document.getElementById("mobilePic");

                // Aggiorna i contenuti del footer e playerMobile

                footerAudio.src = this.getAttribute("data-preview");
                footerImg.src = this.getAttribute("data-album-cover");
                mobilePic.src = this.getAttribute("data-album-cover");
                footerTitle.innerText = this.innerText;
                titoloScorrevole.innerText =
                  this.innerText +
                  " - " +
                  this.getAttribute("data-artist-name");
                footerArtist.innerText = this.getAttribute("data-artist-name");
                footerDurata.innerText = this.getAttribute("data-duration");
              });
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
