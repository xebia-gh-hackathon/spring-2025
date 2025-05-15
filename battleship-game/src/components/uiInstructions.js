function showUIInstructions(phase) {
    // Get or create the instructions container
    let instructionsContainer = document.querySelector('.instructions-container');
    
    if (!instructionsContainer) {
        instructionsContainer = document.createElement('div');
        instructionsContainer.classList.add('instructions-container');
        document.getElementById('app').appendChild(instructionsContainer);
    }

    // Clear previous instructions
    instructionsContainer.innerHTML = '';
    
    // Set instructions based on game phase
    let instructionsText = '';
    
    switch(phase) {
        case 'lobby':
            instructionsText = `
                <h3>Lobby Phase</h3>
                <ul>
                    <li>Choose your opponent type (Human or Computer).</li>
                    <li>Click on the "Start Game" button to proceed to the ship placement phase.</li>
                </ul>
            `;
            break;
        case 'shipPlacement':
            instructionsText = `
                <h3>Ship Placement Phase</h3>
                <ul>
                    <li>Select a ship from the selection panel.</li>
                    <li>Click on the board to place the selected ship.</li>
                    <li>Use the "Rotate Ship" button to change orientation before placing.</li>
                    <li>Ships cannot overlap or extend beyond the board.</li>
                    <li>Click "Reset Placement" to start over.</li>
                    <li>Click "Ready" when all ships are placed to proceed to the battle phase.</li>
                </ul>
            `;
            break;
        case 'battle':
            instructionsText = `
                <h3>Battle Phase</h3>
                <ul>
                    <li>Take turns attacking your opponent's board by clicking on their grid cells.</li>
                    <li>The game will indicate whether your attack was a hit or a miss.</li>
                    <li>Hits are marked with red X's, misses with blue O's.</li>
                    <li>The highlighted board shows whose turn it is.</li>
                    <li>The game ends when all ships of one player are sunk.</li>
                </ul>
            `;
            break;
        default:
            instructionsText = `
                <h3>Battleship Game</h3>
                <p>Welcome to the Battleship game! Follow the on-screen instructions for each phase of the game.</p>
            `;
    }
    
    // Update the instructions container
    instructionsContainer.innerHTML = `
        <div class="instructions">
            <h2>Game Instructions</h2>
            ${instructionsText}
            <button class="toggle-instructions">Hide Instructions</button>
        </div>
    `;
    
    // Add event listener for toggle button
    const toggleButton = document.querySelector('.toggle-instructions');
    toggleButton.addEventListener('click', () => {
        const instructions = document.querySelector('.instructions');
        
        if (instructions.classList.contains('minimized')) {
            instructions.classList.remove('minimized');
            toggleButton.textContent = 'Hide Instructions';
        } else {
            instructions.classList.add('minimized');
            toggleButton.textContent = 'Show Instructions';
        }
    });
}

export { showUIInstructions };