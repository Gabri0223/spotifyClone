const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const getSearchedArtist = function (query) {
  const inputSearchMobile = document.getElementById("inputSearchMobile").value;

  query = inputSearchMobile;

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
