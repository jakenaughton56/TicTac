// THIS CODE IS FOR PAGE LOADUP

$(document).ready(function() {
	initialize();
	set_up_game();

});


function initialize(){

	// Initialize empty game borderImageRepeat = 'round'
	var game_board = new Array(9);
	for(var i=0; i<game_board.length; i++){
		game_board[i] = null;
	}
}

function set_up_game() {
	// When player chooses difficulty
	$('.menu_block').click(function() {
		$('.menu_block').toggle(500);
		$('.game_table').delay(600).toggle();
		var current_player = who_starts();
	});

	$('.game_table td').click(function() {
		var col = $(this).parent().children().index($(this));
		var row = $(this).parent().parent().children().index($(this).parent());
		// checks if position on board has already been played
		if(game_board[row*3 + col] === null){

            $(this).prepend(current_player);
			game_board[row*3 + col] = current_player;
			if(check_for_win(game_board,current_player) ){
				confirm(current_player + " wins");
			}
				change_player();
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





function who_starts() {
	var starting_player = Math.floor(Math.random()*2 + 1);
	if (starting_player === 1) {
		starting_player = "You";
		current_player = 'X';
	}
		else {
			starting_player = "Computer";
			current_player = 'O';
	}
	$('.first_player').delay(1350).css('display','block');
	$('.first_player').delay(1350).prepend(starting_player);
	return current_player;
}



function change_player() {
	if (current_player === 'X') {
		current_player = 'O';
	}
	else {
		current_player = 'X';
	}
}



/*


		    $('td.game').click(function() {
			if (whos_turn === player_1) {
		        $(this).prepend("X"); // COULD PUT AN IMAGE HERE
		    	this.cell_played = true;
		    	board.this = "X";
		    }
			else if (whos_turn(player) === player_2) {
				$(this).prepend("O");
				this.cell_played = true;
				board.this = "O";
			}




// CHECKING FOR HIT AMOUNT OF MATCHES. GAME ENDS. 

function game_won() {  // DO LATER. MAKE 1 ROUND WORK FIRST

}





*/


//DONT EDIT THIS.

initialize();