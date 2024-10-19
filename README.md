# Pajax - Wordle Game Clone

This is a Wordle-like game built using React. It replicates the fun and challenge of guessing a five-letter word, featuring a virtual keyboard and grid interface similar to the original Wordle. The project has been organized with a focus on clean, reusable components and includes custom hooks to manage the game logic effectively.

## Project Structure

### Main Components
- **`App.js`**: The main component that includes the core structure of the game, combining the different parts of the UI like the header, footer, grid, and keyboard.
- **`WordleGrid` Component**: Manages the game board where the user’s guesses are displayed.
- **`VirtualKeyboard` Component**: Handles the input from the virtual keyboard displayed on the screen.

### Custom Hooks
- **`useGameLogic`**: This hook manages the high-level game logic, like game over state and virtual key handling. It was extracted from `App.js` to ensure clean separation of concerns.
- **`useWordleGameState`**: This hook handles the detailed state management of the game, including guesses, attempts, the word to guess, and popup messages. It was extracted from `WordleGrid.js` for better maintainability and readability.

### Utils
- **`InputHandler.js`**: Handles keyboard input to interact with the game.

## Features

- **React Hooks**: Utilizes `useState`, `useEffect`, and `useCallback` hooks extensively for state and lifecycle management.
- **Custom Hooks**: `useGameLogic` and `useWordleGameState` provide modularity, making the main components simpler and easier to manage.
- **Virtual Keyboard**: The virtual keyboard allows players to interact with the game without needing to use their physical keyboard, providing a complete in-browser experience.

## Setup Instructions

To run the project locally, follow these steps:

### Prerequisites
- Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd wordle-game-clone
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the development server**:
   ```bash
   npm start
   ```
   This will start the development server, and you can access the game at `http://localhost:3000/`.

## Key Files

### `/src/hooks/useGameLogic.js`
This hook manages the high-level state of the game, including game-over status and key presses (like Enter and Backspace). It helps keep `App.js` more readable and clean.

### `/src/hooks/useWordleGameState.js`
This hook is responsible for managing the core game state, such as:
- **`wordToGuess`**: The word that the player must guess.
- **`guesses`**: A matrix of guesses representing the game board.
- **`popupMessage`**: Short messages to inform the player, like "Invalid word" or "Congratulations!".

### `/src/components/WordleGrid/WordleGrid.js`
`WordleGrid` is a functional component responsible for displaying the game grid and managing user interaction via the custom hooks (`useWordleGameState` and `useInputHandler`). The component renders each guess as a grid row and uses the `PopupMessage` component to display any feedback to the player.

### `/src/data/wordList.json`
This file contains the list of words that can be used as target words for the game. It was moved to the `/src/data/` directory to make sure it's properly accessible within the project.

## Recent Improvements

- **Custom Hooks for Logic Management**: Extracted game logic and state management into custom hooks (`useGameLogic` and `useWordleGameState`) to promote modularity and maintainability.
- **ESLint Warning Fix**: Addressed a React Hook dependency warning by wrapping `handleKeyPress` with `useCallback` and adding it to the dependency array in the `useEffect` hook in `WordleGrid.js`.

## Running Tests
To run the tests for this project, use the following command:
```bash
npm test
```

## Future Enhancements
- **Score Tracking**: Add a scoring system to track the number of successful guesses.
- **Theme Customization**: Allow users to switch between light and dark themes.
- **Multiplayer Mode**: Introduce a competitive mode where users can play against each other.

## Contributing
If you would like to contribute to this project:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact
If you have any questions or suggestions, feel free to contact us at [your-email@example.com].

---
Is there anything specific you'd like to add or modify in this README file?

