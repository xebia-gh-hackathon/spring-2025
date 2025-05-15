# Battleship Game

A fully functional web-based Battleship game with an interactive graphical user interface. Play against an AI opponent or challenge a friend in this classic naval strategy game.

![Battleship Game Screenshot](public/assets/battleship-screenshot.png)

## Features

- **Multiple Game Modes**: Play against a basic AI or challenge a friend in the same browser
- **Interactive Ship Placement**: Intuitive interface for placing ships with rotation capability
- **Real-time Feedback**: Visual indicators for hits, misses, and sunken ships
- **Game Phases**: Complete game flow from lobby to ship placement, battle, and post-game screens
- **Responsive Design**: Works on both desktop and mobile devices

## Getting Started

### Prerequisites

Before running the game, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- npm (comes with Node.js)

### Installation

1. Clone this repository or download the source code

2. Navigate to the project directory
```bash
cd battleship-game
```

3. Install dependencies
```bash
npm install
```

### Running the Game

There are two ways to run the game:

#### Option 1: Using the Express Server (Recommended)

1. Start the server
```bash
npm start
```

2. Open your web browser and navigate to:
```
http://localhost:3000
```

#### Option 2: Using Webpack Dev Server

1. Run the webpack development server
```bash
npm run dev
```

2. Open your web browser and navigate to:
```
http://localhost:8080
```

## How to Play

### Game Phases

1. **Lobby Phase**
   - Select your opponent type (Human vs. Human or Human vs. Computer)
   - Click "Start Game" to proceed

2. **Ship Placement Phase**
   - Select a ship from the ship selection panel
   - Click on the board to place the ship
   - Use the "Rotate Ship" button to change orientation before placement
   - Place all 5 ships to continue
   - Click "Ready" when all ships are placed

3. **Battle Phase**
   - Take turns attacking your opponent's board by clicking on cells
   - Hits are marked with red X's, misses with blue O's
   - The game ends when all ships of one player are sunk

4. **Post-Game Screen**
   - View the winner
   - Click "Restart Game" to play again

### Ships

The game includes 5 ships of different sizes:
- Carrier (5 cells)
- Battleship (4 cells)
- Cruiser (3 cells)
- Submarine (3 cells)
- Destroyer (2 cells)

## Troubleshooting

If you encounter any issues:

- Make sure all dependencies are installed by running `npm install`
- Check that you're using a modern web browser (Chrome, Firefox, Safari, Edge)
- If the page doesn't load, ensure there are no errors in the browser console
- Try clearing your browser cache or running in incognito mode
- If game shows "Cannot GET /", make sure you're using the correct port

## Development

### Project Structure

- `/public` - Static files (HTML, CSS)
- `/src` - Source code
  - `/components` - Game components (board, ships, etc.)
  - `/logic` - Game logic
- `/server.js` - Express server for serving the game

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `/dist` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the classic Battleship board game
- Built with vanilla JavaScript for maximum compatibility