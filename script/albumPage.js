const URLparameters = new URLSearchParams(location.search);
const id = URLparameters.get("id");

const albumUrl = " https://striveschool-api.herokuapp.com/api/deezer/album/";

const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const myRow = document.getElementById("second-row");
const firstRow = document.getElementById("first-row");
const profileImg = document.getElementById("img");
const secondImg = document.getElementById("second-img");
const albumTitle = document.getElementById("titolo");
const artistName = document.getElementById("artist-name");
const heart = document.querySelectorAll(".heart");
const rightArrow = document.getElementById("arrow-right");

fetch(albumUrl + id)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error();
    }
  })
  .then((album) => {
    album = album.tracks.data;
    console.log(album);
    profileImg.setAttribute("src", album[0].album.cover_xl);
    secondImg.setAttribute("src", album[0].album.cover_xl);
    albumTitle.innerText = album[0].album.title;
    artistName.innerText = album[0].artist.name;

    colorThief(profileImg);
    rightArrow.addEventListener("click", function (e) {
      e.preventDefault();
      query = album[0].artist.id;
      window.location.assign(`albumPage.html?id=${query}`);
    });

    const title = document.createElement("div");
    const artist = document.createElement("span");
    const num = document.createElement("div");
    const riproduzioni = document.createElement("div");
    const durata = document.createElement("div");

    artist.classList.add("ts-6", "text-secondary", "fw-normal");
    num.classList.add(
      "col-1",
      "text-end",
      "my-auto",
      "text-secondary",
      "d-none",
      "d-lg-inline-block"
    );
    title.classList.add("col-6", "fw-bold");
    riproduzioni.classList.add(
      "col-4",
      "text-secondary",
      "my-auto",
      "ps-4",
      "d-none",
      "d-lg-inline-block"
    );
    durata.classList.add(
      "col-1",
      "text-secondary",
      "my-auto",
      "ps-4",
      "d-none",
      "d-lg-inline-block"
    );

    num.innerText = 1;
    artist.innerText = `${album[0].artist.name}`;
    title.innerHTML = `${album[0].title} <br> `;
    title.appendChild(artist);
    riproduzioni.innerText = new Intl.NumberFormat("it-IT").format(
      `${album[0].rank}`
    );
    minuti = `${(album[0].duration / 60).toFixed(0)}`;
    secondi = `${album[0].duration % 60}`;
    secondi = secondi.padStart(2, "0");
    durata.innerText = minuti.toString() + ":" + secondi.toString();

    firstRow.appendChild(num);
    firstRow.appendChild(title);
    firstRow.appendChild(riproduzioni);
    firstRow.appendChild(durata);

    album.slice(1).forEach((track, i) => {
      const title = document.createElement("div");
      const artist = document.createElement("span");
      const num = document.createElement("div");
      const riproduzioni = document.createElement("div");
      const durata = document.createElement("div");

      artist.classList.add("ts-6", "text-secondary", "fw-normal");
      num.classList.add(
        "col-1",
        "text-end",
        "my-auto",
        "text-secondary",
        "d-none",
        "d-lg-inline-block"
      );
      title.classList.add("col-lg-6", "fw-bold", "mb-2", "col-11");
      riproduzioni.classList.add(
        "col-4",
        "text-secondary",
        "my-auto",
        "ps-4",
        "d-none",
        "d-lg-inline-block"
      );
      durata.classList.add(
        "col-1",
        "text-secondary",
        "my-auto",
        "ps-4",
        "d-none",
        "d-lg-inline-block"
      );

      num.innerText = i + 2;
      artist.innerText = `${track.artist.name}`;
      title.innerHTML = `${track.title} <br> `;
      title.appendChild(artist);
      riproduzioni.innerText = new Intl.NumberFormat("it-IT").format(
        `${track.rank}`
      );
      minuti = `${(track.duration / 60).toFixed(0)}`;
      secondi = `${track.duration % 60}`;
      secondi = secondi.padStart(2, "0");
      durata.innerText = minuti.toString() + ":" + secondi.toString();

      myRow.appendChild(num);
      myRow.appendChild(title);
      myRow.appendChild(riproduzioni);
      myRow.appendChild(durata);
    });
  })
  .catch((err) => {
    console.log("errore:", err);
  });

const colorThief = function (img) {
  const sfumatura = document.getElementById("sfumatura");
  const colorThief = new ColorThief();
  if (img.complete) {
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
};

//like button
heart.forEach((heart) => {
  heart.addEventListener("click", function () {
    heart.classList.toggle("bi-heart-fill");
    heart.classList.toggle("text-success");
    heart.classList.toggle("bi-heart");
  });
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
