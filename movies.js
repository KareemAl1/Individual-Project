console.log("Movies page loaded");

// Get elements
const resultsEl = document.getElementById("results");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const sortLowHighBtn = document.getElementById("sortLowHigh");
const sortHighLowBtn = document.getElementById("sortHighLow");

// This will store the movies from the last search
let currentMovies = [];

// Create the HTML for ONE movie card
function movieHTML(movie) {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/250x370?text=No+Image";

  return `
    <div class="movie-card">
      <div class="movie-card__image-wrapper">
        <img class="movie-card__img" src="${poster}" alt="${movie.Title}" />

        <div class="movie-card__overlay">
          <h3 class="movie-card__title">${movie.Title}</h3>
          <p class="movie-card__meta"><b>Year:</b> ${movie.Year}</p>
          <p class="movie-card__meta"><b>Type:</b> ${movie.Type}</p>
        </div>
      </div>
    </div>
  `;
}

// Show a list of movies on the page
function showMovies(movies) {
  resultsEl.innerHTML = movies.map((movie) => movieHTML(movie)).join("");
}

// Fetch movies from the API and display them
async function searchMovies() {
  const title = searchInput.value.trim();

  if (!title) {
    resultsEl.textContent = "Please type a movie title.";
    currentMovies = [];
    return;
  }

  resultsEl.textContent = "Loading...";

  const response = await fetch(
    `https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=ea3e9799`
  );
  const data = await response.json();

  if (!data.Search) {
    resultsEl.textContent = "No movies found.";
    currentMovies = [];
    return;
  }

  // Save movies so we can sort them later
  currentMovies = data.Search;

  // Display them
  showMovies(currentMovies);
}

// Sort from low year to high year
function sortLowToHigh() {
  if (!currentMovies.length) {
    return; // nothing to sort
  }

  currentMovies.sort((a, b) => a.Year - b.Year);
  showMovies(currentMovies);
}

// Sort from high year to low year
function sortHighToLow() {
  if (!currentMovies.length) {
    return; // nothing to sort
  }

  currentMovies.sort((a, b) => b.Year - a.Year);
  showMovies(currentMovies);
}

// When the user clicks the search button
searchButton.addEventListener("click", searchMovies);

// When the user presses Enter inside the input
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchMovies();
  }
});

// When the user clicks "Year ↑"
sortLowHighBtn.addEventListener("click", sortLowToHigh);

// When the user clicks "Year ↓"
sortHighLowBtn.addEventListener("click", sortHighToLow);

// Auto-search if we came from the home page with ?search= in the URL
const params = new URLSearchParams(window.location.search);
const initialSearch = params.get("search");

if (initialSearch) {
  searchInput.value = initialSearch;
  searchMovies();
}
