import React, { useState } from "react";
import Square from "./Square";

function Board() {
    const [state, setState] = useState(Array(9).fill(null));  
    const [isXTurn, setIsXTurn] = useState(true);  
    const [winner, setWinner] = useState(null);  

    
    const winningLogic = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    
    const checkWinner = (currentState) => {
        for (let line of winningLogic) {
            const [a, b, c] = line;
            if (currentState[a] && currentState[a] === currentState[b] && currentState[a] === currentState[c]) {
                return currentState[a]; 
            }
        }
        if (currentState.every((square) => square !== null)) {
            return "Draw"; 
        }
        return null; 
    };

    
    const handleClick = (index) => {
        if (state[index] !== null || winner) return; 

        const copyState = [...state];
        copyState[index] = isXTurn ? "X" : "O";
        setState(copyState);
        setIsXTurn(!isXTurn);

        const result = checkWinner(copyState);
        if (result) {
            setWinner(result); 
        }
    };

    
    const resetGame = () => {
        setState(Array(9).fill(null));
        setIsXTurn(true);
        setWinner(null);
    };

    return (
        <div className="board-container">
            {winner ? (
                <div>
                    <h2>{winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}</h2>
                    
                    <button className="play-again-btn" onClick={resetGame}>Play Again</button>
                </div>
            ) : (
                <h2>Next Turn: {isXTurn ? "X" : "O"}</h2>
            )}
           
            <div className="board-row">
                <Square value={state[0]} onClick={() => handleClick(0)} />
                <Square value={state[1]} onClick={() => handleClick(1)} />
                <Square value={state[2]} onClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={state[3]} onClick={() => handleClick(3)} />
                <Square value={state[4]} onClick={() => handleClick(4)} />
                <Square value={state[5]} onClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={state[6]} onClick={() => handleClick(6)} />
                <Square value={state[7]} onClick={() => handleClick(7)} />
                <Square value={state[8]} onClick={() => handleClick(8)} />
            </div>
            <div className="game-footer">
                <h3>Tic-Tac-Toe Game</h3>
            </div>
        </div>
    );
}

export default Board;
