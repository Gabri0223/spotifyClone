const URLparameters = new URLSearchParams(location.search);

const artistId = URLparameters.get("id");

const artistUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

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
  background-position: center;
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
    })
    .catch((error) => {
      console.log("ERRORE NEL RECUPERO DEI DATI", error);
    });
};

getArtistDetails();
