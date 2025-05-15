// This file initializes the Battleship game, manages game state, and handles transitions between different phases of the game.

import { createLobby } from './components/lobby.js';
import GameBoard from './components/gameBoard.js';
import ShipPlacement from './components/shipPlacement.js';
import BattlePhase from './components/battlePhase.js';
import { showPostGameScreen } from './components/postGameScreen.js';
import { showUIInstructions } from './components/uiInstructions.js';
import { getRandomInt } from './logic/utils.js';

const app = (() => {
    let currentPhase = 'lobby';
    let playerBoard;
    let opponentBoard;
    let shipPlacement;
    let battlePhase;
    let opponentType;

    const init = () => {
        // Clear any existing content
        document.getElementById('app').innerHTML = '';
        
        // Show lobby
        createLobby(startGame);
        showUIInstructions(currentPhase);
    };

    const startGame = (selectedOpponentType) => {
        opponentType = selectedOpponentType;
        
        // Create game boards
        playerBoard = new GameBoard(10);
        opponentBoard = new GameBoard(10);
        
        // Clear previous content
        document.getElementById('app').innerHTML = '';
        
        // Start ship placement phase
        shipPlacement = new ShipPlacement(playerBoard, setupOpponentAndStartBattle);
        shipPlacement.render();
        currentPhase = 'shipPlacement';
        showUIInstructions(currentPhase);
    };

    const setupOpponentAndStartBattle = () => {
        // If playing against computer, auto-place ships for opponent
        if (opponentType === 'computer') {
            placeRandomShips(opponentBoard);
        } else {
            // For human vs. human, we should have a second ship placement phase
            // but for simplicity, we'll just auto-place ships for the second player too
            placeRandomShips(opponentBoard);
        }
        
        // Start battle phase
        transitionToBattle();
    };

    const placeRandomShips = (board) => {
        const ships = [
            { name: 'Carrier', size: 5 },
            { name: 'Battleship', size: 4 },
            { name: 'Cruiser', size: 3 },
            { name: 'Submarine', size: 3 },
            { name: 'Destroyer', size: 2 }
        ];
        
        ships.forEach(ship => {
            let placed = false;
            
            while (!placed) {
                // Randomly choose orientation
                const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                
                // Calculate max starting position based on orientation and ship size
                const maxX = orientation === 'horizontal' ? board.size - ship.size : board.size - 1;
                const maxY = orientation === 'vertical' ? board.size - ship.size : board.size - 1;
                
                // Generate random starting position
                const x = getRandomInt(0, maxX);
                const y = getRandomInt(0, maxY);
                
                // Create coordinates array for the ship
                const coordinates = [];
                for (let i = 0; i < ship.size; i++) {
                    if (orientation === 'horizontal') {
                        coordinates.push([x + i, y]);
                    } else {
                        coordinates.push([x, y + i]);
                    }
                }
                
                // Try to place the ship
                if (board.validateShipPlacement(ship.name, coordinates)) {
                    board.placeShip(ship.name, coordinates);
                    placed = true;
                }
            }
        });
    };

    const transitionToBattle = () => {
        // Clear previous content
        document.getElementById('app').innerHTML = '';
        
        // Start battle phase
        battlePhase = new BattlePhase(playerBoard, opponentBoard, endGame);
        battlePhase.start();
        currentPhase = 'battle';
        showUIInstructions(currentPhase);
    };

    const endGame = (winner) => {
        // Clear previous content
        document.getElementById('app').innerHTML = '';
        
        showPostGameScreen(winner, restartGame);
    };

    const restartGame = () => {
        currentPhase = 'lobby';
        init();
    };

    return { init };
})();

document.addEventListener('DOMContentLoaded', app.init);