import { useEffect, useState } from 'react'

export default function GameOver({ handleClick, moves, time }) {
    const [confettiPieces, setConfettiPieces] = useState([])

    useEffect(() => {
        // Create confetti pieces
        const pieces = []
        const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#feca57', '#48dbfb']
        
        for (let i = 0; i < 50; i++) {
            pieces.push({
                id: i,
                left: Math.random() * 100,
                animationDelay: Math.random() * 3,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                animationDuration: 2 + Math.random() * 2
            })
        }
        setConfettiPieces(pieces)
    }, [])

    return (
        <>
            {confettiPieces.map(piece => (
                <div
                    key={piece.id}
                    className="confetti"
                    style={{
                        left: `${piece.left}%`,
                        animationDelay: `${piece.animationDelay}s`,
                        backgroundColor: piece.backgroundColor,
                        animationDuration: `${piece.animationDuration}s`
                    }}
                />
            ))}
            <div className="game-over">
                <h2>🎉 Congratulations! You won! 🎉</h2>
                <p>You matched all the cards!</p>
                <div className="score-display">
                    <div className="score-item">
                        Moves
                        <span>{moves}</span>
                    </div>
                    <div className="score-item">
                        Time
                        <span>{time}s</span>
                    </div>
                </div>
                <button onClick={handleClick}>Play Again</button>
            </div>
        </>
    )
}
