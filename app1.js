const auth = "563492ad6f91700001000001f5f4c5ce85f2494b83aa41783bec01f9";
const gallery = document.querySelector(".gallery");
const search = document.querySelector(".search-input");
const searchBtn = document.querySelector(".submit-btn");
const moreBtn = document.querySelector(".more");
let searchValue;
let currentSearch;
let fetchLink;
let page = 1;

search.addEventListener("input", (e) => {
  searchValue = e.target.value;
  currentSearch = e.target.value;
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchPhoto(currentSearch);
  clear();
});

moreBtn.addEventListener("click", morePhoto);

async function fetchData(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePhoto(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<div class="photoInfo">
    <p> ${photo.photographer}</p>
    <button><a href=${photo.src.large} target="_blank">Dowload</a></button>
    </div>
    <img src = ${photo.src.medium}> </img>
    `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhoto() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=6";
  const data = await fetchData(fetchLink);
  generatePhoto(data);
}

async function searchPhoto(query) {
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=3`;
  const data = await fetchData(fetchLink);
  generatePhoto(data);
}

async function morePhoto() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search/?page=${page}&per_page=1&query=${currentSearch}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated/?page=${page}&per_page=6`;
  }
  const data = await fetchData(fetchLink);
  generatePhoto(data);
}

function clear() {
  gallery.innerHTML = "";
  search.value = "";
}

curatedPhoto();
