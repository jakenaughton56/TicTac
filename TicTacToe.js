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
		$('.game_table').delay(600).toggle(500);
		$('.back').delay(600).toggle(500);
		vs_type = $(this).attr('class');
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


		// grab board position
		var col = $(this).parent().children().index($(this));
		var row = $(this).parent().parent().children().index($(this).parent());


		// checks if position on board has already been played
		if(game_board[row*3 + col] === null){

            $(this).prepend(current_player);
			game_board[row*3 + col] = current_player;


			// check if player has won, else change players.
			if(check_for_win(game_board,current_player) ){
				confirm("player wins");
				game_board = set_up_game();
				$('.game_table td').empty();
				return;
			}

			// Check for draw
			if( check_for_draw(game_board) ){
				confirm("Draw");
				game_board = set_up_game();
				$('.game_table td').empty();
				return;
			}

			// If you are vsing a computer it is there turn
			if(vs_type !== 'human'){
				game_board = easy_play(game_board);
				// check if computer has won
				if(check_for_win(game_board,'O') ){
					confirm("computer wins");
					game_board = set_up_game();
					$('.game_table td').empty();
				}
			}


			// If you are vsing another human change player
			if(vs_type === 'human'){
				current_player = change_player(current_player);
			}
		}
	});


	$('.back').click(function(){
		if(confirm("Are you sure you want go back to menu?")){
			// reset game
			$('.game_table td').empty();
			game_board = set_up_game();
			// go back to main menu
			$('.game_table').toggle(500);
			$('.back').toggle(500);
			$('.menu_block').delay(600).toggle(500);
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

// check for draw
function check_for_draw(game_board){
	var i = 0;
	while( (game_board[i] !== null) && (i < 9) ){
		i++;
	}
	if(i > 8){
		return true;
	}
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


// Easy computer
function easy_play(game_board){

	var empty_tile = Math.floor(Math.random()*9);

	while(game_board[empty_tile] !== null){
		empty_tile = Math.floor(Math.random()*9);
	}

	// update game board data
	game_board[empty_tile] = 'O';

	// update visible game board
	if(empty_tile < 3){
		empty_tile++;
		$('.game_table tr:first-child td:nth-child('+ empty_tile +')').prepend('O');
	}
	else if (empty_tile < 6) {
		empty_tile -= 2;
		$('.game_table tr:nth-child(2) td:nth-child('+ empty_tile +')').prepend('O');
	}
	else{
		empty_tile -= 5;
		$('.game_table tr:nth-child(3) td:nth-child('+ empty_tile +')').prepend('O');
	}

	return game_board;
}



