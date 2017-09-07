const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function drawGui() {
  console.log('\n'
    + '   A' + '   B  ' + ' C ' + '\n' +
    '0  ' + board[0][0] + ' | ' + board[0][1] + ' | ' + board[0][2] +
    '\n--------------\n' +
    '1  ' + board[1][0] + ' | ' + board[1][1] + ' | ' + board[1][2] +
    '\n--------------\n' +
    '2  ' + board[2][0] + ' | ' + board[2][1] + ' | ' + board[2][2]
  )
}

let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
]

let playerSymbol = '';
let game = true;

function calculateColumn(column) {
  if (column === 'A') {
    return 0
  } else if (column === 'B') {
      return 1
  } else if (column === 'C') {
      return 2
  }
}

function analyzeBoard() {
  for(var row=0; row<board.length; row++) {
    for(var column=0; column<board[row].length; column++) {
      console.log(row, column)
      if (board[row][column] == ' ') {
        board[row][column] = computer.symbol
        return;
      }
    }
  }
}

var move = function(player) {
  drawGui();
  rl.question(player.name + ' Where would you like to move: ', (answer) => {
    if (answer == 'exit') {
      return rl.close();
    }
    let coordinates = answer.split('');
    let column = calculateColumn(coordinates[0]);
    let row = coordinates[1];
    if(board[row][column] != ' ') {
      console.log('Coordinate is already occupied');
      move();
    } else {
      board[row][column] = player.symbol;
      //at the end of action set that player's turn to the opposite of what it is
      //in this case that is false, this enable the other player to go
      player.turn = !player.turn;
      checkMove();
    }
  })
}

function computerMove() {
  analyzeBoard()
  drawGui()
  computer.turn = !computer.turn;
  checkMove();
}

var chooseSymbol = function(player) {
  rl.question(player + ' please pick X or O: ', (answer) => {
    if((answer.toLowerCase() != 'x') && (answer.toLowerCase() != 'o')) {
      chooseSymbol();
    } else {
        playerOne.symbol = answer;
        if(playerOne.symbol.toLowerCase() == 'x') {
          computer.symbol = 'O'
        } else {
          computer.symbol = 'X'
        }
        console.log('Computer is: ', computer.symbol)
        checkMove();
      }
  })
}

function checkMove() {
  // at start of game playerOne turn is set to true
  if(playerOne.turn == true) {
    move(playerOne)
    //execute move, then set computer turn to opposite of whatever it is
    //at start of game it is false
    computer.turn = !computer.turn
  } else if (computer.turn == true) {
    playerOne.turn = !playerOne.turn
    computerMove();
  }
}

let playerOne = {
  name: 'Player One',
  turn: true,
  symbol: null
}

let computer = {
  name: 'Computer',
  turn: false,
  symbol: null
}

chooseSymbol('Player One');
