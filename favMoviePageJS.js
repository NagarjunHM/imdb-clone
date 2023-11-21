const movie = JSON.parse(localStorage.getItem("viewDetail"));
console.log(movie);
const card = document.querySelector(".card");

document.addEventListener("DOMContentLoaded", (e) => {
  const ui = `  <div class="row g-0">
        <div class="col-sm-6 col-md-5 col-lg-3">
            <img src=${movie.Poster}
                class="img-fluid rounded-start" alt="Movie Poster">
        </div>
        <div class="col-sm-6 col-md-7 col-lg-9">
            <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <hr>
                <p class="card-text"><span class="fw-normal">Released : ${movie.Released}</p>
                <p class="card-text"><span class="fw-normal">Genre : ${movie.Genre}</p>
                <p class="card-text"><span class="fw-normal">Plot : ${movie.Plot}</p>
                <p class="card-text"><span class="fw-normal">Runtime : ${movie.Runtime}</p>
                <p class="card-text"><span class="fw-normal">Language : ${movie.Language}</p>
                <p class="card-text"><span class="fw-normal">Director : ${movie.Director}</p>
                <p class="card-text"><span class="fw-normal">Awards : ${movie.Awards}</p>
                <p class="card-text"><span class="fw-normal">Rating : ${movie.imdbRating} / 10 <img src="/static/star.png" style="width:25px;margin-top:-7px" alt=""></p>              
                <div class="likeViewButtons position-absolute bottom-0 end-0 m-2">
                <img src="/static/heart.png" class="m-1 heart" style="width:50px" alt="">
                <img src="/static/heartRed.png" class="m-1 redHeart" style="width:50px" alt="">                
            </div>
            </div>
        </div>
    </div>`;

  card.innerHTML = ui;

  const heart = document.querySelector(".heart");
  const redHeart = document.querySelector(".redHeart");

  if (localStorage.getItem(movie.imdbID)) {
    heart.classList.add("visibility");
    redHeart.classList.remove("visibility");
  } else {
    heart.classList.remove("visibility");
    redHeart.classList.add("visibility");
  }

  heart.addEventListener("click", () => {
    heart.classList.toggle("visibility");
    redHeart.classList.toggle("visibility");
    localStorage.setItem(movie.imdbID, JSON.stringify(movie));
  });

  redHeart.addEventListener("click", () => {
    heart.classList.toggle("visibility");
    redHeart.classList.toggle("visibility");
    localStorage.removeItem(movie.imdbID);
  });
});
const cardBody = document.querySelector(".cardBody");

for (let i = 0; i < localStorage.length; i++) {
  let movieKey = localStorage.key(i);
  if (movieKey == "viewDetail" || movieKey == "theme") {
    continue;
  }
  let movieValue = JSON.parse(localStorage.getItem(movieKey));
  console.log(movieValue.Title);

  let ui = `<div class="card m-4 shadow-sm" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-5">
                <img src=${movieValue.Poster}
                    class="img-fluid rounded-start" alt="Movie Poster">
            </div>
            <div class="col-7">
                <div class="card-body">
                    <h5 class="card-title">${movieValue.Title}</h5>
                    <hr>
                    <p class="card-text"><span class="fw-lighter">Plot : </span>${movieValue.Plot}</p>
                    <p class="card-text"><span class="fw-lighter">Year : </span>${movieValue.Year}</p>
                    <p class="card-text"><span class="fw-lighter">Rating : </span>${movieValue.imdbRating}/10</p>
                    <div class="likeViewButtons position-absolute bottom-0 end-0 m-2">
                        <img src="/static/eye.png" class="m-1 viewDetail" id=${movieValue.imdbID} style="width:25px"  alt="">
                        <img src="/static/heart.png" class="m-1 visibility heart" style="width:25px" alt="">
                        <img src="/static/heartRed.png" class="m-1 redHeart" id=${movieValue.imdbID} style="width:25px" alt="">                
                    </div>
                </div>
            </div>
        </div>
        </div>`;

  cardBody.innerHTML += ui;

  // const heart = document.querySelectorAll('.heart');
  const redHeart = document.querySelectorAll(".redHeart");
  const viewDetail = document.querySelectorAll(".viewDetail");

  redHeart.forEach((heart) => {
    heart.addEventListener("click", (e) => {
      const targetMovie = e.target;
      targetMovie.parentElement.parentElement.parentElement.parentElement.parentElement.classList.toggle(
        "visibility"
      );
      localStorage.removeItem(targetMovie.id);
    });
  });

  viewDetail.forEach((detail) => {
    detail.addEventListener("click", (e) => {
      const targetMovie = e.target.id;
      console.log(targetMovie);
      localStorage.setItem("viewDetail", localStorage.getItem(targetMovie));
      // console.log(localStorage.getItem(targetMovie));
      window.location.href = "/movieDetailPage.html";
    });
  });
}
