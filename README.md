# Tic-Tac-Toe

Tic Tac Toe (JavaScript)

A dynamic Tic Tac Toe game built to master Factory Functions, Module Patterns, and DOM manipulation.
Key Concepts Learned:
1. Factory Functions & Closures

    Moved away from Classes/Constructors to Factory Functions (Gameboard, GameController).

    Utilized Closures to create private variables (e.g., board, activePlayer) that cannot be accessed directly from the console, ensuring data integrity.

2. Separation of Concerns (MVC Lite)

    Logic (Model): The Gameboard handles data, and GameController handles rules/turns. neither knows about the HTML.

    UI (View): The ScreenController handles DOM rendering and event listeners.

    Benefit: This made the code modular. I can change the HTML without breaking the game logic.

3. DOM Manipulation & Event Delegation

    Used Event Delegation on the board container (boardDiv) rather than adding listeners to every single cell.

    Utilized Data Attributes (data-row, data-column) to link the DOM elements back to the internal 2D array logic.

4. HTML5 Dialogs & Forms

    Implemented the native dialog element for the "New Game" modal.

    Handled form submissions to accept custom player names and inject them into the game logic dynamically.