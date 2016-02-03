// win if one tile has a value of 2048
Game.prototype.won = function(){
  if (this.board.includes(2048))
  return true;
  console.log("You win!!!");
  };
};
