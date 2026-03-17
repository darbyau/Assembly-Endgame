# Assembly: Endgame

Assembly Endgame

A browser-based inspired by word-guessing mechanics where players must correctly assemble a hidden, programming-related word before running out of attempts. Each incorrect guess allows “Assembly” to take over further, knocking out a programming language one by one until the player either successfully completes the word or runs out of lives. Built with a focus on clean UI, responsive interactions, and dynamic visual feedback.

🔗 Click → [Demo](https://endgame-survival.netlify.app) 

## Features

- Random word selection
- Letter-by-letter guessing with keyboard UI
- Win / lose state tracking
- Animations for incorrect guesses (shake) and win celebration (confetti)
- Dynamic word rendering
- Custom CSS animations
- Accessibility improvements


## 🕹️ How to play

1. Use the on-screen keyboard to select letters.
2. Each wrong letter removes a programming language from the board.
3. Guess the full word before you run out of wrong guesses.

##  Customization

- The word list lives in `src/utils.js` (or `languages.js` for the language chips).

## Tech stack

React, JavaScript, HTML, CSS

## ▶️ How to Run

### 1. Clone the repository
```bash
git clone https://github.com/darbyau/Assembly-Endgame.git
```
### 2. Navigate to the project directory:
```bash
cd Assembly-Endgame
```
### 3. Install dependencies
```bash
npm install
```

### 4. Start the development server
```bash
npm run dev
```


## Future Improvements

- 🔊 Sound effects for interactions
- ⏱️ Timer-based gameplay mode
- 🌐 Online leaderboard
- 🎨 Theme customization (dark/light modes)
- 📱 Mobile optimization enhancements

---

