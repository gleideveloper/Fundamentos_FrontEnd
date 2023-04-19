const cellItems = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMsg = document.querySelector("[data-winning-msg]");
const winningMsgTextItem = document.querySelector("[data-winning-mgs-text]");
const restartButton = document.querySelector("[data-restart-button]");

let whoIsPlayer;

const victory = [
  //  vitórias na horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //  vitórias na vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //  vitórias na diagonal
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  whoIsPlayer = false;
  for (const cell of cellItems) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMsg.classList.remove("show-winning-message");
};

const endGame = (isGamOver) => {
  if (isGamOver) {
    winningMsgTextItem.innerText = whoIsPlayer ? "O Venceu!" : "X Venceu!";
  } else {
    winningMsgTextItem.innerText = "Empate!";
  }
  winningMsg.classList.add("show-winning-message");
};

const checkForWin = (currentPlayer) => {
  return victory.some((combination) => {
    return combination.every((index) => {
      return cellItems[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellItems].every((cell) => {
    let item = cell.classList;
    return item.contains("x") || item.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("x");
  board.classList.remove("circle");

  if (whoIsPlayer) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const swapTurns = () => {
  whoIsPlayer = !whoIsPlayer;
  setBoardHoverClass();
};

const handleClick = (e) => {
  // Colocar sinal X ou Circulo
  const cell = e.target;
  const classToAdd = whoIsPlayer ? "circle" : "x";

  placeMark(cell, classToAdd);

  // Verifica a vitória
  const isWin = checkForWin(classToAdd);
  // Verifica empate
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(true);
  } else if (isDraw) {
    endGame(false);
  }
  // Mudar o Simbolo
  swapTurns();
};

startGame();

restartButton.addEventListener("click", startGame);
