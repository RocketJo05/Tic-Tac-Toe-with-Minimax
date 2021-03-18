function AI(board, depth){
  let bestScore = 2
  let move
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      if(board[i][j] == null){
        board[i][j] = false
        let score = minimax(board, true, depth)
        board[i][j] = null
        if (score < bestScore){
          bestScore = score
          move = [i,j]
        }
      }
    }
  }
  board[move[0]][move[1]] = false;
}


function minimax(board, maximizingPlayer, depth = 40){
  let winner = getWinner(board)
  if (winner !== 2){
    return winner
  }
  else if(depth < 1) {
    return 0
  }

    let emptySqs = []
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        if(board[i][j] == null){
          emptySqs[emptySqs.length] = [i, j]
        }
      }        
    }
 
	if(maximizingPlayer == true){
		let maxEval = -2
		for(let emptySq of emptySqs){
      let newDepth = depth - 1
      board[emptySq[0]][emptySq[1]] = true
      eval = minimax(board, false, newDepth)
      board[emptySq[0]][emptySq[1]] = null
			maxEval = Math.max(maxEval, eval)
    }

    return maxEval
    }else{
      let minEval = 2
      for(let emptySq of emptySqs){
        let newDepth = depth - 1
        board[emptySq[0]][emptySq[1]] = false
        eval = minimax(board, true, newDepth)
        board[emptySq[0]][emptySq[1]] = null
        minEval = Math.min(minEval, eval)
      }
      return minEval  
    }
}


// let testBoard = [
//   [true, true, null],
//   [false, true, null],
//   [null, null, false]
// ]

// let b = minimax(testBoard, false)
// console.log(b)