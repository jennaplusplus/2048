var Game = function() {
  this.board = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
  this.addTile();
  this.addTile();
};

Game.prototype.moveTile = function(tile, direction) {
  switch(direction) {
    case 38: //up
      console.log('up');

      var currentTile;

      for (var i = 1; i < this.board.length; i++) {
        for (var j = 0; j < this.board[i].length; j++) {
          if (this.board[i][j] !== 0) {
            currentTile = $('.tile[data-row="r' + i + '"][data-col="c' + j + '"]')[0]; // grab the tile that we're talking about

            // move it up as far as allowed
            while (this.board[i-1][j] === 0 && (i-1) >= 0) {
              this.board[i-1][j] = this.board[i][j];  // set value of new space
              this.board[i][j] = 0;                   // vacate current space
              $(currentTile).attr("data-row", "r" + (i-1));  // update tile attributes
              i--;
            }
          }
        }
      }

      break;
    case 40: //down
      console.log('down');
      $('.tile').attr("data-row", "r3");
      break;
    case 37: //left
      console.log('left');
      $('.tile').attr("data-col", "c0");
      break;
    case 39: //right
      console.log('right');
      $('.tile').attr("data-col", "c3");
      break;
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
