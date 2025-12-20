export default function MemoryCard({ card, onClick, isFlipped, isMatched }) {
    return (
        <div 
            className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
            onClick={onClick}
        >
            <div className="card-inner">
                <div className="card-front">
                    <span>❓</span>
                </div>
                <div 
                    className="card-back"
                    style={{ background: card.gradient }}
                >
                    <span>{card.emoji}</span>
                </div>
            </div>
        </div>
    )
}
