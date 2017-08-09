// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
let musicPlayer = document.querySelector(".music-player");
let searchForm = document.querySelector("form");
let container = document.querySelector(".results");
let searchText;
let html;

searchForm.addEventListener("submit", getSearch);

function getSearch(event) {
  html = "";
  event.preventDefault();
  searchText = event.target.querySelector("input").value;
  event.target.querySelector("input").value = "";
  collectData(searchText);
};

function collectData(artist) {
  return fetch("https://itunes.apple.com/search?term=" + artist+ "&limit=20&media=music")
  .then (function(response){
    return response.json();
  }).then (function(data) {
    console.log(data);
    container.innerHTML = songsToDom(data);
  });
}

function songsToDom(songs) {
  for (let i = 0; i < songs.results.length; i++) {
    let currentSong = songs.results[i];
    html += `
    <div class="song-container">
      <h5>${currentSong.artistName}</h5>
      <h6>${currentSong.trackName}</h6>
    </div>
  `
  }
  return html;
}
