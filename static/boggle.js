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

  // TODO: not themselves row and col, use y and x
  // will want to distinguish between actual row and col vs the indices
  // TODO: can just use for...of loops
  for (let row = 0; row < board.length; row++) {

    const $row = $tableBody.insertRow();

    for (let column = 0; column < board[row].length; column++) {

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

  evt.preventDefault();

  //TODO: only use response to mean the response object
  const word = $wordInput.value.toUpperCase();
  const apiResponse = await submitWordToAPI(word);

  displayOutcome(apiResponse.result, word);

  $wordInput.value = '';

}

// add an event listener for the form submission
$form.addEventListener("submit", handleFormSubmit);


/** Submit word to API and return result from the response. */

async function submitWordToAPI(word) {

  const response = await fetch('/api/score-word', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ gameId, word })
  })

  //TODO: could just destructure and return the object you want
  return await response.json();

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

  //TODO: $message.innerText = someFunction(result,word) to also be able
  // to add a class
  if (result === "not-word") {
    $message.innerText = "Word not in dictionary!";
  }

  else if (result === "not-on-board") {
    $message.innerText = "Word not on game board!";
  }

  else if (result === "word-is-dupe") {
    $message.innerText = "Word has already been entered!";
  }

  else {
    $message.innerText = "Valid word entered!";
    const $playedWord = document.createElement('li');
    $playedWord.innerHTML = word;
    $playedWords.append($playedWord);
  }

}


export { start };
