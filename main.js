let container = document.querySelector(".container");
let seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
let movieSelect = document.getElementById("movieSelect");


let ticketPrice = +movieSelect.value;


container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});


movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  saveMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});


const saveMovieData = (movieIndex, moviePrice) => {

  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("moviePrice", moviePrice);

};


const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem("selectedSeat", JSON.stringify(seatIndex));
  count.innerHTML = selectedSeats.length;
  total.innerHTML = selectedSeats.length * ticketPrice;
};

const getDataFromLocalStorage = () => {

  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeat"));
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((item, index) => {
      if (selectedSeats.indexOf(index) > -1) item.classList.add("selected");
    });
  }

  const selectedMovieIndex = localStorage.getItem("movieIndex");
  const moviePrice = localStorage.getItem("moviePrice");

  if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    ticketPrice = +moviePrice;
  }
};

getDataFromLocalStorage();
updateSelectedCount();
