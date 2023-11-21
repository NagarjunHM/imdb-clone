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
