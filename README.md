# Exploding Kitten!

The Solution file is in **tar.gz** file. To run this, go to the folder location in Terminal.
```
npm i //To install dependencies
npm start // To start the service
```
It will automatically open on **localhost:3000**  


## Game Rules

This will be an online single-player card game that consists of 4 different types of cards
- Cat card 😼
- Defuse card 🙅‍♂️
- Shuffle card 🔀
- Exploding kitten card 💣

There will be a button to start the game. When the game is started there will be a deck of 5 cards ordered randomly. Each time user clicks on the deck a card is revealed and that card is removed from the deck. A player wins the game once he draws all 5 cards from the deck and there is no card left to draw.

Rules –
- If the card drawn from the deck is a cat card, then the card is removed from the deck.
- If the card is exploding kitten (bomb) then the player loses the game.
- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.

## Additional Features
 
 - [x] A react app allowing a player to draw a random card from the deck once the game is started.
 - [x] UI functionality based on game rules.
- [x] Allow users to create a username to associate game progress.
- [x] Automatically save the game for a user at every stage so the user can continue from where he left off last time.

### Fetures To-Do by 25/3/2023

- [ ] Frontend state saved in Redux instead of react state. 
- [ ] Create a leaderboard to record how many games they won.
- [ ] Real-time update of points on the leaderboard for all the users using Redis as a database to store the points of all the users
- [ ] NodeJs using typescript for the backend.

## Tech Stack

1. React
2. Nest.js: TypeScript powered with Node.js
3. Redux
4. Redis 