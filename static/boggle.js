const $playedWords = document.querySelector("#words");
const $form = document.querySelector("#newWordForm");
const $wordInput = document.querySelector("#wordInput");
const $message = document.querySelector(".msg");
const $table = document.querySelector("table");

let gameId;


/** Start */

async function start() {
  const response = await fetch(`/api/new-game`, {
    method: "POST",
  });
  const gameData = await response.json();

  gameId = gameData.gameId;
  const board = gameData.board;

  displayBoard(board);
}


/** Display board */

function displayBoard(board) {
  $table.innerHTML = '';
  const $tableBody = $table.createTBody();
  
  for(let row = 0; row < board.length; row++){
    const $row = $tableBody.insertRow();
    for(let column = 0; column < board[row].length; column++){
      const $letter = $row.insertCell();
      $letter.innerText = board[row][column];
    }
  } 
  
}


/** Handle form submit
 *
 *  - submits word to API
 *  - displays outcome in DOM
 */

async function handleFormSubmit(evt) {
  // TODO
}


// TODO: add an event listener for the form submission


/** Submit word to API and return result from the response. */

async function submitWordToAPI(word) {
  // TODO
}


/** Display outcome in DOM based on result of submitting word to API
 *
 * not-word:
 *  - shows an invalid word message
 *
 * not-on-board:
 *  - shows a not on board message
 *
 * ok:
 *  - shows a success message
 *  - adds word to the played words list
 */

function displayOutcome(result, word) {
  // TODO
}


export { start };
