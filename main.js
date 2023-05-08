const cells = [...document.querySelectorAll("table td")];
const level = document.querySelector("#level");
let scorePK = 0;
let scorePlayer = 0;
const btnStart = document.querySelector(".btn-start");
const btnStop = document.querySelector(".btn-stop");
function flashCell() {
  if (level.value == "easy") {
    setTime = 1500;
  }
  if (level.value == "medium") {
    setTime = 1000;
  }
  if (level.value == "hard") {
    setTime = 500;
  }
  if (scorePK > 10) {
    alert("You lose");
    return location.reload();
  }
  if (scorePlayer > 10) {
    alert("You win");
    return location.reload();
  }
  function getRandomCell(cells) {
    const randomIndex = Math.floor(Math.random() * cells.length);
    const randomCell = cells[randomIndex];
    cells.splice(randomIndex, 1);
    return randomCell;
  }

  const usedCells = [];
  let randomCell;
  while (!randomCell && cells.length > 0) {
    const potentialCell = getRandomCell(cells);
    if (!usedCells.includes(potentialCell)) {
      usedCells.push(potentialCell);
      randomCell = potentialCell;
    }
  }
  if (randomCell) {
    randomCell.style.backgroundColor = "blue";
  }

  setTimeout(() => {
    if (randomCell.style.backgroundColor === "blue") {
      randomCell.style.backgroundColor = "red";
      scorePK += 1;
      document.querySelector(".score-pk__number").textContent = scorePK;
    }
  }, setTime);

  randomCell.addEventListener("click", () => {
    if (randomCell.style.backgroundColor === "blue") {
      randomCell.style.backgroundColor = "green";
      scorePlayer += 1;
      document.querySelector(".score-player__number").textContent = scorePlayer;
    }
  });

  timerId = setTimeout(() => {
    if (randomCell.style.backgroundColor === "blue") {
      randomCell.style.backgroundColor = "red";
      scorePK += 1;
      document.querySelector(".score-pk__number").textContent = scorePK;
    }
    flashCell();
  }, setTime + 500);
}

btnStart.addEventListener("click", flashCell);
btnStop.addEventListener("click", () => location.reload());
