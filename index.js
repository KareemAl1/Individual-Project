console.log("Home page loaded");

const homeSearchInput = document.getElementById("homeSearchInput");
const homeSearchButton = document.getElementById("homeSearchButton");

homeSearchButton.addEventListener("click", () => {
  const query = homeSearchInput.value.trim();
  if (!query) return;

  window.location.href = `movies.html?search=${encodeURIComponent(query)}`;
});

// Press Enter to search
homeSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = homeSearchInput.value.trim();
    if (!query) return;

    window.location.href = `movies.html?search=${encodeURIComponent(query)}`;
  }
});
