var Game = function() {
  this.board = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      break;
    case 40: //down
      console.log('down');
      break;
    case 37: //left
      console.log('left');
      break;
    case 39: //right
      console.log('right');
      break;
  }
};

Game.prototype.get_empty_spaces = function() {
  var indexes = [], i, j;
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      if (this.board[i][j] === 0) {
        indexes.push([i, j]);
      }
    }
  }
  return indexes;
};

Game.prototype.addTile = function () {
  // create a tile with a value of 2 or 4
  // just do 2 for now
  var tileValue = 2;

  // figure out which spaces are empty


  // add tile to the board in an empty space
  $("#gameboard").append("<div class='tile' data-row='r0', data-col='c0' data-val='2'>2</div>");

  // update board structure with placement of new tile

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
      game.addTile();
    }
  });
});
