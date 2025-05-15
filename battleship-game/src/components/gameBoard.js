class GameBoard {
    constructor(size = 10) {
        this.size = size;
        this.board = this.createBoard();
        this.ships = [];
        this.attackedCells = [];
    }

    createBoard() {
        const board = [];
        for (let i = 0; i < this.size; i++) {
            const row = Array(this.size).fill(null);
            board.push(row);
        }
        return board;
    }

    placeShip(ship, coordinates) {
        if (this.validateShipPlacement(ship, coordinates)) {
            this.ships.push({ ship, coordinates });
            this.markBoardWithShip(ship, coordinates);
            return true;
        }
        return false;
    }

    validateShipPlacement(ship, coordinates) {
        // Check if all coordinates are valid and not already occupied
        return coordinates.every(([x, y]) => {
            // Check if within bounds
            if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
                return false;
            }
            
            // Check if cell is empty
            return this.board[x][y] === null;
        });
    }

    markBoardWithShip(ship, coordinates) {
        coordinates.forEach(([x, y]) => {
            this.board[x][y] = ship;
        });
    }

    placeShipOnCell(cell) {
        if (cell.x >= 0 && cell.x < this.size && cell.y >= 0 && cell.y < this.size) {
            this.board[cell.x][cell.y] = 'ship';
            return true;
        }
        return false;
    }

    isCellValid(cell) {
        // Check if the cell is within the board bounds
        if (cell.x < 0 || cell.x >= this.size || cell.y < 0 || cell.y >= this.size) {
            return false;
        }
        
        // Check if the cell is already occupied by another ship
        return this.board[cell.x][cell.y] !== 'ship';
    }

    receiveAttack(x, y) {
        // Check if the cell has already been attacked
        if (this.isAlreadyAttacked(x, y)) {
            return 'already-attacked';
        }

        // Mark the cell as attacked
        this.attackedCells.push([x, y]);

        // Check if there is a ship at this position
        if (this.board[x][y] === 'ship') {
            this.board[x][y] = 'hit';
            return 'hit';
        } else {
            this.board[x][y] = 'miss';
            return 'miss';
        }
    }

    isAlreadyAttacked(x, y) {
        return this.attackedCells.some(([attackedX, attackedY]) => attackedX === x && attackedY === y);
    }

    isSunk() {
        // Check if all ships have been hit
        let allShipCellsHit = true;
        
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                if (this.board[x][y] === 'ship') {
                    // Found a ship cell that hasn't been hit
                    allShipCellsHit = false;
                    break;
                }
            }
            if (!allShipCellsHit) break;
        }
        
        return allShipCellsHit;
    }

    getBoardState() {
        return this.board;
    }
    
    addEventListenersForPlacement(shipPlacement) {
        // This is a placeholder function that's called from ShipPlacement
        // The actual event listeners are attached in the ShipPlacement class
    }
}

export default GameBoard;