const search = document.querySelector("#searchMovie");
const autoCompList = document.querySelector(".autoCompList");
const cardBody = document.querySelector(".cardBody");
const pBar = document.querySelector(".pBar");
let list = [];
let tempselectList = [];

// function to render the Movie Card with like and view detail button
const renderCard = (imdbID) => {
  tempselectList = list.filter((element) => {
    return element.imdbID === imdbID;
  });
  console.log(localStorage.key(imdbID));
  console.log(imdbID);

  let ui = `<div class="card m-4 shadow-sm" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-5">
            <img src=${tempselectList[0].Poster}
                class="img-fluid rounded-start" alt="Movie Poster">
        </div>
        <div class="col-7">
            <div class="card-body">
                <h5 class="card-title">${tempselectList[0].Title}</h5>
                <hr>
                <p class="card-text"><span class="fw-lighter">Plot : </span>${tempselectList[0].Plot}</p>
                <p class="card-text"><span class="fw-lighter">Year : </span>${tempselectList[0].Year}</p>
                <p class="card-text"><span class="fw-lighter">Rating : </span>${tempselectList[0].imdbRating}/10</p>
                <div class="likeViewButtons position-absolute bottom-0 end-0 m-2">
                    <img src="/static/eye.png" class="m-1 viewDetail" style="width:25px"  alt="">
                    <img src="/static/heart.png" class="m-1 heart" style="width:25px" alt="">
                    <img src="/static/heartRed.png" class="m-1  visibility redHeart" style="width:25px" alt="">                
                </div>
            </div>
        </div>
    </div>
    </div>`;
  cardBody.innerHTML = ui;

  const heart = document.querySelector(".heart");
  const redHeart = document.querySelector(".redHeart");
  const viewDetail = document.querySelector(".viewDetail");

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) == imdbID) {
      heart.classList.toggle("visibility");
      redHeart.classList.toggle("visibility");
    }
  }

  heart.addEventListener("click", () => {
    localStorage.setItem(
      tempselectList[0].imdbID,
      JSON.stringify(tempselectList[0])
    );
    heart.classList.toggle("visibility");
    redHeart.classList.toggle("visibility");
  });

  redHeart.addEventListener("click", () => {
    heart.classList.toggle("visibility");
    redHeart.classList.toggle("visibility");
    localStorage.removeItem(tempselectList[0].imdbID);
  });

  viewDetail.addEventListener("click", () => {
    localStorage.setItem("viewDetail", JSON.stringify(tempselectList[0]));
    window.location.href = "/movieDetailPage.html";
  });
};

// function to render the list on display
const renderSearchList = (list) => {
  const ui = list.map((element) => {
    return ` <button type="button" id=${element["imdbID"]} class="list-group-item list-group-item-action searchButton">${element["Title"]}</button>`;
  });
  autoCompList.innerHTML = ui.join("");

  const searchButton = document.querySelectorAll(".searchButton");
  searchButton.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      renderCard(e.target.id);
      pBar.style.width = "0%";
    });
  });
};

// function to display the No Suggestion Message
const addNoSuggestion = () => {
  const ui = `<button type="button" class="list-group-item list-group-item-action disabled">No Suggestion</button>`;
  autoCompList.innerHTML = ui;
};

// function that makes an api request when the input changes
const searchMovie = async (e) => {
  pBar.style.width = "25%";
  const result = await fetch(
    `http://www.omdbapi.com/?t=${e.target.value}&apikey=301dbfd`
  )
    .then((res) => res.json())
    .catch((error) => error)
    .finally(() => {
      pBar.style.width = "100%";
    });
  if (result["Response"] != "False") {
    list.push(result);
    renderSearchList(list);
  } else {
    addNoSuggestion();
  }
};

// Search Bar event handler
search.addEventListener("input", (e) => {
  list = [];

  renderSearchList(list);
  if (e.target.value.length > 0) {
    searchMovie(e);
  } else {
    cardBody.innerHTML = "";
    selectList = [];
    pBar.style.width = "0%";
  }
});
