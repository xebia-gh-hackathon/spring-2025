class ShipPlacement {
    constructor(gameBoard, onComplete) {
        this.gameBoard = gameBoard;
        this.ships = [];
        this.selectedShip = null;
        this.isPlacing = false;
        this.orientation = 'horizontal';
        this.onComplete = onComplete;
    }

    init() {
        this.renderShipSelection();
        this.renderBoard();
        this.addEventListeners();
    }

    render() {
        this.init();
    }

    renderShipSelection() {
        const shipContainer = document.createElement('div');
        shipContainer.classList.add('ship-selection');

        const ships = [
            { name: 'Carrier', size: 5 },
            { name: 'Battleship', size: 4 },
            { name: 'Cruiser', size: 3 },
            { name: 'Submarine', size: 3 },
            { name: 'Destroyer', size: 2 },
        ];

        ships.forEach(ship => {
            const shipElement = document.createElement('div');
            shipElement.classList.add('ship');
            shipElement.dataset.name = ship.name;
            shipElement.dataset.size = ship.size;
            
            // Create visual representation of the ship
            for (let i = 0; i < ship.size; i++) {
                const shipPart = document.createElement('div');
                shipPart.classList.add('ship-part');
                shipElement.appendChild(shipPart);
            }
            
            // Add ship name
            const shipName = document.createElement('span');
            shipName.innerText = ship.name;
            shipElement.appendChild(shipName);
            
            shipContainer.appendChild(shipElement);
        });

        // Add orientation toggle button
        const orientationBtn = document.createElement('button');
        orientationBtn.classList.add('orientation-toggle');
        orientationBtn.innerText = 'Rotate Ship (Current: Horizontal)';
        orientationBtn.addEventListener('click', () => this.toggleOrientation(orientationBtn));
        
        shipContainer.appendChild(orientationBtn);

        // Add reset button
        const resetBtn = document.createElement('button');
        resetBtn.classList.add('reset-placement');
        resetBtn.innerText = 'Reset Placement';
        resetBtn.addEventListener('click', () => this.resetPlacement());
        
        shipContainer.appendChild(resetBtn);

        // Add ready button
        const readyBtn = document.createElement('button');
        readyBtn.classList.add('ready-button');
        readyBtn.innerText = 'Ready';
        readyBtn.disabled = true; // Disabled until all ships are placed
        readyBtn.addEventListener('click', () => this.completePlacement());
        
        shipContainer.appendChild(readyBtn);

        document.getElementById('app').appendChild(shipContainer);
    }

    renderBoard() {
        const boardContainer = document.createElement('div');
        boardContainer.classList.add('placement-container');
        
        const boardTitle = document.createElement('h2');
        boardTitle.innerText = 'Place Your Ships';
        boardContainer.appendChild(boardTitle);
        
        const boardElement = document.createElement('div');
        boardElement.classList.add('board');
        
        // Create cells for the board
        for (let y = 0; y < this.gameBoard.size; y++) {
            for (let x = 0; x < this.gameBoard.size; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                
                cell.addEventListener('mouseenter', () => this.showShipPlacementPreview(x, y));
                cell.addEventListener('mouseleave', () => this.clearShipPlacementPreview());
                cell.addEventListener('click', () => this.attemptShipPlacement(x, y));
                
                boardElement.appendChild(cell);
            }
        }
        
        boardContainer.appendChild(boardElement);
        document.getElementById('app').appendChild(boardContainer);
    }

    addEventListeners() {
        const shipElements = document.querySelectorAll('.ship');
        shipElements.forEach(ship => {
            ship.addEventListener('click', () => this.selectShip(ship));
        });
    }

    selectShip(shipElement) {
        // Clear previous selection
        document.querySelectorAll('.ship').forEach(el => el.classList.remove('selected'));
        
        // Select new ship
        shipElement.classList.add('selected');
        
        const size = parseInt(shipElement.dataset.size);
        const name = shipElement.dataset.name;
        
        this.selectedShip = { name, size };
        this.isPlacing = true;
    }

    toggleOrientation(button) {
        this.orientation = this.orientation === 'horizontal' ? 'vertical' : 'horizontal';
        button.innerText = `Rotate Ship (Current: ${this.orientation.charAt(0).toUpperCase() + this.orientation.slice(1)})`;
        
        // Update preview if a ship is being placed
        this.clearShipPlacementPreview();
    }

    showShipPlacementPreview(x, y) {
        if (!this.isPlacing || !this.selectedShip) return;
        
        const cells = this.getCellsToPlace({x, y}, this.selectedShip.size, this.orientation);
        const isValid = this.validatePlacement(cells);
        
        cells.forEach(cell => {
            const cellElement = document.querySelector(`.cell[data-x="${cell.x}"][data-y="${cell.y}"]`);
            if (cellElement) {
                cellElement.classList.add(isValid ? 'preview-valid' : 'preview-invalid');
            }
        });
    }

    clearShipPlacementPreview() {
        document.querySelectorAll('.preview-valid, .preview-invalid').forEach(cell => {
            cell.classList.remove('preview-valid', 'preview-invalid');
        });
    }

    attemptShipPlacement(x, y) {
        if (!this.isPlacing || !this.selectedShip) return;

        const startCell = {x, y};
        const cellsToPlace = this.getCellsToPlace(startCell, this.selectedShip.size, this.orientation);

        if (this.validatePlacement(cellsToPlace)) {
            // Update the board
            cellsToPlace.forEach(cell => {
                const cellElement = document.querySelector(`.cell[data-x="${cell.x}"][data-y="${cell.y}"]`);
                if (cellElement) {
                    cellElement.classList.add('ship');
                    cellElement.dataset.ship = this.selectedShip.name;
                }
                this.gameBoard.board[cell.x][cell.y] = 'ship';
            });
            
            // Add ship to placed ships
            this.ships.push({
                name: this.selectedShip.name,
                size: this.selectedShip.size,
                cells: cellsToPlace,
                orientation: this.orientation
            });
            
            // Mark the ship as used
            const shipElement = document.querySelector(`.ship[data-name="${this.selectedShip.name}"]`);
            shipElement.classList.add('placed');
            shipElement.classList.remove('selected');
            
            // Reset selection
            this.selectedShip = null;
            this.isPlacing = false;
            
            // Enable Ready button if all ships are placed
            if (this.ships.length === 5) {
                document.querySelector('.ready-button').disabled = false;
            }
        } else {
            alert('Invalid ship placement! Ships must be placed within the board and cannot overlap.');
        }
    }

    getCellsToPlace(startCell, size, orientation) {
        const cells = [];
        for (let i = 0; i < size; i++) {
            const cell = orientation === 'horizontal' 
                ? { x: startCell.x + i, y: startCell.y } 
                : { x: startCell.x, y: startCell.y + i };
            cells.push(cell);
        }
        return cells;
    }

    validatePlacement(cells) {
        return cells.every(cell => this.isCellValid(cell));
    }

    isCellValid(cell) {
        // Check if the cell is within the board bounds
        if (cell.x < 0 || cell.x >= this.gameBoard.size || cell.y < 0 || cell.y >= this.gameBoard.size) {
            return false;
        }
        
        // Check if the cell is already occupied by another ship
        return this.gameBoard.board[cell.x][cell.y] !== 'ship';
    }

    resetPlacement() {
        // Clear all placed ships
        this.ships = [];
        
        // Reset the game board
        for (let x = 0; x < this.gameBoard.size; x++) {
            for (let y = 0; y < this.gameBoard.size; y++) {
                this.gameBoard.board[x][y] = null;
            }
        }
        
        // Clear the UI
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('ship');
            delete cell.dataset.ship;
        });
        
        document.querySelectorAll('.ship').forEach(ship => {
            ship.classList.remove('placed', 'selected');
        });
        
        // Reset selection
        this.selectedShip = null;
        this.isPlacing = false;
        
        // Disable Ready button
        document.querySelector('.ready-button').disabled = true;
    }

    completePlacement() {
        if (this.ships.length === 5) {
            this.transitionToBattlePhase();
        } else {
            alert('You must place all 5 ships before continuing!');
        }
    }

    transitionToBattlePhase() {
        // Clear ship placement UI
        document.querySelector('.ship-selection').remove();
        document.querySelector('.placement-container').remove();
        
        // Call the completion callback
        if (typeof this.onComplete === 'function') {
            this.onComplete();
        }
    }
}

export default ShipPlacement;