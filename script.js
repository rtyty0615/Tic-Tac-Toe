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

    return { getBoard, dropToken };
}


function Cell() {
    let value = "";

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
    playerOneName,
    playerTwoName
) {
    const boardInstance = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: "O",
        },
        {
            name: playerTwoName,
            token: "X",
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {
        
        boardInstance.dropToken(row, column, getActivePlayer().token);

        const playerMark = getActivePlayer().token;
        const boardArray = boardInstance.getBoard();
        let winner = "";

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
                winner = `Winner is ${getActivePlayer().name}`;
                return winner
            }
        }
        let matchTie = 0;
        for (let i = 0; i < boardArray.length; i++) {
            const row = boardArray[i];
            if (row.every(cell => cell.getValue() !== "")) matchTie++;
            if (matchTie === boardArray.length) {
                winner = "It's a tie!";
                return winner;
            }
        }

        switchPlayerTurn();
    };

    return {
        playRound,
        getActivePlayer,
        getBoard: boardInstance.getBoard
    };
}


function ScreenController(){
    let game = GameController("Player One", "Player Two");
    const playerTurnDiv = document.querySelector('#turn');
    const boardDiv = document.querySelector('#board');
    const winnerAnnounce = document.querySelector('#result');
    const startGame = document.querySelector('#start');
    const startBtn = document.createElement("button");
    startBtn.textContent = "Start";
    startBtn.id = "startBtn";
    startGame.append(startBtn);

    const dialog = document.querySelector("dialog");
    const openDialog = document.querySelector('#startBtn');
    openDialog.addEventListener('click', () => {
        dialog.showModal();
    });

    const submitForm = document.querySelector('form');
    submitForm.addEventListener("submit", () => {
        const inputPlayerOne = document.querySelector('#player-one').value;
        const inputPlayerTwo = document.querySelector('#player-two').value;
        game = GameController(
            inputPlayerOne || "Player One",
            inputPlayerTwo || "Player Two"
        );
        updateScreen();
        winnerAnnounce.textContent = "";
        boardDiv.removeEventListener("click", clickHandlerBoard); 
        boardDiv.addEventListener("click", clickHandlerBoard);
        submitForm.reset();
    });

    const cancelBtn = document.querySelector('#cancel-btn');
    cancelBtn.addEventListener("click", () => {
        submitForm.reset();
        dialog.close();
    })


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
        if (displayBoard[row][column].getValue() === "") {
            const result = game.playRound(row, column);
            updateScreen();
            if (result) {
                winnerAnnounce.textContent = result;
                boardDiv.removeEventListener("click", clickHandlerBoard);
                startBtn.textContent = 'Restart';
            }
        }
    };
    
    boardDiv.addEventListener("click", clickHandlerBoard);

    updateScreen();
}

ScreenController()




