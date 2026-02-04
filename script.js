function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const dropToken = (row, column, player) => {
            board[row][column].addToken(player);
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return { getBoard, dropToken, printBoard };
}


function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}



function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const boardInstance = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        boardInstance.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        
        boardInstance.dropToken(row, column, getActivePlayer().token);

        const playerMark = getActivePlayer().token;
        const boardArray = boardInstance.getBoard();
        let winner = "";

        // check row for winner  
        for (let i = 0; i < boardArray.length; i++) {
            let matchRow = 0;
            for (let j = 0; j < boardArray[i].length; j++) {
                const cellMark = boardArray[i][j].getValue();
                if (playerMark === cellMark) matchRow++;
                if (matchRow === boardArray[i].length){
                    winner = `Winner is ${getActivePlayer().name}`;
                    return winner
                }
            }
        }
        // check column for winner
        for (let i = 0; i < boardArray.length; i++){
            let matchColumn = 0;
            for (let j = 0; j < boardArray[i].length; j++) {
                const cellMark = boardArray[j][i].getValue();
                if (playerMark === cellMark) matchColumn++;
                if (matchColumn === boardArray[i].length) {
                    winner = `Winner is ${getActivePlayer().name}`;
                    return winner
                }
            }
        }
        // check diagonals for winner
        let matchDiagonalLeft = 0;
        for (let i = 0; i < boardArray.length; i++) {
            const cellMark = boardArray[i][i].getValue();
            if (playerMark === cellMark) matchDiagonalLeft++;
            if (matchDiagonalLeft === boardArray.length) {
                winner = `Winner is ${getActivePlayer().name}`;
                return winner
            }
        }
        let matchDiagonalRight = 0;
        for (let i = 0; i < boardArray.length; i++) {
            const cellMark = boardArray[boardArray.length-1-i][i].getValue();
            if (playerMark === cellMark) matchDiagonalRight++;
            if (matchDiagonalRight === boardArray.length) {
                // console.log(`Winner is ${getActivePlayer().name}`)
                winner = `Winner is ${getActivePlayer().name}`;
                return winner
            }
        }
        // check tie
        let matchTie = 0;
        for (let i = 0; i < boardArray.length; i++) {
            const row = boardArray[i];
            if (row.every(cell => cell.getValue() !== 0)) matchTie++;
            if (matchTie === boardArray.length) {
                winner = "It's a tie!";
                return winner;
            }
        }

        switchPlayerTurn();
        printNewRound();
        
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: boardInstance.getBoard
    };
}


function ScreenController(){
    const game = GameController();
    const playerTurnDiv = document.querySelector('#turn');
    const boardDiv = document.querySelector('#board');
    const winnerAnnounce = document.querySelector('#result');
    
    const updateScreen = () => {
        boardDiv.textContent = "";
        const displayBoard = game.getBoard();
        const activePlayer = game.getActivePlayer();
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        for (let i = 0; i < displayBoard.length; i++) {
            for (let j = 0; j < displayBoard.length; j++) {
                const cell = document.createElement('button');
                cell.textContent = displayBoard[i][j].getValue();
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.column = j;
                boardDiv.append(cell);
            }
        }
    };

    function clickHandlerBoard(e) {
        const row = e.target.dataset.row;
        const column = e.target.dataset.column;
        if (row === undefined || column === undefined) return;
        const displayBoard = game.getBoard();
        if (displayBoard[row][column].getValue() === 0) {
            const result = game.playRound(row, column);
            updateScreen();
            if (result) {
                winnerAnnounce.textContent = result;
                boardDiv.removeEventListener("click", clickHandlerBoard);
            }
        }
    };

    boardDiv.addEventListener("click", clickHandlerBoard);

    updateScreen();
}


ScreenController()

