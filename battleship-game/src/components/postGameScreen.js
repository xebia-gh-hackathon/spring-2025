// filepath: /Users/benschor/Downloads/xebia2/battleship-game/src/components/postGameScreen.js
function showPostGameScreen(winner, onRestart) {
    // Clear previous content
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = '';
    
    // Create post-game screen
    const postGameContainer = document.createElement('div');
    postGameContainer.classList.add('post-game');
    
    // Add winner message
    const winnerMessage = document.createElement('h1');
    winnerMessage.classList.add('winner-message');
    winnerMessage.innerText = winner;
    postGameContainer.appendChild(winnerMessage);
    
    // Add game statistics (optional)
    const gameStats = document.createElement('div');
    gameStats.classList.add('game-stats');
    gameStats.innerText = 'Thanks for playing!';
    postGameContainer.appendChild(gameStats);
    
    // Add restart button
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart Game';
    restartButton.addEventListener('click', () => {
        if (typeof onRestart === 'function') {
            onRestart();
        }
    });
    postGameContainer.appendChild(restartButton);
    
    // Add to DOM
    appContainer.appendChild(postGameContainer);
}

export { showPostGameScreen };