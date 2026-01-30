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
        if (board[row][column].getValue() === 0){
            board[row][column].addToken(player);
        }
        else{
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
        // check row for winner  
        for (let i = 0; i < boardInstance.getBoard().length; i++) {
            let match = 0;
            for (let j = 0; j < boardInstance.getBoard()[i].length; j++) {
                const cellMark = boardInstance.getBoard()[i][j].getValue();
                if (playerMark === cellMark) match++;
                if ( match === boardInstance.getBoard()[i].length){
                        console.log(`Winner is ${getActivePlayer().name}`);  
                }
            }
        }
        // check column for winner


        

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


