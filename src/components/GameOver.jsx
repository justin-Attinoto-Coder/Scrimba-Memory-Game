import { useEffect, useState } from 'react'

export default function GameOver({ handleClick, moves, time, onBackToMenu }) {
    const [confettiPieces, setConfettiPieces] = useState([])

    useEffect(() => {
        // Create more confetti pieces for full screen coverage
        const pieces = []
        const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8', '#e17055']
        const emojis = ['🎉', '🎊', '✨', '🌟', '💫', '⭐', '🎈', '🎁', '🏆', '👑']

        // Create 200 pieces for better coverage
        for (let i = 0; i < 200; i++) {
            pieces.push({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                animationDelay: Math.random() * 2,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                animationDuration: 3 + Math.random() * 3,
                size: 8 + Math.random() * 12
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
                        top: `${piece.top}%`,
                        animationDelay: `${piece.animationDelay}s`,
                        backgroundColor: piece.backgroundColor,
                        animationDuration: `${piece.animationDuration}s`,
                        width: `${piece.size}px`,
                        height: `${piece.size}px`,
                        fontSize: `${piece.size * 0.8}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {piece.emoji}
                </div>
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
                <div className="game-over-buttons">
                    <button onClick={handleClick} className="play-again-btn">Play Again</button>
                    <button onClick={onBackToMenu} className="back-to-menu-btn">Choose Different Game</button>
                </div>
            </div>
        </>
    )
}
