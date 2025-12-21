export default function GameOver({ handleClick }) {
    return (
        <div className="game-over">
            <h2>🎉 Congratulations! You won! 🎉</h2>
            <p>You matched all the cards!</p>
            <button onClick={handleClick}>Play Again</button>
        </div>
    )
}
