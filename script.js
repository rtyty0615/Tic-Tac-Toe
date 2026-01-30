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
        if (board[row][column].getValue() === 0) {
            board[row][column].addToken(player);
        }
        else {
            console.log("Cell taken, please select another!");
        }
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
        /*  This is where we would check for a winner and handle that logic,
            such as a win message. */

        const playerMark = getActivePlayer().token;
        const boardArray = boardInstance.getBoard();
        // check row for winner  
        for (let i = 0; i < boardArray.length; i++) {
            let matchRow = 0;
            for (let j = 0; j < boardArray[i].length; j++) {
                const cellMark = boardArray[i][j].getValue();
                if (playerMark === cellMark) matchRow++;
                if (matchRow === boardArray[i].length){
                        console.log(`Winner is ${getActivePlayer().name}`);
                    return playerMark
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
                    console.log(`Winner is ${getActivePlayer().name}`);
                    return playerMark
                }
            }
        }
        // check diagonals for winner
        let matchDiagonalLeft = 0;
        for (let i = 0; i < boardArray.length; i++) {
            const cellMark = boardArray[i][i].getValue();
            if (playerMark === cellMark) matchDiagonalLeft++;
            if (matchDiagonalLeft === boardArray.length) {
                console.log(`Winner is ${getActivePlayer().name}`);
                return playerMark
            }
        }
        let matchDiagonalRight = 0;
        for (let i = 0; i < boardArray.length; i++) {
            const cellMark = boardArray[boardArray.length-1-i][i].getValue();
            if (playerMark === cellMark) matchDiagonalRight++;
            if (matchDiagonalRight === boardArray.length) {
                console.log(`Winner is ${getActivePlayer().name}`);
                return playerMark
            }
        }



        

        switchPlayerTurn();
        printNewRound();
    };

    // if playRound.playerMark winner

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();



