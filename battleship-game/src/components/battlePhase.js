class BattlePhase {
    constructor(playerBoard, opponentBoard, onGameEnd) {
        this.playerBoard = playerBoard;
        this.opponentBoard = opponentBoard;
        this.currentTurn = 'player'; // 'player' or 'opponent'
        this.gameOver = false;
        this.onGameEnd = onGameEnd;
    }

    start() {
        this.renderBoards();
        this.updateStatusMessage(`Your turn! Click on the opponent's board to attack.`);
    }

    renderBoards() {
        const gameContainer = document.createElement('div');
        gameContainer.classList.add('game-container', 'battle-phase');
        
        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status-message');
        gameContainer.appendChild(statusMessage);

        const boardsContainer = document.createElement('div');
        boardsContainer.classList.add('boards-container');
        
        // Create player's board
        const playerBoardWrapper = document.createElement('div');
        playerBoardWrapper.classList.add('board-wrapper', 'player-board');
        
        const playerTitle = document.createElement('h3');
        playerTitle.innerText = 'Your Board';
        playerBoardWrapper.appendChild(playerTitle);
        
        const playerBoardElement = this.createBoardElement(this.playerBoard, false);
        playerBoardWrapper.appendChild(playerBoardElement);
        
        // Create opponent's board
        const opponentBoardWrapper = document.createElement('div');
        opponentBoardWrapper.classList.add('board-wrapper', 'opponent-board');
        
        const opponentTitle = document.createElement('h3');
        opponentTitle.innerText = 'Opponent\'s Board';
        opponentBoardWrapper.appendChild(opponentTitle);
        
        const opponentBoardElement = this.createBoardElement(this.opponentBoard, true);
        opponentBoardWrapper.appendChild(opponentBoardElement);
        
        boardsContainer.appendChild(playerBoardWrapper);
        boardsContainer.appendChild(opponentBoardWrapper);
        
        gameContainer.appendChild(boardsContainer);
        document.getElementById('app').appendChild(gameContainer);
        
        this.highlightActivePlayer();
    }

    createBoardElement(board, isOpponent) {
        const boardElement = document.createElement('div');
        boardElement.classList.add('board');
        
        for (let y = 0; y < board.size; y++) {
            for (let x = 0; x < board.size; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                
                // If it's the player's board, show ships
                if (!isOpponent && board.board[x][y] === 'ship') {
                    cell.classList.add('ship');
                }
                
                // If it's the opponent's board, add click event for attacking
                if (isOpponent) {
                    cell.addEventListener('click', () => this.attackCell(x, y));
                }
                
                boardElement.appendChild(cell);
            }
        }
        
        return boardElement;
    }

    attackCell(x, y) {
        if (this.currentTurn !== 'player' || this.gameOver) return;

        const result = this.opponentBoard.receiveAttack(x, y);
        
        if (result === 'already-attacked') {
            this.updateStatusMessage('This cell has already been attacked. Choose another one.');
            return;
        }
        
        // Update the opponent's board display
        const cell = document.querySelector(`.opponent-board .cell[data-x="${x}"][data-y="${y}"]`);
        cell.classList.add(result);
        
        // If it's a hit, we should show that there was a ship there
        if (result === 'hit') {
            cell.classList.add('ship');
        }
        
        this.updateGameState(result, 'player');
    }

    opponentAttack() {
        // Simple AI: randomly select a cell that hasn't been attacked yet
        let x, y;
        let validTarget = false;
        
        while (!validTarget) {
            x = Math.floor(Math.random() * this.playerBoard.size);
            y = Math.floor(Math.random() * this.playerBoard.size);
            
            if (!this.playerBoard.isAlreadyAttacked(x, y)) {
                validTarget = true;
            }
        }
        
        const result = this.playerBoard.receiveAttack(x, y);
        
        // Update the player's board display
        const cell = document.querySelector(`.player-board .cell[data-x="${x}"][data-y="${y}"]`);
        cell.classList.add(result);
        
        this.updateGameState(result, 'opponent');
    }

    updateGameState(result, attacker) {
        if (result === 'hit') {
            const message = attacker === 'player' ? 
                'You hit a ship! Your turn again.' : 
                'Opponent hit your ship!';
            this.updateStatusMessage(message);
            
            // Check if the game is over
            if (attacker === 'player' && this.opponentBoard.isSunk()) {
                this.endGame('You Win!');
                return;
            } else if (attacker === 'opponent' && this.playerBoard.isSunk()) {
                this.endGame('Opponent Wins!');
                return;
            }
            
            // If hit, attacker gets another turn
            if (attacker === 'opponent') {
                // Add a small delay for the computer's turn to make it feel more natural
                setTimeout(() => this.opponentAttack(), 1000);
            }
            
        } else if (result === 'miss') {
            const message = attacker === 'player' ? 
                'You missed. Opponent\'s turn.' : 
                'Opponent missed. Your turn!';
            this.updateStatusMessage(message);
            
            // Switch turns
            this.switchTurn();
        }
    }

    switchTurn() {
        this.currentTurn = this.currentTurn === 'player' ? 'opponent' : 'player';
        this.highlightActivePlayer();
        
        if (this.currentTurn === 'opponent') {
            // Add a small delay for the computer's turn to make it feel more natural
            setTimeout(() => this.opponentAttack(), 1000);
        }
    }

    highlightActivePlayer() {
        const playerBoard = document.querySelector('.player-board');
        const opponentBoard = document.querySelector('.opponent-board');
        
        if (this.currentTurn === 'player') {
            opponentBoard.classList.add('active');
            playerBoard.classList.remove('active');
        } else {
            playerBoard.classList.add('active');
            opponentBoard.classList.remove('active');
        }
    }

    updateStatusMessage(message) {
        const statusMessage = document.querySelector('.status-message');
        statusMessage.innerText = message;
    }

    endGame(message) {
        this.gameOver = true;
        this.updateStatusMessage(`Game Over! ${message}`);
        
        // Create a button to go to post-game screen
        const continueButton = document.createElement('button');
        continueButton.innerText = 'Continue';
        continueButton.addEventListener('click', () => {
            if (typeof this.onGameEnd === 'function') {
                this.onGameEnd(message);
            }
        });
        
        document.querySelector('.status-message').appendChild(continueButton);
    }
}

export default BattlePhase;