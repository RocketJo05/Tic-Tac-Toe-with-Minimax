// true = X, false = O, null = empty

let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

let XpointsCounter = 0
let YpointsCounter = 0

//prints the board
function render(board) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] != null){
                let middleSqX = 100/6*(2*i+1)
                let middleSqY = 100/6*(2*j+1)
                if(board[i][j]){
                    c.beginPath()
                    c.moveTo(width(middleSqX)+90,height(middleSqY)+90)
                    c.lineTo(width(middleSqX)-90,height(middleSqY)-90)
                    c.moveTo(width(middleSqX)+90,height(middleSqY)-90)
                    c.lineTo(width(middleSqX)-90,height(middleSqY)+90)
                    c.strokeStyle = 'rgb(94, 128, 171)'
                    c.lineWidth = 12
                    c.lineCap = 'round'
                    c.stroke()
                }else{
                    c.beginPath()
                    c.strokeStyle = 'rgb(136, 192, 208)'
                    c.arc(width(middleSqX), height(middleSqY), 90, 0, Math.PI * 2, false)
                    c.stroke()
                }
            }
        }   
    }
}


function getMove(event) {
    let rect = gameBoard.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    let canvasWidth = rect.width
    let canvasHeight = rect.height
    let xCoord, yCoord
    for(let i = 1; i < 4; i++) {
        if (x < canvasWidth/3*i) {
            xCoord = i - 1
            break
        }
    }
    for (let i = 1; i < 4; i++) {
        if (y < canvasHeight/3*i) {
            yCoord = i - 1
            break
        }
    }
    return [xCoord, yCoord]
}


function makeMove(board, moveCoords, player){
    if (board[moveCoords[0]][moveCoords[1]] != null){
        alert('This square has already been filled')
        player = !player 
        return "Fail"
    }
    board[moveCoords[0]][moveCoords[1]] = player
}


function equals(a,b,c) {
    if (a == b && b == c && c != null) {
        return true
    }else{
        return false
    }
}
function getWinner(board){
    for (let i = 0; i < 3; i++) {
        if (equals(board[i][0], board[i][1], board[i][2])) {
            if(board[i][2] == true){
                return 1
            }else{
                return -1
            }
        }
        if (equals(board[0][i], board[1][i], board[2][i])) {
            if(board[0][i] == true){
                return 1
            }else{
                return -1
            }
        }
    }
    if(equals(board[0][0], board[1][1], board[2][2])){
        if(board[0][0] == true){
            return 1
        }else{
            return -1
        }
    }else if(equals(board[0][2], board[1][1], board[2][0])){
        if(board[0][2] == true){
            return 1
        }else{
            return -1
        }
    }

    for (let i = 0; i < 3; i++) { 
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == null){
                return 2
            }
        }
    }
    return 0
}

function finalWinner() {
    let winner = getWinner(board)
    if(winner == 1){
        XpointsCounter += 1
        document.querySelector('#playerX').innerHTML = XpointsCounter
        gameBoard.removeEventListener('mousedown', gamePlay)
        return true
    }else if(winner == -1){
        YpointsCounter += 1
        document.querySelector('#playerY').innerHTML = YpointsCounter
        gameBoard.removeEventListener('mousedown', gamePlay)
        return true
    }else if(winner == 0){
        gameBoard.removeEventListener('mousedown', gamePlay)
        return true
    }else{

    }
}

let currentPlayer = true
let moveCoords = [1,0]
let winner = 2
function gamePlay(e) {
    console.time('4')
    let difficultyLevel = document.getElementById('difficulty').selectedIndex
    moveCoords = getMove(e)
    if(makeMove(board, moveCoords, currentPlayer) == "Fail"){
        return
    }
    render(board)
    if(finalWinner()){
        return
    }
    if (difficultyLevel == 0) {
        AI(board, 0)
    }else if (difficultyLevel == 1) {
        AI(board, 2)
    }else{
        console.time('Minmax')
        AI(board)
        console.timeEnd('Minmax')
    }
    render(board)
    finalWinner()
    console.timeEnd('4')
}
    

gameBoard.addEventListener('mousedown', gamePlay)


function clearBoard(e){
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = null
        }        
    }
    c.clearRect(0, 0, gameBoard.width, gameBoard.height);
    drawGrid(100/3, 0, 100/3, 100)
    drawGrid(200/3, 0, 200/3, 100)
    drawGrid(0, 100/3, 100, 100/3)
    drawGrid(0, 200/3, 100, 200/3)
    render(board)
    gameBoard.addEventListener('mousedown', gamePlay)
    currentPlayer = true
}

document.getElementById('restart').addEventListener('mousedown', clearBoard)
