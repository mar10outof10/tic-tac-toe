# TIC TAC TOE game 
Stretch in italics
## Stack: JS/CSS/HTML

## HTML:
One page

`<h1>` Tic-tac-toe

`<main>`

`<header>`


play options beneath, changes based on game state
- Pre-game: *Option for random mode*
- During-game: Option button disabled, text saying (Good luck!) or (Have fun!)
- Post-game: Left side: You win, play again! Right side: Share your win to FB or Twitter! `<embed>`

`<article>`

tic-tac-toe board

3 `<div>`, row 1/2/3 with 3 `<div>` boxes each

OR

9 `<div>` boxes

## CSS/styling
Two colour dark scheme

#142850 Dark blue background

One of these three colours for everything else

#27496D

#0C7B93

#00A8CC


Header across top

Border between boxes in tic tac toe # grid pattern

Boxes empty initially

Mouse hovers over boxes, transparent image of game token (yellow or blue)

Mouse clicks, image becomes opaque, turn over.

`<main>` content matches 80%~? width (& height) of screen

## Javascript
Start with transparent covering of game screen

Start game by clicking screen *or pressing g*

Game loop:

Game grid is 3 row array [[0],[0],[0], [0],[0],[0], [0],[0],[0]]

c = 0, increment each turn (game ends on c === 9)

Two players, blue (B) and yellow (Y)

Starting with B, click boxes and convert [0] to ["B"]

Next is Y turn, convert [0] to ["Y"] when clicked

Game ends when counter becomes 8 OR win condition reached.

Win condition on row, column, or diagonal completion. Only check when c >= 6

- Row: All elements of row are ["B"] or ["Y"]

- Column: All elements [x] of each row are ["B"] or ["Y"]

- Diagonal: [1][1] is "B" or "Y" and then either [0][0] and [2][2] OR [0][2] and [2][0] are the same as [1][1]

Game over screen! Option to share on twitter or facebook and to play again

## Stretch

### Random Mode
If this mode is turned on, the game will generate a Blue and Yellow play on a random playable cell every time the board is clicked/tapped. The rest of the rules of the game remain the same. 
### Accessibility
Allow players to play just by using a keyboard as their only input. 