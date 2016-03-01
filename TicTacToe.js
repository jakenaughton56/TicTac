// THIS CODE IS FOR PAGE LOADUP

$(document).ready(function() {
	initialize();
	var game_board = set_up_game();
	play_game(game_board);
});


function initialize(){

	// When player chooses difficulty
	$('.menu_block td').click(function() {
		$('.menu_block').toggle(500);
		$('.game_table').delay(600).toggle();
		$('.restart').delay(600).toggle();
		vs_type = $(this).attr('class'); // global variable of game type
	});
}


function set_up_game() {
	// Initialize empty game border
	var game_board = new Array(9);
	for(var i=0; i<game_board.length; i++){
		game_board[i] = null;
	}
	return game_board;
}


function play_game(game_board) {

	// Set first player
	var current_player = 'X';

	// when player clicks a tile
	$('.game_table td').click(function() {
		var col = $(this).parent().children().index($(this));
		var row = $(this).parent().parent().children().index($(this).parent());
		// checks if position on board has already been played
		if(game_board[row*3 + col] === null){

            $(this).prepend(current_player);
			game_board[row*3 + col] = current_player;

			// check if player has won, else change players.
			if(check_for_win(game_board,current_player) ){
				confirm(current_player + " wins");
				game_board = set_up_game();
				$('.game_table td').empty();
			}

			current_player = change_player(current_player);
		}
	});


	$('.restart').click(function(){
		if(confirm("Are you sure you want to restart?")){
			game_board = set_up_game();
			$('.game_table td').empty();
		}
	});
}


// check win
function check_for_win(game_board, player){

	// check collumn wins
	for(var i = 0; i<3; i++){
		if(game_board[i] === player && game_board[i+3] === player && game_board[i+6] === player){
			return true;
		}
	}

	// row wins
	for(var j = 0; j < 9; j +=3 ){
		if(game_board[j] === player && game_board[j + 1] === player && game_board[j + 2] === player){
			return true;
		}
	}
	
	// diagonal wins
	for(var k = 0; k <= 2; k+=2){
		if(game_board[k] === player && game_board[4] === player && game_board[8-k] === player){
			return true;
		}
	}
	
	// player has not won
	return false;
}

// Change current player
function change_player(current_player) {
	if (current_player === 'X') {
		current_player = 'O';
	}
	else {
		current_player = 'X';
	}
	return current_player;
}
