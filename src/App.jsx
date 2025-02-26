import {useState} from 'react'
import Player from './components/Player.jsx'
import GameBoard  from './components/GameBoard.jsx'
import { WINNING_COMBINATIONS } from './components/winning_combinations.js';
import GameOver from './components/GameOver.jsx';

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

function deriveAcivePlayer(gameTurns)
{
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X')
  {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveAcivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array=>[...array])];

    for(const turn of gameTurns)
    {
        const {square,player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }
  
  let winner = null;
  
  for (const combination of WINNING_COMBINATIONS)
  {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    
    if(firstSquareSymbol &&firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol)
    {
      winner = firstSquareSymbol;
    }

  }

  const hasDraw = gameTurns.length === 9 && !winner;
  
  function handleSelectSquare(rowIndex,colIndex)
  {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveAcivePlayer(prevTurns);
      const updatedTurns = [{square:{row:rowIndex, col:colIndex},player:currentPlayer},...prevTurns];
      return updatedTurns;
    })
  }

  function restart()
  {
    setGameTurns([]);
  }

  return (
    <main>
      <div id = "game-container">
        <ol id = "players" className="highlight-player">
          <Player initialName= "Player1" symbol = "X" isActive = {activePlayer === 'X'}/>
          <Player initialName= "Player2" symbol = "O" isActive = {activePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner = {winner} onRestart={restart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board = {gameBoard}/>
      </div>
    </main>
    
  )
}

export default App
