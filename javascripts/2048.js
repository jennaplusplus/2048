var Game = function() {
  this.board = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
  this.addTile();
  this.addTile();
};

Game.prototype.moveTile = function(tile, direction) {
  var b = this.board;
  var currentTile;
  var currentRow;
  var locations = [];
  for (var t = 0; t < tile.length; t++) {
    var curr = tile[t];
    locations.push([$(curr).attr("data-row").replace("r", ""), $(curr).attr("data-col").replace("c", "")]);
  }

  switch(direction) {
    case 38: //up
      console.log('up');

      locations.sort();
      locations.forEach(function(loc) {
        currentTile = $('.tile[data-row="r' + loc[0] + '"][data-col="c' + loc[1] + '"]')[0];
        currentRow = Number(loc[0]);
        while ((currentRow-1) >= 0 && b[currentRow-1][loc[1]] === 0) {
          b[currentRow-1][loc[1]] = b[currentRow][loc[1]];  // set value of new space
          b[currentRow][loc[1]] = 0; // vacate current space
          $(currentTile).attr("data-row", "r" + (currentRow-1));  // update tile attributes
          currentRow--;
        }
      });
      break;

    case 40: //down
      console.log('down');

      locations.sort().reverse();
      console.log(locations);
      locations.forEach(function(loc) {
        currentTile = $('.tile[data-row="r' + loc[0] + '"][data-col="c' + loc[1] + '"]')[0];
        currentRow = Number(loc[0]);
        while ((currentRow+1) <= 3 && b[currentRow+1][loc[1]] === 0) {
          b[currentRow+1][loc[1]] = b[currentRow][loc[1]];  // set value of new space
          b[currentRow][loc[1]] = 0; // vacate current space
          $(currentTile).attr("data-row", "r" + (currentRow+1));  // update tile attributes
          currentRow++;
        }
      });
      break;

    case 37: //left
      console.log('left');

      for (var col = 1; col < this.board.length; col++) {
        for (var row = 0; row < this.board[col].length; row++) {
          if (this.board[row][col] !== 0) {
            currentTile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"]')[0]; // grab the tile that we're talking about
            var currentCol = col;
            // move it up as far as allowed
            while ((currentCol-1) >= 0 && this.board[row][currentCol-1] === 0) {
              this.board[row][currentCol-1] = this.board[row][currentCol];  // set value of new space
              this.board[row][currentCol] = 0; // vacate current space
              $(currentTile).attr("data-col", "c" + (currentCol-1));  // update tile attributes
              currentCol--;
            }
          }
        }
      }

      break;
    case 39: //right
      console.log('right');

      for (var col = 2; col > -1; col--) {
        for (var row = 0; row < this.board[col].length; row++) {
          if (this.board[row][col] !== 0) {
            currentTile = $('.tile[data-row="r' + row + '"][data-col="c' + col + '"]')[0]; // grab the tile that we're talking about
            var currentCol = col;
            // move it up as far as allowed
            while ((currentCol+1) <= 3 && this.board[row][currentCol+1] === 0) {
              this.board[row][currentCol+1] = this.board[row][currentCol];  // set value of new space
              this.board[row][currentCol] = 0; // vacate current space
              $(currentTile).attr("data-col", "c" + (currentCol+1));  // update tile attributes
              currentCol++;
            }
          }
        }
      }      break;
  }
};




Game.prototype.get_empty_spaces = function() {
  var indexes = [], i, j;
  for (i = 0; i < this.board.length; i++) {
    for (j = 0; j < this.board[i].length; j++) {
      if (this.board[i][j] === 0) {
        indexes.push([i, j]);
      }
    }
  }
  return indexes;
};

Game.prototype.addTile = function () {
  // create a tile with a value of 2 or 4, based on weighted probability
  var rand = Math.random();

  var val;
  if (rand < 0.9) {
    val = 2;
  } else {
    val = 4;
  }

  // figure out which spaces are empty
  var avail = this.get_empty_spaces();

  // pick one (each is in the form [row, column])
  var dest = avail[Math.floor(Math.random() * avail.length)];

  // add tile to the board in an empty space
  var $div = $('<div class="tile"></div>');
  $div.attr("data-row", "r" + dest[0]);
  $div.attr("data-col", "c" + dest[1]);
  $div.attr("data-val", val);
  $div.html(val);
  $("#gameboard").append($div);

  // update board structure with placement of new tile
  this.board[dest[0]][dest[1]] = val;
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');

      game.moveTile(tile, event.which);
      // game.addTile();
    }
  });
});
