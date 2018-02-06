var game = {
  count: 0,
  possibleColors: ['#green','#blue', '#red', '#dark'],
  currentGame: [],
  player: [],
  sound:{
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
    dark: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
    correct: new Audio('https://raw.githubusercontent.com/AdityaOli/FreeCodeCamp/master/SimonGame/assets/green.mp3')
  },
  strictMode: false,
}

function resetTheGame() {
  game.currentGame = [];
  game.count = 0;
  addCount();
}

function newGame() {
  resetTheGame();
}

function strictMode() {
  if (game.strictMode == false) {
    game.strictMode = true;
    $('#strictMode').removeClass('btn-primary').addClass('btn-danger').removeClass('fa fa-toggle-off').addClass('fa fa-toggle-on');
  } else {
    game.strictMode = false;
    $('#strictMode').removeClass('btn-danger').addClass('btn-primary').removeClass('fa fa-toggle-on').addClass('fa fa-toggle-off');
  }
  
  newGame();
}

function showMoves() {
  var i = 0;
  var moves = setInterval(function(){
    playGame(game.currentGame[i]);
    i++;
    if (i >= game.currentGame.length) {
      clearInterval(moves);
    }
  }, 600)
  
  clearPlayer();
}

function sound(name) {
  switch(name) {
    case'#green':
      game.sound.green.play();
      break;
    case '#blue':
      game.sound.blue.play();
      break;
    case '#red':
      game.sound.red.play();
      break;
    case '#dark':
      game.sound.dark.play();
      break;
    case '#correct':
      game.sound.correct.play();
      break;
  };
}

function playGame(field) {
  $(field).addClass('hover');
  sound(field);
  setTimeout(function(){
      $(field).removeClass('hover');
  }, 300);
}

function clearPlayer() {
  game.player = [];
}

function addToPlayer(id) {
  var field = "#"+id;
  console.log(field);
  game.player.push(field);
  playerTurn(field);
} 

function playerTurn(x) {
  if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
    if(game.strictMode){
      showDialog("Whoops!","You missed. You will have to begin from scratch!");
      newGame();
    } else {
      showDialog("Oops!", "Wrong Choice, I'll give you another try.");
      showMoves();
    }
   } else {
      sound(x);
      var check = game.player.length === game.currentGame.length;
      if (check) {
        if(game.count == 20){
          showDialog("Yeayyyyyy!!!","You Have Won!!!");
        } else {
          nextLevel();
        }
      }
    }
} 

function nextLevel() {
  addCount();
}

function generateMove(){
  game.currentGame.push(game.possibleColors[(Math.floor(Math.random()*4))]);
  //alert(game.currentGame.length);
  showMoves();
}

function addCount() {
  game.count++;
  $('#clickNumber').addClass('animated flip');
  
  setTimeout(function(){
    $('#clickNumber').removeClass('flip').html(game.count).addClass('flip');
  }, 200);
  
  generateMove();
}


function showDialog(title,message)
{
    var dialog = document.querySelector('dialog');
    $(".mdl-dialog__title").html(title);
    $(".mdl-dialog__content").html(message);
    if (! dialog.showModal)
    {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
     
  dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
}

newGame();
$("body").addClass("greenGradient");
$('#strictMode').removeClass('btn-danger').addClass('btn-primary').removeClass('fa fa-toggle-on').addClass('fa fa-toggle-off');