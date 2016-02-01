var Game = function() {
  // Game logic and initialization here
};

Game.prototype.moveTile = function(tile, direction) {
  switch(direction) {
    case 38: //up
      console.log('up');
      console.log($('.tile'));
      $('.tile').animate({top: '-=135px'}, 'fast');
      break;
    case 40: //down
      console.log('down');
      $('.tile').animate({top: '+=135px'}, 'fast');
      break;
    case 37: //left
      console.log('left');
      $('.tile').animate({left: '-=135px'}, 'fast');
      break;
    case 39: //right
      console.log('right');
      $('.tile').animate({left: '+=135px'}, 'fast');
      break;
  }
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();

  $('body').keydown(function(event){
    event.preventDefault();
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');

      game.moveTile(tile, event.which);
    }
  });
});
