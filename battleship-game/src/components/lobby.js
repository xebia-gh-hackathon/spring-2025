// filepath: /Users/benschor/Downloads/xebia2/battleship-game/src/components/lobby.js
function createLobby(onStartGame) {
    // Clear any existing content
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = '';
    
    // Create lobby container
    const lobbyContainer = document.createElement('div');
    lobbyContainer.classList.add('lobby');
    
    // Add title
    const title = document.createElement('h1');
    title.innerText = 'Welcome to Battleship!';
    lobbyContainer.appendChild(title);
    
    // Add subtitle
    const subtitle = document.createElement('h2');
    subtitle.innerText = 'Select Opponent Type';
    lobbyContainer.appendChild(subtitle);
    
    // Create opponent selection
    const opponentSelection = document.createElement('div');
    opponentSelection.classList.add('opponent-selection');
    
    // Human opponent option
    const humanOption = document.createElement('div');
    humanOption.classList.add('opponent-option');
    humanOption.dataset.opponentType = 'human';
    humanOption.classList.add('selected'); // Default selected
    
    const humanTitle = document.createElement('h3');
    humanTitle.innerText = 'Human vs. Human';
    humanOption.appendChild(humanTitle);
    
    const humanDescription = document.createElement('p');
    humanDescription.innerText = 'Play against another player by taking turns on the same device.';
    humanOption.appendChild(humanDescription);
    
    // Computer opponent option
    const computerOption = document.createElement('div');
    computerOption.classList.add('opponent-option');
    computerOption.dataset.opponentType = 'computer';
    
    const computerTitle = document.createElement('h3');
    computerTitle.innerText = 'Human vs. Computer';
    computerOption.appendChild(computerTitle);
    
    const computerDescription = document.createElement('p');
    computerDescription.innerText = 'Play against a computer opponent that randomly places ships and attacks.';
    computerOption.appendChild(computerDescription);
    
    // Add options to selection container
    opponentSelection.appendChild(humanOption);
    opponentSelection.appendChild(computerOption);
    lobbyContainer.appendChild(opponentSelection);
    
    // Add start button
    const startButton = document.createElement('button');
    startButton.innerText = 'Start Game';
    lobbyContainer.appendChild(startButton);
    
    // Add event listeners
    let selectedOpponentType = 'human';
    
    humanOption.addEventListener('click', () => {
        humanOption.classList.add('selected');
        computerOption.classList.remove('selected');
        selectedOpponentType = 'human';
    });
    
    computerOption.addEventListener('click', () => {
        computerOption.classList.add('selected');
        humanOption.classList.remove('selected');
        selectedOpponentType = 'computer';
    });
    
    startButton.addEventListener('click', () => {
        if (typeof onStartGame === 'function') {
            onStartGame(selectedOpponentType);
        }
    });
    
    // Add to DOM
    appContainer.appendChild(lobbyContainer);
}

export { createLobby };